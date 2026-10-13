import React from 'react';
import { ImageOverlayCardProps } from '../types';
import { Plus } from 'lucide-react';

export const ImageOverlayCard: React.FC<ImageOverlayCardProps> = ({
  id,
  title,
  description,
  bgImage,
  className = '',
  hideTextOnDesktop = false,
  titleClassName = '',
  icon,
  children,
  contentPosition = 'bottom',
  showOverlay = true,
  useRangeGradient = false,
  onExpand,
}) => {
  const isTop = contentPosition === 'top';
  const isMobileTop = contentPosition === 'mobile-top';

  return (
    <div
      id={id}
      className={`relative overflow-hidden rounded-xl group shadow-md hover:shadow-xl transition-all duration-300 ${className || 'aspect-[3/4] min-h-[460px] sm:min-h-[520px]'}`}
    >
      {/* Background Image */}
      <img
        src={bgImage}
        alt={typeof title === 'string' ? title : ''}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Legible Dark Overlay - direction depends on content position or custom range gradient */}
      {showOverlay && (
        useRangeGradient ? (
          <div className="absolute inset-0 pointer-events-none">
            {/* Desktop: gradient from left edge to the center (left-to-right) */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black from-4% via-black/70 via-40% to-transparent transition-opacity duration-300" />
            {/* Mobile: gradient from top to bottom (top-to-bottom) */}
            <div className="block lg:hidden absolute inset-0 bg-gradient-to-b from-black from-4% via-black/70 via-40% to-transparent transition-opacity duration-300" />
          </div>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-b ${
            isTop 
              ? 'from-gray-950/90 via-gray-950/40 to-transparent' 
              : isMobileTop
                ? 'from-gray-950/90 via-gray-950/40 to-transparent sm:from-transparent sm:via-gray-950/40 sm:to-gray-950/90'
                : 'from-transparent via-gray-950/40 to-gray-950/90'
          } transition-opacity duration-300 ${hideTextOnDesktop ? 'lg:opacity-0 lg:group-hover:opacity-10' : ''}`} />
        )
      )}

      {/* Optional Top Right Plus Expand Button */}
      {onExpand && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Expandir"
        >
          <Plus className="w-5 h-5 text-gray-200 hover:text-white" />
        </button>
      )}
      
      {/* Content anchored top or bottom */}
      <div className={`absolute ${
        isTop 
          ? 'top-0' 
          : isMobileTop
            ? 'top-0 sm:top-auto sm:bottom-0'
            : 'bottom-0'
      } left-0 right-0 p-5 sm:p-8 flex flex-col ${
        isTop 
          ? 'justify-start' 
          : isMobileTop
            ? 'justify-start sm:justify-end'
            : 'justify-end'
      } text-white z-10 transition-all duration-300 ${hideTextOnDesktop ? 'lg:opacity-0 lg:pointer-events-none' : ''}`}>
        <h3 className={`${titleClassName || "text-2xl sm:text-3xl md:text-4xl font-display font-normal text-white tracking-tight"} flex items-center gap-2.5 sm:gap-3`}>
          {icon && <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>}
          <span>{title}</span>
        </h3>
        
        {children}
        
        <p className="text-xs sm:text-sm md:text-base text-gray-200 mt-1.5 sm:mt-2 font-normal leading-relaxed max-w-sm">
          {description}
        </p>
      </div>
    </div>
  );
};