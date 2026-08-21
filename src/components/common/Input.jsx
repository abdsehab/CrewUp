import { forwardRef } from 'react';

const Input = forwardRef(({ label, id, error, icon: Icon, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={id} className="text-xs font-mono uppercase tracking-wider text-light-muted mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-light-muted" />
          </div>
        )}
        <input
          ref={ref}
          id={id}
          className={`
            w-full bg-dark-bg border border-dark-border text-light rounded-md shadow-sm
            focus:ring-1 focus:ring-brand focus:border-brand focus:outline-none transition-colors
            ${Icon ? 'pl-10' : 'pl-3'} 
            pr-3 py-2.5 text-sm
            placeholder-light-muted placeholder-opacity-50
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
