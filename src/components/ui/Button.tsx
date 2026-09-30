import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  target,
  rel,
  children,
  className = '',
  ...props
}) => {
  const combinedClass = `btn btn--${variant} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClass}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
};
