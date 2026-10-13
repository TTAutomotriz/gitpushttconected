import React from 'react';

export type PageRoute = 
  | '/' 
  | '/vehiculo' 
  | '/unete-al-equipo' 
  | '/aliados-proveedores' 
  | '/noticias'
  | '/noticias/primer-auto-electrico-solar-mexicano'
  | '/design-ordenar'
  | '/aviso-de-privacidad';

export interface NavLink {
  label: string;
  href: PageRoute;
}

export interface ButtonProps {
  id?: string;
  variant: 'primary' | 'secondary-outline' | 'black-outline' | 'dark-filled' | 'pill-toggle' | 'white-filled' | 'glass' | 'navbar-cta-dark' | 'navbar-cta-light' | 'white-outline' | 'default';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  isActive?: boolean; // For toggle buttons
  disabled?: boolean;
}

export interface StatBlockProps {
  id?: string;
  icon?: React.ReactNode;
  value: string;
  label: string;
  className?: string;
  size?: 'normal' | 'h1' | 'h2';
  labelClassName?: string;
  animateValue?: boolean;
  animationKey?: string;
}

export interface ImageOverlayCardProps {
  id?: string;
  title: React.ReactNode;
  description: string;
  bgImage: string;
  className?: string;
  hideTextOnDesktop?: boolean;
  titleClassName?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  price?: React.ReactNode;
  contentPosition?: 'top' | 'bottom' | 'mobile-top';
  showOverlay?: boolean;
  useRangeGradient?: boolean;
  onExpand?: () => void;
}
