import React from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(11, 15, 23, 0.85)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-primary)',
            fontWeight: 700,
            fontSize: '1.2rem',
            textDecoration: 'none'
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '2px',
              backgroundColor: 'var(--accent-primary)'
            }}
          />
          Placement<span style={{ color: 'var(--accent-primary)' }}>OS</span>
        </Link>

        <nav
          aria-label="Main Navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '0.9rem',
            fontWeight: 500
          }}
        >
          <Link href="/dashboard" style={{ color: 'var(--text-secondary)' }}>
            Dashboard
          </Link>
          <Link href="/assessment" style={{ color: 'var(--text-secondary)' }}>
            Assessment
          </Link>
          <Link href="/missions" style={{ color: 'var(--text-secondary)' }}>
            Missions
          </Link>
          <Link href="/profile" style={{ color: 'var(--text-secondary)' }}>
            Profile
          </Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            href="/login"
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)'
            }}
          >
            Sign In
          </Link>
          <Link
            href="/onboarding"
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff'
            }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};
