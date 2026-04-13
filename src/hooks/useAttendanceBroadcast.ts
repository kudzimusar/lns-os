'use client'

import { useEffect, useRef } from 'react'
import { useAttendanceStore } from '@/store/attendanceStore'
import type { AttendanceEvent } from '@/store/attendanceStore'

export function useAttendanceBroadcast() {
  const channelRef = useRef<BroadcastChannel | null>(null)
  const receiveEvent = useAttendanceStore(s => s.receiveEvent)

  // Stable ref so channel.onmessage always calls the latest version
  // without tearing down and rebuilding the channel on every render
  const receiveEventRef = useRef(receiveEvent)
  useEffect(() => {
    receiveEventRef.current = receiveEvent
  }, [receiveEvent])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const channel = new BroadcastChannel('lns-attendance')
    channelRef.current = channel
    channel.onmessage = (e: MessageEvent<AttendanceEvent>) => {
      receiveEventRef.current(e.data)
    }
    return () => { channel.close() }
  }, []) // runs once — channel lifetime matches component lifetime

  function broadcast(event: AttendanceEvent) {
    receiveEvent(event)                       // update sender's own store
    channelRef.current?.postMessage(event)    // push to all other tabs
  }

  return { broadcast }
}
