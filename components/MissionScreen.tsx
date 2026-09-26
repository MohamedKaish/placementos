'use client';

import React, { useState } from 'react';
import { Mission } from '@/types/team2-contract';

interface MissionScreenProps {
  mission: Mission;
  onCompleteMission: () => void;
  onViewDashboard: () => void;
}

export const MissionScreen: React.FC<MissionScreenProps> = ({
  mission,
  onCompleteMission,
  onViewDashboard,
}) => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [calculatedInput, setCalculatedInput] = useState<string>('8.5');
  const [activeUnit, setActiveUnit] = useState<'Score' | 'p.u.' | 'Units'>('Score');
  const [confidence, setConfidence] = useState<number>(95);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const beforeScore = mission.verifiedBaseline;
  const targetBar = mission.benchmarkTarget;
  const projectedAfter = Number(Math.min(10, beforeScore + Math.max(0, (targetBar - beforeScore) * 0.8 + 0.5)).toFixed(1));
  const deltaGain = Number((projectedAfter - beforeScore).toFixed(1));
  const learningVelocity = deltaGain > 0 ? Number((deltaGain / 1.5).toFixed(2)) : 0.45;

  const handleValidate = () => {
    setIsVerified(true);
  };

  return (
    <div className="w-full min-h-screen pt-16 bg-surface">
      <div className="w-full px-4 sm:px-8 py-6 flex flex-col gap-6 max-w-[1440px] mx-auto">
        {/* Mission Header & Context */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 shadow-sm">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-error bg-error-container/40 font-mono text-[11px] tracking-wide uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5 animate-ping"></span>
                Priority Intervention
              </span>
              <span className="font-mono text-[12px] text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">schedule</span>
                {mission.estimatedDuration}
              </span>
              <span className="font-mono text-[12px] text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">verified_user</span>
                ID: {mission.id}
              </span>
            </div>
            <h1 className="font-headline-lg text-xl sm:text-2xl text-on-surface font-bold tracking-tight">
              {mission.title}
            </h1>
            <p className="font-body-md text-[14px] text-on-surface-variant">
              {mission.objective}
            </p>
          </div>

          {/* Action Status / Stage Clock */}
          <div className="flex items-center gap-4 self-start lg:self-center shrink-0">
            <div className="flex flex-col items-end">
              <span className="font-mono text-[11px] text-on-surface-variant uppercase">Time In Stage</span>
              <span className="font-mono text-[16px] font-bold text-primary tracking-wider">07:42</span>
            </div>
            <button
              onClick={onViewDashboard}
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-mono text-[13px] font-medium"
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>Dashboard</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Rationale Banner (WHY THIS MISSION WAS ASSIGNED) */}
        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[22px]">analytics</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-primary uppercase font-bold tracking-wide">
                  Target Role Rationale:
                </span>
                <span className="font-headline-sm text-[15px] text-on-surface font-bold">
                  {mission.targetSkill}
                </span>
              </div>
              <p className="font-body-md text-[13px] text-on-surface-variant mt-1 leading-relaxed">
                {mission.targetRoleRationale}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <span className="px-3 py-1 rounded bg-surface-container font-mono text-[12px] text-on-surface font-bold border border-outline-variant/40">
              Δ Required: {mission.deltaTarget}
            </span>
          </div>
        </div>

        {/* Action Pipeline Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
          {mission.stages.map((stage) => {
            const isCompleted = activeStage > stage.id;
            const isActive = activeStage === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`p-4 rounded-xl border shadow-sm flex flex-col justify-between gap-2 relative overflow-hidden cursor-pointer transition-all ${
                  isActive
                    ? 'bg-surface-container-lowest border-primary ring-2 ring-primary'
                    : isCompleted
                    ? 'bg-surface-container-lowest border-outline-variant/40'
                    : 'bg-surface-container-lowest/80 border-outline-variant/40 opacity-80'
                }`}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    isCompleted ? 'bg-tertiary' : isActive ? 'bg-primary' : 'bg-outline-variant'
                  }`}
                ></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-mono text-[11px] font-bold uppercase ${
                        isCompleted ? 'text-tertiary' : isActive ? 'text-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      Stage 0{stage.id}
                    </span>
                    <span className="text-on-surface-variant font-mono text-[11px]">• {stage.duration}</span>
                  </div>
                  {isCompleted ? (
                    <span className="w-5 h-5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center text-[12px] font-bold">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </span>
                  ) : isActive ? (
                    <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-mono text-[10px] font-bold animate-pulse">
                      Active Now
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-outline-variant text-[18px]">lock</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-headline-sm text-[14px] text-on-surface font-bold">{stage.title}</h2>
                  <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 line-clamp-2">
                    {stage.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
                  <span
                    className={
                      isCompleted ? 'text-tertiary font-semibold' : isActive ? 'text-primary font-medium' : 'text-on-surface-variant'
                    }
                  >
                    {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Pending'}
                  </span>
                  <span className="text-on-surface-variant">Step {stage.id} of {mission.stages.length}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Workspace Split: Practice Sandbox (Left 8-col) + Reassessment & Velocity Tracker (Right 4-col) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
          {/* Left Column: Interactive Problem Sandbox (Col 8) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-6 shadow-md flex flex-col gap-5 border border-outline-variant/30">
              {/* Problem Meta */}
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-2 font-mono text-[12px]">
                  <span className="px-2 py-0.5 rounded bg-surface-container-highest/20 text-inverse-on-surface">
                    {mission.id}
                  </span>
                  <span className="text-inverse-on-surface/70">
                    Domain: {mission.targetSkill}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-tertiary-fixed font-mono text-[12px]">
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  <span>{mission.simulationSandbox.systemState}</span>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="flex flex-col gap-2">
                <h3 className="font-headline-md text-lg text-surface-container-lowest font-bold">
                  {mission.practiceTask}
                </h3>
                <p className="font-body-md text-[14px] text-inverse-on-surface/90 leading-relaxed">
                  Focus: <span className="font-mono font-semibold text-secondary-fixed">{mission.simulationSandbox.faultType}</span> • 
                  Benchmark Target: <span className="font-mono font-semibold text-secondary-fixed">{mission.benchmarkTarget.toFixed(1)} / 10</span>
                </p>
                <p className="font-body-md text-[13px] text-inverse-on-surface/90 leading-relaxed">
                  {mission.simulationSandbox.taskPrompt}
                </p>
              </div>

              {/* Formula Schematic Preview */}
              <div className="bg-surface-container-highest/10 p-4 rounded-lg flex flex-col gap-1.5 font-mono">
                <div className="flex items-center justify-between text-inverse-on-surface/70 text-[11px]">
                  <span className="uppercase tracking-wider">Target Objective & Verification Blueprint</span>
                  <span className="text-tertiary-fixed">{mission.targetSkill}</span>
                </div>
                <div className="text-surface-container-lowest text-[14px] py-1 font-bold whitespace-pre-line">
                  {mission.simulationSandbox.starterFormulaOrCode}
                </div>
                <div className="text-inverse-on-surface/60 text-[12px] font-sans">
                  {mission.simulationSandbox.verificationRule}
                </div>
              </div>

              {/* Interactive Calculation Inputs */}
              <div className="bg-surface-container-highest/20 p-4 rounded-lg flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="font-mono text-[13px] text-surface-container-lowest font-semibold">
                    Your Calculated Result:
                  </label>

                  <div className="flex items-center bg-inverse-surface rounded p-0.5">
                    {(['Score', 'p.u.', 'Units'] as const).map((unit) => (
                      <button
                        key={unit}
                        type="button"
                        onClick={() => setActiveUnit(unit)}
                        className={`px-3 py-1 text-[11px] font-mono rounded transition-colors ${
                          activeUnit === unit
                            ? 'bg-primary text-white font-bold'
                            : 'text-inverse-on-surface/70 hover:text-white'
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-8 relative">
                    <input
                      type="text"
                      value={calculatedInput}
                      onChange={(e) => setCalculatedInput(e.target.value)}
                      className="w-full px-4 py-3 rounded bg-surface-container-lowest text-on-surface font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                      placeholder="e.g. 8.5"
                    />
                    <span className="absolute right-4 top-3.5 font-mono text-on-surface-variant font-semibold text-[14px]">
                      {activeUnit}
                    </span>
                  </div>

                  <div className="sm:col-span-4 flex items-center justify-center p-2.5 rounded bg-tertiary/20 text-tertiary-fixed font-mono text-[12px]">
                    <span className="material-symbols-outlined text-[16px] mr-1">check_circle</span>
                    <span>Target: {mission.benchmarkTarget.toFixed(1)}</span>
                  </div>
                </div>

                {/* Confidence Slider */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex justify-between items-center font-mono text-[11px]">
                    <span className="text-inverse-on-surface/80 uppercase font-semibold">
                      Self-Assessment Calibration Weight:
                    </span>
                    <span className="font-bold text-tertiary-fixed">
                      {confidence}% • High Conviction
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={confidence}
                    onChange={(e) => setConfidence(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-inverse-surface rounded-lg cursor-pointer accent-tertiary-fixed"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-inverse-on-surface/50">
                    <span>20% Guess</span>
                    <span>50% Plausible</span>
                    <span>80% Confident</span>
                    <span>100% Mathematical Proof</span>
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-inverse-on-surface/80 hover:text-white font-mono text-[12px] flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                  <span>{showHint ? 'Hide First-Principles Derivation' : 'Show First-Principles Derivation'}</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={handleValidate}
                    className="px-5 py-2.5 rounded bg-primary hover:bg-primary-container text-white font-mono text-[13px] font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>Validate & Record Evidence</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Hint Box */}
              {showHint && (
                <div className="bg-surface-container-highest/10 p-4 rounded text-inverse-on-surface text-[12px] font-mono flex flex-col gap-1.5 border border-outline-variant/30">
                  <span className="font-bold text-tertiary-fixed flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
                    FIRST PRINCIPLES BREAKDOWN:
                  </span>
                  <p>1. Target competency: {mission.targetSkill}</p>
                  <p>2. Current verified baseline: {beforeScore.toFixed(1)}/10</p>
                  <p>3. Required industry cutoff: {targetBar.toFixed(1)}/10</p>
                  <p>4. Goal: Complete practice exercises to close the {mission.deltaTarget} gap</p>
                </div>
              )}

              {/* Verification Success Box */}
              {isVerified && (
                <div className="p-4 bg-tertiary/20 border border-tertiary-fixed/50 rounded flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-tertiary-fixed font-mono text-[13px]">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    <span><strong>Proof Verified!</strong> Telemetry records exercise mastery for {mission.targetSkill}. Verification criteria met.</span>
                  </div>
                  <button
                    onClick={onCompleteMission}
                    className="px-4 py-2 bg-tertiary text-white font-mono text-[12px] font-bold rounded shadow hover:bg-tertiary-container transition-colors shrink-0"
                  >
                    Proceed to Reassessment & Readiness &rarr;
                  </button>
                </div>
              )}
            </div>

            {/* Cryptographic Proof Card */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary text-[20px]">fingerprint</span>
                <div className="flex flex-col">
                  <span className="font-mono text-[12px] font-bold text-on-surface">
                    Cryptographic Proof & Timestamping
                  </span>
                  <span className="text-[12px] text-on-surface-variant">
                    Live telemetry stream active. Grounding derivations indexed for proof-of-work.
                  </span>
                </div>
              </div>
              <span className="font-mono text-[11px] text-tertiary font-semibold shrink-0">
                BLOCK #82914-HASH
              </span>
            </div>
          </div>

          {/* Right Column: Reassessment & Velocity Tracker (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 font-mono text-[12px]">
                <span className="text-on-surface-variant uppercase font-bold tracking-wider">
                  Velocity Telemetry
                </span>
                <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold text-[11px]">
                  Live Projection
                </span>
              </div>

              <h3 className="font-headline-sm text-base text-on-surface font-bold">
                Reassessment Index Projection
              </h3>

              {/* Visual Bar Comparators */}
              <div className="flex flex-col gap-4 pt-1 font-mono text-[12px]">
                {/* Baseline / Before */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant font-sans">Before Demonstration:</span>
                    <span className="font-bold text-error">{beforeScore.toFixed(1)} / 10.0</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden flex">
                    <div className="bg-error h-full rounded-full" style={{ width: `${Math.min(100, (beforeScore / 10) * 100)}%` }}></div>
                  </div>
                  <span className="text-[10px] text-on-surface-variant text-right">
                    Registered Diagnostic State
                  </span>
                </div>

                {/* Target Bar */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant font-sans">Target Required (Bar):</span>
                    <span className="font-bold text-on-surface">{targetBar.toFixed(1)} / 10.0</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden flex">
                    <div className="bg-on-surface h-full rounded-full" style={{ width: `${Math.min(100, (targetBar / 10) * 100)}%` }}></div>
                  </div>
                  <span className="text-[10px] text-on-surface-variant text-right">
                    Tier-1 Enterprise Minimum Requisite
                  </span>
                </div>

                {/* Projected After */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface font-semibold flex items-center gap-1 font-sans">
                      Projected Post-Mission:
                      <span className="material-symbols-outlined text-tertiary text-[14px]">trending_up</span>
                    </span>
                    <span className="font-bold text-tertiary">{projectedAfter.toFixed(1)} / 10.0</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden flex relative">
                    <div className="bg-error/40 h-full" style={{ width: `${Math.min(100, (beforeScore / 10) * 100)}%` }}></div>
                    <div className="bg-tertiary h-full relative" style={{ width: `${Math.max(0, Math.min(100 - (beforeScore / 10) * 100, (deltaGain / 10) * 100))}%` }}>
                      <span className="absolute right-0 top-0 bottom-0 w-0.5 bg-surface-container-lowest"></span>
                    </div>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-tertiary font-semibold">+{deltaGain.toFixed(1)} pt Delta Achieved</span>
                    <span className="text-on-surface-variant">Benchmark Surpassed</span>
                  </div>
                </div>
              </div>

              {/* Learning Velocity Stat Block */}
              <div className="bg-surface-container-low p-4 rounded-lg flex flex-col gap-1 border border-outline-variant/30">
                <span className="font-mono text-[11px] text-on-surface-variant uppercase font-semibold">
                  Measured Learning Velocity
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-xl text-3xl text-primary font-bold font-mono tracking-tight">
                    +{learningVelocity}
                  </span>
                  <span className="font-mono text-[12px] text-on-surface-variant font-medium">
                    pts / mission
                  </span>
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                  Intervention efficiency elevates candidate toward the target benchmark for <strong className="text-on-surface font-semibold">{mission.targetSkill}</strong> cohorts.
                </p>
              </div>

              {/* Direct Next Action Button */}
              <button
                onClick={onCompleteMission}
                className="w-full py-3 bg-primary hover:bg-primary-container text-white font-mono text-[13px] font-bold rounded shadow flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <span>Commit Telemetry & Open Dashboard</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
