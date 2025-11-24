"use client";

import React, { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'new' | 'final' | 'migrated';
  onApplyFilters: (filters: FilterSettings) => void;
  onTabChange?: (tab: 'new' | 'final' | 'migrated') => void;
}

interface FilterSettings {
  protocols: string[];
  includeKeywords: string[];
  excludeKeywords: string[];
  bCurveMin: string;
  bCurveMax: string;
  auditSettings: {
    dexPaid: boolean;
    caEndsInPump: boolean;
  };
  metricsSettings: {
    minMarketCap: string;
    maxMarketCap: string;
    minVolume: string;
    maxVolume: string;
  };
  socialSettings: {
    minFollowers: string;
    maxFollowers: string;
    minEngagement: string;
    maxEngagement: string;
  };
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  onApplyFilters,
  onTabChange
}) => {
  const [currentTab, setCurrentTab] = useState<'new' | 'final' | 'migrated'>(activeTab);
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>(['Pump', 'Bonk', 'Moonshot', 'Bags', 'Believe', 'Jupiter Studio', 'Moonit', 'Boop', 'LaunchLab', 'Dynamic BC']);
  const [includeKeywords, setIncludeKeywords] = useState('');
  const [excludeKeywords, setExcludeKeywords] = useState('');
  const [bCurveMin, setBCurveMin] = useState('');
  const [bCurveMax, setBCurveMax] = useState('');
  const [auditSettings, setAuditSettings] = useState({
    dexPaid: false,
    caEndsInPump: false
  });
  const [metricsSettings, setMetricsSettings] = useState({
    minMarketCap: '',
    maxMarketCap: '',
    minVolume: '',
    maxVolume: ''
  });
  const [socialSettings, setSocialSettings] = useState({
    minFollowers: '',
    maxFollowers: '',
    minEngagement: '',
    maxEngagement: ''
  });
  const [activeBottomTab, setActiveBottomTab] = useState<'audit' | 'metrics' | 'socials'>('audit');

  const handleTabChange = (tab: 'new' | 'final' | 'migrated') => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const protocols = [
    { name: 'Pump', bgColor: 'bg-black', textColor: 'text-green-400', borderColor: 'border-green-400', icon: '🌱' },
    { name: 'Bonk', bgColor: 'bg-black', textColor: 'text-orange-400', borderColor: 'border-orange-400', icon: '⭐' },
    { name: 'Moonshot', bgColor: 'bg-black', textColor: 'text-purple-400', borderColor: 'border-purple-400', icon: '🌙' },
    { name: 'Bags', bgColor: 'bg-black', textColor: 'text-green-400', borderColor: 'border-green-400', icon: '👜' },
    { name: 'Believe', bgColor: 'bg-black', textColor: 'text-green-400', borderColor: 'border-green-400', icon: '🌱' },
    { name: 'Jupiter Studio', bgColor: 'bg-black', textColor: 'text-orange-400', borderColor: 'border-orange-400', icon: '🌈' },
    { name: 'Moonit', bgColor: 'bg-black', textColor: 'text-yellow-400', borderColor: 'border-yellow-400', icon: '🚀' },
    { name: 'Boop', bgColor: 'bg-black', textColor: 'text-blue-400', borderColor: 'border-blue-400', icon: '☁️' },
    { name: 'LaunchLab', bgColor: 'bg-black', textColor: 'text-blue-400', borderColor: 'border-blue-400', icon: '🚀' },
    { name: 'Dynamic BC', bgColor: 'bg-black', textColor: 'text-red-400', borderColor: 'border-red-400', icon: '⚡' },
    { name: 'Raydium', bgColor: 'bg-black', textColor: 'text-gray-400', borderColor: 'border-gray-400', icon: 'R' },
    { name: 'Meteora AMM', bgColor: 'bg-black', textColor: 'text-gray-400', borderColor: 'border-gray-400', icon: '🌊' },
    { name: 'Meteora AMM V2', bgColor: 'bg-black', textColor: 'text-gray-400', borderColor: 'border-gray-400', icon: '🌊' },
    { name: 'Pump AMM', bgColor: 'bg-black', textColor: 'text-gray-400', borderColor: 'border-gray-400', icon: '🔧' }
  ];

  const handleProtocolToggle = (protocol: string) => {
    setSelectedProtocols(prev => 
      prev.includes(protocol) 
        ? prev.filter(p => p !== protocol)
        : [...prev, protocol]
    );
  };

  const handleApplyFilters = () => {
    const filters: FilterSettings = {
      protocols: selectedProtocols,
      includeKeywords: includeKeywords.split(',').map(k => k.trim()).filter(k => k),
      excludeKeywords: excludeKeywords.split(',').map(k => k.trim()).filter(k => k),
      bCurveMin,
      bCurveMax,
      auditSettings,
      metricsSettings,
      socialSettings
    };
    onApplyFilters(filters);
    onClose();
  };

  const handleImport = () => {
    // Import filters from clipboard or file
    console.log('Import filters');
  };

  const handleExport = () => {
    // Export current filters
    console.log('Export filters');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1F1F1F] rounded-lg border border-gray-600 w-full max-w-2xl max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <h2 className="text-white font-medium text-base">Filters</h2>
            <button className="p-1 hover:bg-gray-700 rounded">
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-600 bg-[#1A1A1A]">
          <button 
            className={`px-4 py-3 text-sm ${currentTab === 'new' ? 'text-white border-b-2 border-white bg-[#1F1F1F]' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => handleTabChange('new')}
          >
            New Pairs
          </button>
          <button 
            className={`px-4 py-3 text-sm ${currentTab === 'final' ? 'text-white border-b-2 border-white bg-[#1F1F1F]' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => handleTabChange('final')}
          >
            Final Stretch
          </button>
          <button 
            className={`px-4 py-3 text-sm ${currentTab === 'migrated' ? 'text-white border-b-2 border-white bg-[#1F1F1F]' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => handleTabChange('migrated')}
          >
            Migrated
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {/* Protocols */}
          <div className="mb-4">
            <h3 className="text-white font-medium mb-3 text-sm">Protocols</h3>
            <div className="grid grid-cols-3 gap-2">
              {protocols.map((protocol) => (
                <button
                  key={protocol.name}
                  onClick={() => handleProtocolToggle(protocol.name)}
                  className={`
                    flex items-center justify-center px-2 py-1.5 rounded-full text-xs font-medium transition-all min-h-[32px] border
                    ${selectedProtocols.includes(protocol.name)
                      ? `${protocol.bgColor} ${protocol.textColor} ${protocol.borderColor}`
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600'
                    }
                  `}
                >
                  <span className="truncate">{protocol.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-white text-xs font-medium mb-2">
                Search Keywords
              </label>
              <input
                type="text"
                value={includeKeywords}
                onChange={(e) => setIncludeKeywords(e.target.value)}
                placeholder="keyword1, keyword2..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-white text-xs font-medium mb-2">
                Exclude Keywords
              </label>
              <input
                type="text"
                value={excludeKeywords}
                onChange={(e) => setExcludeKeywords(e.target.value)}
                placeholder="keyword1, keyword2..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* B. curve % */}
          <div className="mb-4">
            <label className="block text-white text-xs font-medium mb-2">
              B. curve %
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={bCurveMin}
                onChange={(e) => setBCurveMin(e.target.value)}
                placeholder="Min"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                value={bCurveMax}
                onChange={(e) => setBCurveMax(e.target.value)}
                placeholder="Max"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Bottom Tabs */}
          <div className="border-t border-gray-600 pt-4">
            <div className="flex mb-4 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveBottomTab('audit')}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                  activeBottomTab === 'audit' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Audit
              </button>
              <button
                onClick={() => setActiveBottomTab('metrics')}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                  activeBottomTab === 'metrics' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                $ Metrics
              </button>
              <button
                onClick={() => setActiveBottomTab('socials')}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                  activeBottomTab === 'socials' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Socials
              </button>
            </div>

            {/* Tab Content */}
            {activeBottomTab === 'audit' && (
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={auditSettings.dexPaid}
                    onChange={(e) => setAuditSettings(prev => ({ ...prev, dexPaid: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-white text-xs">Dex Paid</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={auditSettings.caEndsInPump}
                    onChange={(e) => setAuditSettings(prev => ({ ...prev, caEndsInPump: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-white text-xs">CA ends in &apos;pump&apos;</span>
                </label>
              </div>
            )}

            {activeBottomTab === 'metrics' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white text-xs font-medium mb-1">Min Market Cap</label>
                  <input
                    type="text"
                    value={metricsSettings.minMarketCap}
                    onChange={(e) => setMetricsSettings(prev => ({ ...prev, minMarketCap: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1">Max Market Cap</label>
                  <input
                    type="text"
                    value={metricsSettings.maxMarketCap}
                    onChange={(e) => setMetricsSettings(prev => ({ ...prev, maxMarketCap: e.target.value }))}
                    placeholder="∞"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1">Min Volume</label>
                  <input
                    type="text"
                    value={metricsSettings.minVolume}
                    onChange={(e) => setMetricsSettings(prev => ({ ...prev, minVolume: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1">Max Volume</label>
                  <input
                    type="text"
                    value={metricsSettings.maxVolume}
                    onChange={(e) => setMetricsSettings(prev => ({ ...prev, maxVolume: e.target.value }))}
                    placeholder="∞"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {activeBottomTab === 'socials' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white text-xs font-medium mb-1">Min Followers</label>
                  <input
                    type="text"
                    value={socialSettings.minFollowers}
                    onChange={(e) => setSocialSettings(prev => ({ ...prev, minFollowers: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1">Max Followers</label>
                  <input
                    type="text"
                    value={socialSettings.maxFollowers}
                    onChange={(e) => setSocialSettings(prev => ({ ...prev, maxFollowers: e.target.value }))}
                    placeholder="∞"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1">Min Engagement</label>
                  <input
                    type="text"
                    value={socialSettings.minEngagement}
                    onChange={(e) => setSocialSettings(prev => ({ ...prev, minEngagement: e.target.value }))}
                    placeholder="0%"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1">Max Engagement</label>
                  <input
                    type="text"
                    value={socialSettings.maxEngagement}
                    onChange={(e) => setSocialSettings(prev => ({ ...prev, maxEngagement: e.target.value }))}
                    placeholder="100%"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-xs placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-600">
          <div className="flex space-x-2">
            <button
              onClick={handleImport}
              className="px-4 py-2 bg-gray-700 text-white rounded text-xs font-medium hover:bg-gray-600"
            >
              Import
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gray-700 text-white rounded text-xs font-medium hover:bg-gray-600"
            >
              Export
            </button>
          </div>
          <button
            onClick={handleApplyFilters}
            className="px-6 py-2 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
            >
            Apply All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;