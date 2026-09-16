'use client'

import { useEffect, useRef } from 'react'
import { useBrowserPush } from '@workspace/lp-core/controller'

/**
 * Requests notification/push permission as soon as the user lands.
 * Also completes PushManager.subscribe when permission is already granted
 * but no push subscription exists yet (common after a prior Allow).
 */
export function PushPermissionOnLand() {
  const { enablePush, permission, isReady, subscription } = useBrowserPush()
  const inFlightRef = useRef(false)

  useEffect(() => {
    if (!isReady) return
    if (permission === 'denied') return
    if (permission === 'granted' && subscription) return
    if (inFlightRef.current) return

    inFlightRef.current = true
    void enablePush().finally(() => {
      inFlightRef.current = false
    })
  }, [enablePush, isReady, permission, subscription])

  useEffect(() => {
    if (!isReady) return
    if (permission === 'denied') return
    if (permission === 'granted' && subscription) return

    const onFirstGesture = () => {
      if (inFlightRef.current) return
      inFlightRef.current = true
      void enablePush().finally(() => {
        inFlightRef.current = false
      })
    }

    window.addEventListener('pointerdown', onFirstGesture, { once: true })
    window.addEventListener('keydown', onFirstGesture, { once: true })
    window.addEventListener('touchstart', onFirstGesture, { once: true })

    return () => {
      window.removeEventListener('pointerdown', onFirstGesture)
      window.removeEventListener('keydown', onFirstGesture)
      window.removeEventListener('touchstart', onFirstGesture)
    }
  }, [enablePush, isReady, permission, subscription])

  return null
}
