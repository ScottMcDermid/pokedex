'use client';

import React from 'react';
import Chip from '@mui/material/Chip';
import { PokemonType, TYPE_COLORS } from '@/utils/pokemonTypes';

interface TypeBadgeProps {
  type: PokemonType;
  size?: 'small' | 'medium';
}

export default function TypeBadge({ type, size = 'small' }: TypeBadgeProps) {
  const bg = TYPE_COLORS[type];

  return (
    <Chip
      label={type}
      size={size}
      sx={{
        backgroundColor: bg,
        color: '#fff',
        fontWeight: 700,
        fontSize: size === 'small' ? '0.65rem' : '0.75rem',
        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        height: size === 'small' ? 20 : 24,
        '& .MuiChip-label': { px: 1 },
        borderRadius: 1,
      }}
    />
  );
}
