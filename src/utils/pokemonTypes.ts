// ─── Pokemon Types ────────────────────────────────────────────────────────────

export type PokemonType =
  | 'Normal'
  | 'Fire'
  | 'Water'
  | 'Electric'
  | 'Grass'
  | 'Ice'
  | 'Fighting'
  | 'Poison'
  | 'Ground'
  | 'Flying'
  | 'Psychic'
  | 'Bug'
  | 'Rock'
  | 'Ghost'
  | 'Dragon'
  | 'Steel'
  | 'Dark';

export const ALL_TYPES: PokemonType[] = [
  'Normal',
  'Fire',
  'Water',
  'Electric',
  'Grass',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Steel',
  'Dark',
];

/** Standard Pokemon TCG palette colors for each type */
export const TYPE_COLORS: Record<PokemonType, string> = {
  Normal: '#a8a878',
  Fire: '#f08030',
  Water: '#6890f0',
  Electric: '#f8d030',
  Grass: '#78c850',
  Ice: '#98d8d8',
  Fighting: '#c03028',
  Poison: '#a040a0',
  Ground: '#e0c068',
  Flying: '#a890f0',
  Psychic: '#f85888',
  Bug: '#a8b820',
  Rock: '#b8a038',
  Ghost: '#705898',
  Dragon: '#7038f8',
  Steel: '#b8b8d0',
  Dark: '#705848',
};

// ─── Move types ───────────────────────────────────────────────────────────────

export interface Move {
  name: string;
  type: PokemonType;
  /** null = non-damaging / variable */
  power: number | null;
  /** null = always hits / N/A */
  accuracy: number | null;
  pp: number;
  /** null = no secondary effect */
  effectPct: number | null;
  description: string;
}

// ─── Learnset types ───────────────────────────────────────────────────────────

export interface LearnedMove {
  /** Move name (key into moves dictionary) */
  move: string;
  /** null = learned at start / level 1 */
  level: number | null;
}

export interface TmMove {
  /** e.g. "TM03", "HM01" */
  tm: string;
  move: string;
  /** true if only learnable in Yellow version */
  yellowOnly?: boolean;
  /** true if only learnable in Crystal version */
  crystalOnly?: boolean;
}

// ─── Evolution types ──────────────────────────────────────────────────────────

export type EvolutionMethod = 'level' | 'stone' | 'trade' | 'friendship' | 'item';

export interface EvolutionInfo {
  /** Target Pokemon ID */
  id: number;
  method: EvolutionMethod;
  /** Level required (for method: 'level') */
  level?: number;
  /** Stone name (for method: 'stone') e.g. "Thunder Stone" */
  stone?: string;
  /** Item name (for method: 'item') e.g. "King's Rock" */
  item?: string;
  /** Time of day required e.g. "Day" | "Night" (for friendship/level evolutions) */
  time?: 'Day' | 'Night';
  /** Gender required e.g. "Female" (for some evolutions) */
  gender?: 'Male' | 'Female';
}

// ─── Version / Location types ─────────────────────────────────────────────────

export type GameVersion = 'Red' | 'Blue' | 'Yellow' | 'Gold' | 'Silver' | 'Crystal';

export const ALL_VERSIONS: GameVersion[] = ['Red', 'Blue', 'Yellow', 'Gold', 'Silver', 'Crystal'];

/** Time of day when a Pokémon can be encountered in the wild */
export type TimeOfDay = 'Morning' | 'Day' | 'Night' | 'Morning & Day' | 'Morning & Night';

/** Hour ranges for each time-of-day period (Gen 2 / Crystal) */
export const TIME_OF_DAY_HOURS: Record<TimeOfDay, string> = {
  Morning:           '4:00 AM – 9:59 AM',
  Day:               '10:00 AM – 5:59 PM',
  Night:             '6:00 PM – 3:59 AM',
  'Morning & Day':   '4:00 AM – 5:59 PM',
  'Morning & Night': '4:00 AM – 9:59 AM, 6:00 PM – 3:59 AM',
};

export interface VersionLocation {
  version: GameVersion;
  /** Human-readable availability / location, e.g. "Starter Pokemon", "Viridian Forest (Common)" */
  location: string;
  /** Time of day this Pokémon can be encountered (Gen 2 only) */
  timeOfDay?: TimeOfDay;
}

// ─── Base Stats ───────────────────────────────────────────────────────────────

export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  /** Gen 1 combined special stat (null for Gen 2+ Pokemon) */
  special?: number;
  /** Gen 2+ special attack stat (null for Gen 1 Pokemon) */
  spAttack?: number;
  /** Gen 2+ special defense stat (null for Gen 1 Pokemon) */
  spDefense?: number;
  speed: number;
}

// ─── Generation ───────────────────────────────────────────────────────────────

export type Generation = 1 | 2;

// ─── Main Pokemon Definition ──────────────────────────────────────────────────

export interface PokemonDefinition {
  id: number;
  name: string;
  types: [PokemonType] | [PokemonType, PokemonType];
  classification: string;
  height: string;
  weight: string;
  captureRate: number;
  /** Generation this Pokemon was introduced in (defaults to 1 if omitted) */
  generation?: Generation;
  baseStats: BaseStats;

  /** Level-up learnset for Red/Blue (Gen 1) or Gold/Silver (Gen 2) */
  learnsetRB: LearnedMove[];
  /** Level-up learnset for Yellow — only present when it differs from RB (Gen 1 only) */
  learnsetYellow?: LearnedMove[];
  /** Level-up learnset for Crystal — only present when it differs from GS (Gen 2 only) */
  learnsetCrystal?: LearnedMove[];

  /** TM and HM moves learnable */
  tmMoves: TmMove[];

  /** Special moves (Stadium tutors, gift moves, Move Tutor moves, etc.) */
  specialMoves?: string[];

  /** What this Pokemon evolves from (undefined for base forms) */
  evolvesFrom?: {
    id: number;
    method: EvolutionMethod;
    level?: number;
    stone?: string;
    item?: string;
    time?: 'Day' | 'Night';
    gender?: 'Male' | 'Female';
  };

  /** What this Pokemon can evolve into (undefined for final forms) */
  evolvesTo?: EvolutionInfo[];

  /** Version availability and encounter locations */
  locations: VersionLocation[];
}
