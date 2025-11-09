export type TrailDifficulty = "easy" | "moderate" | "hard"

export type ElevationPoint = {
  km: number
  m: number
}

export type Trail = {
  id: string
  name: string
  location: string
  distanceKm: number
  difficulty: TrailDifficulty
  rating: number
  elevationGainM: number
  highestPointM: number
  lowestPointM: number
  durationHours: number
  description: string
  highlights: string[]
  elevationProfile: ElevationPoint[]
}

const buildProfile = (points: ElevationPoint[]): ElevationPoint[] =>
  points.sort((a, b) => a.km - b.km)

export const defaultTrails: Trail[] = [
  {
    id: "mt-aurora-ridge",
    name: "Mt. Aurora Ridge Loop",
    location: "Cascadia National Park",
    distanceKm: 9.8,
    difficulty: "moderate",
    rating: 4.8,
    elevationGainM: 520,
    highestPointM: 2120,
    lowestPointM: 1600,
    durationHours: 3.5,
    description:
      "A cinematic ridge-line loop with sweeping alpine views, playful switchbacks, and a soft forest floor descent. Ideal for golden-hour hikes.",
    highlights: [
      "Panoramic 270° summit overlook",
      "Wildflower meadows in late spring",
      "Shaded mossy descent perfect for hot days",
    ],
    elevationProfile: buildProfile([
      { km: 0, m: 1600 },
      { km: 1.5, m: 1820 },
      { km: 3.2, m: 2010 },
      { km: 4.9, m: 2120 },
      { km: 6.5, m: 2050 },
      { km: 8.0, m: 1880 },
      { km: 9.8, m: 1600 },
    ]),
  },
  {
    id: "ember-falls-path",
    name: "Ember Falls Path",
    location: "Redwood Basin Reserve",
    distanceKm: 4.2,
    difficulty: "easy",
    rating: 4.6,
    elevationGainM: 120,
    highestPointM: 420,
    lowestPointM: 300,
    durationHours: 1.5,
    description:
      "A gentle, family-friendly out-and-back through towering redwoods leading to a veiled waterfall and calm plunge pool.",
    highlights: [
      "Year-round waterfall backdrop",
      "Accessible, well-maintained path",
      "Filtered light through old-growth canopy",
    ],
    elevationProfile: buildProfile([
      { km: 0, m: 300 },
      { km: 1, m: 340 },
      { km: 2.1, m: 390 },
      { km: 3.2, m: 420 },
      { km: 4.2, m: 390 },
    ]),
  },
  {
    id: "obsidian-ridge-traverse",
    name: "Obsidian Ridge Traverse",
    location: "Blackstone Range",
    distanceKm: 15.4,
    difficulty: "hard",
    rating: 4.9,
    elevationGainM: 980,
    highestPointM: 3180,
    lowestPointM: 2300,
    durationHours: 6.0,
    description:
      "A bold, high-exposure traverse across volcanic rock and razor-sharp ridgelines. Demanding but unforgettable for experienced hikers.",
    highlights: [
      "Rugged volcanic formations",
      "High-elevation sunrise and sunset views",
      "Sections of light scrambling for added challenge",
    ],
    elevationProfile: buildProfile([
      { km: 0, m: 2300 },
      { km: 2.4, m: 2600 },
      { km: 4.8, m: 2850 },
      { km: 7.1, m: 3050 },
      { km: 9.6, m: 3180 },
      { km: 12.0, m: 3000 },
      { km: 15.4, m: 2400 },
    ]),
  },
  {
    id: "sage-creek-loop",
    name: "Sage Creek Canyon Loop",
    location: "High Desert Preserve",
    distanceKm: 7.3,
    difficulty: "moderate",
    rating: 4.4,
    elevationGainM: 260,
    highestPointM: 980,
    lowestPointM: 720,
    durationHours: 2.5,
    description:
      "A warm, sandstone-framed loop tracing a seasonal creek bed with layered canyon walls and open desert sky.",
    highlights: [
      "Golden hour canyon glow",
      "Expansive desert vistas",
      "Frequent overlooks with rest spots",
    ],
    elevationProfile: buildProfile([
      { km: 0, m: 720 },
      { km: 1.5, m: 810 },
      { km: 3.0, m: 930 },
      { km: 4.5, m: 980 },
      { km: 5.8, m: 900 },
      { km: 7.3, m: 740 },
    ]),
  },
  {
    id: "silverpine-lakeside",
    name: "Silverpine Lakeside Stroll",
    location: "Silverpine Reservoir",
    distanceKm: 3.1,
    difficulty: "easy",
    rating: 4.3,
    elevationGainM: 40,
    highestPointM: 620,
    lowestPointM: 580,
    durationHours: 1.0,
    description:
      "A relaxed shoreline path skimming mirror-like water with tall pines and dedicated benches for pauses and picnics.",
    highlights: [
      "Lakeside sunrise reflections",
      "Benches and picnic nooks",
      "Birdwatching along the marsh edge",
    ],
    elevationProfile: buildProfile([
      { km: 0, m: 580 },
      { km: 0.8, m: 592 },
      { km: 1.6, m: 605 },
      { km: 2.3, m: 612 },
      { km: 3.1, m: 600 },
    ]),
  },
  {
    id: "glacier-veil-pass",
    name: "Glacier Veil Pass",
    location: "Northcrest Alps",
    distanceKm: 12.7,
    difficulty: "hard",
    rating: 4.7,
    elevationGainM: 840,
    highestPointM: 3260,
    lowestPointM: 2450,
    durationHours: 5.0,
    description:
      "A dramatic ascent into glacial basins, weaving past waterfalls and snowfields before topping out at a crystalline mountain pass.",
    highlights: [
      "Multiple waterfall crossings",
      "Snow patches into early summer",
      "Wide-open pass with glacier views",
    ],
    elevationProfile: buildProfile([
      { km: 0, m: 2450 },
      { km: 2.2, m: 2620 },
      { km: 4.4, m: 2830 },
      { km: 6.5, m: 3010 },
      { km: 8.8, m: 3180 },
      { km: 10.7, m: 3260 },
      { km: 12.7, m: 2550 },
    ]),
  },
]