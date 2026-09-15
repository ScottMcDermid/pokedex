'use client';

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import theme from '@/app/theme';
import { useHydrated } from '@/hooks/useHydrated';
import { usePokemonStore } from '@/data/pokemonStore';
import { pokemonDefinitions } from '@/data/pokemon';
import { PokemonDefinition } from '@/utils/pokemonTypes';

import PokemonList, { PokemonListHandle } from '@/components/PokemonList';
import PokemonDetail from '@/components/PokemonDetail';
import PokemonFilters from '@/components/PokemonFilters';

interface PokedexProps {
  pokemonId?: string;
}

export default function Pokedex({ pokemonId }: PokedexProps) {
  const hydrated = useHydrated();
  const listRef = useRef<PokemonListHandle>(null);
  const visiblePokemonRef = useRef<PokemonDefinition[]>([]);

  const [selectedId, setSelectedId] = useState<number | null>(pokemonId ? parseInt(pokemonId, 10) : null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const { typeFilters, versionFilters, setTypeFilters, setVersionFilters, clearAllFilters } = usePokemonStore();

  // Compute active filter count
  const activeFilterCount = typeFilters.length + versionFilters.length;

  // Filter pokemon by type/version
  const filteredPokemon = useMemo(() => {
    let result = pokemonDefinitions;

    if (typeFilters.length > 0) {
      result = result.filter((p) => typeFilters.some((t) => p.types.includes(t)));
    }

    if (versionFilters.length > 0) {
      result = result.filter((p) =>
        p.locations.some((loc) => versionFilters.includes(loc.version)),
      );
    }

    return result;
  }, [typeFilters, versionFilters]);

  // Apply search on top of filters
  const visiblePokemon = useMemo(() => {
    if (!searchQuery.trim()) return filteredPokemon;
    const q = searchQuery.toLowerCase();
    return filteredPokemon.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        String(p.id).padStart(3, '0').includes(q) ||
        p.types.some((t) => t.toLowerCase().includes(q)),
    );
  }, [filteredPokemon, searchQuery]);

  // Keep a ref in sync so the stable keydown handler can read the current list
  visiblePokemonRef.current = visiblePokemon;

  const selectedPokemon: PokemonDefinition | null = useMemo(
    () => (selectedId != null ? pokemonDefinitions.find((p) => p.id === selectedId) ?? null : null),
    [selectedId],
  );

  const handleSelectPokemon = useCallback(
    (id: number) => {
      setSelectedId(id);
      setMobileDetailOpen(true);
      window.history.pushState({}, '', `/pokemon/${id}`);

      // Scroll list to selected item
      const index = visiblePokemon.findIndex((p) => p.id === id);
      if (index >= 0) listRef.current?.scrollToIndex(index);
    },
    [visiblePokemon],
  );

  const handleNavigateEvolution = useCallback(
    (id: number) => {
      handleSelectPokemon(id);
    },
    [handleSelectPokemon],
  );

  const handleMobileBack = useCallback(() => {
    setMobileDetailOpen(false);
    window.history.pushState({}, '', '/');
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const inInput = document.activeElement?.tagName === 'INPUT';

      if (e.key === '/' && !inInput) {
        e.preventDefault();
        listRef.current?.focusSearch();
      }

      if (e.key === 'Escape') {
        setMobileDetailOpen(false);
      }

      // Arrow / j-k list navigation (skip when typing in search)
      if (!inInput && (e.key === 'ArrowDown' || e.key === 'j' || e.key === 'ArrowUp' || e.key === 'k')) {
        e.preventDefault();
        setSelectedId((prev) => {
          const list = visiblePokemonRef.current;
          if (list.length === 0) return prev;
          const currentIndex = prev != null ? list.findIndex((p) => p.id === prev) : -1;
          let nextIndex: number;
          if (e.key === 'ArrowDown' || e.key === 'j') {
            nextIndex = currentIndex < list.length - 1 ? currentIndex + 1 : currentIndex;
          } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
          }
          const next = list[nextIndex];
          if (!next || next.id === prev) return prev;
          setMobileDetailOpen(true);
          window.history.pushState({}, '', `/pokemon/${next.id}`);
          listRef.current?.scrollToIndex(nextIndex);
          return next.id;
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Popstate for back/forward navigation
  useEffect(() => {
    const handler = () => {
      const match = window.location.pathname.match(/\/pokemon\/(\d+)/);
      if (match) {
        setSelectedId(parseInt(match[1], 10));
        setMobileDetailOpen(true);
      } else {
        setSelectedId(null);
        setMobileDetailOpen(false);
      }
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  if (!hydrated) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#1e1e1e' }}>
        <CircularProgress sx={{ color: '#cc0000' }} />
      </Box>
    );
  }

  const filterPanel = (
    <PokemonFilters
      typeFilters={typeFilters}
      versionFilters={versionFilters}
      onTypeFilterChange={setTypeFilters}
      onVersionFilterChange={setVersionFilters}
      onClear={clearAllFilters}
    />
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

          {/* ── AppBar ── */}
          <AppBar position="static" elevation={0} sx={{ backgroundColor: '#cc0000', borderBottom: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
            <Toolbar variant="dense" sx={{ minHeight: 44 }}>
              <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: '0.02em', color: '#fff', fontSize: '1rem' }}>
                Pokédex
              </Typography>
              <Typography variant="caption" sx={{ ml: 1.5, color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem' }}>
                Gen I–II · Red / Blue / Yellow / Gold / Silver / Crystal
              </Typography>
              <Box sx={{ flex: 1 }} />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', display: { xs: 'none', sm: 'block' } }}>
                Press / to search · ↑↓ / j k to navigate
              </Typography>
            </Toolbar>
          </AppBar>

          {/* ── Body ── */}
          <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>

            {/* Filter sidebar — desktop */}
            {filtersOpen && (
              <Box sx={{ width: 260, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.08)', overflowY: 'auto', display: { xs: 'none', md: 'block' } }}>
                {filterPanel}
              </Box>
            )}

            {/* Filter drawer — mobile */}
            <Dialog
              open={filtersOpen}
              onClose={() => setFiltersOpen(false)}
              fullWidth
              maxWidth="xs"
              sx={{ display: { md: 'none' } }}
              PaperProps={{ sx: { backgroundColor: 'background.paper', m: 1 } }}
            >
              {filterPanel}
            </Dialog>

            {/* Pokemon list */}
            <PokemonList
              ref={listRef}
              pokemon={visiblePokemon}
              selectedId={selectedId}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectPokemon={handleSelectPokemon}
              onFilterToggle={() => setFiltersOpen((v) => !v)}
              activeFilterCount={activeFilterCount}
            />

            {/* Detail panel — desktop */}
            {selectedPokemon ? (
              <Box sx={{ flex: 1, overflow: 'hidden', display: { xs: 'none', md: 'flex' } }}>
                <PokemonDetail pokemon={selectedPokemon} onNavigate={handleNavigateEvolution} />
              </Box>
            ) : (
              <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Select a Pokémon to view details
                </Typography>
              </Box>
            )}
          </Box>

          {/* Detail drawer — mobile */}
          <Drawer
            anchor="right"
            open={mobileDetailOpen && selectedPokemon != null}
            onClose={() => setMobileDetailOpen(false)}
            sx={{ display: { md: 'none' } }}
            PaperProps={{ sx: { width: '100%', maxWidth: 480, backgroundColor: 'background.default', display: 'flex', flexDirection: 'column' } }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.5, borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
              <IconButton onClick={handleMobileBack} size="small" aria-label="Back to list" sx={{ color: 'text.primary' }}>
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                Back to list
              </Typography>
            </Box>
            {selectedPokemon && (
              <Box sx={{ flex: 1, overflow: 'auto' }}>
                <PokemonDetail pokemon={selectedPokemon} onNavigate={handleNavigateEvolution} />
              </Box>
            )}
          </Drawer>

          {/* ── Footer ── */}
          <Box
            component="footer"
            sx={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              py: 0.75,
              px: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              backgroundColor: 'background.paper',
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
              Data sourced from{' '}
              <Link href="https://www.serebii.net" target="_blank" rel="noreferrer" sx={{ color: '#cc0000' }}>
                Serebii.net
              </Link>
              . Pokémon © Nintendo / Game Freak 1996.
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
              {visiblePokemon.length} / 251 shown
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
