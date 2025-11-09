"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Trail } from "@/app/types/trail"

export interface TrailDetailSheetProps {
  trail: Trail | null
  isFavorite: boolean
  onClose: () => void
  onToggleFavorite: () => void
  onOpenNotes: () => void
}

export const TrailDetailSheet: React.FC<TrailDetailSheetProps> = ({
  trail,
  isFavorite,
  onClose,
  onToggleFavorite,
  onOpenNotes,
}) => {
  if (!trail) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />
      <Card
        className={cn(
          "relative z-50 w-full max-w-md rounded-t-3xl border-slate-800/90 bg-[#020817] pb-4 pt-2 text-slate-50 shadow-[0_-18px_60px_rgba(15,23,42,0.95)]"
        )}
      >
        <div className="mx-auto mb-2 mt-1 h-1 w-12 rounded-full bg-slate-700" />
        <CardContent className="max-h-[70vh] space-y-4 overflow-y-auto px-4 pb-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h2 className="text-[20px] font-semibold tracking-tight text-slate-50">
                {trail.name}
              </h2>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                {trail.location}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close details"
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-slate-900/80 text-slate-400 hover:bg-slate-800"
            >
              ×
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-300">
            <div className="flex flex-col rounded-2xl bg-slate-900/70 px-2.5 py-2">
              <span className="text-[9px] text-slate-500">Distance</span>
              <span className="text-[13px] font-semibold text-slate-50">
                {trail.distanceKm.toFixed(1)} km
              </span>
            </div>
            <div className="flex flex-col rounded-2xl bg-slate-900/70 px-2.5 py-2">
              <span className="text-[9px] text-slate-500">Elevation</span>
              <span className="text-[13px] font-semibold text-slate-50">
                {trail.elevationGainM} m
              </span>
            </div>
            <div className="flex flex-col rounded-2xl bg-slate-900/70 px-2.5 py-2">
              <span className="text-[9px] text-slate-500">Est. time</span>
              <span className="text-[13px] font-semibold text-slate-50">
                {trail.durationHours.toFixed(1)} h
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-medium",
                trail.difficulty === "easy" && "bg-emerald-500/10 text-emerald-300",
                trail.difficulty === "moderate" && "bg-amber-500/10 text-amber-300",
                trail.difficulty === "hard" && "bg-rose-500/10 text-rose-300"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  trail.difficulty === "easy" && "bg-emerald-400",
                  trail.difficulty === "moderate" && "bg-amber-400",
                  trail.difficulty === "hard" && "bg-rose-400"
                )}
              />
              {trail.difficulty} difficulty
            </span>
            <span className="inline-flex items-center gap-1 text-amber-300">
              <span className="text-[12px]">★</span>
              <span className="text-[10px] font-semibold">
                {trail.rating.toFixed(1)}
              </span>
            </span>
          </div>

          <div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              {trail.description}
            </p>
          </div>

          {trail.highlights && trail.highlights.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Highlights
              </h3>
              <ul className="space-y-1.5">
                {trail.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-1.5 text-[10px] text-slate-300"
                  >
                    <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="sticky bottom-0 mt-3 flex gap-2 bg-gradient-to-t from-[#020817] via-[#020817] to-transparent pb-3 pt-2">
            <Button
              type="button"
              onClick={onToggleFavorite}
              className={cn(
                "flex-1 h-11 rounded-2xl text-[12px] font-semibold tracking-wide",
                isFavorite
                  ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  : "bg-slate-900 text-emerald-300 hover:bg-slate-800"
              )}
            >
              {isFavorite ? "Favorited" : "Add to favorites"}
            </Button>
            <Button
              type="button"
              onClick={onOpenNotes}
              className="flex-1 h-11 rounded-2xl bg-slate-100 text-slate-950 text-[12px] font-semibold tracking-wide hover:bg-white"
            >
              Trail notes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TrailDetailSheet
