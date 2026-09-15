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
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MapIcon from '@mui/icons-material/Map';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlaceIcon from '@mui/icons-material/Place';
import Image from 'next/image';

import { usePokemonTracker, CatchStatus, UNOWN_FORMS } from '@/data/pokemonStore';

import { PokemonDefinition, LearnedMove, TmMove } from '@/utils/pokemonTypes';
import { TYPE_COLORS } from '@/utils/pokemonTypes';
import TypeBadge from '@/components/TypeBadge';
import { moves } from '@/data/moves';
import { pokemonById } from '@/data/pokemon';
import { tmDataGen1, tmDataGen2 } from '@/data/tmData';
import {
  rbSpriteUrl,
  yellowSpriteUrl,
  gsSpriteUrl,
  crystalSpriteUrl,
  unownFormSpriteUrl,
  padId,
  pokedexUrl,
  pokedexGSUrl,
  attackdexUrl,
  attackdexGSUrl,
  pokEarthUrl,
  pokEarthJohtoUrl,
  mapImageUrl,
  mapImageJohtoUrl,
  tokenizeLocation,
  KantoLocationInfo,
} from '@/utils/serebiiLinks';

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

function MoveRow({ entry, isLevelUp, gen }: { entry: LearnedMove | TmMove; isLevelUp?: boolean; gen: 1 | 2 }) {
  const [expanded, setExpanded] = useState(false);
  const moveName = 'move' in entry ? entry.move : '';
  const moveData = moves[moveName];

  const isTm = !isLevelUp && 'tm' in entry;
  const tmKey = isTm ? (entry as TmMove).tm : null;
  const tmInfo = tmKey ? (gen === 2 ? tmDataGen2[tmKey] : tmDataGen1[tmKey]) : null;

  const isExpandable = !!moveData;

  if (!moveData) {
    return (
      <TableRow>
        <TableCell sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
          {'level' in entry ? (entry.level ?? '—') : ('tm' in entry ? entry.tm : '—')}
        </TableCell>
        <TableCell sx={{ fontSize: '0.75rem' }}>{moveName}</TableCell>
        <TableCell colSpan={6} sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>—</TableCell>
      </TableRow>
    );
  }

  const typeColor = TYPE_COLORS[moveData.type];
  const yellowOnly = 'yellowOnly' in entry && entry.yellowOnly;
  const crystalOnly = 'crystalOnly' in entry && entry.crystalOnly;
  const attackLink = gen === 2 ? attackdexGSUrl(moveData.name) : attackdexUrl(moveData.name);

  return (
    <>
      <TableRow
        sx={{
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.03)' },
          cursor: isExpandable ? 'pointer' : 'default',
        }}
        onClick={isExpandable ? () => setExpanded((v) => !v) : undefined}
      >
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
                  {crystalOnly && (
                    <Chip label="Crystal" size="small" sx={{ height: 14, fontSize: '0.55rem', backgroundColor: '#4fc3f7', color: '#000', '& .MuiChip-label': { px: 0.5 } }} />
                  )}
                </Box>
              ) : '—')
          }
        </TableCell>
        {/* Move name */}
        <TableCell>
          <Link
            href={attackLink}
            target="_blank"
            rel="noreferrer"
            underline="hover"
            sx={{ color: '#e5e7eb', fontSize: '0.75rem' }}
            onClick={(e) => e.stopPropagation()}
          >
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
        {/* Expand chevron */}
        <TableCell sx={{ fontSize: '0.68rem', color: 'text.secondary', width: 24, pr: 1 }}>
          <ExpandMoreIcon
            sx={{
              fontSize: '0.9rem',
              color: 'text.secondary',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
              display: 'block',
            }}
          />
        </TableCell>
      </TableRow>

      {/* Expandable details row */}
      <TableRow sx={{ backgroundColor: 'rgba(255,255,255,0.015)' }}>
        <TableCell colSpan={8} sx={{ py: 0, border: 0 }}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ px: 1.5, py: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {isTm && tmInfo && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75 }}>
                  <PlaceIcon sx={{ fontSize: '0.8rem', color: '#cc0000', mt: '2px', flexShrink: 0 }} />
                  <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary', lineHeight: 1.5 }}>
                    {tmInfo.location}
                  </Typography>
                </Box>
              )}
              <Typography variant="caption" sx={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', pl: isTm && tmInfo ? '1.55rem' : 0, lineHeight: 1.5 }}>
                {moveData.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface EvolutionThreshold {
  level: number;
  name: string;
}

function MoveTable({ entries, isLevelUp, evolutionThresholds, gen }: { entries: (LearnedMove | TmMove)[]; isLevelUp?: boolean; evolutionThresholds?: EvolutionThreshold[]; gen: 1 | 2 }) {
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
            <TableCell sx={{ width: 24 }} />
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
                <MoveRow entry={entry} isLevelUp={isLevelUp} gen={gen} />
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
        const spriteUrl = p.generation === 2 ? gsSpriteUrl(p.id) : rbSpriteUrl(p.id);
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
                    {evoInfo.method === 'friendship' && (evoInfo.time ? `Friendship (${evoInfo.time})` : 'Friendship')}
                    {evoInfo.method === 'item' && evoInfo.item}
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
              <Image src={spriteUrl} alt={p.name} width={48} height={48} style={{ imageRendering: 'pixelated' }} unoptimized />
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

  const isJohto = info.region === 'johto';
  const earthUrl = isJohto ? pokEarthJohtoUrl(info.slug) : pokEarthUrl(info.slug);
  const imgUrl = isJohto ? mapImageJohtoUrl(info.mapNum) : mapImageUrl(info.mapNum);

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
          src={imgUrl}
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
          href={earthUrl}
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

// ─── CatchToggleButton ────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<CatchStatus, { label: string; color: string; bg: string; border: string; Icon: React.ElementType }> = {
  none: {
    label: 'Not seen',
    color: '#9ca3af',
    bg: 'rgba(156,163,175,0.08)',
    border: 'rgba(156,163,175,0.25)',
    Icon: RemoveCircleOutlineIcon,
  },
  seen: {
    label: 'Seen',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.4)',
    Icon: VisibilityIcon,
  },
  caught: {
    label: 'Caught',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.12)',
    border: 'rgba(34,197,94,0.4)',
    Icon: CatchingPokemonIcon,
  },
};

