'use client';

import { usePathname } from 'next/navigation';

import { useUtmBlockGuard } from './useUtmBlockGuard';

export function UtmBlockGuard() {
  const pathname = usePathname();
  useUtmBlockGuard({ pathname });
  return null;
}
