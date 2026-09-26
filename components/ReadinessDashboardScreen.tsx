'use client';

import React from 'react';
import { ReadinessReport } from '@/types/team2-contract';

interface ReadinessDashboardScreenProps {
  report: ReadinessReport;
  onNavigateToMission: () => void;
  onNavigateToReassessment: () => void;
  onNavigateToCalibration: () => void;
}

export const ReadinessDashboardScreen: React.FC<ReadinessDashboardScreenProps> = ({
  report,
  onNavigateToMission,
  onNavigateToReassessment,
  onNavigateToCalibration,
}) => {
  return (
    <div className="w-full min-h-screen pt-16 bg-surface">
      {/* Top Banner Context Bar */}
      <div className="w-full bg-surface-container-low py-3 border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col">
              <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                Evaluation Profile
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-headline-sm text-base text-on-surface font-bold">
                  Target: {report.studentProfile.targetRole}
                </span>
                <span className="text-outline-variant font-mono">•</span>
                <span className="font-body-md text-[13px] text-on-surface-variant">
                  Academic: {report.studentProfile.department} {report.studentProfile.academicYear}
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-outline-variant/40 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
                  AGGREGATE STATE: {report.overallBand}
                </span>
              </div>
              <div className="bg-surface-container-lowest text-on-surface px-3 py-1 rounded border border-outline-variant/40 shadow-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
                <span className="font-mono text-[11px]">
                  Integrity: <strong className="text-tertiary">HIGH ({report.integrityScore}%)</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-on-surface-variant hidden xl:inline">
              Telemetry Run: {report.studentProfile.telemetryRunId}
            </span>
            <button
              onClick={onNavigateToCalibration}
              className="bg-surface-container text-on-surface hover:bg-surface-container-high px-3 py-1.5 rounded font-mono text-[11px] flex items-center gap-1.5 transition-colors border border-outline-variant/40"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">analytics</span>
              View Calibration Gap
            </button>
            <button
              onClick={onNavigateToReassessment}
              className="bg-primary text-white hover:bg-primary-container px-3 py-1.5 rounded font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[15px]">autorenew</span>
              Reassessment
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
        {/* Telemetry Calibration Pipeline Summary Strip */}
        <div className="bg-surface-container-lowest rounded-lg p-5 border border-outline-variant/40 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">account_tree</span>
              <span className="font-headline-sm text-base text-on-surface font-bold">
                Telemetry Calibration Pipeline
              </span>
              <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider ml-1">
                | Empirical Delta Path
              </span>
            </div>
            <span className="font-mono text-[11px] text-on-surface-variant">
              Methodology: Continuous Forensic Cross-Verification
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
            {/* 01. Claimed */}
            <div className="bg-surface-container-low p-4 rounded border border-outline-variant/30 flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center text-on-surface-variant font-mono text-[11px]">
                <span>01. CLAIMED</span>
                <span className="material-symbols-outlined text-[16px]">person_outline</span>
              </div>
              <div className="mt-3">
                <span className="font-headline-lg text-2xl font-bold font-mono text-on-surface">7.6</span>
                <span className="font-mono text-[11px] text-on-surface-variant"> / 10 Avg</span>
              </div>
              <span className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                Self-declared student portfolio & CV claims
              </span>
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-surface-variant"></div>
            </div>

            {/* 02. Demonstrated */}
            <div className="bg-surface-container-low p-4 rounded border border-outline-variant/30 flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center text-on-surface-variant font-mono text-[11px]">
                <span>02. DEMONSTRATED</span>
                <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
              </div>
              <div className="mt-3">
                <span className="font-headline-lg text-2xl font-bold font-mono text-primary">5.4</span>
                <span className="font-mono text-[11px] text-on-surface-variant"> / 10 Avg</span>
              </div>
              <span className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                Validated via 42 automated tests & sandbox telemetry
              </span>
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary"></div>
            </div>

            {/* 03. Industry Bar */}
            <div className="bg-surface-container-low p-4 rounded border border-outline-variant/30 flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center text-on-surface-variant font-mono text-[11px]">
                <span>03. INDUSTRY BAR</span>
                <span className="material-symbols-outlined text-[16px]">flag</span>
              </div>
              <div className="mt-3">
                <span className="font-headline-lg text-2xl font-bold font-mono text-on-surface">7.2</span>
                <span className="font-mono text-[11px] text-on-surface-variant"> / 10 Req</span>
              </div>
              <span className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                Grid Operator & Utility tier minimum cut-off
              </span>
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-outline-variant"></div>
            </div>

            {/* 04. Critical Gap */}
            <div className="bg-error-container text-on-error-container p-4 rounded flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center font-mono text-[11px]">
                <span className="font-bold">04. CRITICAL GAP</span>
                <span className="material-symbols-outlined text-[16px]">warning</span>
              </div>
              <div className="mt-3">
                <span className="font-headline-lg text-2xl font-bold font-mono text-error">-1.8</span>
                <span className="font-mono text-[11px] opacity-80"> Calibration</span>
              </div>
              <span className="font-body-sm text-[12px] opacity-90 mt-1">
                Immediate shortfall blocking enterprise readiness
              </span>
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-error"></div>
            </div>

            {/* 05. Dispatch Mission */}
            <div className="bg-primary text-white p-4 rounded flex flex-col justify-between relative shadow-sm">
              <div className="flex justify-between items-center font-mono text-[11px] text-primary-fixed">
                <span className="font-bold">05. DISPATCH MISSION</span>
                <span className="material-symbols-outlined text-[16px]">play_circle</span>
              </div>
              <div className="mt-3">
                <span className="font-headline-sm text-sm font-bold truncate block">
                  Fault Analysis
                </span>
                <span className="font-mono text-[11px] text-primary-fixed block mt-0.5">
                  Sequence Networks Module
                </span>
              </div>
              <div className="flex items-center justify-between mt-1 text-primary-fixed font-mono text-[11px]">
                <span>Est. 40m</span>
                <button
                  onClick={onNavigateToMission}
                  className="font-bold text-white underline cursor-pointer hover:text-white/80"
                >
                  Engage &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Multi-Dimensional Readiness (5 Dimensions) */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1">
            <div>
              <span className="font-mono text-[11px] text-primary font-bold uppercase tracking-widest">
                Multi-Dimensional Telemetry
              </span>
              <h2 className="font-headline-lg text-xl sm:text-2xl text-on-surface font-bold tracking-tight">
                The Core 5 Dimensions
              </h2>
            </div>
            <span className="font-mono text-[11px] text-on-surface-variant">
              Respects NOT_ASSESSED — Never Invents Evidence
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {report.dimensions.map((dim, idx) => {
              const isUnassessed = dim.status === 'NOT_ASSESSED';
              return (
                <div
                  key={dim.name}
                  className={`bg-surface-container-lowest rounded-lg p-4 border shadow-sm flex flex-col justify-between gap-3 ${
                    isUnassessed
                      ? 'border-dashed border-outline-variant/60 bg-surface-container-lowest/60'
                      : 'border-outline-variant/40'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-[14px] text-on-surface font-bold">
                        {idx + 1}. {dim.name}
                      </span>
                      <span className="material-symbols-outlined text-outline text-[18px]">
                        {dim.name === 'Technical'
                          ? 'memory'
                          : dim.name === 'Aptitude'
                          ? 'psychology'
                          : dim.name === 'Communication'
                          ? 'forum'
                          : dim.name === 'Interview Readiness'
                          ? 'co_present'
                          : 'verified_user'}
                      </span>
                    </div>

                    <div className="bg-surface-container-low p-2.5 rounded flex items-center justify-between font-mono">
                      <span
                        className={`text-[10px] font-bold uppercase ${
                          dim.status === 'READY'
                            ? 'text-tertiary'
                            : dim.status === 'DEVELOPING'
                            ? 'text-secondary'
                            : dim.status === 'EARLY_STAGE'
                            ? 'text-error'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        {dim.status.replace('_', ' ')}
                      </span>
                      <span className="text-[12px] font-bold text-on-surface">
                        {dim.score !== null ? (
                          <>
                            {dim.score.toFixed(1)}{' '}
                            <span className="text-on-surface-variant font-normal text-[10px]">
                              / {dim.benchmarkScore} Req
                            </span>
                          </>
                        ) : (
                          <span className="text-outline text-[11px]">NOT ASSESSED</span>
                        )}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden flex">
                      {dim.score !== null ? (
                        <div
                          className={`h-full rounded-full ${
                            dim.status === 'READY'
                              ? 'bg-tertiary'
                              : dim.status === 'DEVELOPING'
                              ? 'bg-secondary'
                              : 'bg-error'
                          }`}
                          style={{ width: `${Math.min(100, (dim.score / 10) * 100)}%` }}
                        ></div>
                      ) : (
                        <div className="w-full h-full bg-outline-variant/30"></div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 text-[12px]">
                      <span className="text-on-surface-variant font-body-sm leading-tight">
                        {dim.notes}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-on-surface font-semibold">
                      {isUnassessed ? 'Pending Live Telemetry' : `Evidence: ${dim.evidenceCount} Probes`}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold ${
                        dim.status === 'READY'
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                          : dim.status === 'DEVELOPING'
                          ? 'bg-surface-container-high text-on-surface'
                          : dim.status === 'NOT_ASSESSED'
                          ? 'bg-surface-container text-on-surface-variant'
                          : 'bg-error-container text-on-error-container'
                      }`}
                    >
                      {dim.status === 'READY' ? 'Passed' : dim.status === 'NOT_ASSESSED' ? 'Untested' : 'Action P0'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Granular Skill Breakdown Matrix */}
        <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/40 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[11px] text-primary uppercase font-bold tracking-wider">
                Forensic Breakdown
              </span>
              <h3 className="font-headline-sm text-lg text-on-surface font-bold">
                Detailed Skill Telemetry Matrix
              </h3>
            </div>
            <span className="font-mono text-[11px] text-on-surface-variant">
              Target Discipline: {report.studentProfile.department}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[12px]">
              <thead>
                <tr className="border-b border-outline-variant/40 text-on-surface-variant text-[11px] uppercase">
                  <th className="py-2.5 px-3">Skill / Capability</th>
                  <th className="py-2.5 px-3">Claimed</th>
                  <th className="py-2.5 px-3">Demonstrated</th>
                  <th className="py-2.5 px-3">Hiring Bar</th>
                  <th className="py-2.5 px-3">Delta Gap</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {report.skillsBreakdown.map((sb) => (
                  <tr key={sb.name} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-3 font-semibold text-on-surface font-sans">
                      {sb.name}
                    </td>
                    <td className="py-3 px-3 text-secondary font-bold">
                      {sb.claimed.toFixed(1)}
                    </td>
                    <td className="py-3 px-3">
                      {sb.status === 'NOT_ASSESSED' ? (
                        <span className="text-outline">NOT_ASSESSED</span>
                      ) : (
                        <span className={sb.demonstrated < sb.required ? 'text-error font-bold' : 'text-tertiary font-bold'}>
                          {sb.demonstrated.toFixed(1)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-on-surface">
                      {sb.required.toFixed(1)}
                    </td>
                    <td className="py-3 px-3">
                      {sb.status === 'NOT_ASSESSED' ? (
                        <span className="text-outline">—</span>
                      ) : sb.gap > 0 ? (
                        <span className="text-error font-bold">+{sb.gap.toFixed(1)} (Gap)</span>
                      ) : (
                        <span className="text-tertiary font-bold">{sb.gap.toFixed(1)}</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sb.status === 'DEFICIT'
                            ? 'bg-error-container text-on-error-container'
                            : sb.status === 'SURPASSED'
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                            : sb.status === 'CALIBRATED'
                            ? 'bg-secondary-fixed text-on-secondary-fixed'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {sb.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
