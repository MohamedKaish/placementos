import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  style,
  className = '',
  ...props
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: elevated ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    ...style
  };

  return (
    <div style={cardStyle} className={className} {...props}>
      {children}
    </div>
  );
};
