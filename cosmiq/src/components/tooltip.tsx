import React from 'react';

type TooltipProps = {
  children: React.ReactNode; // The icon or component you want to pass
  hintText: string; // The text you want to show when hovering
};

const Tooltip: React.FC<TooltipProps> = ({ children, hintText }) => {
  return (
    <div className="relative group inline-block">
      {/* Child element (icon or any other component) */}
      {children}

      {/* Tooltip positioned to the right */}
      <div className="transition-opacity duration-200 opacity-0 group-hover:opacity-100 pointer-events-none z-20 shadow-2xl absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-surface border border-accent text-text text-xs rounded py-1 px-2 whitespace-nowrap">
        <span className='text-text'>{hintText}</span>
      </div>
    </div>
  );
};

export default Tooltip;
