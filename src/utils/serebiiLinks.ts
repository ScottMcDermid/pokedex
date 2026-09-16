/** Utilities for building Serebii.net URLs */

/** Zero-pad a Pokedex number to 3 digits: 1 -> "001" */
export function padId(id: number): string {
  return String(id).padStart(3, '0');
}

// ─── Gen 1 Sprite / Art URLs ──────────────────────────────────────────────────

/** Red/Blue sprite URL */
export function rbSpriteUrl(id: number): string {
  return `https://www.serebii.net/pokearth/sprites/rb/${padId(id)}.png`;
}

/** Yellow sprite URL */
export function yellowSpriteUrl(id: number): string {
  return `https://www.serebii.net/pokearth/sprites/yellow/${padId(id)}.png`;
}

// ─── Gen 2 Sprite URLs ────────────────────────────────────────────────────────

/** Gold/Silver sprite URL */
export function gsSpriteUrl(id: number): string {
  return `https://www.serebii.net/pokearth/sprites/gold/${padId(id)}.png`;
}

/** Crystal sprite URL */
export function crystalSpriteUrl(id: number): string {
  return `https://www.serebii.net/pokearth/sprites/crystal/${padId(id)}.png`;
}

/**
 * Sprite URL for a specific Unown form letter (A–Z).
 * Uses Pokémon Database Crystal sprites.
 */
export function unownFormSpriteUrl(letter: string): string {
  return `https://img.pokemondb.net/sprites/crystal/normal/unown-${letter.toLowerCase()}.png`;
}

/** Official art thumbnail URL (works for all gens) */
export function artUrl(id: number): string {
  return `https://www.serebii.net/art/th/${id}.png`;
}

// ─── Pokedex page URLs ────────────────────────────────────────────────────────

/** Gen 1 Pokedex page URL */
export function pokedexUrl(id: number): string {
  return `https://www.serebii.net/pokedex/${padId(id)}.shtml`;
}

/** Gen 2 Pokedex page URL */
export function pokedexGSUrl(id: number): string {
  return `https://www.serebii.net/pokedex-gs/${padId(id)}.shtml`;
}

// ─── Attackdex URLs ───────────────────────────────────────────────────────────

/** Gen 1 (RBY) Attackdex page URL for a move */
export function attackdexUrl(moveName: string): string {
  const slug = moveName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // strip punctuation
    .replace(/\s+/g, '');
  return `https://www.serebii.net/attackdex-rby/${slug}.shtml`;
}

/** Gen 2 (GSC) Attackdex page URL for a move */
export function attackdexGSUrl(moveName: string): string {
  const slug = moveName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\s+/g, '');
  return `https://www.serebii.net/attackdex-gs/${slug}.shtml`;
}

// ─── Kanto Location Map ───────────────────────────────────────────────────────

/**
 * Describes a mappable location.
 * - `slug`     → used to build the Serebii Pokéarth page URL
 * - `mapNum`   → numeric ID used in the map image URL
 * - `label`    → display name shown in tooltip header
 * - `region`   → 'kanto' | 'johto'
 */
export interface KantoLocationInfo {
  slug: string;
  mapNum: number;
  label: string;
  region?: 'kanto' | 'johto';
}

/**
 * Lookup table: canonical location keyword → Pokéarth info (Kanto).
 * Keys are matched case-insensitively as substrings against location strings.
 * More-specific / longer keys are listed first so the first match wins.
 *
 * Map numbers sourced from https://www.serebii.net/pokearth/kanto/1st/{slug}.shtml
 * Image pattern: https://www.serebii.net/pokearth/maps/kanto-rby/{mapNum}.png
 */
export const KANTO_LOCATIONS: Array<{ key: string; info: KantoLocationInfo }> = [
  // ── Routes ──────────────────────────────────────────────────────────────────
  { key: 'Route 1',          info: { slug: 'route1',         mapNum: 1,   label: 'Route 1',          region: 'kanto' } },
  { key: 'Route 2',          info: { slug: 'route2',         mapNum: 2,   label: 'Route 2',          region: 'kanto' } },
  { key: 'Route 3',          info: { slug: 'route3',         mapNum: 3,   label: 'Route 3',          region: 'kanto' } },
  { key: 'Route 4',          info: { slug: 'route4',         mapNum: 4,   label: 'Route 4',          region: 'kanto' } },
  { key: 'Route 5',          info: { slug: 'route5',         mapNum: 5,   label: 'Route 5',          region: 'kanto' } },
  { key: 'Route 6',          info: { slug: 'route6',         mapNum: 6,   label: 'Route 6',          region: 'kanto' } },
  { key: 'Route 7',          info: { slug: 'route7',         mapNum: 7,   label: 'Route 7',          region: 'kanto' } },
  { key: 'Route 8',          info: { slug: 'route8',         mapNum: 8,   label: 'Route 8',          region: 'kanto' } },
  { key: 'Route 9',          info: { slug: 'route9',         mapNum: 9,   label: 'Route 9',          region: 'kanto' } },
  { key: 'Route 10',         info: { slug: 'route10',        mapNum: 10,  label: 'Route 10',         region: 'kanto' } },
  { key: 'Route 11',         info: { slug: 'route11',        mapNum: 11,  label: 'Route 11',         region: 'kanto' } },
  { key: 'Route 12',         info: { slug: 'route12',        mapNum: 12,  label: 'Route 12',         region: 'kanto' } },
  { key: 'Route 13',         info: { slug: 'route13',        mapNum: 13,  label: 'Route 13',         region: 'kanto' } },
  { key: 'Route 14',         info: { slug: 'route14',        mapNum: 14,  label: 'Route 14',         region: 'kanto' } },
  { key: 'Route 15',         info: { slug: 'route15',        mapNum: 15,  label: 'Route 15',         region: 'kanto' } },
  { key: 'Route 16',         info: { slug: 'route16',        mapNum: 16,  label: 'Route 16',         region: 'kanto' } },
  { key: 'Route 17',         info: { slug: 'route17',        mapNum: 17,  label: 'Route 17',         region: 'kanto' } },
  { key: 'Route 18',         info: { slug: 'route18',        mapNum: 18,  label: 'Route 18',         region: 'kanto' } },
  { key: 'Route 19',         info: { slug: 'route19',        mapNum: 19,  label: 'Route 19',         region: 'kanto' } },
  { key: 'Route 20',         info: { slug: 'route20',        mapNum: 20,  label: 'Route 20',         region: 'kanto' } },
  { key: 'Route 21',         info: { slug: 'route21',        mapNum: 21,  label: 'Route 21',         region: 'kanto' } },
  { key: 'Route 22',         info: { slug: 'route22',        mapNum: 22,  label: 'Route 22',         region: 'kanto' } },
  { key: 'Route 23',         info: { slug: 'route23',        mapNum: 23,  label: 'Route 23',         region: 'kanto' } },
  { key: 'Route 24',         info: { slug: 'route24',        mapNum: 24,  label: 'Route 24',         region: 'kanto' } },
  { key: 'Route 25',         info: { slug: 'route25',        mapNum: 25,  label: 'Route 25',         region: 'kanto' } },

  // ── Cities / Towns ──────────────────────────────────────────────────────────
  { key: 'Pallet Town',      info: { slug: 'pallettown',     mapNum: 26,  label: 'Pallet Town',      region: 'kanto' } },
  { key: 'Viridian City',    info: { slug: 'viridiancity',   mapNum: 27,  label: 'Viridian City',    region: 'kanto' } },
  { key: 'Pewter City',      info: { slug: 'pewtercity',     mapNum: 28,  label: 'Pewter City',      region: 'kanto' } },
  { key: 'Cerulean City',    info: { slug: 'ceruleancity',   mapNum: 29,  label: 'Cerulean City',    region: 'kanto' } },
  { key: 'Vermilion City',   info: { slug: 'vermilioncity',  mapNum: 30,  label: 'Vermilion City',   region: 'kanto' } },
  { key: 'Lavender Town',    info: { slug: 'lavendertown',   mapNum: 31,  label: 'Lavender Town',    region: 'kanto' } },
  { key: 'Celadon City',     info: { slug: 'celadoncity',    mapNum: 35,  label: 'Celadon City',     region: 'kanto' } },
  { key: 'Fuchsia City',     info: { slug: 'fuchsiacity',    mapNum: 36,  label: 'Fuchsia City',     region: 'kanto' } },
  { key: 'Saffron City',     info: { slug: 'saffroncity',    mapNum: 37,  label: 'Saffron City',     region: 'kanto' } },
  { key: 'Cinnabar Island',  info: { slug: 'cinnabarisland', mapNum: 38,  label: 'Cinnabar Island',  region: 'kanto' } },
  { key: 'Indigo Plateau',   info: { slug: 'indigoplateau',  mapNum: 39,  label: 'Indigo Plateau',   region: 'kanto' } },

  // ── Dungeons / Special Areas ─────────────────────────────────────────────────
  { key: 'Viridian Forest',  info: { slug: 'viridianforest',  mapNum: 40,  label: 'Viridian Forest',  region: 'kanto' } },
  { key: 'Mt. Moon',         info: { slug: 'mt.moon',         mapNum: 42,  label: 'Mt. Moon',         region: 'kanto' } },
  { key: 'Rock Tunnel',      info: { slug: 'rocktunnel',      mapNum: 44,  label: 'Rock Tunnel',      region: 'kanto' } },
  { key: 'Pokémon Tower',    info: { slug: 'pokemontower',    mapNum: 48,  label: 'Pokémon Tower',    region: 'kanto' } },
  { key: 'Pokemon Tower',    info: { slug: 'pokemontower',    mapNum: 48,  label: 'Pokémon Tower',    region: 'kanto' } },
  { key: 'Safari Zone',      info: { slug: 'safarizone',      mapNum: 51,  label: 'Safari Zone',      region: 'kanto' } },
  { key: 'Seafoam Islands',  info: { slug: 'seafoamislands',  mapNum: 53,  label: 'Seafoam Islands',  region: 'kanto' } },
  { key: 'Victory Road',     info: { slug: 'victoryroad',     mapNum: 55,  label: 'Victory Road',     region: 'kanto' } },
  { key: "Diglett's Cave",   info: { slug: "diglett'scave",   mapNum: 41,  label: "Diglett's Cave",   region: 'kanto' } },
  { key: 'Digletts Cave',    info: { slug: "diglett'scave",   mapNum: 41,  label: "Diglett's Cave",   region: 'kanto' } },
  { key: 'Power Plant',      info: { slug: 'powerplant',      mapNum: 52,  label: 'Power Plant',      region: 'kanto' } },
  { key: 'Cerulean Cave',    info: { slug: 'ceruleancave',    mapNum: 43,  label: 'Cerulean Cave',    region: 'kanto' } },
  { key: 'Pokémon Mansion',  info: { slug: 'pokemonmansion',  mapNum: 54,  label: 'Pokémon Mansion',  region: 'kanto' } },
  { key: 'Pokemon Mansion',  info: { slug: 'pokemonmansion',  mapNum: 54,  label: 'Pokémon Mansion',  region: 'kanto' } },
  { key: 'Rocket Hideout',   info: { slug: 'rockethideout',   mapNum: 49,  label: 'Rocket Hideout',   region: 'kanto' } },
  { key: 'Silph Co.',        info: { slug: 'silphco',         mapNum: 50,  label: 'Silph Co.',        region: 'kanto' } },
  { key: 'SS Anne',          info: { slug: 'ssanne',          mapNum: 47,  label: 'SS Anne',          region: 'kanto' } },
];

// ─── Johto Location Map ───────────────────────────────────────────────────────

/**
 * Lookup table: canonical location keyword → Pokéarth info (Johto).
 * Image pattern: https://www.serebii.net/pokearth/maps/johto2nd/{mapNum}.png
 */
export const JOHTO_LOCATIONS: Array<{ key: string; info: KantoLocationInfo }> = [
  // ── Johto Routes ────────────────────────────────────────────────────────────
  { key: 'Route 29',          info: { slug: 'route29',         mapNum: 1,   label: 'Route 29',          region: 'johto' } },
  { key: 'Route 30',          info: { slug: 'route30',         mapNum: 2,   label: 'Route 30',          region: 'johto' } },
  { key: 'Route 31',          info: { slug: 'route31',         mapNum: 3,   label: 'Route 31',          region: 'johto' } },
  { key: 'Route 32',          info: { slug: 'route32',         mapNum: 4,   label: 'Route 32',          region: 'johto' } },
  { key: 'Route 33',          info: { slug: 'route33',         mapNum: 5,   label: 'Route 33',          region: 'johto' } },
  { key: 'Route 34',          info: { slug: 'route34',         mapNum: 6,   label: 'Route 34',          region: 'johto' } },
  { key: 'Route 35',          info: { slug: 'route35',         mapNum: 7,   label: 'Route 35',          region: 'johto' } },
  { key: 'Route 36',          info: { slug: 'route36',         mapNum: 8,   label: 'Route 36',          region: 'johto' } },
  { key: 'Route 37',          info: { slug: 'route37',         mapNum: 9,   label: 'Route 37',          region: 'johto' } },
  { key: 'Route 38',          info: { slug: 'route38',         mapNum: 10,  label: 'Route 38',          region: 'johto' } },
  { key: 'Route 39',          info: { slug: 'route39',         mapNum: 11,  label: 'Route 39',          region: 'johto' } },
  { key: 'Route 40',          info: { slug: 'route40',         mapNum: 12,  label: 'Route 40',          region: 'johto' } },
  { key: 'Route 41',          info: { slug: 'route41',         mapNum: 13,  label: 'Route 41',          region: 'johto' } },
  { key: 'Route 42',          info: { slug: 'route42',         mapNum: 14,  label: 'Route 42',          region: 'johto' } },
  { key: 'Route 43',          info: { slug: 'route43',         mapNum: 15,  label: 'Route 43',          region: 'johto' } },
  { key: 'Route 44',          info: { slug: 'route44',         mapNum: 16,  label: 'Route 44',          region: 'johto' } },
  { key: 'Route 45',          info: { slug: 'route45',         mapNum: 17,  label: 'Route 45',          region: 'johto' } },
  { key: 'Route 46',          info: { slug: 'route46',         mapNum: 18,  label: 'Route 46',          region: 'johto' } },

  // ── Johto Cities / Towns ─────────────────────────────────────────────────────
  { key: 'New Bark Town',      info: { slug: 'newbarktown',     mapNum: 19,  label: 'New Bark Town',     region: 'johto' } },
  { key: 'Cherrygrove City',   info: { slug: 'cherrygrovecity', mapNum: 20,  label: 'Cherrygrove City',  region: 'johto' } },
  { key: 'Violet City',        info: { slug: 'violetcity',      mapNum: 21,  label: 'Violet City',       region: 'johto' } },
  { key: 'Azalea Town',        info: { slug: 'azaleatown',      mapNum: 22,  label: 'Azalea Town',       region: 'johto' } },
  { key: 'Goldenrod City',     info: { slug: 'goldenrodcity',   mapNum: 23,  label: 'Goldenrod City',    region: 'johto' } },
  { key: 'Ecruteak City',      info: { slug: 'ecruteakcity',    mapNum: 24,  label: 'Ecruteak City',     region: 'johto' } },
  { key: 'Olivine City',       info: { slug: 'olivinecity',     mapNum: 25,  label: 'Olivine City',      region: 'johto' } },
  { key: 'Cianwood City',      info: { slug: 'cianwoodcity',    mapNum: 26,  label: 'Cianwood City',     region: 'johto' } },
  { key: 'Blackthorn City',    info: { slug: 'blackthorncity',  mapNum: 27,  label: 'Blackthorn City',   region: 'johto' } },
  { key: 'Mahogany Town',      info: { slug: 'mahoganytown',    mapNum: 49,  label: 'Mahogany Town',     region: 'johto' } },

  // ── Johto Dungeons / Special Areas ──────────────────────────────────────────
  { key: 'Sprout Tower',       info: { slug: 'sprouttower',     mapNum: 28,  label: 'Sprout Tower',      region: 'johto' } },
  { key: 'Ruins of Alph',      info: { slug: 'ruinsofalph',     mapNum: 29,  label: 'Ruins of Alph',     region: 'johto' } },
  { key: 'Slowpoke Well',      info: { slug: 'slowpokewell',    mapNum: 30,  label: 'Slowpoke Well',     region: 'johto' } },
  { key: 'Union Cave',         info: { slug: 'unioncave',       mapNum: 31,  label: 'Union Cave',        region: 'johto' } },
  { key: 'Ilex Forest',        info: { slug: 'ilexforest',      mapNum: 32,  label: 'Ilex Forest',       region: 'johto' } },
  { key: 'National Park',      info: { slug: 'nationalpark',    mapNum: 34,  label: 'National Park',     region: 'johto' } },
  { key: 'Mt. Mortar',         info: { slug: 'mt.mortar',       mapNum: 35,  label: 'Mt. Mortar',        region: 'johto' } },
  { key: 'Tin Tower',          info: { slug: 'tintower',        mapNum: 36,  label: 'Tin Tower',         region: 'johto' } },
  { key: 'Burned Tower',       info: { slug: 'burnedtower',     mapNum: 37,  label: 'Burned Tower',      region: 'johto' } },
  { key: 'Dark Cave',          info: { slug: 'darkcave',        mapNum: 38,  label: 'Dark Cave',         region: 'johto' } },
  { key: 'Whirl Islands',      info: { slug: 'whirlislands',    mapNum: 39,  label: 'Whirl Islands',     region: 'johto' } },
  { key: 'Dragon\'s Den',      info: { slug: "dragon'sden",     mapNum: 41,  label: "Dragon's Den",      region: 'johto' } },
  { key: 'Dragons Den',        info: { slug: "dragon'sden",     mapNum: 41,  label: "Dragon's Den",      region: 'johto' } },
  { key: 'Lake of Rage',       info: { slug: 'lakeofrage',      mapNum: 42,  label: 'Lake of Rage',      region: 'johto' } },
  { key: 'Ice Path',           info: { slug: 'icepath',         mapNum: 43,  label: 'Ice Path',          region: 'johto' } },
  { key: 'Mt. Silver',         info: { slug: 'mt.silver',       mapNum: 44,  label: 'Mt. Silver',        region: 'johto' } },
];

/** Combined lookup of all locations (Kanto + Johto) */
export const ALL_LOCATIONS = [...KANTO_LOCATIONS, ...JOHTO_LOCATIONS];

/** Build the Gen 1 Pokéarth page URL for a Kanto slug */
export function pokEarthUrl(slug: string): string {
  return `https://www.serebii.net/pokearth/kanto/1st/${slug}.shtml`;
}

/** Build the Gen 2 Pokéarth page URL for a Johto slug */
export function pokEarthJohtoUrl(slug: string): string {
  return `https://www.serebii.net/pokearth/johto/2nd/${slug}.shtml`;
}

/** Build the RBY map image URL for a Kanto map number */
export function mapImageUrl(mapNum: number): string {
  return `https://www.serebii.net/pokearth/maps/kanto-rby/${mapNum}.png`;
}

/** Build the GSC map image URL for a Johto map number */
export function mapImageJohtoUrl(mapNum: number): string {
  return `https://www.serebii.net/pokearth/maps/johto2nd/${mapNum}.png`;
}

// ─── Route number lookup ──────────────────────────────────────────────────────

/** Map route number → KantoLocationInfo (Kanto routes 1–25) */
function kantoRouteInfo(n: number): KantoLocationInfo | null {
  const entry = KANTO_LOCATIONS.find((e) => e.key === `Route ${n}`);
  return entry ? entry.info : null;
}

/** Map route number → KantoLocationInfo (Johto routes 29–48) */
function johtoRouteInfo(n: number): KantoLocationInfo | null {
  const entry = JOHTO_LOCATIONS.find((e) => e.key === `Route ${n}`);
  return entry ? entry.info : null;
}

/** Map route number → KantoLocationInfo (tries Kanto then Johto) */
function routeInfo(n: number): KantoLocationInfo | null {
  return kantoRouteInfo(n) ?? johtoRouteInfo(n);
}

// ─── Location tokeniser ───────────────────────────────────────────────────────

/** A segment of a parsed location string. */
export type LocationSegment =
  | { kind: 'place'; text: string; info: KantoLocationInfo }
  | { kind: 'text'; text: string };

/**
 * Parse a location string (e.g. "Routes 1, 2, 3, 5, 6, 7, 8 (Common)" or
 * "Ilex Forest, Routes 34-36") into an ordered array of segments.
 *
 * Named places that have a map entry become `{ kind: 'place' }` segments;
 * everything else (punctuation, qualifiers like "(Common)") becomes `{ kind: 'text' }`.
 *
 * Handles:
 *  - "Routes N-M"     → individual route segments for each N..M
 *  - "Routes N, M, …" → individual route segments for each number
 *  - "Route N"        → single route segment
 *  - Named locations  → matched against ALL_LOCATIONS keys
 */
