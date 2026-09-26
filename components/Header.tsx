'use client';

import React from 'react';

export type ScreenId =
  | 'landing'
  | 'onboarding'
  | 'assessment'
  | 'calibration'
  | 'mission'
  | 'dashboard'
  | 'reassessment';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  targetRole?: string;
  department?: string;
  readinessStatus?: string;
  candidateName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  targetRole = 'Power Systems Engineer',
  department = 'EEE',
  readinessStatus = 'Developing',
  candidateName = '',
}) => {
  const initials = candidateName
    ? candidateName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';
  const navItems: Array<{ id: ScreenId; label: string }> = [
    { id: 'landing', label: 'Overview' },
    { id: 'onboarding', label: 'Intake' },
    { id: 'assessment', label: 'Assessment' },
    { id: 'calibration', label: 'Calibration Result' },
    { id: 'mission', label: 'Today\'s Mission' },
    { id: 'dashboard', label: 'Readiness Dashboard' },
    { id: 'reassessment', label: 'Reassessment' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-inverse-surface text-inverse-on-surface shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 w-full px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-base shadow-sm">
              P
            </div>
            <span className="font-headline-sm text-[18px] text-surface-container-lowest font-bold tracking-tight">
              PlacementOS
            </span>
          </button>

          {/* Specialization chip */}
          <div className="hidden xl:flex items-center px-2.5 py-1 bg-on-surface/40 rounded border border-outline-variant/30 text-surface-container-low font-label-sm text-[11px] tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed mr-2 animate-pulse"></span>
            Target: {targetRole} • {department}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 font-body-md text-[13px] rounded transition-colors ${
                  isActive
                    ? 'bg-inverse-on-surface/10 text-surface-container-lowest font-semibold'
                    : 'text-surface-container-high hover:text-surface-container-lowest'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Status Indicators & Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-highest/20 rounded border border-outline/30">
            <span className="font-label-sm text-[11px] text-surface-container-highest uppercase tracking-wider">
              Readiness:
            </span>
            <span className="font-label-sm text-[11px] text-tertiary-fixed font-semibold">
              {readinessStatus}
            </span>
          </div>

          {candidateName && (
          <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/30">
            <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-[12px] font-semibold text-inverse-on-surface">
              {initials}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-[12px] font-medium text-surface-container-lowest leading-tight">
                {candidateName}
              </span>
              <span className="text-[10px] text-surface-container-high font-mono">
                {department}
              </span>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Mobile subnav */}
      <div className="lg:hidden flex overflow-x-auto px-4 py-1.5 bg-inverse-surface/90 border-t border-outline-variant/20 scrollbar-none gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`whitespace-nowrap px-2.5 py-1 text-[12px] rounded ${
              currentScreen === item.id
                ? 'bg-primary text-white font-medium'
                : 'text-surface-container-high'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
