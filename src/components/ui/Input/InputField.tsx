import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  isRequired = false,
  id,
  className = '',
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const hasError = Boolean(error);

  const borderClass = hasError
    ? 'border-red-600 focus:border-red-600 focus:ring-red-600/20'
    : 'border-surface-border focus:border-forest-700 focus:ring-forest-700/20';

  return (
    <div className={`flex flex-col gap-1.5 text-left ${className}`.trim()}>
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-text-main flex items-center justify-between"
      >
        <span>
          {label}
          {isRequired && (
            <span className="text-accent-600 ml-1 font-bold" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {isRequired && <span className="text-xs font-normal text-text-subtle">Requis</span>}
      </label>

      <div className="relative">
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          required={isRequired}
          className={`w-full rounded-lg border bg-surface-white px-3.5 py-2.5 text-sm text-text-main placeholder:text-text-subtle transition-all duration-150 min-h-[44px] focus:outline-none focus:ring-2 disabled:bg-surface-muted disabled:text-text-muted disabled:cursor-not-allowed ${borderClass}`}
          {...props}
        />
        {hasError && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <AlertCircle className="w-5 h-5 text-red-600" aria-hidden="true" />
          </div>
        )}
      </div>

      {hasError && (
        <p id={errorId} className="text-xs font-medium text-red-600 flex items-center gap-1 mt-0.5" role="alert">
          {error}
        </p>
      )}

      {!hasError && helperText && (
        <p id={helperId} className="text-xs text-text-muted mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
};
