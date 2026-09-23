'use client';

/**
 * PokemonSprite — renders a Pokemon sprite from a local spritesheet.
 *
 * Spritesheets live in /public/sprites/{set}.png
 * Each sheet is 16 columns × ceil(251/16) rows of 56×56px cells.
 *
 * For Unown forms the sheet is 13 columns of 26 letters.
 *
 * Using CSS background-position instead of <img> means:
 *  - One HTTP request per sprite set (4 sets + 1 Unown) instead of 251+
 *  - No layout shift — the div already has fixed dimensions
 *  - Instant render after the single spritesheet loads
 */

import React from 'react';

// Spritesheet constants — must match build_spritesheets.py
const CELL = 56;        // pixel size of each cell
const COLS = 16;        // columns per Pokemon spritesheet
const UNOWN_COLS = 13;  // columns in the Unown spritesheet

export type SpriteSet = 'rb' | 'yellow' | 'gold' | 'crystal';

interface PokemonSpriteProps {
  /** National Pokédex ID (1–251) */
  id: number;
  /** Sprite variant to render */
  set: SpriteSet;
  /** Rendered size in pixels (the component scales the spritesheet cell down/up) */
  size: number;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders a single Pokemon sprite from the appropriate spritesheet.
 */
export function PokemonSprite({ id, set, size, alt, className, style }: PokemonSpriteProps) {
  const idx = id - 1; // 0-based index
  const col = idx % COLS;
  const row = Math.floor(idx / COLS);

  const bgX = col * CELL;
  const bgY = row * CELL;

  // Scale factor: if size=28 and CELL=56, scale=0.5 → background-size halved
  const scale = size / CELL;
  const sheetW = COLS * CELL * scale;
  // Total rows = ceil(251 / COLS) = 16
  const totalRows = Math.ceil(251 / COLS);
  const sheetH = totalRows * CELL * scale;

  return (
    <div
      role="img"
      aria-label={alt ?? `Pokemon #${id}`}
      className={className}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        imageRendering: 'pixelated',
        backgroundImage: `url(/sprites/${set}.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${sheetW}px ${sheetH}px`,
        backgroundPosition: `-${bgX * scale}px -${bgY * scale}px`,
        ...style,
      }}
    />
  );
}

// ─── Unown ────────────────────────────────────────────────────────────────────

const UNOWN_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface UnownSpriteProps {
  /** Single uppercase letter A–Z */
  letter: string;
  size: number;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders a single Unown form sprite from the Unown spritesheet.
 */
export function UnownSprite({ letter, size, alt, className, style }: UnownSpriteProps) {
  const idx = UNOWN_ALPHABET.indexOf(letter.toUpperCase());
  if (idx === -1) return null;

  const col = idx % UNOWN_COLS;
  const row = Math.floor(idx / UNOWN_COLS);

  const bgX = col * CELL;
  const bgY = row * CELL;

  const scale = size / CELL;
  const totalUnownCols = UNOWN_COLS;
  const totalUnownRows = Math.ceil(26 / UNOWN_COLS); // = 2
  const sheetW = totalUnownCols * CELL * scale;
  const sheetH = totalUnownRows * CELL * scale;

  return (
    <div
      role="img"
      aria-label={alt ?? `Unown ${letter}`}
      className={className}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        imageRendering: 'pixelated',
        backgroundImage: `url(/sprites/unown.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${sheetW}px ${sheetH}px`,
        backgroundPosition: `-${bgX * scale}px -${bgY * scale}px`,
        ...style,
      }}
    />
  );
}
