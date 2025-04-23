import React, { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  icon, 
  className = '',
  ...props 
}) => {
  const id = props.id || props.name || Math.random().toString(36).substring(2, 9);
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {props.required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          id={id}
          className={`
            block w-full rounded-md border ${error ? 'border-error-300' : 'border-gray-300'} 
            ${icon ? 'pl-10' : 'pl-4'} py-2 
            ${error ? 'pr-10' : 'pr-4'} 
            ${error ? 'text-error-900 placeholder-error-300' : 'text-gray-900 placeholder-gray-400'}
            focus:outline-none focus:ring-2 ${error ? 'focus:ring-error-500 focus:border-error-500' : 'focus:ring-primary-500 focus:border-primary-500'}
            transition-colors sm:text-sm
            ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
            ${className}
          `}
          {...props}
        />
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-error-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
    </div>
  );
};

export default Input;