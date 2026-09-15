'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PokemonType, GameVersion, ALL_TYPES, ALL_VERSIONS } from '@/utils/pokemonTypes';

// ─── Tracker ──────────────────────────────────────────────────────────────────

export type CatchStatus = 'none' | 'seen' | 'caught';

/** Cycles none → seen → caught → none */
export function nextCatchStatus(current: CatchStatus): CatchStatus {
  if (current === 'none') return 'seen';
  if (current === 'seen') return 'caught';
  return 'none';
}

interface PokemonTrackerState {
  statuses: Record<number, CatchStatus>;
  setStatus: (id: number, status: CatchStatus) => void;
  cycleStatus: (id: number) => void;
}

export const usePokemonTracker = create<PokemonTrackerState>()(
  persist(
    (set, get) => ({
      statuses: {},

      setStatus: (id, status) =>
        set((state) => ({
          statuses: { ...state.statuses, [id]: status },
        })),

      cycleStatus: (id) => {
        const current = get().statuses[id] ?? 'none';
        const next = nextCatchStatus(current);
        set((state) => ({
          statuses: { ...state.statuses, [id]: next },
        }));
      },
    }),
    { name: 'pokedex-tracker' },
  ),
);

// ─── Filters ──────────────────────────────────────────────────────────────────

interface PokemonFilterState {
  typeFilters: PokemonType[];
  versionFilters: GameVersion[];
  setTypeFilters: (types: PokemonType[]) => void;
  setVersionFilters: (versions: GameVersion[]) => void;
  clearAllFilters: () => void;
}

export const usePokemonStore = create<PokemonFilterState>()((set) => ({
  typeFilters: [],
  versionFilters: [],

  setTypeFilters: (types) => set({ typeFilters: types }),
  setVersionFilters: (versions) => set({ versionFilters: versions }),

  clearAllFilters: () =>
    set({
      typeFilters: [],
      versionFilters: [],
    }),
}));

/** Convenience selector — true if any filter is active */
export function hasActiveFilters(state: PokemonFilterState) {
  return state.typeFilters.length > 0 || state.versionFilters.length < ALL_VERSIONS.length;
}

// Re-export for convenience
export { ALL_TYPES, ALL_VERSIONS };
