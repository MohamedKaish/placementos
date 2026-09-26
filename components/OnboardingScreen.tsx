'use client';

import React, { useState } from 'react';
import { Department, AcademicYear, RoleProfile } from '@/types/team2-contract';
import { defaultPlacementService } from '@/lib/placement-service';

interface OnboardingScreenProps {
  onComplete: (data: {
    department: Department;
    academicYear: AcademicYear;
    roleId: string;
    claimedScore: number;
    studentName: string;
  }) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const departments = defaultPlacementService.getDepartments();
  const roles = defaultPlacementService.getJobRoles();

  const [selectedDept, setSelectedDept] = useState<Department>('EEE');
  const [selectedYear, setSelectedYear] = useState<AcademicYear>('Year 4');
  const [selectedRole, setSelectedRole] = useState<string>('power-systems-engineer');
  const [claimedScore, setClaimedScore] = useState<number>(8.0);
  const [studentName, setStudentName] = useState<string>('');

  const activeRoleObj = roles.find((r) => r.id === selectedRole) || roles[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      department: selectedDept,
      academicYear: selectedYear,
      roleId: selectedRole,
      claimedScore,
      studentName: studentName.trim() || 'Candidate',
    });
  };

  return (
    <div className="w-full min-h-screen pt-20 pb-16 bg-surface">
      {/* Top Context Bar */}
      <div className="w-full bg-surface-container-low px-4 sm:px-8 py-2.5 border-b border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[12px] font-mono text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span>Intake</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Student Profile & Benchmark Alignment</span>
          </div>
          <span className="px-2 py-0.5 bg-surface-container-highest rounded text-on-surface font-semibold text-[11px]">
            STEP 01 OF 04: BASELINE SPECIFICATION
          </span>
        </div>
      </div>

      <div className="max-w-[1000px] w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-lg border border-outline-variant/40 shadow-sm flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-mono text-[11px] rounded uppercase font-semibold mb-2">
              Diagnostic Intake Engine
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">
              Candidate Profile & Target Role Configuration
            </h1>
            <p className="font-body-md text-on-surface-variant text-[14px] mt-1 leading-relaxed">
              Define your academic context and stated competency claim. Job roles are intentionally 
              department-agnostic, enabling cross-disciplinary career tracks without rigid restrictions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Candidate Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold mb-1.5">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-surface-container-lowest rounded border border-outline-variant text-on-surface text-[14px] focus:outline-none focus:border-primary font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold mb-1.5">
                  Academic Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value as AcademicYear)}
                  className="w-full px-3.5 py-2.5 bg-surface-container-lowest rounded border border-outline-variant text-on-surface text-[14px] focus:outline-none focus:border-primary font-medium"
                >
                  <option value="Year 1">Year 1 (Foundational)</option>
                  <option value="Year 2">Year 2 (Core Engineering)</option>
                  <option value="Year 3">Year 3 (Pre-Placement Specialization)</option>
                  <option value="Year 4">Year 4 (Final Year / Placement Ready)</option>
                </select>
              </div>
            </div>

            {/* Department Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Engineering Department (All 7 Disciplines Supported)
                </label>
                <span className="font-mono text-[11px] text-primary">Department-Agnostic Model</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {departments.map((dept) => {
                  const isSelected = selectedDept === dept;
                  return (
                    <button
                      type="button"
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`p-3 rounded border text-center transition-all ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-sm font-bold'
                          : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container font-medium'
                      }`}
                    >
                      <div className="font-mono text-[13px]">{dept}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Independent Job Role Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Target Job Role (Independent of Department)
                </label>
                <span className="font-mono text-[11px] text-on-surface-variant">
                  Market Benchmark: Tier-1 Infrastructure
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {roles.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-3.5 rounded border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-outline-variant/40 bg-surface-container-low hover:border-outline-variant'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-headline-sm text-[14px] font-bold text-on-surface">
                            {role.title}
                          </span>
                          {isSelected && (
                            <span className="material-symbols-outlined text-primary text-[18px]">
                              check_circle
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[11px] text-on-surface-variant block mt-0.5">
                          {role.industry}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between font-mono text-[11px]">
                        <span className="text-on-surface-variant">Req. Benchmark:</span>
                        <span className="font-bold text-primary">
                          {role.benchmarkThresholds.overall} / 10
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Self-Declared Claimed Score Slider */}
            <div className="bg-surface-container-low p-4 sm:p-5 rounded border border-outline-variant/40 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold block">
                    Self-Reported Baseline Claim (0 - 10)
                  </label>
                  <span className="text-[12px] text-on-surface-variant">
                    How proficient do you consider yourself in {activeRoleObj.targetSkill}?
                  </span>
                </div>
                <div className="font-headline-lg text-2xl font-bold font-mono text-primary bg-surface-container-lowest px-3 py-1 rounded border border-outline-variant/40">
                  {claimedScore.toFixed(1)} <span className="text-[14px] text-on-surface-variant font-normal">/ 10</span>
                </div>
              </div>

              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.5"
                value={claimedScore}
                onChange={(e) => setClaimedScore(parseFloat(e.target.value))}
                className="w-full accent-primary cursor-pointer h-2 bg-surface-variant rounded-lg"
              />

              <div className="flex justify-between font-mono text-[10px] text-on-surface-variant">
                <span>1.0 (Novice)</span>
                <span>5.0 (Moderate)</span>
                <span className="font-semibold text-primary">8.0 (High Confidence)</span>
                <span>10.0 (Mastery)</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-outline-variant/30">
              <div className="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
                <span>Inputs will be cross-referenced against empirical telemetry probe.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-container text-white font-mono text-[14px] font-semibold rounded shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Initialize Diagnostic Assessment</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
