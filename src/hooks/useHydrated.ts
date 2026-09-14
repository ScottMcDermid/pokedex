'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true after the component has mounted on the client.
 * Used to avoid SSR/hydration mismatches.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
