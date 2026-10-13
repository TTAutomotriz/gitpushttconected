import React from 'react';
import { StatBlockProps } from '../types';
import { motion } from 'motion/react';

export const StatBlock: React.FC<StatBlockProps> = ({
  id,
  icon,
  value,
  label,
  className = '',
  size = 'normal',
  labelClassName = '',
  animateValue = false,
  animationKey,
}) => {
  const renderFormattedValue = (val: string) => {
    const parts = val.split(' ');
    const isH1 = size === 'h1';
    const isH2 = size === 'h2';
    
    const numberSizeClass = isH1 
      ? 'text-3xl sm:text-5xl md:text-6xl' 
      : isH2 
      ? 'text-3xl sm:text-4xl md:text-5xl' 
      : 'text-xl sm:text-2xl md:text-3xl';
      
    const textSizeClass = isH1
      ? 'text-sm sm:text-base md:text-lg'
      : isH2
      ? 'text-xs sm:text-sm md:text-base'
      : 'text-xs sm:text-sm';

    const containerHeightClass = isH1
      ? 'h-10 sm:h-16 md:h-20'
      : isH2
      ? 'h-10 sm:h-14 md:h-16'
      : 'h-8 sm:h-10 md:h-12';

    if (parts.length > 1) {
      const numberPart = parts[0];
      const textPart = parts.slice(1).join(' ');
      return (
        <span className={`flex items-baseline gap-1.5 flex-wrap sm:flex-nowrap ${className.includes('items-center') ? 'justify-center' : ''}`}>
          {animateValue ? (
            <span className={`overflow-hidden inline-flex ${containerHeightClass} items-end`}>
              <motion.span
                key={animationKey ?? numberPart}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display font-extrabold text-navy-900 tracking-tight inline-block ${numberSizeClass}`}
              >
                {numberPart}
              </motion.span>
            </span>
          ) : (
            <span className={`font-display font-extrabold text-navy-900 tracking-tight ${numberSizeClass}`}>
              {numberPart}
            </span>
          )}
          <span className={`font-semibold text-gray-500 uppercase tracking-widest leading-none ${textSizeClass}`}>
            {textPart}
          </span>
        </span>
      );
    }
    return animateValue ? (
      <span className={`overflow-hidden inline-flex ${containerHeightClass} items-end`}>
        <motion.span
          key={animationKey ?? val}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`font-display font-extrabold text-navy-900 tracking-tight inline-block ${numberSizeClass}`}
        >
          {val}
        </motion.span>
      </span>
    ) : (
      <span className={`font-display font-extrabold text-navy-900 tracking-tight ${numberSizeClass}`}>
        {val}
      </span>
    );
  };

  const isCentered = className.includes('items-center') || className.includes('text-center');

  return (
    <div
      id={id}
      className={`flex ${isCentered ? 'flex-col items-center justify-center text-center' : 'items-start'} gap-2 p-1 transition-shadow duration-200 ${className}`}
    >
      {icon && (
        <div className={`flex-shrink-0 flex items-center justify-center text-black ${
          size === 'h1' ? 'w-10 h-10 mt-1.5 sm:mt-2.5 [&_svg]:w-9 [&_svg]:h-9 [&_svg]:sm:w-10 [&_svg]:sm:h-10 [&_div]:w-9 [&_div]:h-9 [&_div]:sm:w-10 [&_div]:sm:h-10' : 'w-6 h-6 mt-1.5'
        }`}>
          {icon}
        </div>
      )}
      <div className={`flex flex-col ${isCentered ? 'items-center text-center' : 'items-start'}`}>
        {renderFormattedValue(value)}
        <div className={`text-xs font-semibold uppercase tracking-widest mt-1 ${labelClassName || 'text-gray-500'}`}>
          {label}
        </div>
      </div>
    </div>
  );
};
