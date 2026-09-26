'use client';

import React from 'react';
import {
  Sparkles,
  User,
  Radio,
  Layers,
  FileQuestion,
  Gauge,
  Target,
  BarChart3,
  TrendingUp,
} from 'lucide-react';

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
  candidateName?: string;
  readinessStatus?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  targetRole = 'Power Systems Engineer',
  department = 'EEE',
  candidateName = 'Ananya Rao',
  readinessStatus = 'DEVELOPING',
}) => {
  const navItems: Array<{ id: ScreenId; label: string; icon: React.ReactNode }> = [
    { id: 'landing', label: 'Overview', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'onboarding', label: 'Intake', icon: <Radio className="w-3.5 h-3.5" /> },
    { id: 'assessment', label: 'Assessment', icon: <FileQuestion className="w-3.5 h-3.5" /> },
    { id: 'calibration', label: 'Calibration', icon: <Gauge className="w-3.5 h-3.5" /> },
    { id: 'mission', label: 'Missions', icon: <Target className="w-3.5 h-3.5" /> },
    { id: 'dashboard', label: 'Readiness', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'reassessment', label: 'Reassessment', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="w-full max-w-full px-3 sm:px-6 flex justify-between items-center h-16 bg-[#090D16]/90 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50 select-none shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      {/* Brand & Section Identity */}
      <div className="flex items-center space-x-3 lg:space-x-6 shrink-0">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <div className="w-full h-full bg-[#0B0F19] rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-wider uppercase bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              PlacementOS
            </span>
            <span className="text-[9px] font-mono tracking-widest text-cyan-400/80 font-semibold -mt-1 uppercase">
              READINESS INTELLIGENCE
            </span>
          </div>
        </button>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-800/60">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Telemetry Cluster */}
      <div className="flex items-center space-x-2.5 sm:space-x-3.5 shrink-0">
        {/* Target Benchmark Chip */}
        <div className="hidden xl:flex items-center rounded-lg border border-slate-800/80 px-3 py-1.5 bg-slate-900/70 text-slate-300 text-xs gap-2 shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-slate-200 truncate max-w-[210px]">
            {targetRole} <span className="text-cyan-400 font-mono text-[11px]">({department})</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-mono font-bold text-[11px] tracking-wider">
            {readinessStatus}
          </span>
        </div>

        {/* Live Sync Status Flag */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono font-semibold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span>
          <span>TELEMETRY SYNC</span>
        </div>

        {/* Candidate Profile / Quick Switcher */}
        <div className="flex items-center space-x-2 border-l border-slate-800/80 pl-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-slate-700/50"
            title="Candidate Profile"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-xs shadow-[0_0_8px_rgba(6,182,212,0.4)]">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="hidden lg:inline text-xs font-medium text-slate-200 whitespace-nowrap">
              {candidateName}
            </span>
          </button>

          {currentScreen !== 'assessment' && currentScreen !== 'calibration' && (
            <button
              onClick={() => onNavigate('onboarding')}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)] hover:shadow-[0_0_20px_rgba(6,182,212,0.55)] whitespace-nowrap"
            >
              <span>Launch</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
