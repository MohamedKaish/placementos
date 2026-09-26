import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        marginTop: 'auto'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center'
        }}
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          PlacementOS — “Know where you stand. Know what to do next.”
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          PromptWars × GDG on Campus – CIT GenAI Innovation Challenge. Evidence-weighted, department-agnostic placement readiness engine.
        </p>
      </div>
    </footer>
  );
};
