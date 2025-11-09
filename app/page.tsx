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
  onQueryChange: (v: string) => void
  onDifficultyChange: (v: DifficultyFilter) => void
  onClearFilters: () => void
}> = ({
  query,
  difficulty,
  onQueryChange,
  onDifficultyChange,
  onClearFilters,
}) => {
  const difficultyOptions: DifficultyFilter[] = ["all", "easy", "moderate", "hard"]

  return (
    <div className="sticky top-0 z-30 -mx-4 mb-3 bg-gradient-to-b from-black via-black/95 to-black/80 px-4 pb-3 pt-3 backdrop-blur-md">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
            TrailFinder
          </p>
          <h1 className="text-[22px] font-semibold tracking-tight text-slate-50">
            Find your next line.
          </h1>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="h-9 rounded-full border border-slate-800/70 bg-slate-950/70 px-3 text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400 hover:bg-slate-900"
          onClick={onClearFilters}
        >
          Clear
        </Button>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name, location, vibe..."
            className="h-11 rounded-2xl border-slate-800 bg-slate-950/80 pl-9 pr-3 text-[12px] text-slate-100 placeholder:text-slate-600 focus-visible:ring-emerald-500/80"
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-slate-600">
            ⌕
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
                  "flex h-9 min-w-[64px] items-center justify-center rounded-full px-3 text-[10px] font-semibold tracking-wide transition-colors",
                  "bg-slate-900/80 text-slate-400 border border-slate-800/80",
                  isActive &&
                    "bg-emerald-500 text-slate-950 border-transparent shadow-[0_8px_24px_rgba(16,185,129,0.35)]"
                )}
              >
                {label}
              </button>
            )
          })}
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
      <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-3xl bg-slate-950/70 px-4 py-8 text-center text-slate-400">
        <span className="text-3xl">🔍</span>
        <p className="text-[12px] font-medium text-slate-100">
          No trails match your filters.
        </p>
        <p className="text-[10px] text-slate-500">
          Try a broader difficulty or search by a nearby region.
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

      return matchesQuery && matchesDifficulty
    })
  }, [trails, query, difficulty])

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
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-6 pt-2 text-slate-50">
      <TrailSearchBar
        query={query}
        difficulty={difficulty}
        onQueryChange={setQuery}
        onDifficultyChange={setDifficulty}
        onClearFilters={handleClearFilters}
      />

      <section
        aria-label="Trail results"
        className="mt-1 space-y-1"
      >
        {favorites.size > 0 && filteredTrails.some((t) => favorites.has(t.id)) && (
          <div className="mb-2 flex items-center justify-between px-1 text-[9px] text-emerald-300">
            <span className="uppercase tracking-[0.18em]">Favorites pinned</span>
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
