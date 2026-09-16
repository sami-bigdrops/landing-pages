'use client'

const FORM_PROGRESS_KEY = 'uncle_sam_v2_form_progress'

export type FormProgressSnapshot = {
  step: number
  updatedAt: number
}

export function saveFormProgress(step: number) {
  try {
    const payload: FormProgressSnapshot = { step, updatedAt: Date.now() }
    sessionStorage.setItem(FORM_PROGRESS_KEY, JSON.stringify(payload))
  } catch {
    /* ignore */
  }
}

export function clearFormProgress() {
  try {
    sessionStorage.removeItem(FORM_PROGRESS_KEY)
  } catch {
    /* ignore */
  }
}
