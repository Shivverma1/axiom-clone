import React from "react";

const DepositButton: React.FC = () => (
  <button className="bg-blue-600 hover:bg-blue-700 text-black rounded-full px-2.5 py-2 font-medium text-sm min-w-[42px] h-9 flex items-center justify-center transition-colors">
    <span className="hidden sm:inline">Deposit</span>
    <span className="sm:hidden text-lg leading-none">+</span>
  </button>
);

export default DepositButton;
