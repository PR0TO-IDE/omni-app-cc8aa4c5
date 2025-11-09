"use client"

import React, { useMemo } from "react"
import type { ElevationPoint } from "@/app/types/trail"
import { cn } from "@/lib/utils"

export interface ElevationProfileProps {
  points: ElevationPoint[]
  className?: string
}

export const ElevationProfile: React.FC<ElevationProfileProps> = ({
  points,
  className,
}) => {
  const { pathD, minM, maxM } = useMemo(() => {
    if (!points || points.length === 0) {
      return { pathD: "", minM: 0, maxM: 0 }
    }

    const sorted = [...points].sort((a, b) => a.km - b.km)
    const minM = Math.min(...sorted.map((p) => p.m))
    const maxM = Math.max(...sorted.map((p) => p.m))
    const range = Math.max(40, maxM - minM || 1)
    const maxKm = sorted[sorted.length - 1]?.km || 1

    const mapX = (km: number) => (km / maxKm) * 100
    const mapY = (m: number) => 100 - ((m - minM) / range) * 100

    const d = sorted
      .map((p, index) => {
        const x = mapX(p.km).toFixed(2)
        const y = mapY(p.m).toFixed(2)
        return `${index === 0 ? "M" : "L"}${x},${y}`
      })
      .join(" ")

    return { pathD: d, minM, maxM }
  }, [points])

  if (!points || points.length === 0 || !pathD) {
    return null
  }

  return (
    <div
      className={cn(
        "mt-2 rounded-2xl bg-slate-950/90 px-3 py-2.5 text-[8px] text-slate-400 border border-slate-800/80",
        className
      )}
    >
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span className="h-1 w-3 rounded-full bg-emerald-400" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Elevation profile
          </p>
        </div>
        <span className="text-[8px] text-slate-500">
          {Math.round(minM)} m • {Math.round(maxM)} m
        </span>
      </div>
      <div className="relative h-16 w-full">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full text-emerald-400/90"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="elevLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(16,185,129,1)" />
              <stop offset="60%" stopColor="rgba(56,189,248,1)" />
              <stop offset="100%" stopColor="rgba(148,163,253,1)" />
            </linearGradient>
            <linearGradient id="elevFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(16,185,129,0.32)" />
              <stop offset="100%" stopColor="rgba(15,23,42,0.05)" />
            </linearGradient>
          </defs>
          <path
            d={`${pathD} L100,100 L0,100 Z`}
            fill="url(#elevFill)"
            stroke="none"
          />
          <path
            d={pathD}
            fill="none"
            stroke="url(#elevLine)"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          <g stroke="rgba(51,65,85,0.55)" strokeWidth={0.3}>
            <line x1="0" x2="100" y1="100" y2="100" />
            <line x1="0" x2="100" y1="75" y2="75" />
            <line x1="0" x2="100" y1="50" y2="50" />
            <line x1="0" x2="100" y1="25" y2="25" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default ElevationProfile
