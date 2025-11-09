"use client"

import React, { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

export interface TrailNotesPanelProps {
  trailId: string
  onClose: () => void
}

export const TrailNotesPanel: React.FC<TrailNotesPanelProps> = ({
  trailId,
  onClose,
}) => {
  const [notes, setNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const loadNotes = async () => {
      const existing = await api.get<string>(`trailNotes:${trailId}`, "")
      if (isMounted) {
        setNotes(existing)
        if (existing) {
          setLastSaved("Loaded")
        }
      }
    }
    loadNotes()
    return () => {
      isMounted = false
    }
  }, [trailId])

  const handleSave = async () => {
    if (!trailId) return
    try {
      setIsSaving(true)
      await api.set(`trailNotes:${trailId}`, notes.trim())
      setLastSaved("Saved")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-50 w-full max-w-md rounded-t-3xl bg-[#020817] px-4 pb-5 pt-3 shadow-[0_-18px_60px_rgba(15,23,42,0.98)]">
        <div className="mx-auto mb-2 h-1 w-12 rounded-full bg-slate-700" />
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight text-slate-50">
              Trail notes
            </h2>
            <p className="text-[10px] text-slate-500">
              Private to this device. Capture conditions, moments, and tips.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close notes"
            className="h-10 w-10 rounded-full bg-slate-900/80 text-slate-400 hover:bg-slate-800"
          >
            ×
          </Button>
        </div>

        <div className="space-y-2">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleSave}
            placeholder="Weather, trail conditions, quiet spots, who you hiked with..."
            className="min-h-[140px] w-full rounded-2xl border-slate-800 bg-slate-950/80 px-3 py-3 text-[12px] leading-relaxed text-slate-100 placeholder:text-slate-600 focus-visible:ring-emerald-500/70"
          />
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 text-[9px] text-slate-500">
              {lastSaved && (
                <span className="rounded-full bg-slate-900/90 px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-emerald-300">
                  {lastSaved}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setNotes("")
                  void api.set(`trailNotes:${trailId}`, "")
                  setLastSaved("Cleared")
                }}
                className="h-10 rounded-2xl px-3 text-[10px] text-slate-400 hover:bg-slate-900"
              >
                Clear
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="h-10 rounded-2xl bg-emerald-500 px-4 text-[11px] font-semibold tracking-wide text-slate-950 hover:bg-emerald-400 disabled:opacity-70"
              >
                {isSaving ? "Saving" : "Save notes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrailNotesPanel
