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

// ─── Kanto Location Map ───────────────────────────────────────────────────────

/**
 * Describes a mappable Kanto location.
 * - `slug`     → used to build the Serebii Pokéarth Gen I page URL
 * - `mapNum`   → numeric ID used in /pokearth/maps/kanto-rby/{N}.png
 * - `label`    → display name shown in tooltip header
 */
export interface KantoLocationInfo {
  slug: string;
  mapNum: number;
  label: string;
}

/**
 * Lookup table: canonical location keyword → Pokéarth info.
 * Keys are matched case-insensitively as substrings against location strings.
 * More-specific / longer keys are listed first so the first match wins.
 *
 * Map numbers sourced from https://www.serebii.net/pokearth/kanto/1st/{slug}.shtml
 * Image pattern: https://www.serebii.net/pokearth/maps/kanto-rby/{mapNum}.png
 */
export const KANTO_LOCATIONS: Array<{ key: string; info: KantoLocationInfo }> = [
  // ── Routes ──────────────────────────────────────────────────────────────────
  { key: 'Route 1',          info: { slug: 'route1',         mapNum: 1,   label: 'Route 1' } },
  { key: 'Route 2',          info: { slug: 'route2',         mapNum: 2,   label: 'Route 2' } },
  { key: 'Route 3',          info: { slug: 'route3',         mapNum: 3,   label: 'Route 3' } },
  { key: 'Route 4',          info: { slug: 'route4',         mapNum: 4,   label: 'Route 4' } },
  { key: 'Route 5',          info: { slug: 'route5',         mapNum: 5,   label: 'Route 5' } },
  { key: 'Route 6',          info: { slug: 'route6',         mapNum: 6,   label: 'Route 6' } },
  { key: 'Route 7',          info: { slug: 'route7',         mapNum: 7,   label: 'Route 7' } },
  { key: 'Route 8',          info: { slug: 'route8',         mapNum: 8,   label: 'Route 8' } },
  { key: 'Route 9',          info: { slug: 'route9',         mapNum: 9,   label: 'Route 9' } },
  { key: 'Route 10',         info: { slug: 'route10',        mapNum: 10,  label: 'Route 10' } },
  { key: 'Route 11',         info: { slug: 'route11',        mapNum: 11,  label: 'Route 11' } },
  { key: 'Route 12',         info: { slug: 'route12',        mapNum: 12,  label: 'Route 12' } },
  { key: 'Route 13',         info: { slug: 'route13',        mapNum: 13,  label: 'Route 13' } },
  { key: 'Route 14',         info: { slug: 'route14',        mapNum: 14,  label: 'Route 14' } },
  { key: 'Route 15',         info: { slug: 'route15',        mapNum: 15,  label: 'Route 15' } },
  { key: 'Route 16',         info: { slug: 'route16',        mapNum: 16,  label: 'Route 16' } },
  { key: 'Route 17',         info: { slug: 'route17',        mapNum: 17,  label: 'Route 17' } },
  { key: 'Route 18',         info: { slug: 'route18',        mapNum: 18,  label: 'Route 18' } },
  { key: 'Route 19',         info: { slug: 'route19',        mapNum: 19,  label: 'Route 19' } },
  { key: 'Route 20',         info: { slug: 'route20',        mapNum: 20,  label: 'Route 20' } },
  { key: 'Route 21',         info: { slug: 'route21',        mapNum: 21,  label: 'Route 21' } },
  { key: 'Route 22',         info: { slug: 'route22',        mapNum: 22,  label: 'Route 22' } },
  { key: 'Route 23',         info: { slug: 'route23',        mapNum: 23,  label: 'Route 23' } },
  { key: 'Route 24',         info: { slug: 'route24',        mapNum: 24,  label: 'Route 24' } },
  { key: 'Route 25',         info: { slug: 'route25',        mapNum: 25,  label: 'Route 25' } },

  // ── Cities / Towns ──────────────────────────────────────────────────────────
  { key: 'Pallet Town',      info: { slug: 'pallettown',     mapNum: 26,  label: 'Pallet Town' } },
  { key: 'Viridian City',    info: { slug: 'viridiancity',   mapNum: 27,  label: 'Viridian City' } },
  { key: 'Pewter City',      info: { slug: 'pewtercity',     mapNum: 28,  label: 'Pewter City' } },
  { key: 'Cerulean City',    info: { slug: 'ceruleancity',   mapNum: 29,  label: 'Cerulean City' } },
  { key: 'Vermilion City',   info: { slug: 'vermilioncity',  mapNum: 30,  label: 'Vermilion City' } },
  { key: 'Lavender Town',    info: { slug: 'lavendertown',   mapNum: 31,  label: 'Lavender Town' } },
  { key: 'Celadon City',     info: { slug: 'celadoncity',    mapNum: 35,  label: 'Celadon City' } },
  { key: 'Fuchsia City',     info: { slug: 'fuchsiacity',    mapNum: 36,  label: 'Fuchsia City' } },
  { key: 'Saffron City',     info: { slug: 'saffroncity',    mapNum: 37,  label: 'Saffron City' } },
  { key: 'Cinnabar Island',  info: { slug: 'cinnabarisland', mapNum: 38,  label: 'Cinnabar Island' } },
  { key: 'Indigo Plateau',   info: { slug: 'indigoplateau',  mapNum: 39,  label: 'Indigo Plateau' } },

  // ── Dungeons / Special Areas ─────────────────────────────────────────────────
  { key: 'Viridian Forest',  info: { slug: 'viridianforest', mapNum: 40,  label: 'Viridian Forest' } },
  { key: 'Mt. Moon',         info: { slug: 'mtmoon',         mapNum: 41,  label: 'Mt. Moon' } },
  { key: 'Rock Tunnel',      info: { slug: 'rocktunnel',     mapNum: 42,  label: 'Rock Tunnel' } },
  { key: 'Pokémon Tower',    info: { slug: 'pokemontower',   mapNum: 43,  label: 'Pokémon Tower' } },
  { key: 'Pokemon Tower',    info: { slug: 'pokemontower',   mapNum: 43,  label: 'Pokémon Tower' } },
  { key: 'Safari Zone',      info: { slug: 'safarizone',     mapNum: 44,  label: 'Safari Zone' } },
  { key: 'Seafoam Islands',  info: { slug: 'seafoamislands', mapNum: 45,  label: 'Seafoam Islands' } },
  { key: 'Victory Road',     info: { slug: 'victoryroad',    mapNum: 46,  label: 'Victory Road' } },
  { key: "Diglett's Cave",   info: { slug: 'diglettscave',   mapNum: 47,  label: "Diglett's Cave" } },
  { key: 'Digletts Cave',    info: { slug: 'diglettscave',   mapNum: 47,  label: "Diglett's Cave" } },
  { key: 'Power Plant',      info: { slug: 'powerplant',     mapNum: 48,  label: 'Power Plant' } },
  { key: 'Cerulean Cave',    info: { slug: 'ceruleancave',   mapNum: 49,  label: 'Cerulean Cave' } },
  { key: 'Pokémon Mansion',  info: { slug: 'pokemonmansion', mapNum: 50,  label: 'Pokémon Mansion' } },
  { key: 'Pokemon Mansion',  info: { slug: 'pokemonmansion', mapNum: 50,  label: 'Pokémon Mansion' } },
  { key: 'Rocket Hideout',   info: { slug: 'rockethideout',  mapNum: 51,  label: 'Rocket Hideout' } },
  { key: 'Silph Co.',        info: { slug: 'silphco',        mapNum: 52,  label: 'Silph Co.' } },
  { key: 'SS Anne',          info: { slug: 'ssanne',         mapNum: 53,  label: 'SS Anne' } },
];

/** Build the Gen 1 Pokéarth page URL for a slug */
export function pokEarthUrl(slug: string): string {
  return `https://www.serebii.net/pokearth/kanto/1st/${slug}.shtml`;
}

/** Build the RBY map image URL for a map number */
export function mapImageUrl(mapNum: number): string {
  return `https://www.serebii.net/pokearth/maps/kanto-rby/${mapNum}.png`;
}

// ─── Route number lookup ──────────────────────────────────────────────────────

/** Map route number → KantoLocationInfo (for routes 1–25 only) */
function routeInfo(n: number): KantoLocationInfo | null {
  const entry = KANTO_LOCATIONS.find((e) => e.key === `Route ${n}`);
  return entry ? entry.info : null;
}

// ─── Location tokeniser ───────────────────────────────────────────────────────

/** A segment of a parsed location string. */
export type LocationSegment =
  | { kind: 'place'; text: string; info: KantoLocationInfo }
  | { kind: 'text'; text: string };

/**
 * Parse a location string (e.g. "Routes 1, 2, 3, 5, 6, 7, 8 (Common)" or
 * "Viridian Forest, Routes 24-25") into an ordered array of segments.
 *
 * Named places that have a map entry become `{ kind: 'place' }` segments;
 * everything else (punctuation, qualifiers like "(Common)") becomes `{ kind: 'text' }`.
 *
 * Handles:
 *  - "Routes N-M"     → individual route segments for each N..M
 *  - "Routes N, M, …" → individual route segments for each number
 *  - "Route N"        → single route segment
 *  - Named locations  → matched against KANTO_LOCATIONS keys
 */
export function tokenizeLocation(locationStr: string): LocationSegment[] {
  const segments: LocationSegment[] = [];
  let remaining = locationStr;

  // Build a sorted list of named-place keys (longest first) to avoid
  // partial matches (e.g. "Cerulean Cave" before "Cerulean City").
  const namedKeys = [...KANTO_LOCATIONS]
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
