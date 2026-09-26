'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  return (
    <div
      className="container"
      style={{
        paddingTop: '4rem',
        paddingBottom: '4rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card elevated style={{ width: '100%', maxWidth: '440px', gap: '1.25rem' }}>
        <div>
          <h2>Sign in to PlacementOS</h2>
          <p style={{ marginTop: '0.25rem' }}>
            Access your evidence graph, target roles, and preparation missions.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div>
            <label
              htmlFor="email"
              style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}
            >
              Institutional or Personal Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="student@cit.edu"
              required
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <Button type="submit" variant="primary" style={{ marginTop: '0.5rem' }}>
            Authenticate with Firebase
          </Button>
        </form>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Team B Foundation Placeholder: Firebase Auth flow to be bound in Sprint 2.
        </p>
      </Card>
    </div>
  );
}
