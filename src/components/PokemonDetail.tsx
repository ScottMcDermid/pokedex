'use client';

import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MapIcon from '@mui/icons-material/Map';
import Image from 'next/image';

import { PokemonDefinition, LearnedMove, TmMove } from '@/utils/pokemonTypes';
import { TYPE_COLORS } from '@/utils/pokemonTypes';
import TypeBadge from '@/components/TypeBadge';
import { moves } from '@/data/moves';
import { pokemonById } from '@/data/pokemon';
import { rbSpriteUrl, yellowSpriteUrl, artUrl, padId, pokedexUrl, attackdexUrl, pokEarthUrl, mapImageUrl, tokenizeLocation, KantoLocationInfo } from '@/utils/serebiiLinks';

interface PokemonDetailProps {
  pokemon: PokemonDefinition;
  onNavigate: (id: number) => void;
}

function StatBar({ value, max = 250 }: { value: number; max?: number }) {
  const pct = Math.min((value / max) * 100, 100);
  const color = value >= 100 ? '#22c55e' : value >= 70 ? '#f59e0b' : '#ef4444';
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="caption" sx={{ minWidth: 28, textAlign: 'right', fontFamily: 'monospace', color: 'text.secondary' }}>
        {value}
      </Typography>
      <Box sx={{ flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: 3, transition: 'width 0.3s' }} />
      </Box>
    </Box>
  );
}

function MoveRow({ entry, isLevelUp }: { entry: LearnedMove | TmMove; isLevelUp?: boolean }) {
  const moveName = 'move' in entry ? entry.move : '';
  const moveData = moves[moveName];

  if (!moveData) {
    return (
      <TableRow>
        <TableCell sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
          {'level' in entry ? (entry.level ?? '—') : ('tm' in entry ? entry.tm : '—')}
        </TableCell>
        <TableCell sx={{ fontSize: '0.75rem' }}>{moveName}</TableCell>
        <TableCell colSpan={5} sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>—</TableCell>
      </TableRow>
    );
  }

  const typeColor = TYPE_COLORS[moveData.type];
  const yellowOnly = 'yellowOnly' in entry && entry.yellowOnly;

  return (
    <TableRow sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.03)' } }}>
      {/* Level or TM */}
      <TableCell sx={{ color: 'text.secondary', fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
        {isLevelUp
          ? ('level' in entry ? (entry.level ?? '—') : '—')
          : ('tm' in entry ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <span>{(entry as TmMove).tm}</span>
                {yellowOnly && (
                  <Chip label="Yellow" size="small" sx={{ height: 14, fontSize: '0.55rem', backgroundColor: '#f8d030', color: '#000', '& .MuiChip-label': { px: 0.5 } }} />
                )}
              </Box>
            ) : '—')
        }
      </TableCell>
      {/* Move name */}
      <TableCell>
        <Link href={attackdexUrl(moveData.name)} target="_blank" rel="noreferrer" underline="hover" sx={{ color: '#e5e7eb', fontSize: '0.75rem' }}>
          {moveData.name}
        </Link>
      </TableCell>
      {/* Type */}
      <TableCell>
        <Chip
          label={moveData.type}
          size="small"
          sx={{ backgroundColor: typeColor, color: '#fff', fontWeight: 700, fontSize: '0.6rem', height: 18, textShadow: '0 1px 2px rgba(0,0,0,0.4)', '& .MuiChip-label': { px: 0.75 }, borderRadius: 0.5 }}
        />
      </TableCell>
      {/* Power */}
      <TableCell sx={{ fontSize: '0.72rem', color: moveData.power ? 'text.primary' : 'text.secondary' }}>
        {moveData.power ?? '—'}
      </TableCell>
      {/* Accuracy */}
      <TableCell sx={{ fontSize: '0.72rem', color: moveData.accuracy ? 'text.primary' : 'text.secondary' }}>
        {moveData.accuracy != null ? `${moveData.accuracy}%` : '—'}
      </TableCell>
      {/* PP */}
      <TableCell sx={{ fontSize: '0.72rem' }}>{moveData.pp}</TableCell>
      {/* Effect % */}
      <TableCell sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
        {moveData.effectPct != null ? `${moveData.effectPct}%` : '—'}
      </TableCell>
      {/* Description */}
      <TableCell sx={{ fontSize: '0.68rem', color: 'text.secondary', maxWidth: 200 }}>
        {moveData.description}
      </TableCell>
    </TableRow>
  );
}

interface EvolutionThreshold {
  level: number;
  name: string;
}

