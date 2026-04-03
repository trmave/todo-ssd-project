import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'danger' | 'ghost' | 'icon';
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 shadow-sm focus:ring-primary",
    danger: "bg-red-500 text-white hover:bg-red-600 px-4 py-2 shadow-sm focus:ring-red-500",
    ghost: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground px-4 py-2 focus:ring-muted",
    icon: "bg-transparent text-muted-foreground hover:bg-red-50 hover:text-red-600 p-2 rounded-full focus:ring-red-500",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
