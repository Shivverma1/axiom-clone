import React from "react";

const NAV_ITEMS = [
  "Discover", "Pulse", "Trackers", "Perpetuals", "Yield", "Portfolio", "Rewards"
];

const NavBar: React.FC = () => (
  <nav className="hidden md:flex items-center min-w-0 ml-6 space-x-3 sm:space-x-4 lg:space-x-6 overflow-x-auto">
    {NAV_ITEMS.map((item) => (
      <a
        key={item}
        href="#"
        className={`text-sm lg:text-base truncate whitespace-nowrap transition-colors
          ${item === "Pulse" 
            ? "text-blue-400 font-medium hover:text-blue-300" 
            : "text-gray-300 hover:text-white"}
        `}
      >
        {item}
      </a>
    ))}
  </nav>
);

export default NavBar;
