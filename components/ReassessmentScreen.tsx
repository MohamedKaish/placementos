'use client';

import React, { useState } from 'react';
import { defaultPlacementService } from '@/lib/placement-service';

interface ReassessmentScreenProps {
  onRestartDemo: () => void;
  onViewDashboard: () => void;
}

export const ReassessmentScreen: React.FC<ReassessmentScreenProps> = ({
  onRestartDemo,
  onViewDashboard,
}) => {
  const [hasCompletedMission, setHasCompletedMission] = useState<boolean>(true);

  const reassessmentData = defaultPlacementService.runReassessment(hasCompletedMission);

  return (
    <div className="w-full min-h-screen pt-16 bg-surface">
      {/* Top Breadcrumb Context Bar */}
      <div className="w-full bg-surface-container-low px-4 sm:px-8 py-2.5 border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span>Reassessment</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Telemetry Run #0x8A1</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Post-Intervention Verification</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle to test both requirements: with data vs NOT ENOUGH DATA */}
            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-2 py-1 rounded border border-outline-variant/40">
              <span className="text-[11px]">Telemetry Mode:</span>
              <button
                onClick={() => setHasCompletedMission(true)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  hasCompletedMission
                    ? 'bg-primary text-white'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Post-Mission (+2.7Δ)
              </button>
              <button
                onClick={() => setHasCompletedMission(false)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  !hasCompletedMission
                    ? 'bg-error text-white'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Insufficient Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-mono text-[11px] rounded uppercase font-semibold mb-1.5">
                Verification Telemetry Probe
              </div>
              <h1 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">
                Skill Reassessment & Learning Velocity
              </h1>
              <p className="font-body-md text-[14px] text-on-surface-variant mt-1 leading-relaxed">
                Objective before-and-after comparison following targeted intervention mission.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onViewDashboard}
                className="px-3.5 py-2 bg-surface-container text-on-surface hover:bg-surface-container-high rounded font-mono text-[12px] font-semibold flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">dashboard</span>
                Dashboard
              </button>
              <button
                onClick={onRestartDemo}
                className="px-3.5 py-2 bg-primary text-white hover:bg-primary-container rounded font-mono text-[12px] font-bold flex items-center gap-1 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                Reset Demo
              </button>
            </div>
          </div>

          {/* Conditional Display: Sufficient Data vs NOT ENOUGH DATA */}
          {reassessmentData.dataSufficiency === 'NOT_ENOUGH_DATA' ? (
            /* Insufficient Data State - As explicitly mandated by prompt */
            <div className="p-8 bg-surface-container-low rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">hourglass_empty</span>
              </div>

              <div className="flex flex-col gap-1 max-w-md">
                <span className="font-headline-sm text-lg text-on-surface font-bold">
                  NOT ENOUGH DATA
                </span>
                <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                  {reassessmentData.notes}
                </p>
                <p className="font-mono text-[11px] text-outline mt-2">
                  System safety rule: Never invent improvement when empirical samples are incomplete.
                </p>
              </div>

              <button
                onClick={() => setHasCompletedMission(true)}
                className="mt-2 px-5 py-2 bg-primary hover:bg-primary-container text-white font-mono text-[12px] font-bold rounded shadow transition-colors"
              >
                Simulate Mission Verification Telemetry
              </button>
            </div>
          ) : (
            /* Sufficient Data State - Demonstrating Before -> After and Learning Velocity */
            <div className="flex flex-col gap-6">
              {/* Before vs After Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* BEFORE */}
                <div className="p-5 bg-surface-container-low rounded-lg border border-outline-variant/40 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-error font-bold block mb-1">
                      Before Intervention
                    </span>
                    <span className="text-[12px] text-on-surface-variant block mb-2">
                      Pre-Mission Baseline
                    </span>
                    <div className="flex items-baseline gap-1 font-mono">
                      <span className="text-3xl font-bold text-error">
                        {reassessmentData.beforeScore.toFixed(1)}
                      </span>
                      <span className="text-on-surface-variant text-[14px]">/ 10</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-outline-variant/30 font-mono text-[11px] text-error font-semibold">
                    BELOW 7.0 BENCHMARK (-2.5)
                  </div>
                </div>

                {/* ARROW DELTA GAIN */}
                <div className="p-5 bg-primary/5 rounded-lg border-2 border-primary flex flex-col justify-between items-center text-center">
                  <div className="w-full">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-bold block mb-1">
                      Empirical Delta Gain
                    </span>
                    <span className="text-[12px] text-on-surface-variant block mb-2">
                      Delta Verified
                    </span>
                    <div className="font-mono text-3xl font-bold text-primary">
                      +{reassessmentData.delta.toFixed(1)}
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-primary/30 font-mono text-[11px] text-primary font-bold">
                    SURPASSED TIER-1 CUTOFF
                  </div>
                </div>

                {/* AFTER */}
                <div className="p-5 bg-surface-container-low rounded-lg border border-outline-variant/40 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-tertiary font-bold block mb-1">
                      After Intervention
                    </span>
                    <span className="text-[12px] text-on-surface-variant block mb-2">
                      Post-Mission Telemetry
                    </span>
                    <div className="flex items-baseline gap-1 font-mono">
                      <span className="text-3xl font-bold text-tertiary">
                        {reassessmentData.afterScore.toFixed(1)}
                      </span>
                      <span className="text-on-surface-variant text-[14px]">/ 10</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-outline-variant/30 font-mono text-[11px] text-tertiary font-semibold flex items-center justify-between">
                    <span>STATUS: READY</span>
                    <span>&gt; 7.0 BAR</span>
                  </div>
                </div>
              </div>

              {/* Learning Velocity Metric */}
              <div className="p-5 bg-surface-container-lowest rounded-lg border border-outline-variant/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[24px]">speed</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-primary font-bold uppercase tracking-wider">
                      Quantified Learning Velocity
                    </span>
                    <span className="font-headline-sm text-lg text-on-surface font-bold">
                      +{reassessmentData.learningVelocity} Index Points per Study Hour
                    </span>
                    <p className="font-body-sm text-[13px] text-on-surface-variant mt-0.5">
                      {reassessmentData.notes}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 font-mono text-[11px] bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1.5 rounded font-bold">
                  92ND PERCENTILE VELOCITY
                </div>
              </div>

              {/* Verified Telemetry Run Card */}
              <div className="p-4 bg-inverse-surface text-inverse-on-surface rounded font-mono text-[12px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping"></span>
                  <span>VERIFICATION AUDIT RUN: {reassessmentData.verificationTelemetryRun}</span>
                </div>
                <span className="text-tertiary-fixed font-bold">BENCHMARK ACHIEVED</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
