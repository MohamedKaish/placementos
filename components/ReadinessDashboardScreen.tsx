'use client';

import React from 'react';
import { ReadinessReportUI } from '@/types/team2-contract';
import { CheckCircle2, Sliders } from 'lucide-react';

interface ReadinessDashboardScreenProps {
  report: ReadinessReportUI;
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
    <div className="w-full max-w-full overflow-x-hidden bg-grid-matrix min-h-screen pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Hero Overview & Calibration Status Bar */}
        <div className="bg-surface-container-low border border-outline-variant p-6 space-y-4">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-5 border-b border-outline-variant">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-3 font-mono text-label-sm">
                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-200 uppercase text-xs">CANDIDATE TELEMETRY RECORD</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> EVIDENCE SYNCHRONIZED
                </span>
                <span className="text-slate-500 text-xs">LOC: SENSOR ARRAY 4</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg font-bold tracking-tight text-white">
                {report.studentProfile.name}{' '}
                <span className="font-body-md text-body-md font-normal text-slate-400">
                  / {report.studentProfile.academicYear}, {report.studentProfile.department}
                </span>
              </h1>
              <p className="font-body-sm text-cyan-400 flex items-center gap-2 font-mono text-xs">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Target Role: {report.studentProfile.targetRole}
              </p>
            </div>

            {/* Status Pill Cluster */}
            <div className="bg-surface-container-lowest border border-outline-variant px-4 py-3 font-mono text-xs">
              <div className="text-outline uppercase tracking-wider mb-1">EVIDENCE COVERAGE STATUS</div>
              <div className="font-semibold text-on-surface flex items-center gap-3">
                <span className="flex items-center gap-1 text-secondary">
                  <span className="inline-block w-2 h-2 bg-secondary"></span> 4 Verified
                </span>
                <span className="text-outline">|</span>
                <span className="flex items-center gap-1 text-tertiary">
                  <span className="inline-block w-2 h-2 bg-tertiary"></span> 1 In Calibration
                </span>
                <span className="text-outline">|</span>
                <span className="flex items-center gap-1 text-outline">
                  <span className="inline-block w-2 h-2 bg-outline"></span> 1 Pending
                </span>
              </div>
            </div>
          </div>

