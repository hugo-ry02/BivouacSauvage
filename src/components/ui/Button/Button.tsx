import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  // Styles de base assurant min-h de 44px sur mobile pour conformité accessibilité tactile
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none min-h-[44px]';

  // Variantes de couleurs utilisant exclusivement les tokens @theme de Tailwind 4 (pas de classes dynamiques construites)
  const variantClasses = {
    primary:
      'bg-forest-700 hover:bg-forest-800 text-forest-50 active:bg-forest-900 shadow-sm focus-visible:outline-forest-700',
    secondary:
      'bg-forest-50 hover:bg-forest-100 text-forest-800 border border-forest-200 active:bg-forest-200 focus-visible:outline-forest-700',
    accent:
      'bg-accent-700 hover:bg-accent-800 text-white active:bg-accent-900 shadow-sm focus-visible:outline-accent-700',
    ghost:
      'bg-transparent hover:bg-forest-50 text-forest-800 active:bg-forest-100 focus-visible:outline-forest-700',
    danger:
      'bg-red-600 hover:bg-red-700 text-white active:bg-red-800 shadow-sm focus-visible:outline-red-600',
  }[variant];

  // Tailles garantissant une ergonomie optimale
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-w-[36px]',
    md: 'text-sm px-4 py-2.5 gap-2 min-w-[44px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-w-[48px]',
  }[size];

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`.trim()}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          <span>Chargement...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0" aria-hidden="true">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0" aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
