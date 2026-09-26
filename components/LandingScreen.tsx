'use client';

import React from 'react';

interface LandingScreenProps {
  onStartDemo: () => void;
  onCustomIntake: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartDemo,
  onCustomIntake,
}) => {
  const departments = [
    { code: 'EEE', name: 'Electrical & Electronics', benchmarkCount: 42, activeRole: 'Power Systems Engineer' },
    { code: 'CSE', name: 'Computer Science', benchmarkCount: 68, activeRole: 'Distributed Systems' },
    { code: 'ECE', name: 'Electronics & Communication', benchmarkCount: 54, activeRole: 'Embedded Firmware' },
    { code: 'Mechanical', name: 'Mechanical Engineering', benchmarkCount: 39, activeRole: 'Robotics Control' },
    { code: 'Civil', name: 'Civil Infrastructure', benchmarkCount: 31, activeRole: 'FEA & Structural' },
    { code: 'Chemical', name: 'Chemical Engineering', benchmarkCount: 28, activeRole: 'Process Automation' },
    { code: 'Biotechnology', name: 'Biotechnology', benchmarkCount: 24, activeRole: 'Bioprocess Scale-Up' },
  ];

  return (
    <div className="w-full min-h-screen pt-20 pb-16 flex flex-col items-center">
      {/* Top Telemetry Breadcrumb Bar */}
      <div className="w-full bg-surface-container-low px-4 sm:px-8 py-2.5 border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-semibold text-on-surface">PLACEMENTOS CORE v2.4</span>
            <span className="text-outline-variant">|</span>
            <span>SYSTEM AUDIT: 7 ENGINEERING DISCIPLINES ONLINE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-surface-container-highest rounded text-on-surface font-semibold text-[11px]">
              TRUST ENGINE: EMPIRICAL TELEMETRY
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 pt-10 pb-8 flex flex-col gap-10">
        <div className="max-w-4xl flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded text-on-surface font-mono text-[12px] w-fit border border-outline-variant/40">
            <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
            Institutional Career Readiness & Skill Calibration
          </div>

          <h1 className="font-headline-xl text-3xl sm:text-5xl lg:text-6xl text-on-surface font-extrabold tracking-tight leading-[1.15]">
            Know what you claim.<br />
            Prove what you can demonstrate.<br />
            <span className="text-primary">Close the gap before placement.</span>
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            PlacementOS replaces subjective self-assessment with forensic skill telemetry. 
            We calculate your empirical calibration gap against Tier-1 engineering benchmarks 
            and prescribe targeted intervention missions before placement day.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartDemo}
              className="px-6 py-3.5 bg-primary hover:bg-primary-container text-white font-mono text-[14px] font-semibold rounded shadow-sm flex items-center gap-2.5 transition-colors"
            >
              <span>Begin Placement Assessment</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={onCustomIntake}
              className="px-5 py-3.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-mono text-[14px] font-medium rounded border border-outline-variant/50 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Custom Student Intake</span>
            </button>
          </div>
        </div>

        {/* 3 Core Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col gap-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">troubleshoot</span>
            </div>
            <h3 className="font-headline-sm text-[18px] text-on-surface font-bold">
              01. Claimed vs Demonstrated
            </h3>
            <p className="font-body-md text-[14px] text-on-surface-variant leading-normal">
              Self-reported skills on CVs routinely diverge from empirical execution under pressure. 
              Our adaptive diagnostic probes capture concrete telemetry rather than rote recall.
            </p>
            <div className="mt-auto pt-3 border-t border-outline-variant/30 font-mono text-[11px] text-secondary font-semibold">
              TRIANGULATION WITH 98.4% CONFIDENCE
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col gap-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded bg-error/10 text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">crisis_alert</span>
            </div>
            <h3 className="font-headline-sm text-[18px] text-on-surface font-bold">
              02. Forensic Calibration Gap
            </h3>
            <p className="font-body-md text-[14px] text-on-surface-variant leading-normal">
              High confidence paired with erroneous derivation reveals dangerous blind spots. 
              We isolate exact weak subskills and root causes down to sign conventions and grounding loop errors.
            </p>
            <div className="mt-auto pt-3 border-t border-outline-variant/30 font-mono text-[11px] text-error font-semibold">
              PINPOINTS WEAK SUBSKILL CAUSES
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col gap-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded bg-tertiary/10 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
            </div>
            <h3 className="font-headline-sm text-[18px] text-on-surface font-bold">
              03. Precision Intervention Mission
            </h3>
            <p className="font-body-md text-[14px] text-on-surface-variant leading-normal">
              No generic courses or irrelevant videos. Students receive structured 4-stage missions 
              specifically targeted to lift verified baseline metrics to Tier-1 hiring standards.
            </p>
            <div className="mt-auto pt-3 border-t border-outline-variant/30 font-mono text-[11px] text-tertiary font-semibold">
              MEASURABLE LEARNING VELOCITY (+2.7Δ)
            </div>
          </div>
        </div>

        {/* Multi-Department Agnostic Coverage */}
        <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/40 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono text-[11px] text-primary uppercase font-bold tracking-wider">
                Multi-Department Architecture
              </span>
              <h4 className="font-headline-sm text-[16px] text-on-surface font-bold">
                Supported Engineering Disciplines & Independent Role Graphs
              </h4>
            </div>
            <span className="font-mono text-[12px] text-on-surface-variant">
              No Artificial Role-to-Department Restrictions
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 pt-1">
            {departments.map((dept) => (
              <div
                key={dept.code}
                className="bg-surface-container-lowest p-3 rounded border border-outline-variant/30 flex flex-col justify-between gap-1 shadow-xs"
              >
                <span className="font-mono text-[14px] font-bold text-primary">
                  {dept.code}
                </span>
                <span className="text-[12px] text-on-surface font-medium truncate">
                  {dept.name}
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant mt-1">
                  {dept.benchmarkCount} Benchmarks
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
