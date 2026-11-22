'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { decodeShare, sanitize } from '@/engine/state'
import { getTemplate, TEMPLATE_MAP, templateSettings } from '@/engine/templates'
import type { Settings } from '@/engine/types'
import { track } from '@/lib/analytics'

const KEY = 'textsnapy:draft:v1'

function readDraft(): Settings | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? sanitize(JSON.parse(raw)) : null
  } catch {
    return null
  }
}

/** True when the copy is still a template's sample, i.e. the user hasn't written anything yet. */
const isSampleCopy = (s: Settings) => {
  const t = getTemplate(s.template)
  return s.text === t.sample.text && s.focus === t.sample.focus
}

export interface Notice {
  message: string
  undo?: Settings
}

export function useEditor(initialTemplate?: string) {
  // Render the template on the server-matching first pass, then hydrate from URL/draft.
  const [settings, setSettings] = useState<Settings>(() => templateSettings(initialTemplate ?? 'newspaper'))
  const [notice, setNotice] = useState<Notice | null>(null)
  const [ready, setReady] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const shared = decodeShare(params.get('s'))
    const t = params.get('t')
    const draft = readDraft()
    let next: Settings
    let loaded: Notice | null = null
    if (shared) {
      next = shared
      if (draft && !isSampleCopy(draft)) loaded = { message: 'Loaded a shared design.', undo: draft }
      track('template_remixed', { template: shared.template, via: 'share_link' })
    } else if (t && TEMPLATE_MAP.has(t)) {
      next = templateSettings(t, draft && !isSampleCopy(draft) ? draft : undefined)
      track('template_remixed', { template: t, via: 'template_link' })
    } else if (initialTemplate) {
      next = templateSettings(initialTemplate, draft && !isSampleCopy(draft) ? draft : undefined)
    } else next = draft ?? templateSettings('newspaper')
    /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from browser-only sources (URL, localStorage) */
    setSettings(next)
    setNotice(loaded)
    setReady(true)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [initialTemplate])

  // Autosave so a refresh or accidental navigation never loses work.
  useEffect(() => {
    if (!ready) return
    const id = setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(settings))
      } catch {
        // Storage full or disabled (private mode) – the editor still works.
      }
    }, 300)
    return () => clearTimeout(id)
  }, [settings, ready])

  const update = useCallback((patch: Partial<Settings>) => {
    if (!started.current) {
      started.current = true
      track('generator_started')
    }
    setSettings((s) => sanitize({ ...s, ...patch }))
  }, [])

  const chooseTemplate = useCallback((id: string) => {
    setSettings((s) => {
      const keep = isSampleCopy(s) ? undefined : { text: s.text, focus: s.focus }
      return { ...templateSettings(id, keep), aspect: s.aspect, credit: s.credit }
    })
    track('template_selected', { template: id })
  }, [])

  const replace = useCallback(
    (next: Settings, message: string) => {
      setNotice(isSampleCopy(settings) ? null : { message, undo: settings })
      setSettings(next)
    },
    [settings],
  )

  const undo = useCallback(() => {
    if (notice?.undo) setSettings(notice.undo)
    setNotice(null)
  }, [notice])

  return { settings, ready, update, chooseTemplate, replace, notice, dismiss: () => setNotice(null), undo }
}
