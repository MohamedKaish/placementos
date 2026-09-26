'use client';

import React, { useState } from 'react';
import { Department, JobRole } from '@/types/skill-graph';
import { User, Building2, GraduationCap, Briefcase, Activity, ArrowRight } from 'lucide-react';

interface OnboardingScreenProps {
  departments: Department[];
  jobRoles: JobRole[];
  onComplete: (data: {
    departmentCode: string;
    academicYear: string;
    roleId: string;
    claimedScore: number;
    candidateName: string;
  }) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  departments,
  jobRoles,
  onComplete,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('EEE');
  const [selectedYear, setSelectedYear] = useState<string>('Year 3');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('role_power_systems_engineer');
  const [claimedScore, setClaimedScore] = useState<number>(8.0);
  const [candidateName, setCandidateName] = useState<string>('Ananya Rao');

  const selectedRole = jobRoles.find((r) => r.id === selectedRoleId) || jobRoles[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      departmentCode: selectedDept,
      academicYear: selectedYear,
      roleId: selectedRoleId,
      claimedScore,
      candidateName,
    });
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-grid-matrix min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner */}
        <div className="mb-8 border border-outline-variant bg-surface-container-lowest p-6 relative">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-1.5 py-0.5 bg-surface-container border border-outline-variant text-label-sm font-label-sm text-primary uppercase font-bold tracking-wider">
              TELEMETRY INITIALIZATION // PHASE 01
            </span>
            <span className="text-outline text-label-sm font-label-sm font-bold">[READY_FOR_CALIBRATION]</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight font-bold">
            Configure Candidate Diagnostic Profile
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-4xl">
            Set your academic domain and target engineering role to calibrate benchmark thresholds against live Tier-1 industry hiring rubrics.
          </p>
        </div>

        {/* Configuration Workspace Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Parameters (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Candidate Identity Input */}
            <div className="border border-outline-variant bg-surface-container-low p-5">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-primary" />
                  <h2 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface">Candidate Identifier</h2>
                </div>
                <span className="text-label-sm text-outline">[IDENT_TAG]</span>
              </div>
              <div>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant px-3 py-2 text-on-surface font-body-md focus:border-primary focus:outline-none"
                  placeholder="Enter candidate full name"
                  required
                />
              </div>
            </div>

            {/* 1. Department Selection */}
            <div className="border border-outline-variant bg-surface-container-low p-5">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <h2 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface">1. Academic Engineering Department</h2>
                </div>
                <span className="text-label-sm text-outline uppercase">[SPECIFY_DISCIPLINE]</span>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-4">
                Select candidate parent faculty. Evaluates baseline domain alignment.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {departments.map((dept) => {
                  const isSelected = selectedDept === dept.code;
                  return (
                    <button
                      type="button"
                      key={dept.code}
                      onClick={() => setSelectedDept(dept.code)}
                      className={`text-left p-3 border transition-all ${
                        isSelected
                          ? 'border-2 border-primary-container bg-surface-container-high'
                          : 'border-outline-variant bg-surface-container hover:border-outline'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-headline-sm text-headline-sm font-bold ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                          {dept.code}
                        </span>
                        {isSelected && <span className="text-label-sm text-primary font-bold">[SEL]</span>}
                      </div>
                      <p className="text-label-sm text-on-surface-variant truncate">{dept.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Academic Seniority */}
            <div className="border border-outline-variant bg-surface-container-low p-5">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <h2 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface">2. Academic Seniority Year</h2>
                </div>
                <span className="text-label-sm text-outline uppercase">[COHORT]</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Year 1', 'Year 2', 'Year 3', 'Year 4'].map((year) => {
                  const isSelected = selectedYear === year;
                  return (
                    <button
                      type="button"
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`text-center py-2.5 px-3 border font-label-md uppercase tracking-wider font-semibold transition-all ${
                        isSelected
                          ? 'border-2 border-primary-container bg-surface-container-high text-primary'
                          : 'border-outline-variant bg-surface-container text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Target Career Engineering Role */}
            <div className="border border-outline-variant bg-surface-container-low p-5">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <h2 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface">3. Target Career Engineering Role</h2>
                </div>
                <span className="text-label-sm text-outline uppercase">[DEPARTMENT_AGNOSTIC]</span>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-4">
                Roles are independent of academic discipline. Minimum prerequisite standards apply.
              </p>
              <div className="space-y-2">
                {jobRoles.map((role) => {
                  const isSelected = selectedRoleId === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRoleId(role.id)}
                      className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary bg-surface-container-high'
                          : 'border-outline-variant bg-surface-container hover:border-outline'
                      }`}
                    >
                      <div>
                        <div className="font-headline-sm text-headline-sm font-bold text-on-surface">
                          {role.title}
                        </div>
                        <div className="text-body-sm text-on-surface-variant">{role.description}</div>
                      </div>
                      <span className={`text-label-sm font-mono uppercase px-2 py-0.5 border ${
                        isSelected ? 'border-primary text-primary bg-primary/10' : 'border-outline-variant text-outline'
                      }`}>
                        {isSelected ? 'ACTIVE TARGET' : 'SELECT'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Self-Claimed Skill Competency */}
            <div className="border border-outline-variant bg-surface-container-low p-5">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <h2 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface">
                    4. Self-Claimed Technical Competency (Fault Analysis)
                  </h2>
                </div>
                <span className="text-label-sm text-tertiary font-bold">{claimedScore.toFixed(1)} / 10.0</span>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-4">
                Indicate what you believe your current ability level is in Power Systems & Fault Calculations.
              </p>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={claimedScore}
                  onChange={(e) => setClaimedScore(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-label-sm text-outline font-mono">
                  <span>1.0 (Novice)</span>
                  <span>5.0 (Developing)</span>
                  <span className="text-tertiary font-bold">8.0 (Target Demo: Claimed High)</span>
                  <span>10.0 (Master)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Benchmark Target Role Preview & Required Skills (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-outline-variant bg-surface-container-low p-6 sticky top-20">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
                <span className="font-label-sm text-primary uppercase font-bold tracking-widest">[TARGET_BENCHMARK]</span>
                <span className="text-label-sm text-outline font-mono">TIER-1 HIRING SPEC</span>
              </div>

              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
                {selectedRole.title}
              </h3>
              <p className="text-body-sm text-on-surface-variant mb-6">
                {selectedRole.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="font-label-md text-on-surface uppercase font-bold tracking-wider">
                  Required Competency Gates:
                </div>
                {selectedRole.requirements.map((req) => (
                  <div key={req.skillId} className="p-3 bg-surface-container-lowest border border-outline-variant flex justify-between items-center">
                    <div>
                      <div className="font-label-md text-on-surface font-semibold">
                        {req.skillId.replace('skill_', '').replace(/_/g, ' ').toUpperCase()}
                      </div>
                      <div className="text-[11px] text-outline">Weight: {Math.round(req.weight * 100)}%</div>
                    </div>
                    <span className="text-label-sm font-mono text-secondary px-2 py-0.5 border border-secondary/30 bg-secondary/10">
                      MIN LVL {req.minimumLevel}.0+
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <span>INITIALIZE TELEMETRY PROBE & START ASSESSMENT</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
