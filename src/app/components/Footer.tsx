"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Bell } from "lucide-react";
import Image from "next/image";

const trackerTabs = [
  { key: "wallet", label: "Wallet Tracker", alert: null, closeable: false },
  { key: "twitter", label: "Twitter Tracker", alert: null, closeable: false },
  { key: "pulse", label: "Pulse Tracker", alert: null, closeable: false },
  { key: "pnl", label: "PnL Tracker", alert: null, closeable: false },
];

const presetList = ["PRESET 1", "PRESET 2", "PRESET 3"];
const regionList = ["GLOBAL", "US-W", "US-C", "US-E", "EU-W", "EU-C", "EU-E", "ASIA", "AUS"];

export default function Footer() {
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("PRESET 1");
  const [activeTab, setActiveTab] = useState("wallet");
  const [selectedRegion, setSelectedRegion] = useState("GLOBAL");

  const presetRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (showPresetDropdown && presetRef.current && !presetRef.current.contains(e.target as Node)) {
        setShowPresetDropdown(false);
      }
      if (showRegionDropdown && regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setShowRegionDropdown(false);
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [showPresetDropdown, showRegionDropdown]);

  const switchTab = (key: string) => setActiveTab(key);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#16181c] border-t border-[#2a2d34] text-xs font-sans z-50" style={{ boxShadow: "0 -1.5px 8px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center justify-between h-[40px] sm:h-[48px] px-2 sm:px-4 space-x-2 sm:space-x-4 overflow-hidden">
        
        {/* Left section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Preset selector */}
          <div ref={presetRef} className="relative">
            <button
              className="flex items-center bg-[#2533A8] hover:bg-[#1a255e] text-[#B1C6FF] font-bold text-[11px] sm:text-[13px] h-[26px] sm:h-[30px] px-[8px] sm:px-[12px] rounded"
              onClick={() => setShowPresetDropdown(v => !v)}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mr-1 sm:mr-2">
                <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 6.34L4.93 4.93"/>
              </svg>
              <span className="hidden sm:inline">{selectedPreset}</span>
              <span className="sm:hidden">P1</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            </button>
            {showPresetDropdown && (
              <div className="absolute left-0 bottom-full mb-2 w-40 sm:w-56 bg-[#232323] border border-[#292929] rounded-2xl shadow-2xl flex flex-col py-2 z-50">
                {presetList.map(name => (
                  <div
                    key={name}
                    className={`px-4 sm:px-6 py-2 text-[13px] sm:text-[15px] cursor-pointer ${name === selectedPreset ? 'bg-[#1976d2] text-white font-bold' : 'hover:bg-[#222f52] text-[#cdcdcd]'}`}
                    onClick={() => { setSelectedPreset(name); setShowPresetDropdown(false); }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Wallet badge */}
          <div className="flex items-center bg-[#181A20] border border-[#23262F] rounded-lg px-2 sm:px-4 py-1 sm:py-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#A3A9B7] mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="7" width="18" height="10" rx="2"/>
              <rect x="7" y="11" width="2" height="2" rx="1"/>
              <rect x="15" y="11" width="2" height="2" rx="1"/>
            </svg>
            <span className="text-[#B1C6FF] font-bold text-[11px] sm:text-[13px] mr-2 sm:mr-3">1</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" viewBox="0 0 16 16">
              <defs><linearGradient id="gradient-bar" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6C8CFF"/><stop offset="100%" stopColor="#9945FF"/></linearGradient></defs>
              <rect x="2" y="7" width="12" height="2" rx="1" fill="url(#gradient-bar)" />
            </svg>
            <span className="text-[#B1C6FF] font-bold text-[11px] sm:text-[13px]">0</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#6C7A93] ml-1 sm:ml-2"/>
          </div>

          {/* Tabs */}
          <nav className="flex items-end space-x-1">
            {trackerTabs.map(tab => (
              <div
                key={tab.key}
                onClick={() => switchTab(tab.key)}
                className={`flex items-center px-2 sm:px-3 py-1 sm:py-2 text-[9px] sm:text-[11px] cursor-pointer min-w-fit ${
                  activeTab === tab.key ? 'bg-[#2a2a2a] text-white font-medium rounded-t-md relative -top-[1px]' : 'text-[#888] hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                {tab.alert && <sup className="ml-1 text-[6px] sm:text-[8px] font-semibold">{tab.alert}</sup>}
                {tab.closeable && (
                  <X className="w-2 h-2 sm:w-3 sm:h-3 ml-1 hover:text-red-500" onClick={(e) => e.stopPropagation()} />
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Middle info panel */}
        <div className="hidden sm:flex items-center space-x-3 lg:space-x-6 text-xs text-[#cdcdcd] flex-grow justify-center">
          {/* Assets */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <Image src="/btc-logo.svg" alt="BTC" width={16} height={16} className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="text-orange-400 font-semibold text-[10px] lg:text-xs">$118.1K</span>
            <span className="text-[#6faaff] text-[10px] lg:text-xs">$380</span>
            <span className="text-[#00ffae] font-semibold text-[10px] lg:text-xs">$187.38</span>
          </div>
          {/* Metrics */}
          <div className="flex items-center space-x-1 lg:space-x-2 opacity-75">
            <span className="text-[10px] lg:text-xs">🔗 $75.9K</span>
            <span className="text-[10px] lg:text-xs">🧱 0.0325</span>
            <span className="text-[10px] lg:text-xs">💾 0.0851</span>
          </div>
          {/* Connection status */}
          <div className="flex items-center bg-[#004d3c] text-green-300 text-[9px] lg:text-[11px] font-semibold px-1 lg:px-2 py-1 rounded-full">
            <div className="w-1 h-1 lg:w-2 lg:h-2 bg-green-400 rounded-full mr-1 lg:mr-2"></div>
            <span className="hidden lg:inline">Connection is stable</span>
            <span className="lg:hidden">Connected</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Region selector */}
          <div ref={regionRef} className="relative">
            <button
              className="flex items-center bg-[#232323] text-[#cdcdcd] font-bold uppercase text-[10px] sm:text-[14px] px-2 sm:px-4 py-1 sm:py-2 rounded-lg border border-[#292929] shadow"
              onClick={() => setShowRegionDropdown(v => !v)}
            >
              <span className="hidden sm:inline">{selectedRegion}</span>
              <span className="sm:hidden">GL</span>
              <ChevronDown className="w-3 h-3 sm:w-5 sm:h-5 text-[#888] ml-1 sm:ml-2"/>
            </button>
            {showRegionDropdown && (
              <div className="absolute left-0 bottom-full mb-2 w-32 sm:w-44 bg-[#232323] border border-[#292929] rounded-xl shadow-lg z-50 flex flex-col py-2">
                {regionList.map(region => (
                  <div
                    key={region}
                    className={`px-3 sm:px-6 py-1 sm:py-2 text-[11px] sm:text-[15px] cursor-pointer ${region === selectedRegion ? 'bg-[#18181b] text-white font-bold' : 'hover:bg-[#18181b] text-[#cdcdcd]'}`}
                    onClick={() => { setSelectedRegion(region); setShowRegionDropdown(false); }}
                  >
                    {region}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Icons */}
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#888] hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5}/>
            <line x1="7" y1="7" x2="17" y2="7" strokeWidth={1.5}/>
          </svg>
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#888] hover:text-white cursor-pointer" />
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#888] hover:text-white cursor-pointer" />
          <div className="flex items-center">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#888] hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-[#888] text-[9px] sm:text-[11px] hover:text-white ml-1 sm:ml-2 cursor-pointer hidden sm:inline">Docs</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
