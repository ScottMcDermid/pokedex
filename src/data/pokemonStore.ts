'use client';

import { create } from 'zustand';
import { PokemonType, GameVersion, ALL_TYPES, ALL_VERSIONS } from '@/utils/pokemonTypes';

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
