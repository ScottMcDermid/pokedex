/** Utilities for building Serebii.net URLs */

/** Zero-pad a Pokedex number to 3 digits: 1 -> "001" */
export function padId(id: number): string {
  return String(id).padStart(3, '0');
}

/** Red/Blue sprite URL */
export function rbSpriteUrl(id: number): string {
  return `https://www.serebii.net/pokearth/sprites/rb/${padId(id)}.png`;
}

/** Yellow sprite URL */
export function yellowSpriteUrl(id: number): string {
  return `https://www.serebii.net/pokearth/sprites/yellow/${padId(id)}.png`;
}

/** Official art thumbnail URL */
export function artUrl(id: number): string {
  return `https://www.serebii.net/art/th/${id}.png`;
}

/** Gen 1 Pokedex page URL */
export function pokedexUrl(id: number): string {
  return `https://www.serebii.net/pokedex/${padId(id)}.shtml`;
}

/** Gen 1 Attackdex page URL for a move (converts move name to slug) */
export function attackdexUrl(moveName: string): string {
  const slug = moveName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // strip punctuation
    .replace(/\s+/g, '');
  return `https://www.serebii.net/attackdex-rby/${slug}.shtml`;
}
