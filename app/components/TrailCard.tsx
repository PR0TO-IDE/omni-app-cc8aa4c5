"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Trail } from "@/app/types/trail"

export interface TrailCardProps {
  trail: Trail
  isFavorite: boolean
  onSelect: () => void
  onToggleFavorite: () => void
}

const difficultyColors: Record<Trail["difficulty"], string> = {
  easy: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  moderate: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  hard: "bg-rose-500/15 text-rose-300 border-rose-500/40",
}

export const TrailCard: React.FC<TrailCardProps> = ({
  trail,
  isFavorite,
  onSelect,
  onToggleFavorite,
}) => {
  return (
    <Card
      onClick={onSelect}
      className={cn(
        "group relative mb-3 flex cursor-pointer gap-3 rounded-2xl border-slate-800/80 bg-[#020817]/95 px-4 py-3 text-slate-50 shadow-[0_14px_40px_rgba(2,6,23,0.9)] transition-all duration-200",
        "active:scale-[0.97] active:bg-[#020817]",
        isFavorite && "ring-1 ring-emerald-400/70"
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="truncate text-[17px] font-semibold tracking-tight text-slate-50">
            {trail.name}
          </h2>
          <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            {trail.distanceKm.toFixed(1)} km
          </span>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
          <span className="truncate max-w-[140px] text-slate-400">
            {trail.location}
          </span>
          <span className="mx-1 h-0.5 w-0.5 rounded-full bg-slate-600" aria-hidden="true" />
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-medium",
              difficultyColors[trail.difficulty]
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
            {trail.difficulty}
          </span>
          <span className="mx-1 h-0.5 w-0.5 rounded-full bg-slate-600" aria-hidden="true" />
          <span className="inline-flex items-center gap-0.5 text-amber-300">
            <span className="text-[12px]">★</span>
            <span className="text-[10px] font-semibold">
              {trail.rating.toFixed(1)}
            </span>
          </span>
          <span className="mx-1 h-0.5 w-0.5 rounded-full bg-slate-600" aria-hidden="true" />
          <span className="text-[9px] text-emerald-300">
            {trail.elevationGainM} m gain
          </span>
        </div>

        <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-slate-400">
          {trail.description}
        </p>

        {trail.elevationProfile && trail.elevationProfile.length > 1 && (
          <div className="mt-2 h-7 w-full overflow-hidden rounded-xl bg-slate-950/90">
            <svg
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              className="h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`miniElev-${trail.id}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgba(16,185,129,1)" />
                  <stop offset="100%" stopColor="rgba(56,189,248,1)" />
                </linearGradient>
              </defs>
              {(() => {
                const pts = [...trail.elevationProfile].sort((a, b) => a.km - b.km)
                const minM = Math.min(...pts.map((p) => p.m))
                const maxM = Math.max(...pts.map((p) => p.m))
                const range = Math.max(40, maxM - minM || 1)
                const maxKm = pts[pts.length - 1]?.km || 1
                const mapX = (km: number) => (km / maxKm) * 100
                const mapY = (m: number) => 24 - ((m - minM) / range) * 24
                const d = pts
                  .map((p, index) => {
                    const x = mapX(p.km).toFixed(2)
                    const y = mapY(p.m).toFixed(2)
                    return `${index === 0 ? "M" : "L"}${x},${y}`
                  })
                  .join(" ")
                return (
                  <>
                    <path
                      d={`${d} L100,24 L0,24 Z`}
                      fill="rgba(15,23,42,0.4)"
                      stroke="none"
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke={`url(#miniElev-${trail.id})`}
                      strokeWidth={1.2}
                      strokeLinecap="round"
                    />
                  </>
                )
              })()}
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col items-end justify-between gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={isFavorite ? "Unfavorite trail" : "Favorite trail"}
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite()
          }}
          className={cn(
            "relative h-10 w-10 rounded-full bg-slate-900/85 text-slate-400 shadow-lg transition-all duration-150",
            "active:scale-95",
            isFavorite && "bg-emerald-500/20 text-emerald-300"
          )}
        >
          <span
            className={cn(
              "text-[18px] leading-none transition-colors",
              isFavorite ? "text-emerald-400" : "text-slate-500"
            )}
          >
            {isFavorite ? "❤" : "♡"}
          </span>
        </Button>
        <span className="mt-1 text-[8px] uppercase tracking-[0.14em] text-slate-500">
          Tap for profile
        </span>
      </div>
    </Card>
  )
}

export default TrailCard
