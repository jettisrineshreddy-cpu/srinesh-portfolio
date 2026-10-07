import React from 'react';
import './Button.css';

interface ButtonProps {
  variant?: 'primary' | 'outline';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  target,
  rel,
  children,
  className = '',
  onClick,
}) => {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};
