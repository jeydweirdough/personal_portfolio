'use client'

import { useEffect, useState } from 'react'

export type SystemState = 'up' | 'down' | 'none'

export interface Reading {
  id: string
  state: SystemState
  ms: number | null
  httpStatus: number | null
}

/** What a single circuit is showing right now, including the states the
 *  network can put it in before or instead of a real answer. */
export type CircuitState = SystemState | 'pending' | 'unknown'

export interface SystemStatus {
  /** null until the first answer lands. */
  readings: Record<string, Reading> | null
  checkedAt: string | null
  failed: boolean
  stateFor: (id: string) => CircuitState
  readingFor: (id: string) => Reading | null
  /** How many circuits actually answered. null while unknown. */
  upCount: number | null
}

/**
 * Reads the live panel. Deliberately non-blocking: the page renders with every
 * circuit in `pending` and resolves as the real answers arrive, so a slow host
 * delays a lamp rather than the page.
 *
 * If the endpoint itself cannot be reached, circuits go to `unknown` — never
 * back to the old hardcoded "In service", because falling back to a claim is
 * exactly the behaviour this replaced.
 */
export function useSystemStatus(): SystemStatus {
  const [readings, setReadings] = useState<Record<string, Reading> | null>(null)
  const [checkedAt, setCheckedAt] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    const controller = new AbortController()

    fetch('/api/status', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { checkedAt: string; readings: Reading[] }) => {
        if (!alive) return
        const map: Record<string, Reading> = {}
        for (const r of data.readings) map[r.id] = r
        setReadings(map)
        setCheckedAt(data.checkedAt)
      })
      .catch((err) => {
        if (!alive || (err as Error)?.name === 'AbortError') return
        setFailed(true)
      })

    return () => {
      alive = false
      controller.abort()
    }
  }, [])

  const stateFor = (id: string): CircuitState => {
    if (failed) return 'unknown'
    if (!readings) return 'pending'
    return readings[id]?.state ?? 'unknown'
  }

  const readingFor = (id: string): Reading | null => readings?.[id] ?? null

  const upCount = readings
    ? Object.values(readings).filter((r) => r.state === 'up').length
    : null

  return { readings, checkedAt, failed, stateFor, readingFor, upCount }
}

/** Local wall-clock time of the check, for showing beside a failed circuit. */
export function checkedAtLabel(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}