          {/* Verification Integrity Directive (Anti-Single Score) */}
          <div className="pt-2 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-tertiary"></div>
              <div>
                <div className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest font-bold font-mono">
                  VERIFICATION INTEGRITY DIRECTIVE
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  Single composite percentages are mathematically invalidated for technical role readiness. Multi-dimensional gate evaluation enforced.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 bg-surface-container-lowest border border-secondary text-secondary">
                &check; 2 Critical Gates Clear
              </span>
              <span className="px-2.5 py-1 bg-surface-container-lowest border border-tertiary text-tertiary font-bold">
                ! 1 Calibration Deficit
              </span>
              <span className="px-2.5 py-1 bg-surface-container-lowest border border-outline text-outline">
                &bull; 1 Dimension Gated
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Dimensional Readiness Matrix (4 Primary Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {report.dimensions.map((dim, idx) => {
            const isNotAssessed = dim.status === 'not_assessed' || dim.score === null;
            return (
              <div
                key={idx}
                className="bg-surface-container-low border border-outline-variant p-5 flex flex-col justify-between hover:border-primary transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-mono">{dim.label}</span>
                    <span
                      className={`text-[10px] font-mono uppercase px-1.5 py-0.5 border ${
                        isNotAssessed
                          ? 'border-outline text-outline bg-surface-container'
                          : dim.status === 'passed'
                          ? 'border-secondary text-secondary bg-secondary/10'
                          : 'border-tertiary text-tertiary bg-tertiary/10'
                      }`}
                    >
                      {isNotAssessed ? 'NOT_ASSESSED' : dim.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-label-lg font-bold text-on-surface mb-2 leading-tight">
                    {dim.name}
                  </h3>

                  <div className="my-4">
                    {isNotAssessed ? (
                      <div className="space-y-1">
                        <div className="font-headline-lg text-headline-lg font-bold text-outline font-mono">
                          NULL
                        </div>
                        <div className="text-[11px] text-tertiary font-mono font-semibold">
                          STRICT ZERO-FABRICATION RULE
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className={`font-headline-xl text-headline-xl font-bold font-mono ${
                          dim.status === 'passed' ? 'text-secondary' : 'text-on-surface'
                        }`}>
                          {dim.score?.toFixed(1)}
                        </span>
                        <span className="font-headline-sm text-outline font-mono">/ 10</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-outline-variant/60 text-xs font-mono text-on-surface-variant">
                  {dim.notes}
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Breakdown Matrix Table */}
        <div className="border border-outline-variant bg-surface-container-low p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant pb-3">
            <div>
              <div className="font-label-sm text-primary uppercase font-mono font-bold">[EVIDENCE_BREAKDOWN]</div>
              <h2 className="font-label-lg uppercase font-bold text-on-surface">
                Required Technical Competency Matrix
              </h2>
            </div>
            <span className="text-label-sm text-outline font-mono">POWER SYSTEMS TELEMETRY</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm border-collapse">
              <thead>
                <tr className="border-b border-outline-variant text-label-sm text-outline uppercase font-mono bg-surface-container-lowest">
                  <th className="py-2.5 px-3">Skill Specification</th>
                  <th className="py-2.5 px-3">Claimed</th>
                  <th className="py-2.5 px-3">Demonstrated</th>
                  <th className="py-2.5 px-3">Required Bar</th>
                  <th className="py-2.5 px-3">Calibration Gap</th>
                  <th className="py-2.5 px-3">Telemetry Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 font-mono">
                {report.skillsBreakdown.map((skill, idx) => (
                  <tr key={idx} className="hover:bg-surface-container transition-colors">
                    <td className="py-3 px-3 font-semibold text-on-surface">{skill.name}</td>
                    <td className="py-3 px-3 text-outline">{skill.claimed.toFixed(1)}</td>
                    <td className="py-3 px-3 font-bold">
                      {skill.status === 'NOT_ASSESSED' ? (
                        <span className="text-outline">-- (GATED)</span>
                      ) : (
                        <span className={skill.status === 'DEFICIT' ? 'text-tertiary' : 'text-secondary'}>
                          {skill.demonstrated.toFixed(1)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-primary">{skill.required.toFixed(1)}</td>
                    <td className="py-3 px-3">
                      {skill.status === 'NOT_ASSESSED' ? (
                        <span className="text-outline">N/A</span>
                      ) : skill.gap > 0 ? (
                        <span className="text-tertiary font-bold">+{skill.gap.toFixed(1)} Deficit</span>
                      ) : (
                        <span className="text-secondary font-bold">Matched</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-xs px-2 py-0.5 border ${
                          skill.status === 'DEFICIT'
                            ? 'border-tertiary text-tertiary bg-tertiary/10 font-bold'
                            : skill.status === 'SURPASSED'
                            ? 'border-secondary text-secondary bg-secondary/10 font-bold'
                            : skill.status === 'CALIBRATED'
                            ? 'border-primary text-primary bg-primary/10'
                            : 'border-outline text-outline bg-surface-container'
                        }`}
                      >
                        [{skill.status}]
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Navigation Strip */}
        <div className="pt-2 flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-3">
            <button
              onClick={onNavigateToCalibration}
              className="px-5 py-3 border border-outline-variant bg-surface-container text-on-surface font-label-md uppercase font-semibold hover:border-outline transition-colors"
            >
              &larr; View 3-Pillar Calibration
            </button>
            <button
              onClick={onNavigateToMission}
              className="px-6 py-3 bg-primary-container text-on-primary-container font-label-md uppercase font-bold hover:bg-primary transition-colors border border-primary-container"
            >
              Open Fault Analysis Mission &rarr;
            </button>
          </div>

          <button
            onClick={onNavigateToReassessment}
            className="px-6 py-3 border border-secondary text-secondary bg-secondary/10 font-label-md uppercase font-bold hover:bg-secondary hover:text-surface-container-lowest transition-colors"
          >
            Check Learning Velocity & Reassessment &rarr;
          </button>
        </div>
      </main>
    </div>
  );
};
