'use client';

import React, { useState } from 'react';
import { MissionUI } from '@/types/team2-contract';
import {
  AlertTriangle,
  Clock,
  TrendingUp,
  Target,
  CheckSquare,
  Square,
  Terminal,
  Play,
  ArrowRight,
} from 'lucide-react';

interface MissionScreenProps {
  mission: MissionUI;
  onCompleteMission: () => void;
  onViewDashboard: () => void;
}

export const MissionScreen: React.FC<MissionScreenProps> = ({
  mission,
  onCompleteMission,
  onViewDashboard,
}) => {
  const [stages, setStages] = useState(mission.stages);
  const [formulaCode, setFormulaCode] = useState(mission.simulationSandbox.starterFormulaOrCode);
  const [simulationOutput, setSimulationOutput] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleRunSimulation = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      setSimulationOutput(
        '✓ TELEMETRY CONVERGENCE REACHED\n• Zero-sequence loop balanced with 3*Zn grounding compensation.\n• Fault Current If = 3.614 p.u. matches benchmark expectation.\n• Error margin: 0.000% residual deviation.\n• Benchmark Target 7.0 unlocked.'
      );
      // Mark all stages complete
      setStages((prev) => prev.map((s) => ({ ...s, completed: true })));
    }, 800);
  };

  const handleProceedToReassessment = () => {
    onCompleteMission();
  };

  return (
    <div className="w-full bg-grid-matrix min-h-screen pb-16 overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">
        {/* Mission Header Panel */}
        <section className="bg-surface-container-lowest border border-outline-variant p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between border-b border-outline-variant pb-3 gap-2">
            <div className="flex items-center space-x-2 text-body-sm font-mono text-outline">
              <span>Missions</span>
              <span>/</span>
              <span>Active Intervention</span>
              <span>/</span>
              <span className="text-on-surface font-semibold">{mission.targetSkill}</span>
            </div>
            <div className="flex items-center gap-2 text-label-sm font-mono">
              <span className="text-outline">TRIGGER AUDIT:</span>
              <span className="bg-surface-container px-2 py-0.5 border border-outline-variant text-primary font-bold">
                AUDIT #8841-B
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="px-2 py-0.5 bg-primary-container/20 text-primary border border-primary text-label-sm font-semibold tracking-wider uppercase">
                  ACTIVE EXECUTION
                </span>
                <span className="text-outline text-label-sm font-mono">
                  ID: {mission.id}
                </span>
              </div>
              <h1 className="text-headline-md font-headline-md text-on-surface tracking-tight font-bold">
                {mission.title}
              </h1>
            </div>

            {/* Prescription Callout Banner */}
            <div className="bg-surface-container border border-amber-500/40 rounded-lg px-4 py-2.5 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="flex flex-col font-mono">
                <span className="text-xs text-amber-400 uppercase font-bold tracking-wider">
                  [DELTA_FLAG] Gap: -2.5 Index vs Bar
                </span>
                <span className="text-xs text-slate-300">
                  Remediates Zero-Sequence Earth Bus Grounding Error
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics Bar (3 Data Blocks) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant bg-surface-container-low divide-y md:divide-y-0 md:divide-x divide-outline-variant rounded-lg overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono">Estimated Duration</div>
                <div className="text-sm font-bold text-white font-mono">{mission.estimatedDuration}</div>
              </div>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono">Target Skill Gain</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">{mission.deltaTarget}</div>
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono">Target Benchmark</div>
                <div className="text-sm font-bold text-cyan-400 font-mono">
                  {mission.benchmarkTarget.toFixed(1)} / 10 <span className="text-slate-400 text-xs">(Baseline: {mission.verifiedBaseline.toFixed(1)})</span>
                </div>
              </div>
              <Target className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        </section>

        {/* Main Mission Workspace: Left Stages, Right Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Mission Stages & Success Criteria (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-outline-variant bg-surface-container-low p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                <span className="font-label-md text-on-surface uppercase font-bold tracking-wider">
                  Remediation Milestones
                </span>
                <span className="text-label-sm text-outline font-mono">4 STAGES</span>
              </div>

              <div className="space-y-3">
                {stages.map((stage) => (
                  <div
                    key={stage.id}
                    className={`p-3.5 border flex items-start space-x-3 transition-colors ${
                      stage.completed
                        ? 'border-secondary/40 bg-secondary/5'
                        : 'border-outline-variant bg-surface-container'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {stage.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-mono text-xs font-semibold ${stage.completed ? 'text-emerald-400' : 'text-slate-200'}`}>
                          {stage.title}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">{stage.duration}</span>
                      </div>
                      <p className="text-xs text-slate-400">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Success Criteria List */}
              <div className="pt-4 border-t border-outline-variant space-y-2">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider">Validation Criteria:</div>
                <ul className="space-y-1.5 text-slate-300 font-mono text-xs">
                  {mission.successCriteria.map((c, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">&bull;</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Simulation Sandbox (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-outline-variant bg-surface-container-lowest p-6 space-y-4 font-mono rounded-xl">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-white uppercase font-bold tracking-wider font-mono">
                    Interactive Grid Simulation Sandbox
                  </span>
                </div>
                <span className="text-xs text-emerald-400 uppercase font-mono font-semibold">[PROBE_ACTIVE]</span>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
                <div>GRID STATE: <span className="text-white font-semibold">{mission.simulationSandbox.systemState}</span></div>
                <div>FAULT PROFILE: <span className="text-amber-400 font-semibold">{mission.simulationSandbox.faultType}</span></div>
                <div>IMPEDANCE SPEC: <span className="text-cyan-400 font-semibold">{mission.simulationSandbox.impedanceSpec}</span></div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase font-mono">
                  Formula Verification Script:
                </label>
                <textarea
                  value={formulaCode}
                  onChange={(e) => setFormulaCode(e.target.value)}
                  rows={6}
                  className="w-full bg-[#070a12] border border-slate-800 rounded-lg p-3 text-xs font-mono text-cyan-300 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {simulationOutput && (
                <div className="p-4 border border-emerald-500/40 bg-emerald-500/10 rounded-lg text-emerald-300 text-xs font-mono whitespace-pre-wrap">
                  {simulationOutput}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3">
                <button
                  type="button"
                  onClick={onViewDashboard}
                  className="w-full sm:w-auto px-4 py-3 rounded-lg border border-slate-700 bg-slate-800/80 text-white text-xs uppercase font-medium hover:border-cyan-500 transition-all"
                >
                  View Dashboard
                </button>

                {!isSuccess ? (
                  <button
                    type="button"
                    disabled={isVerifying}
                    onClick={handleRunSimulation}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>{isVerifying ? 'COMPUTING SEQUENCE TELEMETRY...' : 'RUN SIMULATION & VERIFY FAULT LOOP'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleProceedToReassessment}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                  >
                    <span>SUBMIT TELEMETRY FOR REASSESSMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
