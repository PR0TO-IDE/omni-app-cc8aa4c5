"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import { Trail, defaultTrails, TrailDifficulty } from "./types/trail"
import TrailCard from "./components/TrailCard"
import TrailDetailSheet from "./components/TrailDetailSheet"
import TrailNotesPanel from "./components/TrailNotesPanel"

type DifficultyFilter = "all" | TrailDifficulty

const FAVORITES_KEY = "trailFavorites"
const TRAILS_KEY = "trails"

const TrailSearchBar: React.FC<{
  query: string
  difficulty: DifficultyFilter
  minGain: number
  maxGain: number
  minAlt: number
  maxAlt: number
  onQueryChange: (v: string) => void
  onDifficultyChange: (v: DifficultyFilter) => void
  onMinGainChange: (v: number) => void
  onMaxGainChange: (v: number) => void
  onMinAltChange: (v: number) => void
  onMaxAltChange: (v: number) => void
  onClearFilters: () => void
}> = ({
  query,
  difficulty,
  minGain,
  maxGain,
  minAlt,
  maxAlt,
  onQueryChange,
  onDifficultyChange,
  onMinGainChange,
  onMaxGainChange,
  onMinAltChange,
  onMaxAltChange,
  onClearFilters,
}) => {
  const difficultyOptions: DifficultyFilter[] = ["all", "easy", "moderate", "hard"]

  return (
    <div className="sticky top-0 z-30 -mx-4 mb-3 bg-gradient-to-b from-[#020817] via-[#020817]/98 to-[#020817]/92 px-4 pb-3 pt-3 backdrop-blur-xl">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
            TrailFinder Mountain
          </p>
          <h1 className="text-[22px] font-semibold tracking-tight text-slate-50">
            Night-ready alpine lines.
          </h1>
          <p className="mt-0.5 text-[10px] text-slate-500">
            Filter by elevation gain and altitude to match your mountain legs.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="h-8 rounded-full border border-slate-800/80 bg-slate-950/80 px-3 text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400 hover:bg-slate-900"
          onClick={onClearFilters}
        >
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search peaks, passes, ridges, or regions"
            className="h-11 rounded-2xl border-slate-800 bg-slate-950/85 pl-9 pr-3 text-[12px] text-slate-100 placeholder:text-slate-600 focus-visible:ring-emerald-500/80"
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-slate-600">
            🔍
          </span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {difficultyOptions.map((opt) => {
            const isActive = difficulty === opt
            const label = opt === "all" ? "All" : opt.charAt(0).toUpperCase() + opt.slice(1)
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onDifficultyChange(opt)}
                className={cn(
                  "flex h-8 min-w-[64px] items-center justify-center rounded-full border px-3 text-[9px] font-semibold tracking-wide transition-colors",
                  "bg-slate-950/90 text-slate-500 border-slate-800/90",
                  isActive &&
                    "bg-emerald-500 text-slate-950 border-transparent shadow-[0_10px_30px_rgba(16,185,129,0.35)]"
                )}
              >
                {label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[8px] text-slate-500">
          <div className="flex flex-col rounded-2xl bg-slate-950/90 px-2.5 py-1.5 border border-slate-900">
            <div className="mb-0.5 flex items-center justify-between">
              <span className="uppercase tracking-[0.18em] text-slate-500">
                Gain (m)
              </span>
              <span className="text-[8px] text-emerald-400">
                {minGain} - {maxGain}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="range"
                min={0}
                max={1500}
                step={50}
                value={minGain}
                onChange={(e) => onMinGainChange(Number(e.target.value))}
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-500"
              />
            </div>
          </div>

          <div className="flex flex-col rounded-2xl bg-slate-950/90 px-2.5 py-1.5 border border-slate-900">
            <div className="mb-0.5 flex items-center justify-between">
              <span className="uppercase tracking-[0.18em] text-slate-500">
                Altitude (m)
              </span>
              <span className="text-[8px] text-sky-400">
                {minAlt} - {maxAlt}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="range"
                min={0}
                max={4000}
                step={100}
                value={minAlt}
                onChange={(e) => onMinAltChange(Number(e.target.value))}
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-sky-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TrailListSection: React.FC<{
  trails: Trail[]
  favorites: Set<string>
  onSelectTrail: (trailId: string) => void
  onToggleFavorite: (trailId: string) => void
}> = ({ trails, favorites, onSelectTrail, onToggleFavorite }) => {
  if (trails.length === 0) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-3xl glass-elevated px-4 py-8 text-center text-slate-300">
        <span className="text-3xl">🏔️</span>
        <p className="text-[12px] font-medium text-slate-50">
          No mountain lines match your filters.
        </p>
        <p className="text-[10px] text-slate-500">
          Adjust difficulty, gain, or altitude to uncover more alpine routes.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2.5 pb-6">
      {trails.map((trail) => (
        <TrailCard
          key={trail.id}
          trail={trail}
          isFavorite={favorites.has(trail.id)}
          onSelect={() => onSelectTrail(trail.id)}
          onToggleFavorite={() => onToggleFavorite(trail.id)}
        />
      ))}
    </div>
  )
}

const TrailFinderHome: React.FC = () => {
  const [trails, setTrails] = useState<Trail[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState("")
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all")
  const [minGain, setMinGain] = useState(0)
  const [maxGain, setMaxGain] = useState(1500)
  const [minAlt, setMinAlt] = useState(0)
  const [maxAlt, setMaxAlt] = useState(4000)
  const [selectedTrailId, setSelectedTrailId] = useState<string | null>(null)
  const [notesTrailId, setNotesTrailId] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      const storedTrails = await api.get<Trail[]>(TRAILS_KEY, defaultTrails)
      const storedFavorites = await api.get<string[]>(FAVORITES_KEY, [])
      if (!isMounted) return
      setTrails(storedTrails && storedTrails.length > 0 ? storedTrails : defaultTrails)
      setFavorites(new Set(storedFavorites))
      setIsHydrated(true)
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    void api.set(TRAILS_KEY, trails)
  }, [trails, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    void api.set(FAVORITES_KEY, Array.from(favorites))
  }, [favorites, isHydrated])

  const filteredTrails = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return trails.filter((trail) => {
      const matchesQuery =
        !normalizedQuery ||
        trail.name.toLowerCase().includes(normalizedQuery) ||
        trail.location.toLowerCase().includes(normalizedQuery) ||
        trail.description.toLowerCase().includes(normalizedQuery)

      const matchesDifficulty =
        difficulty === "all" || trail.difficulty === difficulty

      const matchesGain =
        trail.elevationGainM >= minGain && trail.elevationGainM <= maxGain

      const highest = trail.highestPointM
      const lowest = trail.lowestPointM
      const matchesAltitude =
        highest >= minAlt && lowest <= maxAlt && highest >= lowest

      return (
        matchesQuery &&
        matchesDifficulty &&
        matchesGain &&
        matchesAltitude
      )
    })
  }, [trails, query, difficulty, minGain, maxGain, minAlt, maxAlt])

  const selectedTrail = useMemo(
    () => trails.find((t) => t.id === selectedTrailId) || null,
    [trails, selectedTrailId]
  )

  const handleToggleFavorite = (trailId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(trailId)) {
        next.delete(trailId)
      } else {
        next.add(trailId)
      }
      return next
    })
  }

  const handleClearFilters = () => {
    setQuery("")
    setDifficulty("all")
    setMinGain(0)
    setMaxGain(1500)
    setMinAlt(0)
    setMaxAlt(4000)
  }

  return (
    <main className="flex min-h-screen flex-1 flex-col pb-6 pt-2 text-slate-50">
      <TrailSearchBar
        query={query}
        difficulty={difficulty}
        minGain={minGain}
        maxGain={maxGain}
        minAlt={minAlt}
        maxAlt={maxAlt}
        onQueryChange={setQuery}
        onDifficultyChange={setDifficulty}
        onMinGainChange={setMinGain}
        onMaxGainChange={setMaxGain}
        onMinAltChange={setMinAlt}
        onMaxAltChange={setMaxAlt}
        onClearFilters={handleClearFilters}
      />

      <section
        aria-label="Trail results"
        className="mt-1 space-y-1"
      >
        {favorites.size > 0 && filteredTrails.some((t) => favorites.has(t.id)) && (
          <div className="mb-2 flex items-center justify-between px-1 text-[9px] text-emerald-300">
            <span className="uppercase tracking-[0.18em]">Summits pinned</span>
            <span className="text-slate-500">
              {favorites.size} saved
            </span>
          </div>
        )}
        <TrailListSection
          trails={filteredTrails}
          favorites={favorites}
          onSelectTrail={setSelectedTrailId}
          onToggleFavorite={handleToggleFavorite}
        />
      </section>

      {selectedTrail && (
        <TrailDetailSheet
          trail={selectedTrail}
          isFavorite={favorites.has(selectedTrail.id)}
          onClose={() => setSelectedTrailId(null)}
          onToggleFavorite={() => handleToggleFavorite(selectedTrail.id)}
          onOpenNotes={() => {
            setNotesTrailId(selectedTrail.id)
          }}
        />
      )}

      {notesTrailId && (
        <TrailNotesPanel
          trailId={notesTrailId}
          onClose={() => setNotesTrailId(null)}
        />
      )}
    </main>
  )
}

export default TrailFinderHome
