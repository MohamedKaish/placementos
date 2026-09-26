import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { defaultPlacementService } from '@/lib/placement-service';
import { EvidenceItem } from '@/types/evidence';

export default function DashboardPage() {
  // Demonstration baseline evaluation using unified PlacementService
  const sampleEvidence: EvidenceItem[] = [
    {
      id: 'ev_demo_1',
      userId: 'student_demo',
      skillId: 'skill_dsa',
      sourceType: 'assessment_performance',
      title: 'DSA Diagnostic Assessment',
      confidenceScore: 1.0,
      demonstratedLevel: 2.1
    },
    {
      id: 'ev_demo_2',
      userId: 'student_demo',
      skillId: 'skill_backend_apis',
      sourceType: 'verifiable_project',
      title: 'Microservices GitHub Repo',
      confidenceScore: 0.85,
      demonstratedLevel: 1.8
    },
    {
      id: 'ev_demo_3',
      userId: 'student_demo',
      skillId: 'skill_sql_analytics',
      sourceType: 'assessment_performance',
      title: 'SQL Assessment',
      confidenceScore: 1.0,
      demonstratedLevel: 2.5
    }
  ];

  const sampleClaims = {
    skill_dsa: {
      skillId: 'skill_dsa',
      claimedLevel: 4.0,
      selfAssessedAt: new Date().toISOString(),
      confidenceSelfRating: 4
    },
    skill_backend_apis: {
      skillId: 'skill_backend_apis',
      claimedLevel: 3.0,
      selfAssessedAt: new Date().toISOString(),
      confidenceSelfRating: 3
    }
  };

  const report = defaultPlacementService.evaluateReadiness(
    'role_swe',
    sampleEvidence,
    sampleClaims
  );

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="info">Target: {report.roleTitle}</Badge>
          <h1 style={{ marginTop: '0.5rem', fontSize: '2rem' }}>Placement Readiness Intelligence</h1>
          <p style={{ marginTop: '0.25rem' }}>
            Deterministic evaluation based on verifiable evidence and direct assessment.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link
            href="/assessment"
            style={{
              padding: '0.55rem 1.1rem',
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            Take Verification Assessment
          </Link>
          <Link
            href="/missions"
            style={{
              padding: '0.55rem 1.1rem',
              backgroundColor: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            View Active Missions
          </Link>
        </div>
      </div>

      {/* Metrics Row (Multi-dimensional, no single fake percentage) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <Card elevated>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>OVERALL READINESS BAND</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--status-warning)', marginTop: '0.25rem' }}>
            {report.overallReadinessBand.replace('_', ' ')}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Requires meeting all critical minimum thresholds
          </span>
        </Card>

        <Card elevated>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CORE SKILLS FULFILLMENT</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '0.25rem' }}>
            {report.coreSkillsReadiness}%
          </div>
          <ProgressBar value={report.coreSkillsReadiness} showPercentage={false} />
        </Card>

        <Card elevated>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>VERIFIED EVIDENCE COVERAGE</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--status-info)', marginTop: '0.25rem' }}>
            {report.evidenceCoverage}%
          </div>
          <ProgressBar value={report.evidenceCoverage} showPercentage={false} variant="success" />
        </Card>

        <Card elevated>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CRITICAL REQUIREMENTS</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: report.criticalRequirementsMet ? 'var(--status-success)' : 'var(--status-error)', marginTop: '0.25rem' }}>
            {report.criticalRequirementsMet ? 'MET' : 'UNMET GAPS'}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Critical requirements are strict qualification gates
          </span>
        </Card>
      </div>

      {/* Grid: Skill Gaps vs Calibration Analysis */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        {/* Detected Skill Gaps */}
        <Card>
          <h3>Detected Skill Gaps for {report.roleTitle}</h3>
          <p style={{ fontSize: '0.85rem' }}>
            Every detected gap triggers an actionable preparation mission.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
            {report.skillGaps.map((gap) => (
              <div
                key={gap.skillId}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{gap.skillName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Demonstrated: {gap.demonstratedLevel} / Target: Level {gap.requiredLevel}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Badge variant={gap.status === 'critical_gap' ? 'error' : 'warning'}>
                    Gap: -{gap.gapMagnitude}
                  </Badge>
                  {gap.isCritical && (
                    <div style={{ fontSize: '0.7rem', color: 'var(--status-error)', marginTop: '0.2rem' }}>
                      CRITICAL GATE
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Calibration Gap: Claimed vs Demonstrated */}
        <Card>
          <h3>Calibration Gap (Claimed vs Demonstrated)</h3>
          <p style={{ fontSize: '0.85rem' }}>
            “Claimed skill ≠ Demonstrated skill.” Highlights overconfidence and imposter syndrome.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
            {report.calibrations.map((cal) => (
              <div
                key={cal.skillId}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{cal.skillName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Claimed: Level {cal.claimedLevel} | Evidence: Level {cal.demonstratedLevel}
                  </div>
                </div>
                <div>
                  <Badge
                    variant={
                      cal.classification === 'overconfident'
                        ? 'error'
                        : cal.classification === 'underconfident'
                        ? 'info'
                        : cal.classification === 'well_calibrated'
                        ? 'success'
                        : 'default'
                    }
                  >
                    {cal.classification.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
