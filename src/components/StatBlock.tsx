import React from 'react';
import { StatBlockProps } from '../types';

export const StatBlock: React.FC<StatBlockProps> = ({
  id,
  icon,
  value,
  label,
  className = '',
  size = 'normal',
  labelClassName = '',
}) => {
  const isH1 = size === 'h1';
  const isH2 = size === 'h2';

  const numberSizeClass = isH1
    ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold'
    : isH2
    ? 'text-3.5xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold'
    : 'text-2xl sm:text-3xl md:text-4xl font-bold';

  const unitSizeClass = isH1
    ? 'text-base sm:text-lg md:text-xl lg:text-2xl font-bold'
    : isH2
    ? 'text-sm sm:text-base md:text-lg font-semibold'
    : 'text-xs sm:text-sm font-medium';

  const renderFormattedValue = (val: string) => {
    const parts = val.split(' ');
    if (parts.length > 1) {
      const numberPart = parts[0];
      const textPart = parts.slice(1).join(' ');
      return (
        <span className="inline-flex items-baseline gap-1.5 sm:gap-2">
          <span className={`font-display font-extrabold text-navy-900 tracking-tight leading-none ${numberSizeClass}`}>
            {numberPart}
          </span>
          <span className={`text-gray-500 uppercase tracking-wider leading-none ${unitSizeClass}`}>
            {textPart}
          </span>
        </span>
      );
    }
    return (
      <span className={`font-display font-extrabold text-navy-900 tracking-tight leading-none ${numberSizeClass}`}>
        {val}
      </span>
    );
  };

  const isCentered = className.includes('items-center') || className.includes('text-center');

  return (
    <div
      id={id}
      className={`flex flex-col ${isCentered ? 'items-center text-center' : 'items-start text-left'} bg-transparent border-0 p-0 shadow-none ${className}`}
    >
      {/* Icono del lado izquierdo del número */}
      <div className={`flex items-center gap-2.5 sm:gap-3.5 ${isCentered ? 'justify-center' : 'justify-start text-left'}`}>
        {icon && (
          <div className="flex-shrink-0 flex items-center justify-center text-black">
            {icon}
          </div>
        )}
        <div className="flex items-baseline text-left">
          {renderFormattedValue(value)}
        </div>
      </div>

      {/* Etiqueta / descripción debajo */}
      {label && (
        <div className={`text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider mt-2 sm:mt-2.5 ${labelClassName || 'text-gray-500'} ${isCentered ? 'text-center' : 'text-left'}`}>
          {label}
        </div>
      )}
    </div>
  );
};
