"use client";

import { cn } from '@/lib/utils';

export function MessengerLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        'flex h-screen w-full overflow-hidden bg-background',
        className
      )}
    >
      {children}
    </main>
  );
}