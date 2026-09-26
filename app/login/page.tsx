'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Department, AcademicYear } from '@/types/team2-contract';
import { defaultPlacementService } from '@/lib/placement-service';
import { saveProfile, getStoredProfile } from '@/lib/candidate-store';

export default function LoginPage() {
  const router = useRouter();

  const departments = defaultPlacementService.getDepartments();
  const roles = defaultPlacementService.getJobRoles();

  const [studentName, setStudentName] = useState('');
  const [selectedDept, setSelectedDept] = useState<Department>(departments[0]);
  const [selectedYear, setSelectedYear] = useState<AcademicYear>('Year 4');
  const [selectedRole, setSelectedRole] = useState(roles[0].id);
  const [claimedScore, setClaimedScore] = useState(7.0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, skip login
  useEffect(() => {
    const existing = getStoredProfile();
    if (existing) {
      router.replace('/');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = studentName.trim();
    if (!trimmed) {
      setError('Please enter your full name.');
      return;
    }
    setError('');
    setSubmitting(true);

    saveProfile({
      studentName: trimmed,
      department: selectedDept,
      academicYear: selectedYear,
      roleId: selectedRole,
      claimedScore,
      createdAt: new Date().toISOString(),
    });

    router.replace('/');
  };

  const activeRole = roles.find(r => r.id === selectedRole) ?? roles[0];

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-12">

      {/* Brand header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded bg-primary flex items-center justify-center text-white font-bold text-lg shadow">
            P
          </div>
          <span className="text-[22px] font-bold tracking-tight text-on-surface">
            PlacementOS
          </span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
          Career Readiness Intelligence Platform
        </p>
      </div>

      {/* Login card */}
      <div className="w-full max-w-[680px] bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-sm p-7 sm:p-10 flex flex-col gap-7">

        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-mono text-[10px] rounded uppercase font-semibold mb-3">
            Candidate Profile
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-on-surface tracking-tight">
            Create Your Profile
          </h1>
          <p className="text-on-surface-variant text-[13px] mt-1 leading-relaxed">
            Enter your details to begin your personalized placement readiness assessment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Name + Academic Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold mb-1.5">
                Full Name
              </label>
              <input
                id="candidate-name"
                type="text"
                value={studentName}
                onChange={e => { setStudentName(e.target.value); setError(''); }}
                placeholder="e.g. Arjun Kumar"
                className="w-full px-3.5 py-2.5 bg-surface-container-low rounded border border-outline-variant text-on-surface text-[14px] focus:outline-none focus:border-primary font-medium placeholder:text-on-surface-variant/50"
                required
              />
              {error && (
                <p className="text-[11px] text-error font-mono mt-1">{error}</p>
              )}
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold mb-1.5">
                Academic Year
              </label>
              <select
                id="academic-year"
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value as AcademicYear)}
                className="w-full px-3.5 py-2.5 bg-surface-container-low rounded border border-outline-variant text-on-surface text-[14px] focus:outline-none focus:border-primary font-medium"
              >
                <option value="Year 1">Year 1 — Foundational</option>
                <option value="Year 2">Year 2 — Core Engineering</option>
                <option value="Year 3">Year 3 — Pre-Placement</option>
                <option value="Year 4">Year 4 — Final Year / Placement</option>
              </select>
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold mb-2">
              Engineering Department
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {departments.map(dept => {
                const active = selectedDept === dept;
                return (
                  <button
                    type="button"
                    key={dept}
                    id={`dept-${dept}`}
                    onClick={() => setSelectedDept(dept)}
                    className={`p-3 rounded border text-center font-mono text-[13px] transition-all font-medium ${
                      active
                        ? 'bg-primary text-white border-primary shadow-sm font-bold'
                        : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:border-primary/50'
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Role */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold mb-2">
              Target Job Role
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 overflow-y-auto pr-1">
              {roles.map(role => {
                const active = selectedRole === role.id;
                return (
                  <div
                    key={role.id}
                    id={`role-${role.id}`}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-3.5 rounded border transition-all flex flex-col gap-1 ${
                      active
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-outline-variant/40 bg-surface-container-low hover:border-outline-variant'
                    }`}
                    style={{ cursor: 'inherit' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[13px] text-on-surface">{role.title}</span>
                      {active && (
                        <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-on-surface-variant">{role.industry}</span>
                    <span className="font-mono text-[10px] text-primary font-semibold">
                      Benchmark: {role.benchmarkThresholds.overall} / 10
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Self-rating */}
          <div className="bg-surface-container-low p-4 rounded border border-outline-variant/40 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold block">
                  Self-Reported Skill Level (0–10)
                </label>
                <span className="text-[12px] text-on-surface-variant">
                  How proficient are you in {activeRole.targetSkill}?
                </span>
              </div>
              <div className="font-headline-lg text-xl font-bold font-mono text-primary bg-surface-container-lowest px-3 py-1 rounded border border-outline-variant/40">
                {claimedScore.toFixed(1)} <span className="text-[12px] text-on-surface-variant font-normal">/ 10</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={claimedScore}
              onChange={e => setClaimedScore(parseFloat(e.target.value))}
              className="w-full accent-primary h-2 bg-surface-variant rounded-lg"
            />
            <div className="flex justify-between font-mono text-[10px] text-on-surface-variant">
              <span>1.0 Novice</span>
              <span>5.0 Moderate</span>
              <span>8.0 Advanced</span>
              <span>10.0 Mastery</span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-outline-variant/30">
            <div className="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant">
              <span className="material-symbols-outlined text-[15px] text-tertiary">lock</span>
              <span>Profile stored locally. No data leaves your device.</span>
            </div>
            <button
              id="login-submit"
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-7 py-3 bg-primary hover:bg-primary-container text-white font-mono text-[14px] font-semibold rounded shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
            >
              <span>{submitting ? 'Starting…' : 'Continue to PlacementOS'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

        </form>
      </div>

      <p className="mt-6 font-mono text-[10px] text-on-surface-variant/50 text-center">
        © 2026 PlacementOS Enterprise • Team 1 Core Intelligence Layer
      </p>
    </div>
  );
}
