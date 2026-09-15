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

export type CatchStatusFilter = 'caught' | 'seen' | 'unseen';

interface PokemonFilterState {
  typeFilters: PokemonType[];
  versionFilters: GameVersion[];
  catchStatusFilters: CatchStatusFilter[];
  setTypeFilters: (types: PokemonType[]) => void;
  setVersionFilters: (versions: GameVersion[]) => void;
  setCatchStatusFilters: (statuses: CatchStatusFilter[]) => void;
  clearAllFilters: () => void;
}

export const usePokemonStore = create<PokemonFilterState>()((set) => ({
  typeFilters: [],
  versionFilters: [],
  catchStatusFilters: [],

  setTypeFilters: (types) => set({ typeFilters: types }),
  setVersionFilters: (versions) => set({ versionFilters: versions }),
  setCatchStatusFilters: (statuses) => set({ catchStatusFilters: statuses }),

  clearAllFilters: () =>
    set({
      typeFilters: [],
      versionFilters: [],
      catchStatusFilters: [],
    }),
}));

/** Convenience selector — true if any filter is active */
export function hasActiveFilters(state: PokemonFilterState) {
  return state.typeFilters.length > 0 || state.versionFilters.length < ALL_VERSIONS.length || state.catchStatusFilters.length > 0;
}

// Re-export for convenience
export { ALL_TYPES, ALL_VERSIONS };
