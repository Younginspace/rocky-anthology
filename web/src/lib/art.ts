/** Watercolor art assets (generated via Renoise, optimized to JPEG in /public/art). */
export const ART = {
  cover: '/art/cover.jpg',
  rockyHero: '/art/rocky_hero.jpg',
  rockyListen: '/art/rocky-listen-v2.jpg',
  grace: '/art/grace.jpg',
  eridSky: '/art/erid_sky.jpg',
  spaceLine: '/art/space_line.jpg',
  openingVideo: '/art/opening-v4.mp4',
} as const;

/** Per-episode opening scene illustration (ep01.jpg … ep11.jpg). */
export function episodeScene(episodeId: string): string {
  return `/art/${episodeId}.jpg`;
}