function MoveTable({ entries, isLevelUp, evolutionThresholds }: { entries: (LearnedMove | TmMove)[]; isLevelUp?: boolean; evolutionThresholds?: EvolutionThreshold[] }) {
  // Track which evolution thresholds have already been inserted
  const insertedThresholds = new Set<number>();

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table size="small" sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '0.65rem', color: 'text.secondary', whiteSpace: 'nowrap' }}>
              {isLevelUp ? 'Lv' : 'TM/HM'}
            </TableCell>
            <TableCell sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>Move</TableCell>
            <TableCell sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>Type</TableCell>
            <TableCell sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>Pwr</TableCell>
            <TableCell sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>Acc</TableCell>
            <TableCell sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>PP</TableCell>
            <TableCell sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>Eff%</TableCell>
            <TableCell sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry, i) => {
            const entryLevel = isLevelUp && 'level' in entry ? (entry.level ?? 0) : null;
            const dividers: React.ReactNode[] = [];

            if (isLevelUp && entryLevel !== null && evolutionThresholds) {
              for (const threshold of evolutionThresholds) {
                if (!insertedThresholds.has(threshold.level) && entryLevel >= threshold.level) {
                  insertedThresholds.add(threshold.level);
                  dividers.push(
                    <TableRow key={`evo-${threshold.level}`}>
                      <TableCell
                        colSpan={8}
                        sx={{
                          py: 0.5,
                          px: 1,
                          borderBottom: '1px solid rgba(204,0,0,0.35)',
                          borderTop: '1px solid rgba(204,0,0,0.35)',
                          backgroundColor: 'rgba(204,0,0,0.07)',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.62rem',
                            color: '#cc0000',
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Evolves into {threshold.name} at Lv. {threshold.level}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                }
              }
            }

            return (
              <React.Fragment key={i}>
                {dividers}
                <MoveRow entry={entry} isLevelUp={isLevelUp} />
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}

function EvolutionChain({ pokemon, onNavigate }: { pokemon: PokemonDefinition; onNavigate: (id: number) => void }) {
  // Walk up to find the root of the chain
  const getRoot = (p: PokemonDefinition): PokemonDefinition => {
    if (!p.evolvesFrom) return p;
    const parent = pokemonById[p.evolvesFrom.id];
    return parent ? getRoot(parent) : p;
  };

  // Build chain from root
  const buildChain = (p: PokemonDefinition): PokemonDefinition[] => {
    const chain: PokemonDefinition[] = [p];
    if (p.evolvesTo) {
      for (const evo of p.evolvesTo) {
        const next = pokemonById[evo.id];
        if (next) chain.push(...buildChain(next));
      }
    }
    return chain;
  };

  const root = getRoot(pokemon);
  const chain = buildChain(root);

  if (chain.length <= 1) {
    return (
      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
        Does not evolve.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
      {chain.map((p, i) => {
        const evoInfo = i > 0 ? chain[i - 1].evolvesTo?.find((e) => e.id === p.id) : null;
        return (
          <React.Fragment key={p.id}>
            {i > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'text.secondary' }}>
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
                {evoInfo && (
                  <Typography variant="caption" sx={{ fontSize: '0.6rem', textAlign: 'center', maxWidth: 60 }}>
                    {evoInfo.method === 'level' && `Lv. ${evoInfo.level}`}
                    {evoInfo.method === 'stone' && evoInfo.stone}
                    {evoInfo.method === 'trade' && 'Trade'}
                  </Typography>
                )}
              </Box>
            )}
            <Box
              onClick={() => onNavigate(p.id)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.25,
                cursor: 'pointer',
                p: 1,
                borderRadius: 1,
                border: p.id === pokemon.id ? '1px solid #cc0000' : '1px solid rgba(255,255,255,0.1)',
                backgroundColor: p.id === pokemon.id ? 'rgba(204,0,0,0.1)' : 'rgba(255,255,255,0.03)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.07)' },
              }}
            >
              <Image src={rbSpriteUrl(p.id)} alt={p.name} width={48} height={48} style={{ imageRendering: 'pixelated' }} unoptimized />
              <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                #{padId(p.id)}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: p.id === pokemon.id ? 700 : 400 }}>
                {p.name}
              </Typography>
            </Box>
          </React.Fragment>
        );
      })}
    </Box>
  );
}

// ─── PlaceTooltip ─────────────────────────────────────────────────────────────

