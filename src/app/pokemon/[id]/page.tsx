'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Pokedex from '@/components/Pokedex';

export default function PokemonPage() {
  const { id } = useParams<{ id: string }>();
  return <Pokedex pokemonId={id} />;
}
