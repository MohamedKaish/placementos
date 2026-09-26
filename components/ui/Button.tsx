import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    textDecoration: 'none',
    fontFamily: 'inherit',
    ...style
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '0.4rem 0.75rem', fontSize: '0.85rem' },
    md: { padding: '0.6rem 1.15rem', fontSize: '0.95rem' },
    lg: { padding: '0.8rem 1.6rem', fontSize: '1.05rem' }
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--accent-primary)',
      color: '#ffffff',
      borderColor: 'var(--accent-hover)'
    },
    secondary: {
      backgroundColor: 'var(--bg-surface-elevated)',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-default)'
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-strong)'
    },
    danger: {
      backgroundColor: 'var(--status-error)',
      color: '#ffffff',
      borderColor: 'transparent'
    }
  };

  const combinedStyles: React.CSSProperties = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant]
  };

  return (
    <button style={combinedStyles} className={className} {...props}>
      {children}
    </button>
  );
};
