'use client';

import React from 'react';
import { CalibrationUIResult } from '@/types/team2-contract';
import { AlertTriangle, LayoutDashboard, ArrowRight } from 'lucide-react';

interface CalibrationResultScreenProps {
  result: CalibrationUIResult;
  onStartMission: () => void;
  onViewDashboard: () => void;
}

export const CalibrationResultScreen: React.FC<CalibrationResultScreenProps> = ({
  result,
  onStartMission,
  onViewDashboard,
}) => {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-grid-matrix min-h-screen pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Top Telemetry Status Banner */}
        <div className="border border-outline-variant bg-surface-container-lowest p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-primary-container"></div>
            <h1 className="font-label-lg text-label-lg tracking-wider uppercase text-on-surface font-semibold">
              DIAGNOSTIC CALIBRATION COMPLETE <span className="text-outline font-normal">{'//'}</span>{' '}
              <span className="text-primary font-bold">EVIDENCE VERIFICATION AUDIT #8841-B</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-label-sm text-outline font-mono">
            <span>TIMESTAMP: {new Date(result.timestamp).toLocaleDateString()}</span>
            <span className="border border-outline-variant px-1.5 py-0.5 bg-surface-container text-primary uppercase">
              [PROCTOR_NODE: V-309]
            </span>
          </div>
        </div>

        {/* MAIN CENTERPIECE: THE THREE LARGE PILLARS */}
        <section aria-label="Comparative Telemetry Triad" className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant bg-surface-container-low">
          {/* Pillar 1: CLAIMED SKILL */}
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-outline-variant bg-surface-container-lowest flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-outline-variant"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="border border-outline-variant px-1.5 py-0.5 text-label-sm font-label-sm uppercase tracking-wider text-outline bg-surface-container">
                  [CLAIMED_ONLY]
                </span>
                <span className="text-label-sm text-outline font-mono">COL_01</span>
              </div>
              <h2 className="text-label-lg font-label-lg uppercase tracking-wider text-on-surface-variant font-bold">
                CLAIMED SKILL
              </h2>
              <p className="text-body-sm text-on-surface-variant mt-1">Candidate Self-Assessment</p>
            </div>

            <div className="my-8">
              <div className="flex items-baseline gap-2">
                <span className="font-headline-xl text-headline-xl font-bold tracking-tight text-on-surface">
                  {result.claimedScore.toFixed(1)}
                </span>
                <span className="font-headline-md text-headline-md text-outline">/ 10</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 mt-3">
                <div className="bg-outline h-1.5" style={{ width: `${(result.claimedScore / 10) * 100}%` }}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant text-[11px] font-mono text-outline">
              Confidence Rating: High Self-Efficacy (92nd %ile)
            </div>
          </div>

          {/* Pillar 2: DEMONSTRATED SKILL */}
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-outline-variant bg-surface-container-low flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="border border-secondary/40 px-1.5 py-0.5 text-label-sm font-label-sm uppercase tracking-wider text-secondary bg-secondary/10 font-bold">
                  [DEMONSTRATED]
                </span>
                <span className="text-label-sm text-secondary font-mono">COL_02</span>
              </div>
              <h2 className="text-label-lg font-label-lg uppercase tracking-wider text-secondary font-bold">
                DEMONSTRATED SKILL
              </h2>
              <p className="text-body-sm text-on-surface-variant mt-1">Diagnostic Objective Audit</p>
            </div>

            <div className="my-8">
              <div className="flex items-baseline gap-2">
                <span className="font-headline-xl text-headline-xl font-bold tracking-tight text-secondary">
                  {result.demonstratedScore.toFixed(1)}
                </span>
                <span className="font-headline-md text-headline-md text-outline">/ 10</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 mt-3">
                <div className="bg-secondary h-1.5" style={{ width: `${(result.demonstratedScore / 10) * 100}%` }}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant text-[11px] font-mono text-secondary">
              Verified by: Sequence Grounding Probe #PS-04
            </div>
          </div>

          {/* Pillar 3: REQUIRED SKILL */}
          <div className="p-6 md:p-8 bg-surface-container-lowest flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="border border-primary/40 px-1.5 py-0.5 text-label-sm font-label-sm uppercase tracking-wider text-primary bg-primary/10 font-bold">
                  [TARGET_BAR]
                </span>
                <span className="text-label-sm text-primary font-mono">COL_03</span>
              </div>
              <h2 className="text-label-lg font-label-lg uppercase tracking-wider text-primary font-bold">
                REQUIRED SKILL
              </h2>
              <p className="text-body-sm text-on-surface-variant mt-1">Tier-1 Industry Placement Benchmark</p>
            </div>

            <div className="my-8">
              <div className="flex items-baseline gap-2">
                <span className="font-headline-xl text-headline-xl font-bold tracking-tight text-primary">
                  {result.requiredScore.toFixed(1)}
                </span>
                <span className="font-headline-md text-headline-md text-outline">/ 10</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 mt-3">
                <div className="bg-primary h-1.5" style={{ width: `${(result.requiredScore / 10) * 100}%` }}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant text-[11px] font-mono text-primary">
              Role: Power Systems Engineer (High Voltage Grid)
            </div>
          </div>
        </section>

        {/* CALIBRATION GAP CALLOUT (AMBER STRIPED ALERT) */}
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-6 space-y-3 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-mono text-sm text-amber-400 uppercase font-bold tracking-wider">
                [DELTA_FLAG] +{result.calibrationGap.toFixed(1)} OVERCONFIDENCE GAP ({result.calibrationStatus})
              </h3>
              <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                {result.explanation}
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-tertiary/40 flex flex-col sm:flex-row justify-between sm:items-center text-body-sm text-on-surface-variant gap-2">
            <div>
              <span className="text-outline font-mono">CRITICAL IMPACT: </span>
              {result.meaning}
            </div>
            <div className="text-tertiary font-bold font-mono">
              DEFICIT TO TARGET BAR: -2.5 INDEX
            </div>
          </div>
        </div>

        {/* WEAK SUBSKILLS BREAKDOWN TABLE */}
        <div className="border border-outline-variant bg-surface-container-low p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant pb-3">
            <span className="font-label-lg text-label-lg uppercase font-bold text-on-surface">
              Diagnostic Fault Analysis // Root-Cause Trace
            </span>
            <span className="text-label-sm text-outline font-mono">3 SUB-AREAS EVALUATED</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm border-collapse">
              <thead>
                <tr className="border-b border-outline-variant text-label-sm text-outline uppercase font-mono bg-surface-container-lowest">
                  <th className="py-2.5 px-3">Subskill Component</th>
                  <th className="py-2.5 px-3">Claimed</th>
                  <th className="py-2.5 px-3">Demonstrated</th>
                  <th className="py-2.5 px-3">Required</th>
                  <th className="py-2.5 px-3">Divergence</th>
                  <th className="py-2.5 px-3">Root-Cause Trace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 font-mono">
                {result.weakSubskills.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-surface-container transition-colors">
                    <td className="py-3 px-3 font-semibold text-on-surface">{sub.name}</td>
                    <td className="py-3 px-3 text-outline">{sub.claimedScore.toFixed(1)}</td>
                    <td className="py-3 px-3 text-secondary font-bold">{sub.demonstratedScore.toFixed(1)}</td>
                    <td className="py-3 px-3 text-primary">{sub.requiredScore.toFixed(1)}</td>
                    <td className="py-3 px-3 text-tertiary font-bold">+{sub.gap.toFixed(1)} Delta</td>
                    <td className="py-3 px-3 text-on-surface-variant font-sans text-xs">{sub.rootCause}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={onViewDashboard}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg border border-slate-700 bg-slate-800/80 text-white font-medium uppercase tracking-wider text-xs hover:border-cyan-500 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>View Full Readiness Dashboard</span>
          </button>

          <button
            onClick={onStartMission}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <span>EXECUTE TARGETED INTERVENTION MISSION // FAULT ANALYSIS</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </main>
    </div>
  );
};
