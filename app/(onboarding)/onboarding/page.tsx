import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { departments, jobRoles } from '@/data/seed';

export default function OnboardingPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem', maxWidth: '860px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <Badge variant="info">Step 1 of 3: Career Profiling</Badge>
        <h1 style={{ marginTop: '0.75rem', fontSize: '2rem' }}>Student Diagnostic Onboarding</h1>
        <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
          Configure your engineering discipline and declare your independent target roles. PlacementOS uses this to benchmark your demonstrated evidence.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Section 1: Department Selection */}
        <Card>
          <h3>1. Select Your Engineering Department</h3>
          <p style={{ fontSize: '0.875rem' }}>
            Choose your academic department. Remember: department does NOT restrict your career targets.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem',
              marginTop: '0.75rem'
            }}
          >
            {departments.map((dept) => (
              <label
                key={dept.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  cursor: 'pointer'
                }}
              >
                <input type="radio" name="department" value={dept.id} defaultChecked={dept.code === 'CSE'} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{dept.code}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({dept.name.split(' ')[0]})</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Section 2: Independent Target Roles */}
        <Card>
          <h3>2. Select Your Target Career Roles</h3>
          <p style={{ fontSize: '0.875rem' }}>
            Pick any role you wish to prepare for. Multiple roles can be selected regardless of discipline.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0.75rem',
              marginTop: '0.75rem'
            }}
          >
            {jobRoles.map((role) => (
              <label
                key={role.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  cursor: 'pointer'
                }}
              >
                <input type="checkbox" name="targetRoles" value={role.id} style={{ marginTop: '0.2rem' }} />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{role.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{role.requirements.length} required skills</div>
                </div>
              </label>
            ))}
          </div>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Button variant="primary">Proceed to Initial Skill Claim & Evidence →</Button>
        </div>
      </div>
    </div>
  );
}
