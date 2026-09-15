'use client';

import React, { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { List, ListImperativeAPI } from 'react-window';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import Image from 'next/image';

import { PokemonDefinition } from '@/utils/pokemonTypes';
import TypeBadge from '@/components/TypeBadge';
import { rbSpriteUrl, gsSpriteUrl, padId } from '@/utils/serebiiLinks';
import { usePokemonTracker, CatchStatus } from '@/data/pokemonStore';

const ROW_HEIGHT = 60;

interface PokemonListProps {
  pokemon: PokemonDefinition[];
  selectedId: number | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectPokemon: (id: number) => void;
  onFilterToggle: () => void;
  activeFilterCount: number;
}

export interface PokemonListHandle {
  focusSearch: () => void;
  scrollToIndex: (index: number) => void;
}

const STATUS_ICON: Record<CatchStatus, React.ElementType | null> = {
  none: null,
  seen: VisibilityIcon,
  caught: CatchingPokemonIcon,
};
const STATUS_COLOR: Record<CatchStatus, string> = {
  none: 'transparent',
  seen: '#f59e0b',
  caught: '#22c55e',
};
const STATUS_LABEL: Record<CatchStatus, string> = {
  none: '',
  seen: 'Seen',
  caught: 'Caught',
};

function PokemonRow({
  style,
  pokemon,
  isSelected,
  catchStatus,
  onSelect,
}: {
  index?: number;
  style: React.CSSProperties;
  pokemon: PokemonDefinition;
  isSelected: boolean;
  catchStatus: CatchStatus;
  onSelect: (id: number) => void;
}) {
  const p = pokemon;
  const StatusIcon = STATUS_ICON[catchStatus];

  return (
    <Box
      style={style}
      onClick={() => onSelect(p.id)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        cursor: 'pointer',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: isSelected ? 'rgba(204,0,0,0.18)' : 'transparent',
        borderLeft: isSelected ? '3px solid #cc0000' : '3px solid transparent',
        '&:hover': {
          backgroundColor: isSelected ? 'rgba(204,0,0,0.22)' : 'rgba(255,255,255,0.05)',
        },
        transition: 'background-color 0.1s',
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: '#9ca3af', minWidth: 30, fontFamily: 'monospace', fontSize: '0.7rem' }}
      >
        #{padId(p.id)}
      </Typography>

      <Box sx={{ width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image
          src={p.generation === 2 ? gsSpriteUrl(p.id) : rbSpriteUrl(p.id)}
          alt={p.name}
          width={36}
          height={36}
          style={{ imageRendering: 'pixelated', objectFit: 'contain' }}
          unoptimized
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: isSelected ? 700 : 500,
            color: isSelected ? '#cc0000' : '#e5e7eb',
            fontSize: '0.85rem',
            lineHeight: 1.2,
          }}
        >
          {p.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, mt: 0.25 }}>
          {p.types.map((t) => (
            <TypeBadge key={t} type={t} size="small" />
          ))}
        </Box>
      </Box>

      {StatusIcon && (
        <Tooltip title={STATUS_LABEL[catchStatus]} placement="left" arrow>
          <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <StatusIcon sx={{ fontSize: 14, color: STATUS_COLOR[catchStatus] }} />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
}

const PokemonList = forwardRef<PokemonListHandle, PokemonListProps>(
  (
    {
      pokemon,
      selectedId,
      searchQuery,
      onSearchChange,
      onSelectPokemon,
      onFilterToggle,
      activeFilterCount,
    },
    ref,
  ) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<ListImperativeAPI | null>(null);
    const statuses = usePokemonTracker((s) => s.statuses);

    useImperativeHandle(ref, () => ({
      focusSearch: () => searchRef.current?.focus(),
      scrollToIndex: (index: number) =>
        listRef.current?.scrollToRow({ index, align: 'smart' }),
    }));

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && pokemon.length > 0) {
          onSelectPokemon(pokemon[0].id);
        }
      },
      [pokemon, onSelectPokemon],
    );

    // react-window v2 rowComponent — receives index + style (+ any rowProps, but we use closure)
    const RowComponent = useCallback(
      ({
        index,
        style,
      }: {
        index: number;
        style: React.CSSProperties;
      }) => {
        const p = pokemon[index];
        return (
          <PokemonRow
            index={index}
            style={style}
            pokemon={p}
            isSelected={p.id === selectedId}
            catchStatus={statuses[p.id] ?? 'none'}
            onSelect={onSelectPokemon}
          />
        );
      },
      [pokemon, selectedId, statuses, onSelectPokemon],
    );

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: { xs: '100%', md: 320 },
          flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: 'background.paper',
        }}
      >
        {/* Search + filter bar */}
        <Box sx={{ p: 1, display: 'flex', gap: 0.5, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <TextField
            inputRef={searchRef}
            size="small"
            fullWidth
            placeholder="Search Pokémon..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.75 } }}
          />
          <IconButton size="small" onClick={onFilterToggle} sx={{ flexShrink: 0 }}>
            <Badge badgeContent={activeFilterCount} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }}>
              <FilterListIcon sx={{ fontSize: 18 }} />
            </Badge>
          </IconButton>
        </Box>

        {/* Count */}
        <Box sx={{ px: 1.5, py: 0.5, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
            {pokemon.length} / 251 Pokémon
          </Typography>
        </Box>

        {/* Virtualized list — react-window v2 is auto-sizing, fills parent */}
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* react-window v2: rowProps is extra data forwarded to rowComponent beyond index+style */}
          <List<Record<string, never>>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            listRef={listRef as Parameters<typeof List>[0]['listRef']}
            style={{ height: '100%', width: '100%' }}
            rowCount={pokemon.length}
            rowHeight={ROW_HEIGHT}
            rowComponent={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              RowComponent as Parameters<typeof List<Record<string, never>>>[0]['rowComponent']
            }
            rowProps={{}}
          />
        </Box>
      </Box>
    );
  },
);

PokemonList.displayName = 'PokemonList';
export default PokemonList;
