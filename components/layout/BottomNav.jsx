'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  {
    href: '/inicio',
    label: 'Início',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M3 12L12 3l9 9" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21V12h6v9" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 10.5V21h14V10.5" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: '/plano',
    label: 'Plano',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="3" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2"/>
        <path d="M8 2v4M16 2v4M3 10h18" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/receitas',
    label: 'Receitas',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M12 2C8 2 5 5 5 9c0 2.4 1.1 4.5 2.8 5.9L9 21h6l1.2-6.1C17.9 13.5 19 11.4 19 9c0-4-3-7-7-7z" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21h6" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/treinos',
    label: 'Treinos',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M6 4v16M18 4v16M3 8h3M18 8h3M3 16h3M18 16h3M6 12h12" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: '/desafios',
    label: 'Desafios',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M8 21h8M12 17v4M17 3H7L5 9c0 3.9 3.1 7 7 7s7-3.1 7-7L17 3z" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 9H3M19 9h2" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/chat',
    label: 'Selva IA',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: '/conta',
    label: 'Conta',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={active ? '#E8A838' : '#6b7280'} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D0D0D] border-t border-zinc-800 max-w-md mx-auto">
      <div className="flex items-center justify-around py-2 pb-safe">
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-0.5 px-1.5 py-1"
            >
              {tab.icon(active)}
              <span className={`text-[10px] font-medium ${active ? 'text-amber-400' : 'text-zinc-500'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