function CatchToggleButton({ pokemonId }: { pokemonId: number }) {
  const cycleStatus = usePokemonTracker((s) => s.cycleStatus);
  const status: CatchStatus = usePokemonTracker((s) => s.statuses[pokemonId] ?? 'none');
  const cfg = STATUS_CONFIG[status];
  const { Icon } = cfg;

  return (
    <Button
      size="small"
      onClick={() => cycleStatus(pokemonId)}
      startIcon={<Icon sx={{ fontSize: '0.95rem !important' }} />}
      sx={{
        color: cfg.color,
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 1,
        fontSize: '0.72rem',
        fontWeight: 600,
        textTransform: 'none',
        px: 1.25,
        py: 0.4,
        minWidth: 0,
        '&:hover': { backgroundColor: cfg.bg, filter: 'brightness(1.15)' },
        transition: 'color 0.15s, background-color 0.15s, border-color 0.15s',
      }}
    >
      {cfg.label}
    </Button>
  );
}

// ─── UnownFormsCollector ──────────────────────────────────────────────────────

const FORM_STATUS_STYLE: Record<CatchStatus, { border: string; bg: string; labelColor: string }> = {
  none:   { border: 'rgba(156,163,175,0.2)', bg: 'rgba(156,163,175,0.05)', labelColor: '#6b7280' },
  seen:   { border: 'rgba(245,158,11,0.5)',  bg: 'rgba(245,158,11,0.1)',   labelColor: '#f59e0b' },
  caught: { border: 'rgba(34,197,94,0.5)',   bg: 'rgba(34,197,94,0.1)',    labelColor: '#22c55e' },
};

