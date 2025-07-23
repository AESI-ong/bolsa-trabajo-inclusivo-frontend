import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string; // Tailwind color class, e.g. 'bg-blue-500'
  textColor?: string; // Tailwind text color class, e.g. 'text-white'
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color = 'bg-blue-100', textColor = 'text-blue-800', className = '' }) => {
  return (
    <span
      className={`inline-block px-4 py-2 rounded-full text-center text-xs font-semibold ${color} ${textColor} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
