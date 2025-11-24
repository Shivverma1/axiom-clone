import React, { useState } from "react";
import {
  ChevronDown,
  Volume2,
  VolumeX,
  Settings,
  Crosshair,
  Wallet,
  List,
  Ban,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import DisplayDropdown from "./DisplayDropdown.tsx"; // Ensure this is defined

export interface ControlBarProps {
  showDisplayDropdown: boolean;
  setShowDisplayDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlBar: React.FC<ControlBarProps> = ({
  showDisplayDropdown,
  setShowDisplayDropdown,
}) => {
  const [muted, setMuted] = useState(false);

  return (
    <div className="w-full flex justify-between items-center px-2 sm:px-4 lg:px-6 py-2 sm:py-4 bg-[#0A0A0A]">
      {/* Left: Pulse Title */}
      <div className="text-white font-bold text-lg sm:text-xl lg:text-2xl">Pulse</div>

      {/* Right: Controls */}
      <div className="flex items-center gap-x-2 sm:gap-x-3 lg:gap-x-5 relative">
        {/* Display Dropdown Toggle */}
        <Tooltip.Provider delayDuration={20}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div
                className="flex items-center bg-[#1A1A1A] px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm text-white space-x-1 sm:space-x-2 cursor-pointer hover:bg-[#2A2A2A] transition"
                onClick={() => setShowDisplayDropdown(!showDisplayDropdown)}
              >
                <List className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Display</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={6} className="bg-black text-white px-2 py-1 text-xs rounded shadow z-50">
              Display Options
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>

        {/* DisplayDropdown Component */}
        {showDisplayDropdown && (
          <div className="absolute top-12 sm:top-14 right-0 z-50">
            <DisplayDropdown
              showDisplayDropdown={showDisplayDropdown}
              setShowDisplayDropdown={setShowDisplayDropdown}
            />
          </div>
        )}

        {/* Blacklist / Dev / Handle / Keywords */}
        <Tooltip.Provider delayDuration={20}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button className="text-[#9CA3AF] hover:text-white transition">
                <Ban className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={6} className="bg-black text-white px-2 py-1 text-xs rounded shadow z-50">
              Blacklist, Dev, Handle, Keywords
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>

        {/* Volume Button */}
        <Tooltip.Provider delayDuration={20}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={() => setMuted(!muted)}
                className="text-[#9CA3AF] hover:text-white transition"
              >
                {muted ? <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" /> : <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={6} className="bg-black text-white px-2 py-1 text-xs rounded shadow z-50">
              Volume
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>

        {/* Snipe Settings */}
        <Tooltip.Provider delayDuration={20}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button className="relative text-[#9CA3AF] hover:text-white w-4 h-4 sm:w-5 sm:h-5 transition">
                <Crosshair className="absolute w-3 h-3 sm:w-4 sm:h-4 top-0 left-0" />
                <Settings className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bottom-0 right-0" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={6} className="bg-black text-white px-2 py-1 text-xs rounded shadow z-50">
              Snipe Settings
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>

        {/* Wallet Summary */}
        <Tooltip.Provider delayDuration={20}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className="flex items-center gap-x-1 sm:gap-x-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full cursor-pointer transition">
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-[#9CA3AF]" />
                <span className="text-sm sm:text-base font-medium text-white">1</span>
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
                <span className="text-sm sm:text-base font-medium text-white">0</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#9CA3AF]" />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={6} className="bg-black text-white px-2 py-1 text-xs rounded shadow z-50">
              Wallet Summary
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
};

export default ControlBar;
