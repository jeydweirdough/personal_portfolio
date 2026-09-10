import { NextResponse } from 'next/server'
import projects from '../../../data/projects.json'

/**
 * Live panel readings.
 *
 * The schedule used to render "In service" from a hardcoded string, which made
 * the lamp a claim. This probes each project's real demo URL server-side and
 * reports what actually came back, so the lamp is a measurement instead.
 *
 * Only URLs from the committed data file are probed — nothing here takes a URL
 * from the request, so there is no SSRF surface.
 */

export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 6000

export type SystemState = 'up' | 'down' | 'none'

export interface Reading {
  id: string
  state: SystemState
  /** Round-trip in milliseconds, or null when there was no response at all. */
  ms: number | null
  httpStatus: number | null
}

async function probe(url: string): Promise<Omit<Reading, 'id'>> {
  const started = Date.now()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    // HEAD first: it is the cheapest thing to ask a host for. Some static hosts
    // refuse it, so fall back to GET rather than reporting a false failure.
    let res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      cache: 'no-store',
    })

    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'follow',
        cache: 'no-store',
      })
    }

    return {
      state: res.ok ? 'up' : 'down',
      ms: Date.now() - started,
      httpStatus: res.status,
    }
  } catch {
    // Timeout, DNS failure, TLS failure, connection refused — all "down" from
    // a visitor's point of view, which is the only view that matters here.
    return { state: 'down', ms: null, httpStatus: null }
  } finally {
    clearTimeout(timer)
  }
}

export async function GET() {
  const checkedAt = new Date().toISOString()

  const readings: Reading[] = await Promise.all(
    (projects as { id: string; demoUrl?: string }[]).map(async (p) => {
      const url = typeof p.demoUrl === 'string' ? p.demoUrl.trim() : ''
      if (!url) return { id: p.id, state: 'none' as const, ms: null, httpStatus: null }
      return { id: p.id, ...(await probe(url)) }
    })
  )

  return NextResponse.json(
    { checkedAt, readings },
    {
      headers: {
        // Probe at most once every 5 minutes per edge, and keep serving the
        // last good answer for a while after that rather than making a visitor
        // wait on five external hosts.
        'Cache-Control': 's-maxage=300, stale-while-revalidate=900',
      },
    }
  )
}
