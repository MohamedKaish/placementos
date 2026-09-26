import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MissionEngine } from '@/lib/missions';

export default function MissionsPage() {
  const sampleGap = {
    skillId: 'skill_dsa',
    skillName: 'Data Structures & Algorithms',
    requiredLevel: 3 as const,
    currentEvidenceLevel: 2.1,
    gapMagnitude: 0.9,
    importanceWeight: 0.40,
    isCritical: true,
    status: 'critical_gap' as const
  };

  const sampleMission = MissionEngine.generateMissionFromGap(
    'user_demo_1',
    'role_swe',
    sampleGap
  );

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem', maxWidth: '860px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Badge variant="error">Critical Priority</Badge>
          <Badge variant="default">Traceable Recommendation</Badge>
        </div>
        <h1>Targeted Preparation Missions</h1>
        <p style={{ marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
          PlacementOS assigns missions strictly based on detected evidence gaps. Every mission produces verifiable artifacts.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Card elevated style={{ borderLeft: '4px solid var(--status-error)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                LINKED GAP: {sampleMission.linkedSkillName} (Magnitude: -{sampleMission.tracedGapMagnitude})
              </span>
              <h3 style={{ marginTop: '0.35rem', fontSize: '1.25rem' }}>{sampleMission.title}</h3>
            </div>
            <Badge variant="warning">Priority Score: {sampleMission.priorityScore}</Badge>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            {sampleMission.description}
          </p>

          <div style={{ marginTop: '1rem' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Actionable Execution Milestones:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {sampleMission.steps.map((step) => (
                <div
                  key={step.id}
                  style={{
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-default)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    {step.order}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{step.instruction}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      Deliverable: {step.expectedOutput}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Est. Duration: {sampleMission.estimatedHours} hours • Verification: {sampleMission.verificationMethod}
            </span>
            <Button variant="primary">Submit Evidence Artifact</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
