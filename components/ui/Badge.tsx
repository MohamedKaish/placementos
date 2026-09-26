import React, { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  style,
  className = '',
  ...props
}) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--bg-surface-elevated)',
      color: 'var(--text-secondary)',
      borderColor: 'var(--border-default)'
    },
    success: {
      backgroundColor: 'var(--status-success-bg)',
      color: 'var(--status-success)',
      borderColor: 'var(--status-success)'
    },
    warning: {
      backgroundColor: 'var(--status-warning-bg)',
      color: 'var(--status-warning)',
      borderColor: 'var(--status-warning)'
    },
    error: {
      backgroundColor: 'var(--status-error-bg)',
      color: 'var(--status-error)',
      borderColor: 'var(--status-error)'
    },
    info: {
      backgroundColor: 'var(--status-info-bg)',
      color: 'var(--status-info)',
      borderColor: 'var(--status-info)'
    }
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.2rem 0.6rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    ...variantStyles[variant],
    ...style
  };

  return (
    <span style={badgeStyle} className={className} {...props}>
      {children}
    </span>
  );
};