function PlaceTooltip({
  text,
  info,
  versionColor,
}: {
  text: string;
  info: KantoLocationInfo;
  versionColor: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  // Close when the user touches outside the trigger element
  useEffect(() => {
    if (!open) return;
    function handleOutsideTouch(e: TouchEvent) {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('touchstart', handleOutsideTouch);
    return () => document.removeEventListener('touchstart', handleOutsideTouch);
  }, [open]);

  const tooltipContent = (
    <Box sx={{ p: 0.5, display: 'flex', flexDirection: 'column', gap: 1, maxWidth: 340 }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: 180,
          aspectRatio: '4/3',
          borderRadius: 1,
          overflow: 'hidden',
          backgroundColor: 'rgba(0,0,0,0.3)',
          border: `1px solid ${versionColor}44`,
        }}
      >
        <Image
          src={mapImageUrl(info.mapNum)}
          alt={info.label}
          fill
          style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
          unoptimized
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#e5e7eb' }}>
          {info.label}
        </Typography>
        <Link
          href={pokEarthUrl(info.slug)}
          target="_blank"
          rel="noreferrer"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.25, fontSize: '0.8rem', color: versionColor, whiteSpace: 'nowrap' }}
        >
          <MapIcon sx={{ fontSize: 14 }} />
          Pokéarth
        </Link>
      </Box>
    </Box>
  );

  return (
    <Tooltip
      title={tooltipContent}
      placement="right"
      arrow
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      enterDelay={150}
      enterNextDelay={80}
      disableTouchListener
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: '#1a1a1a',
            border: `1px solid ${versionColor}66`,
            borderRadius: 1.5,
            p: 1,
            boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px ${versionColor}33`,
            maxWidth: 360,
          },
        },
        arrow: { sx: { color: `${versionColor}66` } },
      }}
    >
      <Box
        ref={triggerRef}
        component="span"
        onTouchStart={(e) => {
          e.preventDefault(); // prevent long-press context menu / mouse event synthesis
          setOpen((prev) => !prev);
        }}
        sx={{
          cursor: 'help',
          borderBottom: '1px dashed rgba(255,255,255,0.35)',
          color: open ? versionColor : 'text.primary',
          borderBottomColor: open ? versionColor : 'rgba(255,255,255,0.35)',
          '&:hover': { color: versionColor, borderBottomColor: versionColor },
          transition: 'color 0.1s, border-color 0.1s',
        }}
      >
        {text}
      </Box>
    </Tooltip>
  );
}

export default function PokemonDetail({ pokemon, onNavigate }: PokemonDetailProps) {
  const hasYellowLearnset = !!pokemon.learnsetYellow;
  const [learnsetTab, setLearnsetTab] = useState<'rb' | 'yellow'>('rb');

  const activeLearnset = learnsetTab === 'yellow' && pokemon.learnsetYellow
    ? pokemon.learnsetYellow
    : pokemon.learnsetRB;

  const SectionHeader = ({ title }: { title: string }) => (
    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#cc0000', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem', mb: 1 }}>
      {title}
    </Typography>
  );

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: { xs: 1.5, md: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* ── Header ── */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Sprites */}
        <Box sx={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Image src={rbSpriteUrl(pokemon.id)} alt={`${pokemon.name} RB`} width={80} height={80} style={{ imageRendering: 'pixelated' }} unoptimized />
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.6rem' }}>Red/Blue</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Image src={yellowSpriteUrl(pokemon.id)} alt={`${pokemon.name} Yellow`} width={80} height={80} style={{ imageRendering: 'pixelated' }} unoptimized />
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.6rem' }}>Yellow</Typography>
          </Box>
          <Box sx={{ textAlign: 'center', display: { xs: 'none', sm: 'block' } }}>
            <Image src={artUrl(pokemon.id)} alt={`${pokemon.name} art`} width={80} height={80} style={{ objectFit: 'contain' }} unoptimized />
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.6rem' }}>Art</Typography>
          </Box>
        </Box>

        {/* Info */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              #{padId(pokemon.id)}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1 }}>
              <Link href={pokedexUrl(pokemon.id)} target="_blank" rel="noreferrer" underline="hover" sx={{ color: 'inherit' }}>
                {pokemon.name}
              </Link>
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', mt: 0.25 }}>
            {pokemon.classification}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.75, mt: 0.75, flexWrap: 'wrap' }}>
            {pokemon.types.map((t) => (
              <TypeBadge key={t} type={t} size="medium" />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
              Height: <span style={{ color: '#e5e7eb' }}>{pokemon.height}</span>
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
              Weight: <span style={{ color: '#e5e7eb' }}>{pokemon.weight}</span>
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
              Catch Rate: <span style={{ color: '#e5e7eb' }}>{pokemon.captureRate}</span>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* ── Base Stats ── */}
      <Box>
        <SectionHeader title="Base Stats" />
        <Box sx={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 0.5, maxWidth: 340 }}>
          {[
            ['HP', pokemon.baseStats.hp],
            ['Attack', pokemon.baseStats.attack],
            ['Defense', pokemon.baseStats.defense],
            ['Special', pokemon.baseStats.special],
            ['Speed', pokemon.baseStats.speed],
          ].map(([label, val]) => (
            <React.Fragment key={label as string}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', alignSelf: 'center' }}>
                {label}
              </Typography>
              <StatBar value={val as number} max={label === 'HP' ? 255 : 180} />
            </React.Fragment>
          ))}
        </Box>
      </Box>

      <Divider />

      {/* ── Evolution ── */}
      <Box>
        <SectionHeader title="Evolution Chain" />
        <EvolutionChain pokemon={pokemon} onNavigate={onNavigate} />
      </Box>

      <Divider />

      {/* ── Version Locations ── */}
      <Box>
        <SectionHeader title="Version Availability & Locations" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {pokemon.locations.map((loc) => {
            const versionColor =
              loc.version === 'Red' ? '#cc0000' : loc.version === 'Blue' ? '#3b5998' : '#f8d030';
            const segments = tokenizeLocation(loc.location);

            return (
              <Box key={loc.version} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                {/* Version badge */}
                <Chip
                  label={loc.version}
                  size="small"
                  sx={{
                    flexShrink: 0,
                    height: 20,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    backgroundColor: versionColor,
                    color: loc.version === 'Yellow' ? '#000' : '#fff',
                    '& .MuiChip-label': { px: 0.75 },
                    borderRadius: 0.5,
                    mt: '2px',
                  }}
                />

                {/* Tokenised location line */}
                <Box component="span" sx={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'text.primary' }}>
                  {segments.map((seg, i) => {
                    if (seg.kind === 'text') {
                      return <span key={i}>{seg.text}</span>;
                    }
                    // place segment — render with tooltip
                    return (
                      <PlaceTooltip
                        key={i}
                        text={seg.text}
                        info={seg.info}
                        versionColor={versionColor}
                      />
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Divider />

      {/* ── Learnset ── */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <SectionHeader title="Level-Up Moves" />
          {hasYellowLearnset && (
            <Tabs
              value={learnsetTab}
              onChange={(_, v) => setLearnsetTab(v)}
              sx={{ minHeight: 28, '& .MuiTab-root': { minHeight: 28, py: 0, fontSize: '0.72rem' } }}
            >
              <Tab label="Red/Blue" value="rb" />
              <Tab label="Yellow" value="yellow" />
            </Tabs>
          )}
          {!hasYellowLearnset && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              (same in all versions)
            </Typography>
          )}
        </Box>
        <MoveTable
          entries={activeLearnset}
          isLevelUp
          evolutionThresholds={
            pokemon.evolvesTo
              ?.filter((e) => e.method === 'level' && e.level != null)
              .map((e) => ({ level: e.level!, name: pokemonById[e.id]?.name ?? `#${e.id}` }))
          }
        />
      </Box>

      <Divider />

      {/* ── TM/HM Moves ── */}
      <Box>
        <SectionHeader title="TM / HM Moves" />
        {pokemon.tmMoves.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
            Cannot learn any TMs or HMs.
          </Typography>
        ) : (
          <MoveTable entries={pokemon.tmMoves} isLevelUp={false} />
        )}
      </Box>

      {/* ── Special Moves ── */}
      {pokemon.specialMoves && pokemon.specialMoves.length > 0 && (
        <>
          <Divider />
          <Box>
            <SectionHeader title="Special / Tutor Moves" />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {pokemon.specialMoves.map((moveName) => {
                const move = moves[moveName];
                return (
                  <Chip
                    key={moveName}
                    label={moveName}
                    size="small"
                    component="a"
                    href={attackdexUrl(moveName)}
                    target="_blank"
                    rel="noreferrer"
                    clickable
                    sx={{
                      fontSize: '0.72rem',
                      height: 24,
                      backgroundColor: move ? TYPE_COLORS[move.type] : 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        </>
      )}

      {/* bottom padding */}
      <Box sx={{ height: 16 }} />
    </Box>
  );
}
