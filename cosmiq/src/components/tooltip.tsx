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
      <div className="z-10 shadow-2xl w-24 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-surface border-1 border-accent text-text text-xs rounded py-1 px-2">
        <span className='text-text'>{hintText}</span>
      </div>
    </div>
  );
};

export default Tooltip;
