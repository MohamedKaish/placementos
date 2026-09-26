import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem', maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Badge variant="info">Student Profile</Badge>
        <h1 style={{ marginTop: '0.5rem', fontSize: '2rem' }}>Candidate Intelligence Dossier</h1>
        <p style={{ marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
          Review claimed credentials, verified repository artifacts, and target career paths.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Card elevated>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem' }}>Candidate Engineering Profile</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Department of Computer Science & Engineering • Graduating 2026
              </p>
            </div>
            <Badge variant="success">Profile Active</Badge>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ACADEMIC DISCIPLINE</span>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>Computer Science & Eng.</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PRIMARY TARGET ROLE</span>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>Software Engineer</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SECONDARY TARGET ROLE</span>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>Data Analyst</div>
            </div>
          </div>
        </Card>

        <Card>
          <h3>Submitted Evidence Artifacts</h3>
          <p style={{ fontSize: '0.85rem' }}>
            Verifiable evidence items imported from resume, GitHub repos, and assessments.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
            <div
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
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Microservice API Project (GitHub)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Linked Skill: REST & Microservices • Reliability Weight: 0.70
                </div>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>

            <div
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
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Resume PDF Parser Output</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Extracted 8 technical skills • Reliability Weight: 0.30 (Unverified claim)
                </div>
              </div>
              <Badge variant="warning">Needs Assessment</Badge>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button variant="outline">Upload New Evidence Artifact</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
