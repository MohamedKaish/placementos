'use client';

import React from 'react';
import { CalibrationResult } from '@/types/team2-contract';

interface CalibrationResultScreenProps {
  result: CalibrationResult;
  onStartMission: () => void;
  onViewDashboard: () => void;
}

export const CalibrationResultScreen: React.FC<CalibrationResultScreenProps> = ({
  result,
  onStartMission,
  onViewDashboard,
}) => {
  const demPct = Math.min(Math.max((result.demonstratedScore / 10) * 100, 5), 95);
  const reqPct = Math.min(Math.max((result.requiredScore / 10) * 100, 5), 95);
  const clmPct = Math.min(Math.max((result.claimedScore / 10) * 100, 5), 95);
  const distanceToBar = Number((result.demonstratedScore - result.requiredScore).toFixed(1));
  const primaryWeakSkill = result.weakSubskills?.[0];

  return (
    <div className="w-full min-h-screen pt-16 bg-surface">
      {/* Top Utility Context Bar */}
      <div className="w-full bg-surface-container-low px-4 sm:px-8 py-2.5 border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-[12px] text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span>Assessments</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Diagnostic Run #{result.runId}</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Flagship Calibration Result</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-surface-container-highest rounded text-on-surface font-mono text-[11px]">
              TELEMETRY RUN: {result.runId}
            </span>
            <span className="px-2 py-0.5 bg-tertiary-container text-on-tertiary font-mono text-[11px] rounded flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">verified</span> BENCHMARK LOCKED
            </span>
          </div>
        </div>
      </div>

      {/* Main Canvas Container */}
      <div className="w-full px-4 sm:px-8 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* Section 1: Executive Calibration Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/40 shadow-sm">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-mono text-[11px] rounded uppercase tracking-wider font-semibold">
                  Diagnostic Run: #{result.runId}
                </span>
                <span className="px-2.5 py-0.5 bg-surface-container-high text-on-surface font-mono text-[11px] rounded flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">engineering</span>
                  {result.department} • {result.roleTitle}
                </span>
              </div>
              <h1 className="font-headline-xl text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">
                Skill Calibration: {result.targetSkill}
              </h1>
              <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                Objective alignment between self-reported proficiency, empirical diagnostic evidence, and market benchmark requirements for Tier-1 Infrastructure roles.
              </p>
              <div className="flex items-center gap-2 mt-1 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span className="text-on-surface-variant">Benchmark Profile:</span>
                <span className="text-on-surface font-semibold">{result.roleTitle} (Market Benchmark Profile)</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 self-start lg:self-end">
              <button
                onClick={onViewDashboard}
                className="px-4 py-2 bg-surface-container text-on-surface font-mono text-[12px] font-medium rounded flex items-center gap-1.5 hover:bg-surface-container-high transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">dashboard</span>
                Readiness Dashboard
              </button>
              <button
                onClick={onStartMission}
                className="px-4 py-2 bg-primary text-white font-mono text-[12px] font-semibold rounded flex items-center gap-1.5 hover:bg-primary-container transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                Launch Target Mission
              </button>
            </div>
          </div>

          {/* Section 2: Signature 3-Pillar Calibration Metric Visualization */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between font-mono text-[12px]">
              <div className="flex items-center gap-2">
                <span className="text-primary uppercase tracking-wider font-bold">PIPELINE TELEMETRY</span>
                <span className="text-outline-variant">/</span>
                <span className="text-on-surface-variant">Three-Point Triangulation Model</span>
              </div>
              <span className="text-on-surface-variant">Delta Confidence Interval: {result.confidenceInterval}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Claimed */}
              <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-medium">
                      Stage 01: Claimed
                    </span>
                    <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-mono text-[11px] rounded font-medium">
                      Pre-Test Intake
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 my-2">
                    <span className="font-headline-xl text-4xl sm:text-5xl text-on-surface font-bold">
                      {result.claimedScore.toFixed(1)}
                    </span>
                    <span className="font-headline-sm text-lg text-on-surface-variant font-semibold">
                      / 10
                    </span>
                  </div>
                  <p className="font-mono text-[13px] text-on-surface-variant font-semibold">
                    Self-Reported Baseline
                  </p>
                  <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed">
                    Stated skill level prior to empirical telemetry probe. Reflects student perception of theoretical power transmission fundamentals.
                  </p>
                </div>
                <div className="mt-4 pt-2 bg-surface-container-low p-3 rounded">
                  <div className="flex justify-between items-center font-mono text-[11px] text-on-surface-variant">
                    <span>Self-Efficacy Index:</span>
                    <span className="font-semibold text-on-surface">{result.selfEfficacyIndex}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Demonstrated (Hero Card) */}
              <div className="bg-surface-container-lowest p-6 rounded-lg border-2 border-error/50 shadow-md flex flex-col justify-between relative overflow-hidden ring-1 ring-error/20">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-error"></div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-error font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                      Stage 02: Demonstrated
                    </span>
                    <span className="px-2 py-0.5 bg-error-container text-on-error-container font-mono text-[11px] rounded font-bold">
                      Empirical Truth
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 my-2">
                    <span className="font-headline-xl text-4xl sm:text-5xl text-error font-bold">
                      {result.demonstratedScore.toFixed(1)}
                    </span>
                    <span className="font-headline-sm text-lg text-on-surface-variant font-semibold">
                      / 10
                    </span>
                  </div>
                  <p className="font-mono text-[13px] text-on-surface font-bold">
                    Empirically Verified Diagnostic
                  </p>
                  <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed">
                    Measured through timed sequence transformation challenges, vector derivations, and real-time asymmetric fault simulations under cognitive load.
                  </p>
                </div>
                <div className="mt-4 pt-2 bg-error-container/40 p-3 rounded flex items-center justify-between font-mono text-[12px]">
                  <span className="text-on-surface font-medium">Demonstrated Calibration Variance:</span>
                  <span className="font-bold text-error">+{result.calibrationGap.toFixed(1)} Gap</span>
                </div>
              </div>

              {/* Card 3: Required */}
              <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-bold">
                      Stage 03: Required
                    </span>
                    <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed font-mono text-[11px] rounded font-medium">
                      Hiring Threshold
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 my-2">
                    <span className="font-headline-xl text-4xl sm:text-5xl text-primary font-bold">
                      {result.requiredScore.toFixed(1)}
                    </span>
                    <span className="font-headline-sm text-lg text-on-surface-variant font-semibold">
                      / 10
                    </span>
                  </div>
                  <p className="font-mono text-[13px] text-on-surface-variant font-semibold">
                    Target Role Demand
                  </p>
                  <p className="font-body-sm text-[13px] text-on-surface-variant mt-2 leading-relaxed">
                    Aggregated market bar calibrated against verified technical scorecards for {result.roleTitle}.
                  </p>
                </div>
                <div className="mt-4 pt-2 bg-primary-fixed/30 p-3 rounded">
                  <div className="flex justify-between items-center font-mono text-[11px] text-on-surface-variant">
                    <span>Distance to Cutoff Bar:</span>
                    <span className="font-bold text-primary font-mono text-[13px]">
                      {distanceToBar >= 0 ? `+${distanceToBar}` : `${distanceToBar}`} Pts
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Calibration Continuum Spectrum */}
            <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[13px] text-on-surface font-bold uppercase tracking-wider">
                      Calibration Continuum Spectrum
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-error-container text-on-error-container font-mono text-[11px] font-bold uppercase">
                      {result.calibrationStatus}
                    </span>
                  </div>
                  <p className="font-body-sm text-[13px] text-on-surface-variant mt-0.5">
                    Positioning score anchors across mathematical 0.0 — 10.0 proficiency coordinates
                  </p>
                </div>

                <div className="flex items-center gap-4 font-mono text-[11px]">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-error"></span> Demonstrated ({result.demonstratedScore.toFixed(1)})</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-primary"></span> Target Bar ({result.requiredScore.toFixed(1)})</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-secondary"></span> Claimed ({result.claimedScore.toFixed(1)})</span>
                </div>
              </div>

              {/* The Range Track */}
              <div className="w-full pt-8 pb-4 relative">
                <div className="w-full h-3 bg-surface-container rounded-full relative">
                  {/* Gap Segment: Demonstrated to Target */}
                  <div
                    className="absolute h-3 bg-primary/20"
                    style={{
                      left: `${Math.min(demPct, reqPct)}%`,
                      width: `${Math.abs(reqPct - demPct)}%`,
                    }}
                  ></div>

                  {/* DEMONSTRATED Marker */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10"
                    style={{ left: `${demPct}%` }}
                  >
                    <div className="absolute -top-7 px-2 py-0.5 bg-error text-white font-mono text-[11px] rounded whitespace-nowrap font-bold shadow-sm">
                      {result.demonstratedScore.toFixed(1)} DEMONSTRATED
                    </div>
                    <div className="w-4 h-4 rounded-full bg-error ring-4 ring-error-container"></div>
                  </div>

                  {/* REQUIRED Marker */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10"
                    style={{ left: `${reqPct}%` }}
                  >
                    <div className="absolute -top-7 px-2 py-0.5 bg-primary text-white font-mono text-[11px] rounded whitespace-nowrap font-bold shadow-sm">
                      {result.requiredScore.toFixed(1)} TARGET BAR
                    </div>
                    <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary-fixed"></div>
                  </div>

                  {/* CLAIMED Marker */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10"
                    style={{ left: `${clmPct}%` }}
                  >
                    <div className="absolute -top-7 px-2 py-0.5 bg-secondary text-white font-mono text-[11px] rounded whitespace-nowrap font-semibold shadow-sm">
                      {result.claimedScore.toFixed(1)} CLAIMED
                    </div>
                    <div className="w-4 h-4 rounded-full bg-secondary ring-4 ring-secondary-fixed"></div>
                  </div>
                </div>

                <div className="w-full flex justify-between font-mono text-[11px] text-on-surface-variant mt-3 px-1">
                  <span>0.0</span>
                  <span>2.5</span>
                  <span className="font-semibold text-error">{result.demonstratedScore.toFixed(1)} Demonstrated</span>
                  <span className="font-semibold text-primary">{result.requiredScore.toFixed(1)} Target Bar</span>
                  <span className="font-semibold text-secondary">{result.claimedScore.toFixed(1)} Claimed</span>
                  <span>10.0</span>
                </div>
              </div>

              {/* Dual Telemetry Diagnostic Readouts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                <div className="p-4 bg-error-container/30 rounded border border-error/30 flex items-start gap-3">
                  <span className="material-symbols-outlined text-error text-[22px] shrink-0 mt-0.5">warning</span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-[13px] text-error font-bold">
                        Calibration Gap: {result.calibrationGap >= 0 ? `+${result.calibrationGap.toFixed(1)}` : `${result.calibrationGap.toFixed(1)}`}
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-medium">
                        ({result.calibrationStatus})
                      </span>
                    </div>
                    <p className="font-body-sm text-[13px] text-on-surface-variant mt-1 leading-normal">
                      {result.explanation}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-primary-fixed/20 rounded border border-primary/30 flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">trending_up</span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-[13px] text-primary font-bold">
                        Readiness Gap: {distanceToBar >= 0 ? `+${distanceToBar}` : `${distanceToBar}`}
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-medium">(Distance to Target Bar)</span>
                    </div>
                    <p className="font-body-sm text-[13px] text-on-surface-variant mt-1 leading-normal">
                      {result.nextActionRecommendation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Forensic Evidence & Weak Subskill Breakdown ("WHY?") */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Forensic Evidence Used */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[11px] text-error font-bold uppercase tracking-wider">
                      PRIMARY SKILL BOTTLENECK
                    </span>
                    <h3 className="font-headline-sm text-xl text-on-surface font-bold mt-0.5">
                      WEAK SUBSKILL: {primaryWeakSkill ? primaryWeakSkill.name : result.targetSkill}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-error-container text-on-error-container font-mono text-[11px] font-bold rounded">
                    {result.calibrationGap > 0 ? 'CRITICAL GAP IDENTIFIED' : 'BENCHMARK ALIGNED'}
                  </span>
                </div>

                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                  {primaryWeakSkill ? primaryWeakSkill.rootCause : result.explanation}
                </p>

                {/* Evidence Used List */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface font-bold">
                    Forensic Evidence Used in Calibration:
                  </span>

                  {result.evidenceUsed.map((ev, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-surface-container-low rounded border border-outline-variant/30 flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded bg-error/10 text-error font-mono text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        0{idx + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[13px] font-bold text-on-surface">
                          {ev.label}
                        </span>
                        <div className="flex items-center gap-3 font-mono text-[11px] text-on-surface-variant mt-0.5">
                          <span>Weight: {Math.round(ev.confidenceWeight * 100)}%</span>
                          <span>•</span>
                          <span>Samples: {ev.sampleCount}</span>
                          <span>•</span>
                          <span className="text-primary font-semibold">{ev.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Meaning Card */}
                <div className="p-4 bg-surface-container rounded border-l-4 border-error">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface font-bold block mb-1">
                    WHAT THIS MEANS
                  </span>
                  <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                    {result.meaning}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Subskills Matrix */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col gap-4 h-full">
                <div>
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Diagnostic Subskill Matrix
                  </span>
                  <h3 className="font-headline-sm text-lg text-on-surface font-bold mt-0.5">
                    {result.department} Domain Breakdown
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  {result.weakSubskills && result.weakSubskills.length > 0 ? (
                    result.weakSubskills.map((subskill, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-error-container/20 rounded border border-error/30 flex flex-col gap-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-error">cancel</span>
                            <span className="font-mono text-[13px] text-error font-bold">
                              {subskill.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 font-mono text-[12px]">
                            <span className="font-bold text-error">
                              {result.demonstratedScore.toFixed(1)} / 10
                            </span>
                            <span className="bg-error text-white px-1.5 py-0.5 rounded font-bold text-[10px]">
                              WEAK SUBSKILL
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-error h-2 rounded-full"
                            style={{ width: `${Math.min(100, (result.demonstratedScore / 10) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                          {subskill.rootCause}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-surface-container-low rounded border border-outline-variant/30 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                          <span className="font-mono text-[13px] text-on-surface font-semibold">
                            {result.targetSkill}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[12px]">
                          <span className="font-bold text-on-surface">
                            {result.demonstratedScore.toFixed(1)} / 10
                          </span>
                          <span className="text-tertiary bg-tertiary-fixed/30 px-1.5 py-0.5 rounded font-semibold text-[10px]">
                            DEMONSTRATED
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-tertiary h-2 rounded-full"
                          style={{ width: `${Math.min(100, (result.demonstratedScore / 10) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">
                        Core engineering competency evaluated through empirical assessment.
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-3 border-t border-outline-variant/30 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-on-surface-variant">Target Benchmark:</span>
                  <span className="font-bold text-primary">{result.requiredScore.toFixed(1)} Required Bar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Targeted Prescription / Next Action */}
          <div className="bg-surface-container-lowest p-6 rounded-lg border-2 border-primary/40 shadow-sm flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary-container"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
                </span>
                <div>
                  <span className="font-mono text-[11px] text-primary font-bold uppercase tracking-wider">
                    NEXT ACTION: GENERATED TARGETED MISSION
                  </span>
                  <h2 className="font-headline-sm text-xl text-on-surface font-bold">
                    Mission: {primaryWeakSkill ? `${primaryWeakSkill.name} Mastery` : `${result.targetSkill} Skill Remediation`}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[12px] text-on-surface-variant bg-surface-container px-3 py-1.5 rounded">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>Est. Duration: <strong>40 Minutes Structured Stages</strong></span>
              </div>
            </div>

            <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
              Prescribed intervention module engineered to extinguish the{' '}
              <strong className="text-error font-mono">
                {result.calibrationGap >= 0 ? `+${result.calibrationGap.toFixed(1)}` : `${result.calibrationGap.toFixed(1)}`} calibration gap
              </strong>. 
              This mission reinforces core concepts in {result.targetSkill} and validates empirical mastery before placement interviews.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-outline-variant/30">
              <div className="flex items-center gap-2 text-on-surface-variant font-mono text-[11px]">
                <span className="material-symbols-outlined text-[16px] text-primary">bolt</span>
                <span>Generated directly from Team 1 mission engine based on empirical evidence.</span>
              </div>

              <button
                onClick={onStartMission}
                className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-container text-white font-mono text-[13px] font-bold rounded shadow flex items-center justify-center gap-2 transition-colors"
              >
                <span>Launch Today&apos;s Targeted Mission</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