function UnownFormTile({ letter }: { letter: string }) {
  const status: CatchStatus = usePokemonTracker((s) => s.unownFormStatuses[letter] ?? 'none');
  const cycleUnownForm = usePokemonTracker((s) => s.cycleUnownForm);
  const style = FORM_STATUS_STYLE[status];

  return (
    <Box
      onClick={() => cycleUnownForm(letter)}
      title={`Unown ${letter} — ${status}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.25,
        cursor: 'pointer',
        p: 0.75,
        borderRadius: 1,
        border: `1px solid ${style.border}`,
        backgroundColor: style.bg,
        userSelect: 'none',
        transition: 'background-color 0.15s, border-color 0.15s',
        '&:hover': { backgroundColor: 'rgba(255,255,255,0.07)' },
      }}
    >
      <Image
        src={unownFormSpriteUrl(letter)}
        alt={`Unown ${letter}`}
        width={40}
        height={40}
        style={{ imageRendering: 'pixelated' }}
        unoptimized
      />
      <Typography
        variant="caption"
        sx={{ fontSize: '0.65rem', fontWeight: 700, color: style.labelColor, lineHeight: 1 }}
      >
        {letter}
      </Typography>
    </Box>
  );
}

function UnownFormsCollector() {
  const formStatuses = usePokemonTracker((s) => s.unownFormStatuses);
  const caught = UNOWN_FORMS.filter((l) => formStatuses[l] === 'caught').length;
  const seen   = UNOWN_FORMS.filter((l) => formStatuses[l] === 'seen').length;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: '#cc0000', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}
        >
          Unown Forms
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '0.68rem', color: 'text.secondary' }}>
          <span style={{ color: '#22c55e', fontWeight: 600 }}>{caught}</span>
          {' caught · '}
          <span style={{ color: '#f59e0b', fontWeight: 600 }}>{seen}</span>
          {' seen · '}
          {UNOWN_FORMS.length - caught - seen} remaining
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
        {UNOWN_FORMS.map((letter) => (
          <UnownFormTile key={letter} letter={letter} />
        ))}
      </Box>
      <Typography variant="caption" sx={{ display: 'block', mt: 1, fontSize: '0.65rem', color: 'text.secondary' }}>
        Click a tile to cycle: not seen → seen → caught → not seen
      </Typography>
    </Box>
  );
}

/** Map game version to display color */
const VERSION_COLOR: Record<string, string> = {
  Red: '#cc0000',
  Blue: '#3b5998',
  Yellow: '#f8d030',
  Gold: '#b8860b',
  Silver: '#708090',
  Crystal: '#4fc3f7',
};

/** Map game version to text color (dark versions need dark text) */
function versionTextColor(version: string): string {
  return version === 'Yellow' ? '#000' : '#fff';
}

export default function PokemonDetail({ pokemon, onNavigate }: PokemonDetailProps) {
  const gen: 1 | 2 = pokemon.generation ?? 1;
  const isGen2 = gen === 2;

  const hasAltLearnset = isGen2 ? !!pokemon.learnsetCrystal : !!pokemon.learnsetYellow;
  const [learnsetTab, setLearnsetTab] = useState<'main' | 'alt'>('main');

  const activeLearnset = learnsetTab === 'alt'
    ? (isGen2 ? (pokemon.learnsetCrystal ?? pokemon.learnsetRB) : (pokemon.learnsetYellow ?? pokemon.learnsetRB))
    : pokemon.learnsetRB;

  const dexUrl = isGen2 ? pokedexGSUrl(pokemon.id) : pokedexUrl(pokemon.id);

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
          {isGen2 ? (
            <>
              <Box sx={{ textAlign: 'center' }}>
                <Image src={gsSpriteUrl(pokemon.id)} alt={`${pokemon.name} GS`} width={80} height={80} style={{ imageRendering: 'pixelated' }} unoptimized />
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.6rem' }}>Gold/Silver</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Image src={crystalSpriteUrl(pokemon.id)} alt={`${pokemon.name} Crystal`} width={80} height={80} style={{ imageRendering: 'pixelated' }} unoptimized />
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.6rem' }}>Crystal</Typography>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ textAlign: 'center' }}>
                <Image src={rbSpriteUrl(pokemon.id)} alt={`${pokemon.name} RB`} width={80} height={80} style={{ imageRendering: 'pixelated' }} unoptimized />
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.6rem' }}>Red/Blue</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Image src={yellowSpriteUrl(pokemon.id)} alt={`${pokemon.name} Yellow`} width={80} height={80} style={{ imageRendering: 'pixelated' }} unoptimized />
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.6rem' }}>Yellow</Typography>
              </Box>
            </>
          )}
        </Box>

        {/* Info */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              #{padId(pokemon.id)}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1 }}>
              <Link href={dexUrl} target="_blank" rel="noreferrer" underline="hover" sx={{ color: 'inherit' }}>
                {pokemon.name}
              </Link>
            </Typography>
            <Chip
              label={`Gen ${gen}`}
              size="small"
              sx={{ height: 16, fontSize: '0.6rem', backgroundColor: isGen2 ? '#b8860b' : '#cc0000', color: '#fff', '& .MuiChip-label': { px: 0.75 } }}
            />
            <CatchToggleButton pokemonId={pokemon.id} />
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
        <Box sx={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 0.5, maxWidth: 340 }}>
          {isGen2 ? (
            // Gen 2: split special stats
            [
              ['HP', pokemon.baseStats.hp],
              ['Attack', pokemon.baseStats.attack],
              ['Defense', pokemon.baseStats.defense],
              ['Sp. Atk', pokemon.baseStats.spAttack],
              ['Sp. Def', pokemon.baseStats.spDefense],
              ['Speed', pokemon.baseStats.speed],
            ].map(([label, val]) => (
              <React.Fragment key={label as string}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', alignSelf: 'center' }}>
                  {label}
                </Typography>
                <StatBar value={(val ?? 0) as number} max={label === 'HP' ? 255 : 180} />
              </React.Fragment>
            ))
          ) : (
            // Gen 1: single Special stat
            [
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
                <StatBar value={(val ?? 0) as number} max={label === 'HP' ? 255 : 180} />
              </React.Fragment>
            ))
          )}
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
            const versionColor = VERSION_COLOR[loc.version] ?? '#888';
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
                    color: versionTextColor(loc.version),
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
          {hasAltLearnset && (
            <Tabs
              value={learnsetTab}
              onChange={(_, v) => setLearnsetTab(v)}
              sx={{ minHeight: 28, '& .MuiTab-root': { minHeight: 28, py: 0, fontSize: '0.72rem' } }}
            >
              <Tab label={isGen2 ? 'Gold/Silver' : 'Red/Blue'} value="main" />
              <Tab label={isGen2 ? 'Crystal' : 'Yellow'} value="alt" />
            </Tabs>
          )}
          {!hasAltLearnset && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              (same in all versions)
            </Typography>
          )}
        </Box>
        <MoveTable
          entries={activeLearnset}
          isLevelUp
          gen={gen}
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
          <MoveTable entries={pokemon.tmMoves} isLevelUp={false} gen={gen} />
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
                const attackLink = isGen2 ? attackdexGSUrl(moveName) : attackdexUrl(moveName);
                return (
                  <Chip
                    key={moveName}
                    label={moveName}
                    size="small"
                    component="a"
                    href={attackLink}
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

      {/* ── Unown Forms ── */}
      {pokemon.id === 201 && (
        <>
          <Divider />
          <UnownFormsCollector />
        </>
      )}

      {/* bottom padding */}
      <Box sx={{ height: 16 }} />
    </Box>
  );
}
