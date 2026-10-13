import React from 'react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps & { pill?: boolean }> = ({
  id,
  variant,
  children,
  onClick,
  className = '',
  type = 'button',
  isActive = false,
  pill = false,
  disabled = false,
}) => {
  // Base classes according to specification (height, padding, font-weight, transition)
  let baseClasses = 'inline-flex items-center justify-center font-semibold text-sm h-11 px-6 tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600/50 cursor-pointer shadow-xs active:scale-[0.98]';
  
  if (variant === 'navbar-cta-dark' || variant === 'navbar-cta-light') {
    baseClasses = 'inline-flex items-center justify-center font-bold text-[10px] sm:text-xs h-8 px-4 tracking-widest transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600/50 cursor-pointer active:scale-[0.98]';
  }

  const radiusClass = (pill || variant === 'navbar-cta-dark' || variant === 'navbar-cta-light') ? 'rounded-full' : 'rounded-lg';

  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-[#538742] text-white border border-transparent hover:bg-[#538742]/90 hover:shadow-md';
      break;
    case 'secondary-outline':
      variantClasses = 'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-gray-900/5';
      break;

    {/* Este boton es el de borde dorado con negro */}
    case 'black-outline':
      variantClasses = 'bg-transparent text-navy-900 border-2 border-[#d6b724] hover:bg-navy-900 hover:text-[#d6b724] hover:border-navy-900 focus:ring-black/50';
      break;
    case 'dark-filled':
      variantClasses = 'bg-zinc-800 text-white border border-transparent hover:bg-black hover:shadow-md';
      break;
    case 'white-filled':
      variantClasses = 'bg-white text-navy-900 border border-transparent hover:bg-white/90 hover:shadow-md';
      break;
    case 'white-outline':
      variantClasses = 'border border-white text-white bg-transparent hover:bg-white/10 backdrop-blur-xs';
      break;
    case 'pill-toggle':
      variantClasses = isActive
        ? 'bg-blue-600 text-white'
        : 'bg-white text-gray-600 hover:bg-gray-100';
      break;
    case 'glass':
      variantClasses = 'bg-gray-500/10 text-gray-800 border border-gray-500/20 backdrop-blur-md hover:bg-gray-500/20 hover:text-black';
      break;
    case 'navbar-cta-dark':
      variantClasses = 'bg-white/10 text-white/80 border border-white/20 backdrop-blur-md hover:bg-white/25 hover:text-white uppercase';
      break;
    case 'navbar-cta-light':
      variantClasses = 'bg-black/5 text-gray-700 border border-black/10 backdrop-blur-md hover:bg-black/10 hover:text-gray-900 uppercase';
      break;
    case 'default':
      variantClasses = '';
      break;
  }

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${radiusClass} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};
