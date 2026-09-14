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
  | 'Dragon';

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
}

// ─── Evolution types ──────────────────────────────────────────────────────────

export type EvolutionMethod = 'level' | 'stone' | 'trade';

export interface EvolutionInfo {
  /** Target Pokemon ID */
  id: number;
  method: EvolutionMethod;
  /** Level required (for method: 'level') */
  level?: number;
  /** Stone name (for method: 'stone') e.g. "Thunder Stone" */
  stone?: string;
}

// ─── Version / Location types ─────────────────────────────────────────────────

export type GameVersion = 'Red' | 'Blue' | 'Yellow';

export const ALL_VERSIONS: GameVersion[] = ['Red', 'Blue', 'Yellow'];

export interface VersionLocation {
  version: GameVersion;
  /** Human-readable availability / location, e.g. "Starter Pokemon", "Viridian Forest (Common)" */
  location: string;
}

// ─── Base Stats ───────────────────────────────────────────────────────────────

export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  special: number;
  speed: number;
}

// ─── Main Pokemon Definition ──────────────────────────────────────────────────

export interface PokemonDefinition {
  id: number;
  name: string;
  types: [PokemonType] | [PokemonType, PokemonType];
  classification: string;
  height: string;
  weight: string;
  captureRate: number;
  baseStats: BaseStats;

  /** Level-up learnset for Red/Blue */
  learnsetRB: LearnedMove[];
  /** Level-up learnset for Yellow — only present when it differs from RB */
  learnsetYellow?: LearnedMove[];

  /** TM and HM moves learnable */
  tmMoves: TmMove[];

  /** Special moves (Stadium tutors, gift moves, etc.) */
  specialMoves?: string[];

  /** What this Pokemon evolves from (undefined for base forms) */
  evolvesFrom?: {
    id: number;
    method: EvolutionMethod;
    level?: number;
    stone?: string;
  };

  /** What this Pokemon can evolve into (undefined for final forms) */
  evolvesTo?: EvolutionInfo[];

  /** Version availability and encounter locations */
  locations: VersionLocation[];
}
