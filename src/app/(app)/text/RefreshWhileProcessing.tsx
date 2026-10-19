'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// The API splits new texts into terms in the background; poll until every listed text is done.
export default function RefreshWhileProcessing({ active }: { active: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => router.refresh(), 2000);
    return () => clearInterval(interval);
  }, [active, router]);
  return null;
}
