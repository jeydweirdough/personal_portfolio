import { useState, useEffect } from 'react'
import { client } from '../lib/sanity'

const CACHE_DURATION = 60 * 1000 // 1 minute in milliseconds
const cache: Record<string, { data: any; timestamp: number }> = {}

export function useSanityData<T>(query: string, params: Record<string, any> = {}) {
  const cacheKey = `${query}-${JSON.stringify(params)}`
  
  // Initialize state with cached data if available
  const cached = cache[cacheKey]
  const isCacheValid = cached && (Date.now() - cached.timestamp < CACHE_DURATION)
  
  const [data, setData] = useState<T | null>(isCacheValid ? cached.data : null)
  const [loading, setLoading] = useState(!isCacheValid)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      // Check cache again inside effect to avoid race conditions
      const now = Date.now()
      const currentCache = cache[cacheKey]
      
      if (currentCache && (now - currentCache.timestamp < CACHE_DURATION)) {
        if (isMounted) {
          setData(currentCache.data)
          setLoading(false)
          setError(null)
        }
        return
      }

      try {
        if (!isCacheValid) setLoading(true)
        const result = await client.fetch(query, params)
        
        // Update global cache
        cache[cacheKey] = { data: result, timestamp: Date.now() }
        
        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [cacheKey])

  return { data, loading, error }
}
