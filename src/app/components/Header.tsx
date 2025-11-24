"use client";
import React from "react";
import LogoBrand from "./LogoBrand";
import SearchBar from "./SearchBar";
import DepositButton from "./DepositButton";
import IconCluster from "./IconCluster";
import ControlBar from "./ControlBar";
import { SecondaryNav } from "./SecondaryNav"; // <-- Import added

const NAV_ITEMS = [
  "Discover", "Pulse", "Trackers", "Perpetuals", "Yield", "Portfolio", "Rewards"
];

// NavBar Component integrated into Header
const NavBar = ({ navItems }) => {
  const [activeItem, setActiveItem] = React.useState("Pulse");

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navItems.map((item) => (
        <button
          key={item}
          onClick={() => setActiveItem(item)}
          className={`
            px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 ease-in-out
            hover:bg-blue-500/20 hover:text-blue-400
            ${activeItem === item 
              ? 'text-blue-400 bg-blue-500/10' 
              : 'text-gray-300 hover:text-blue-400'
            }
          `}
        >
          {item}
        </button>
      ))}
    </nav>
  );
};

export default function Header() {
  const [showDisplayDropdown, setShowDisplayDropdown] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black border-b border-gray-900/50">
        <div className="flex items-center justify-between px-2 sm:px-4 lg:px-6 h-12 sm:h-16">
          {/* ===== LEFT: LOGO + NAV ===== */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 min-w-0 flex-1">
            <LogoBrand />
            <NavBar navItems={NAV_ITEMS} />
          </div>

          {/* ===== RIGHT: SEARCH + CONTROLS ===== */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
            <SearchBar />
            <DepositButton />
            <IconCluster />
          </div>
        </div>
        {/* ===== SecondaryNav placed just below header bar ===== */}
        <SecondaryNav />
      </header>

      {/* ===== Display dropdown bar below everything else ===== */}
      <ControlBar 
        showDisplayDropdown={showDisplayDropdown} 
        setShowDisplayDropdown={setShowDisplayDropdown} 
      />
    </>
  );
}
