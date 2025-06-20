
import React from 'react';

interface MascotOwlProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

const MascotOwl: React.FC<MascotOwlProps> = ({ size = 60, className = "", animate = true }) => {
  return (
    <div className={`inline-block ${animate ? 'animate-bounce' : ''} ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Owl Body */}
        <ellipse cx="50" cy="60" rx="30" ry="25" fill="#8B5CF6" />
        
        {/* Owl Head */}
        <circle cx="50" cy="35" r="25" fill="#A78BFA" />
        
        {/* Ear Tufts */}
        <path d="M30 15 L35 25 L25 25 Z" fill="#7C3AED" />
        <path d="M70 15 L75 25 L65 25 Z" fill="#7C3AED" />
        
        {/* Eyes */}
        <circle cx="42" cy="32" r="8" fill="white" />
        <circle cx="58" cy="32" r="8" fill="white" />
        <circle cx="42" cy="32" r="5" fill="#1F2937" />
        <circle cx="58" cy="32" r="5" fill="#1F2937" />
        <circle cx="44" cy="30" r="2" fill="white" />
        <circle cx="60" cy="30" r="2" fill="white" />
        
        {/* Beak */}
        <path d="M50 40 L47 45 L53 45 Z" fill="#F59E0B" />
        
        {/* Wings */}
        <ellipse cx="30" cy="55" rx="8" ry="15" fill="#7C3AED" transform="rotate(-20 30 55)" />
        <ellipse cx="70" cy="55" rx="8" ry="15" fill="#7C3AED" transform="rotate(20 70 55)" />
        
        {/* Belly */}
        <ellipse cx="50" cy="65" rx="15" ry="12" fill="#C4B5FD" />
        
        {/* Book in wing */}
        <rect x="25" y="50" width="6" height="8" fill="#EF4444" transform="rotate(-20 28 54)" />
        <rect x="26" y="51" width="4" height="6" fill="white" transform="rotate(-20 28 54)" />
      </svg>
    </div>
  );
};

export default MascotOwl;
