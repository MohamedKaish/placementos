'use client';

import React, { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#faf8ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
      }}
    >
      {/* Logo / Wordmark */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#6750a4',
            textTransform: 'uppercase',
            marginBottom: '6px',
            opacity: 0.8,
          }}
        >
          PlacementOS
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans, system-ui)',
            fontSize: '28px',
            fontWeight: 700,
            color: '#131b2e',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Career Intelligence
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '10px',
            letterSpacing: '0.18em',
            color: '#6750a4',
            textTransform: 'uppercase',
            marginTop: '4px',
            opacity: 0.6,
          }}
        >
          Enterprise Platform
        </div>
      </div>

      {/* Subtle divider */}
      <div
        style={{
          width: '48px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #6750a4, transparent)',
          opacity: 0.4,
        }}
      />

      {/* Loading bar */}
      <div style={{ width: '180px', position: 'relative' }}>
        <div
          style={{
            height: '2px',
            background: '#e8def8',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #6750a4, #9c72cc)',
              borderRadius: '2px',
              animation: 'placementos-shimmer 1.4s ease-in-out infinite',
              transformOrigin: 'left',
            }}
          />
        </div>
        <div
          style={{
            marginTop: '12px',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '10px',
            color: '#49454f',
            letterSpacing: '0.08em',
            textAlign: 'center',
          }}
        >
          Initializing PlacementOS{dots}
        </div>
      </div>

      <style>{`
        @keyframes placementos-shimmer {
          0%   { width: 0%;   opacity: 1; }
          60%  { width: 100%; opacity: 1; }
          80%  { width: 100%; opacity: 0; }
          81%  { width: 0%;   opacity: 0; }
          100% { width: 0%;   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
