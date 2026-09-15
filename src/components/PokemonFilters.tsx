'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { PokemonType, GameVersion, TYPE_COLORS, ALL_TYPES, ALL_VERSIONS } from '@/utils/pokemonTypes';
import { CatchStatusFilter } from '@/data/pokemonStore';

interface PokemonFiltersProps {
  typeFilters: PokemonType[];
  versionFilters: GameVersion[];
  catchStatusFilters: CatchStatusFilter[];
  onTypeFilterChange: (types: PokemonType[]) => void;
  onVersionFilterChange: (versions: GameVersion[]) => void;
  onCatchStatusFilterChange: (statuses: CatchStatusFilter[]) => void;
  onClear: () => void;
}

const VERSION_COLORS: Record<GameVersion, string> = {
  Red: '#cc0000',
  Blue: '#3b5998',
  Yellow: '#f8d030',
  Gold: '#b8860b',
  Silver: '#708090',
  Crystal: '#4fc3f7',
};

const CATCH_STATUS_OPTIONS: { value: CatchStatusFilter; label: string; color: string }[] = [
  { value: 'caught', label: 'Caught', color: '#4caf50' },
  { value: 'seen',   label: 'Seen',   color: '#ffb300' },
  { value: 'unseen', label: 'Unseen', color: '#546e7a' },
];

export default function PokemonFilters({
  typeFilters,
  versionFilters,
  catchStatusFilters,
  onTypeFilterChange,
  onVersionFilterChange,
  onCatchStatusFilterChange,
  onClear,
}: PokemonFiltersProps) {
  const toggleType = (type: PokemonType) => {
    if (typeFilters.includes(type)) {
      onTypeFilterChange(typeFilters.filter((t) => t !== type));
    } else {
      onTypeFilterChange([...typeFilters, type]);
    }
  };

  const toggleVersion = (version: GameVersion) => {
    if (versionFilters.includes(version)) {
      onVersionFilterChange(versionFilters.filter((v) => v !== version));
    } else {
      onVersionFilterChange([...versionFilters, version]);
    }
  };

  const toggleCatchStatus = (status: CatchStatusFilter) => {
    if (catchStatusFilters.includes(status)) {
      onCatchStatusFilterChange(catchStatusFilters.filter((s) => s !== status));
    } else {
      onCatchStatusFilterChange([...catchStatusFilters, status]);
    }
  };

  const hasFilters = typeFilters.length > 0 || versionFilters.length > 0 || catchStatusFilters.length > 0;

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.8rem' }}>
          Filters
        </Typography>
        {hasFilters && (
          <Button size="small" onClick={onClear} sx={{ fontSize: '0.7rem', py: 0, color: '#cc0000' }}>
            Clear all
          </Button>
        )}
      </Box>

      <Divider />

      {/* Version filter */}
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Version
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {ALL_VERSIONS.map((version) => {
            const active = versionFilters.includes(version);
            const color = VERSION_COLORS[version];
            return (
              <Chip
                key={version}
                label={version}
                size="small"
                onClick={() => toggleVersion(version)}
                sx={{
                  fontSize: '0.7rem',
                  height: 24,
                  backgroundColor: active ? color : 'rgba(255,255,255,0.08)',
                  color: active ? (version === 'Yellow' ? '#000' : '#fff') : 'text.secondary',
                  // Crystal uses a light blue — keep white text for readability
                  fontWeight: active ? 700 : 400,
                  border: `1px solid ${active ? color : 'rgba(255,255,255,0.15)'}`,
                  '&:hover': { backgroundColor: active ? color : 'rgba(255,255,255,0.12)' },
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Divider />

      {/* Type filter */}
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Type
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {ALL_TYPES.map((type) => {
            const active = typeFilters.includes(type);
            const color = TYPE_COLORS[type];
            return (
              <Chip
                key={type}
                label={type}
                size="small"
                onClick={() => toggleType(type)}
                sx={{
                  fontSize: '0.7rem',
                  height: 24,
                  backgroundColor: active ? color : 'rgba(255,255,255,0.08)',
                  color: active ? '#fff' : 'text.secondary',
                  fontWeight: active ? 700 : 400,
                  textShadow: active ? '0 1px 2px rgba(0,0,0,0.4)' : 'none',
                  border: `1px solid ${active ? color : 'rgba(255,255,255,0.15)'}`,
                  '&:hover': { backgroundColor: active ? color : 'rgba(255,255,255,0.12)' },
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Divider />

      {/* Catch status filter */}
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Status
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {CATCH_STATUS_OPTIONS.map(({ value, label, color }) => {
            const active = catchStatusFilters.includes(value);
            return (
              <Chip
                key={value}
                label={label}
                size="small"
                onClick={() => toggleCatchStatus(value)}
                sx={{
                  fontSize: '0.7rem',
                  height: 24,
                  backgroundColor: active ? color : 'rgba(255,255,255,0.08)',
                  color: active ? '#fff' : 'text.secondary',
                  fontWeight: active ? 700 : 400,
                  border: `1px solid ${active ? color : 'rgba(255,255,255,0.15)'}`,
                  '&:hover': { backgroundColor: active ? color : 'rgba(255,255,255,0.12)' },
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
