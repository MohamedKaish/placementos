'use client';

import React from 'react';
import { Department, JobRole } from '@/types/skill-graph';
import {
  ArrowRight,
  BarChart3,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Cpu,
  GraduationCap,
  Briefcase,
} from 'lucide-react';

interface LandingScreenProps {
  onStartDemo: () => void;
  onCustomIntake: () => void;
  onViewDashboard: () => void;
  departments: Department[];
  jobRoles: JobRole[];
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartDemo,
  onCustomIntake,
  onViewDashboard,
  departments,
  jobRoles,
}) => {
  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen pb-16 bg-[#070A12] bg-grid-matrix relative">
      {/* Ambient background glow spotlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Coordinate & System Header Ticks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between font-mono text-[11px] text-slate-500 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>ARRAY_LOC // 0x4B21_ALPHA</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400/80">
          <Cpu className="w-3.5 h-3.5" />
          <span>SYS_ENGINE // PLACEMENTOS_CORE_ONLINE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ==================== HERO SECTION ==================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-6 lg:my-10">
          {/* Left: Strategic Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md px-3.5 py-1.5 text-cyan-300 font-mono text-xs tracking-wider w-max shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>EVIDENCE-BASED CAREER READINESS FOR ENGINEERING</span>
            </div>

            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-white tracking-tight leading-[1.15]">
              Know what you claim. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                Prove what you can demonstrate.
              </span> <br />
              Close the gap before placement.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              PlacementOS replaces self-reported resume claims with verifiable demonstrated engineering capability. We benchmark real telemetry against Tier-1 hiring matrices to pinpoint latent competence gaps before placement day.
            </p>

            {/* Call to Action Cluster */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={onStartDemo}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] active:scale-[0.98]"
              >
                <span>Diagnose My Readiness</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onViewDashboard}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs uppercase tracking-wider border border-slate-700/80 hover:border-cyan-500/50 transition-all duration-200 backdrop-blur-md"
              >
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>Explore the Intelligence</span>
              </button>
            </div>

            {/* Telemetry Live Stream Ticker */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-5 text-slate-400 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SYS_MONITOR:</span>
                <span className="text-slate-200 font-semibold">99.98% AUDIT INTEGRITY</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>BENCHMARKS:</span>
                <span className="text-cyan-300 font-semibold">142 TIER-1 FIRMS</span>
              </div>
              <div className="flex items-center gap-2">
                <span>VERIFIED METRICS:</span>
                <span className="text-slate-200 font-semibold">3.8M TELEMETRY POINTS</span>
              </div>
            </div>
          </div>

          {/* Right: Telemetry Calibration Matrix Card (Hero Artifact) */}
          <div className="lg:col-span-6 rounded-xl border border-cyan-500/30 bg-[#0E1526]/90 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] overflow-hidden relative">
            {/* Ambient top glowing line */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400"></div>

            {/* Card Header Bar */}
            <div className="px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                <span className="font-mono text-xs text-white uppercase tracking-wider font-bold">
                  CALIBRATION MATRIX // EEE-PWR-04
                </span>
              </div>
              <div className="font-mono text-[11px] text-cyan-400/90 font-medium">
                ID: 0x9AF2_FAULT_ANALYSIS
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              {/* Three Large Metric Pillars Side-by-Side */}
              <div className="grid grid-cols-3 gap-3">
                {/* Pillar 1: CLAIMED */}
                <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-400 uppercase font-mono font-medium">[CLAIMED_ONLY]</span>
                  <div className="my-2 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">8.0</span>
                    <span className="text-slate-500 text-xs">/10</span>
                  </div>
                  <span className="text-[11px] text-amber-400/90 font-mono truncate">Self-Reported</span>
                </div>

                {/* Pillar 2: DEMONSTRATED */}
                <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-500/30 flex flex-col justify-between shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                  <span className="text-[10px] text-rose-400 uppercase font-mono font-medium">[DEMONSTRATED]</span>
                  <div className="my-2 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-rose-400">4.5</span>
                    <span className="text-slate-500 text-xs">/10</span>
                  </div>
                  <span className="text-[11px] text-rose-300 font-mono truncate">Diagnostic Probe</span>
                </div>

                {/* Pillar 3: REQUIRED */}
                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <span className="text-[10px] text-emerald-400 uppercase font-mono font-medium">[TARGET_BAR]</span>
                  <div className="my-2 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">7.0</span>
                    <span className="text-slate-500 text-xs">/10</span>
                  </div>
                  <span className="text-[11px] text-emerald-300 font-mono truncate">Tier-1 Standard</span>
                </div>
              </div>

              {/* Amber Callout Box: Calibration Gap */}
              <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 flex items-start gap-3 backdrop-blur-md">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono text-xs text-amber-400 uppercase font-bold tracking-wider">
                    [DELTA_FLAG] +3.5 OVERCONFIDENCE GAP IDENTIFIED
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Student claims 8.0/10 in Fault Analysis, but diagnostic probe demonstrates 4.5/10. Root cause: Zero-sequence transformer grounding miscalculation.
                  </p>
                </div>
              </div>

              {/* Action Link to Start Demo */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={onStartDemo}
                  className="text-cyan-400 hover:text-cyan-300 font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 transition-colors group"
                >
                  <span>Launch Fault Analysis Diagnostic</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 7 SUPPORTED DEPARTMENTS ==================== */}
        <section className="mb-14">
          <div className="border-b border-slate-800 pb-3 mb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
            <div>
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest">[DEPARTMENT_AGNOSTIC_CORE]</div>
              <h2 className="text-xl sm:text-2xl text-white font-bold mt-1">
                Supported Engineering Disciplines
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              7 PRIMARY DISCIPLINES // CROSS-DISCIPLINARY ALIGNMENT
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <div
                key={dept.id}
                onClick={onCustomIntake}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all duration-200 cursor-pointer group hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors font-mono">
                      {dept.code}
                    </span>
                    <GraduationCap className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200 mb-1 truncate">{dept.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{dept.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 8 INDEPENDENT ROLES ==================== */}
        <section className="mb-14">
          <div className="border-b border-slate-800 pb-3 mb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
            <div>
              <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest">[INDUSTRY_RUBRICS]</div>
              <h2 className="text-xl sm:text-2xl text-white font-bold mt-1">
                Cross-Disciplinary Target Roles
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              STANDARDIZED HIRING THRESHOLDS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobRoles.map((role) => (
              <div
                key={role.id}
                onClick={onCustomIntake}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-200 cursor-pointer group hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded font-bold font-mono">
                      {(role.marketDemandRating || 'high').toUpperCase()} DEMAND
                    </span>
                    <Briefcase className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors mb-1.5 truncate">
                    {role.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Prerequisites:</span>
                  <span className="text-cyan-400 font-semibold">Min Level 3+</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
