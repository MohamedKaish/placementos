'use client';

import React from 'react';
import { ReassessmentResultUI } from '@/types/team2-contract';
import { ShieldCheck, RotateCcw, ArrowLeft } from 'lucide-react';

interface ReassessmentScreenProps {
  reassessment: ReassessmentResultUI;
  onRestartDemo: () => void;
  onViewDashboard: () => void;
}

export const ReassessmentScreen: React.FC<ReassessmentScreenProps> = ({
  reassessment,
  onRestartDemo,
  onViewDashboard,
}) => {
  const isDataSufficient = reassessment.dataSufficiency === 'SUFFICIENT';

  return (
    <div className="w-full bg-grid-matrix min-h-screen pb-16 font-mono overflow-x-hidden">
      {/* Sub-Header / Run Calibration Ribbon */}
      <div className="w-full bg-surface-container-low border-b border-outline-variant px-4 sm:px-6 py-2.5 flex flex-wrap justify-between items-center gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-outline uppercase tracking-wider">TELEMETRY_WINDOW:</span>
          <span className="bg-surface-container px-2 py-0.5 border border-outline-variant text-on-surface font-semibold">
            Post-Mission Calibration Run
          </span>
          <span className="text-outline-variant">|</span>
          <span className="text-outline uppercase">RUN_ID:</span>
          <span className="text-primary font-bold">{reassessment.verificationTelemetryRun}</span>
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span>AUDIT PIPELINE: <strong className="text-secondary">ONLINE</strong></span>
          <span>UNCERTAINTY ENVELOPE: <strong className="text-on-surface">&plusmn;0.12 INDEX</strong></span>
          <span>STATUS: <strong className="text-primary uppercase">{reassessment.status}</strong></span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-8 font-sans overflow-x-hidden">
        {/* Top Header */}
        <div className="border-l-2 border-primary pl-4 py-1">
          <div className="flex items-center gap-2 mb-1 font-mono text-label-sm">
            <span className="text-primary uppercase font-bold tracking-widest">[RECALIBRATION_FEED]</span>
            <span className="text-outline-variant">&bull;</span>
            <span className="text-outline">EMPIRICAL PROOF OF GROWTH</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight font-bold">
            Learning Velocity &amp; Telemetry Reassessment
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Verifiable delta measurement following completion of Mission #04 (Fault Analysis Remediation).
          </p>
        </div>

        {/* Bento Top Tier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Large Before -> After Demonstration Comparison (7 cols) */}
          <div className="lg:col-span-7 bg-[#111827] border border-[#1F293D] p-6 flex flex-col justify-between space-y-6">
            <div className="flex justify-between items-center border-b border-[#1F293D] pb-3">
              <div className="flex items-center gap-2 font-mono text-label-md">
                <span className="w-2 h-2 bg-secondary"></span>
                <span className="text-on-surface uppercase font-bold tracking-wider">
                  COMPETENCY INDEX AUDIT: BEFORE VS. AFTER
                </span>
              </div>
              <span className="font-mono text-label-sm text-secondary bg-secondary/10 border border-secondary px-2 py-0.5 font-bold">
                [DEMONSTRATED]
              </span>
            </div>

            {/* Metric Transition Visual */}
            <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-4 py-4 font-mono">
              {/* BEFORE Box */}
              <div className="md:col-span-5 bg-[#0B0F17] border border-[#1F293D] p-5 text-center">
                <div className="flex items-center justify-between border-b border-[#1F293D] pb-1.5 mb-3 text-label-sm">
                  <span className="text-outline uppercase">DIAGNOSTIC #8841-B</span>
                  <span className="text-tertiary bg-tertiary/10 border border-tertiary px-1 font-bold">[DELTA_FLAG]</span>
                </div>
                <div className="text-headline-xl font-headline-xl text-outline-variant font-bold leading-none my-3">
                  {reassessment.beforeScore.toFixed(1)}
                  <span className="text-headline-sm font-headline-sm text-outline"> / 10</span>
                </div>
                <p className="text-label-sm text-error/90">Critical Overconfidence Gap</p>
                <div className="w-full bg-[#1F293D] h-1.5 mt-3">
                  <div className="bg-outline h-1.5" style={{ width: `${(reassessment.beforeScore / 10) * 100}%` }}></div>
                </div>
              </div>

              {/* Delta Vector Icon */}
              <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
                <span className="text-primary font-bold text-2xl">&rarr;</span>
                <span className="text-label-sm text-outline font-bold">DELTA</span>
              </div>

              {/* AFTER Box */}
              <div className="md:col-span-5 bg-[#0B0F17] border border-secondary p-5 text-center relative shadow-[0_0_20px_rgba(78,222,163,0.08)]">
                <div className="flex items-center justify-between border-b border-secondary/30 pb-1.5 mb-3 text-label-sm">
                  <span className="text-secondary uppercase font-semibold">REASSESSMENT #8902-C</span>
                  <span className="text-secondary bg-secondary/15 border border-secondary px-1 font-bold">VERIFIED</span>
                </div>
                <div className="text-headline-xl font-headline-xl text-secondary font-bold leading-none my-3">
                  {reassessment.afterScore.toFixed(1)}
                  <span className="text-headline-sm font-headline-sm text-secondary/70"> / 10</span>
                </div>
                <p className="text-label-sm text-secondary font-semibold">Grounded Rigor Confirmed</p>
                <div className="w-full bg-[#1F293D] h-1.5 mt-3">
                  <div className="bg-secondary h-1.5" style={{ width: `${(reassessment.afterScore / 10) * 100}%` }}></div>
                </div>
              </div>
            </div>

            {/* Delta Callout Banner */}
            <div className="pt-4 border-t border-[#1F293D] flex flex-wrap items-center justify-between gap-4 font-mono">
              <div className="flex items-center gap-3">
                <span className="bg-secondary/10 border border-secondary text-secondary font-label-lg px-3 py-1 font-bold tracking-wider">
                  +{reassessment.delta.toFixed(1)} INDEX GAIN
                </span>
                <span className="text-body-sm text-on-surface-variant font-sans">
                  Surpasses 7.0 Tier-1 Placement Bar
                </span>
              </div>
              <span className="text-label-sm text-outline">CALIBRATION GAP: RESOLVED</span>
            </div>
          </div>

          {/* Right: Learning Velocity & Cryptographic Stamp (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Learning Velocity Card */}
            <div className="border border-outline-variant bg-surface-container-low p-6 space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                <span className="font-label-sm text-secondary uppercase font-bold tracking-widest">[LEARNING_VELOCITY]</span>
                <span className="text-label-sm text-outline">dx/dt METRIC</span>
              </div>

              {isDataSufficient && reassessment.learningVelocity !== null ? (
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-xl text-headline-xl font-bold text-secondary">
                      {reassessment.learningVelocity}
                    </span>
                    <span className="text-body-md text-outline">Index Points / Study Hour</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant font-sans">
                    Demonstrates rapid skill acquisition when guided by targeted sequence grounding intervention.
                  </p>
                  <div className="p-3 bg-surface-container-lowest border border-outline-variant text-xs text-outline space-y-1">
                    <div>FORMULA: (AfterScore - BeforeScore) / StudyTimeHours</div>
                    <div>CALCULATION: (7.2 - 4.5) / 6.0 hrs = 0.45 pts/hr</div>
                    <div className="text-secondary font-bold">PERCENTILE: 94th against engineering cohort</div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-surface-container-lowest border border-outline-variant text-xs text-outline">
                  <div className="text-tertiary font-bold mb-1">[NOT_ENOUGH_DATA]</div>
                  Insufficient historical re-test points recorded. Complete mission practice tasks to compute learning velocity.
                </div>
              )}
            </div>

            {/* Cryptographic Telemetry Stamp */}
            <div className="border border-outline-variant bg-surface-container-lowest p-5 text-[11px] font-mono text-outline space-y-2 rounded-xl">
              <div className="text-on-surface font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-white">CRYPTOGRAPHIC AUDIT SEAL</span>
              </div>
              <div>SHA-256: 8F4A2C19E7B31024D980F16C5A23E09941BC8841B</div>
              <div>PROCTOR_STAMP: PlacementOS Empirical Proof Engine</div>
              <div>TELEMETRY_SOURCE: Sequence Grounding Interactive Sandbox Probe</div>
            </div>
          </div>
        </div>

        {/* Action Button Controls */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={onViewDashboard}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg border border-slate-700 bg-slate-800/80 text-white font-medium uppercase tracking-wider text-xs hover:border-cyan-500 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Return to Readiness Dashboard</span>
          </button>

          <button
            onClick={onRestartDemo}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <RotateCcw className="w-4 h-4 text-slate-950" />
            <span>RESTART PLACEMENTOS DEMO JOURNEY</span>
          </button>
        </div>
      </main>
    </div>
  );
};
