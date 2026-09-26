import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AssessmentPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem', maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Badge variant="info">Diagnostic Mode</Badge>
          <Badge variant="default">Department-Agnostic</Badge>
        </div>
        <h1>Technical Assessment Engine</h1>
        <p style={{ marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
          Directly demonstrates ability. The scoring logic is strictly deterministic and updates your evidence-backed rating.
        </p>
      </div>

      <Card elevated style={{ gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>QUESTION 1 OF 3 • SKILL: DATA STRUCTURES</span>
            <h3 style={{ marginTop: '0.35rem' }}>Time Complexity & Hash Collisions</h3>
          </div>
          <Badge variant="warning">Target Level 3</Badge>
        </div>

        <p style={{ color: 'var(--text-primary)', fontSize: '1rem', lineHeight: 1.6 }}>
          In a hash table utilizing separate chaining with balanced binary search trees in each bucket, what is the worst-case lookup time complexity when all <em>n</em> elements hash to the same bucket?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { id: 'opt_1', text: 'O(1) constant time amortized' },
            { id: 'opt_2', text: 'O(log n) logarithmic time due to balanced BST search' },
            { id: 'opt_3', text: 'O(n) linear search over a linked chain' },
            { id: 'opt_4', text: 'O(n log n) due to continuous tree rebalancing' }
          ].map((option) => (
            <label
              key={option.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              <input type="radio" name="sample_question" value={option.id} />
              <span style={{ fontSize: '0.95rem' }}>{option.text}</span>
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Deterministic Scoring: Responses graded against verifiable rubric.
          </span>
          <Button variant="primary">Submit Answer & Continue →</Button>
        </div>
      </Card>
    </div>
  );
}
