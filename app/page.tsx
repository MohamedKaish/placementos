import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { departments, jobRoles } from '@/data/seed';

export default function HomePage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{ maxWidth: '820px', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <Badge variant="info">PromptWars × GDG CIT GenAI Challenge</Badge>
          <Badge variant="default">Department-Agnostic Engine</Badge>
        </div>
        <h1 style={{ fontSize: '3rem', lineHeight: 1.15, marginBottom: '1.25rem' }}>
          Placement<span style={{ color: 'var(--accent-primary)' }}>OS</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 500 }}>
          “Know where you stand. Know what to do next.”
        </p>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
          An evidence-weighted readiness engine that compares what you claim, what your artifacts prove, and what you demonstrate under assessment against target industry roles—across every engineering discipline.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            href="/onboarding"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Start Student Assessment →
          </Link>
          <Link
            href="/dashboard"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              border: '1px solid var(--border-default)',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Explore Readiness Dashboard
          </Link>
        </div>
      </section>

      {/* Core Principle Callout */}
      <section style={{ marginBottom: '4rem' }}>
        <Card elevated style={{ borderLeft: '4px solid var(--accent-primary)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Core Architectural Differentiator: Claimed Skill ≠ Demonstrated Skill
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            PlacementOS operates on 4 distinct layers: (1) Self-assessed claims, (2) Evidence from resumes & project repos, (3) Directly demonstrated ability via deterministic assessment, and (4) Real industry role requirements.
          </p>
        </Card>
      </section>

      {/* Supported Disciplines Grid */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2>Department-Agnostic Foundation</h2>
          <p style={{ marginTop: '0.25rem' }}>
            PlacementOS does not assume Department = Career. Students from any branch can target cross-disciplinary roles.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}
        >
          {departments.map((dept) => (
            <Card key={dept.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{dept.code}</span>
                <Badge variant="default">Discipline</Badge>
              </div>
              <h4 style={{ fontSize: '1rem', marginTop: '0.25rem' }}>{dept.name}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{dept.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Independent Job Roles Grid */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2>Cross-Disciplinary Target Roles</h2>
          <p style={{ marginTop: '0.25rem' }}>
            Job roles exist independently of academic departments. Each role specifies weighted skills and minimum proficiency levels.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {jobRoles.map((role) => (
            <Card key={role.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1.15rem' }}>{role.title}</h3>
                <Badge variant={role.marketDemandRating === 'high' ? 'success' : 'info'}>
                  {role.marketDemandRating} demand
                </Badge>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {role.description}
              </p>
              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Required Skills:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {role.requirements.map((r) => (
                    <span
                      key={r.skillId}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.15rem 0.45rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-surface-elevated)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-default)'
                      }}
                    >
                      {r.skillId.replace('skill_', '').toUpperCase()} (Lvl {r.minimumLevel})
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
