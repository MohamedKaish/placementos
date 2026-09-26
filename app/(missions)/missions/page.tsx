import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { defaultPlacementService } from '@/lib/placement-service';
import { SkillGapAnalysis } from '@/types/scoring';

export default function MissionsPage() {
  const sampleGap: SkillGapAnalysis = {
    skillId: 'skill_fault_analysis',
    skillName: 'Fault Analysis & Symmetrical Components',
    subskillName: 'Fortescue Symmetrical Components',
    requiredLevel: 3,
    demonstratedLevel: 1.5,
    gapMagnitude: 1.5,
    importanceWeight: 0.45,
    isCritical: true,
    evidenceConfidence: 1.0,
    priorityScore: 10.13,
    status: 'critical_gap',
    traceableReason:
      'Recommended because Fault Analysis is your highest-priority critical demonstrated gap for the selected Power Systems Engineer role (Demonstrated: Level 1.5, Required: Level 3).'
  };

  const missions = defaultPlacementService.generateMissions(
    'user_demo_1',
    'role_power_engineer',
    [sampleGap]
  );
  const sampleMission = missions[0];

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
                TARGET SKILL: {sampleMission.targetSkill} (Target Role: {sampleMission.targetRole})
              </span>
              <h3 style={{ marginTop: '0.35rem', fontSize: '1.25rem' }}>{sampleMission.objective}</h3>
            </div>
            <Badge variant="warning">Priority Score: {sampleMission.priorityScore}</Badge>
          </div>

          <div
            style={{
              padding: '0.75rem',
              backgroundColor: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-default)',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}
          >
            <strong>Traceable Reason:</strong> {sampleMission.reason}
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              Hands-On Practice Task:
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {sampleMission.practice.problemStatement}
            </p>
          </div>

          <div style={{ marginTop: '0.75rem' }}>
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
              Est. Duration: {sampleMission.estimatedDuration} hours • Verification: {sampleMission.verificationMethod}
            </span>
            <Button variant="primary">Submit Evidence Artifact</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
