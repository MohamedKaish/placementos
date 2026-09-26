import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  variant = 'primary',
  showPercentage = true
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const barColors: Record<string, string> = {
    primary: 'var(--accent-primary)',
    success: 'var(--status-success)',
    warning: 'var(--status-warning)',
    error: 'var(--status-error)'
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      {(label || showPercentage) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          {label && <span style={{ color: 'var(--text-secondary)' }}>{label}</span>}
          {showPercentage && (
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{clampedValue}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${clampedValue}%`,
            height: '100%',
            backgroundColor: barColors[variant],
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};
