export type TrailDifficulty = "easy" | "moderate" | "hard"

export type Trail = {
  id: string
  name: string
  location: string
  distanceKm: number
  difficulty: TrailDifficulty
  rating: number
  elevationGainM: number
  durationHours: number
  description: string
  highlights: string[]
}

export const defaultTrails: Trail[] = [
  {
    id: "mt-aurora-ridge",
    name: "Mt. Aurora Ridge Loop",
    location: "Cascadia National Park",
    distanceKm: 9.8,
    difficulty: "moderate",
    rating: 4.8,
    elevationGainM: 520,
    durationHours: 3.5,
    description:
      "A cinematic ridge-line loop with sweeping alpine views, playful switchbacks, and a soft forest floor descent. Ideal for golden-hour hikes.",
    highlights: [
      "Panoramic 270° summit overlook",
      "Wildflower meadows in late spring",
      "Shaded mossy descent perfect for hot days",
    ],
  },
  {
    id: "ember-falls-path",
    name: "Ember Falls Path",
    location: "Redwood Basin Reserve",
    distanceKm: 4.2,
    difficulty: "easy",
    rating: 4.6,
    elevationGainM: 120,
    durationHours: 1.5,
    description:
      "A gentle, family-friendly out-and-back through towering redwoods leading to a veiled waterfall and calm plunge pool.",
    highlights: [
      "Year-round waterfall backdrop",
      "Accessible, well-maintained path",
      "Filtered light through old-growth canopy",
    ],
  },
  {
    id: "obsidian-ridge-traverse",
    name: "Obsidian Ridge Traverse",
    location: "Blackstone Range",
    distanceKm: 15.4,
    difficulty: "hard",
    rating: 4.9,
    elevationGainM: 980,
    durationHours: 6.0,
    description:
      "A bold, high-exposure traverse across volcanic rock and razor-sharp ridgelines. Demanding but unforgettable for experienced hikers.",
    highlights: [
      "Rugged volcanic formations",
      "High-elevation sunrise and sunset views",
      "Sections of light scrambling for added challenge",
    ],
  },
  {
    id: "sage-creek-loop",
    name: "Sage Creek Canyon Loop",
    location: "High Desert Preserve",
    distanceKm: 7.3,
    difficulty: "moderate",
    rating: 4.4,
    elevationGainM: 260,
    durationHours: 2.5,
    description:
      "A warm, sandstone-framed loop tracing a seasonal creek bed with layered canyon walls and open desert sky.",
    highlights: [
      "Golden hour canyon glow",
      "Expansive desert vistas",
      "Frequent overlooks with rest spots",
    ],
  },
  {
    id: "silverpine-lakeside",
    name: "Silverpine Lakeside Stroll",
    location: "Silverpine Reservoir",
    distanceKm: 3.1,
    difficulty: "easy",
    rating: 4.3,
    elevationGainM: 40,
    durationHours: 1.0,
    description:
      "A relaxed shoreline path skimming mirror-like water with tall pines and dedicated benches for pauses and picnics.",
    highlights: [
      "Lakeside sunrise reflections",
      "Benches and picnic nooks",
      "Birdwatching along the marsh edge",
    ],
  },
  {
    id: "glacier-veil-pass",
    name: "Glacier Veil Pass",
    location: "Northcrest Alps",
    distanceKm: 12.7,
    difficulty: "hard",
    rating: 4.7,
    elevationGainM: 840,
    durationHours: 5.0,
    description:
      "A dramatic ascent into glacial basins, weaving past waterfalls and snowfields before topping out at a crystalline mountain pass.",
    highlights: [
      "Multiple waterfall crossings",
      "Snow patches into early summer",
      "Wide-open pass with glacier views",
    ],
  },
]