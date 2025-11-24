import React from "react";

const LogoBrand: React.FC = () => (
  <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 select-none">
    <svg width="40" height="40" viewBox="0 0 32 32" className="mr-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="16,8 24,18 8,18" fill="white" />
      <polygon points="4,28 28,28 24,20 8,20" fill="white" />
    </svg>
    <span className="font-bold text-white text-[28px] tracking-tight" style={{letterSpacing:'-1px',fontFamily:'inherit'}}>AXIOM</span>
    <span className="text-white text-[24px] font-normal ml-3" style={{fontFamily:'inherit'}}>Pro</span>
  </div>
);

export default LogoBrand;