export function tokenizeLocation(locationStr: string): LocationSegment[] {
  const segments: LocationSegment[] = [];
  let remaining = locationStr;

  // Build a sorted list of named-place keys (longest first) to avoid
  // partial matches (e.g. "Cerulean Cave" before "Cerulean City").
  const namedKeys = [...ALL_LOCATIONS]
    .filter((e) => !e.key.startsWith('Route ')) // routes handled separately
    .sort((a, b) => b.key.length - a.key.length);

  while (remaining.length > 0) {
    let matched = false;

    // ── "Routes N-M" (range) ──────────────────────────────────────────────
    const rangeMatch = remaining.match(/^(Routes?\s+)(\d+)-(\d+)/i);
    if (rangeMatch) {
      const prefix = rangeMatch[1]; // "Routes " or "Route "
      const from = parseInt(rangeMatch[2], 10);
      const to = parseInt(rangeMatch[3], 10);
      if (prefix) segments.push({ kind: 'text', text: prefix });
      for (let n = from; n <= to; n++) {
        const info = routeInfo(n);
        const label = `Route ${n}`;
        if (info) {
          segments.push({ kind: 'place', text: label, info });
        } else {
          segments.push({ kind: 'text', text: label });
        }
        if (n < to) segments.push({ kind: 'text', text: '-' });
      }
      remaining = remaining.slice(rangeMatch[0].length);
      matched = true;
    }

    // ── "Routes N, M, …" — plural with comma-separated numbers ───────────
    if (!matched) {
      const pluralMatch = remaining.match(/^Routes\s+(\d[\d,\s]*)/i);
      if (pluralMatch) {
        segments.push({ kind: 'text', text: 'Routes ' });
        remaining = remaining.slice('Routes '.length);

        // Consume a run of "N" / ", N" / ", N" tokens
        let first = true;
        while (remaining.length > 0) {
          const numMatch = remaining.match(/^(\d+)/);
          if (!numMatch) break;
          const n = parseInt(numMatch[1], 10);
          const info = routeInfo(n);
          const label = `${n}`;
          if (!first) {
            // peek back: the separator was already consumed as text
          }
          if (info) {
            segments.push({ kind: 'place', text: label, info });
          } else {
            segments.push({ kind: 'text', text: label });
          }
          remaining = remaining.slice(numMatch[0].length);
          first = false;

          // consume the separator ", " or "-" if it leads to another number
          const sepMatch = remaining.match(/^(,\s*|-\s*)(?=\d)/);
          if (sepMatch) {
            segments.push({ kind: 'text', text: sepMatch[0] });
            remaining = remaining.slice(sepMatch[0].length);
          } else {
            break;
          }
        }
        matched = true;
      }
    }

    // ── "Route N" (singular) ──────────────────────────────────────────────
    if (!matched) {
      const singleRoute = remaining.match(/^Route\s+(\d+)/i);
      if (singleRoute) {
        const n = parseInt(singleRoute[1], 10);
        const info = routeInfo(n);
        const label = `Route ${n}`;
        if (info) {
          segments.push({ kind: 'place', text: label, info });
        } else {
          segments.push({ kind: 'text', text: label });
        }
        remaining = remaining.slice(singleRoute[0].length);
        matched = true;
      }
    }

    // ── Named locations ───────────────────────────────────────────────────
    if (!matched) {
      for (const { key, info } of namedKeys) {
        if (remaining.toLowerCase().startsWith(key.toLowerCase())) {
          segments.push({ kind: 'place', text: remaining.slice(0, key.length), info });
          remaining = remaining.slice(key.length);
          matched = true;
          break;
        }
      }
    }

    // ── Plain text: consume until the next potential match ────────────────
    if (!matched) {
      // Consume one character at a time until something matches at the head
      let textEnd = 1;
      while (textEnd < remaining.length) {
        const rest = remaining.slice(textEnd);
        const wouldMatch =
          /^Routes?\s+\d/i.test(rest) ||
          namedKeys.some((e) => rest.toLowerCase().startsWith(e.key.toLowerCase()));
        if (wouldMatch) break;
        textEnd++;
      }
      const last = segments[segments.length - 1];
      if (last && last.kind === 'text') {
        last.text += remaining.slice(0, textEnd);
      } else {
        segments.push({ kind: 'text', text: remaining.slice(0, textEnd) });
      }
      remaining = remaining.slice(textEnd);
    }
  }

  return segments;
}
