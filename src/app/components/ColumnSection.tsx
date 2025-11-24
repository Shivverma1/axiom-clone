import React, { useState } from "react";
import { Zap, BarChart3, ChevronUp, Filter } from "lucide-react";
import TokenCard from "./TokenCard.tsx";
import NewPairsTokenCard from "./NewPairsTokenCard.tsx";
import FiltersModal from "./FiltersModal.tsx";
import { EnhancedToken } from "./tokenUtils.tsx";

interface ColumnSectionProps {
  title: string;
  tokens: EnhancedToken[];
  count: number;
  isNewPairs?: boolean;
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

const ColumnSection: React.FC<ColumnSectionProps> = ({
  title,
  tokens,
  count,
  isNewPairs = false,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<'1' | '2' | '3'>('1');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterSettings | null>(null);
  const [currentFilterTab, setCurrentFilterTab] = useState<'new' | 'final' | 'migrated'>('new');

  const getActiveTab = () => {
    if (title.toLowerCase().includes('new')) return 'new' as const;
    if (title.toLowerCase().includes('final')) return 'final' as const;
    if (title.toLowerCase().includes('migrated')) return 'migrated' as const;
    return 'new' as const;
  };

  const handleApplyFilters = (filters: FilterSettings) => {
    setActiveFilters(filters);
    console.log('Applied filters:', filters);
    // Here you would typically filter the tokens based on the applied filters
    // For now, we'll just log the filters
  };

  const handleTabChange = (tab: 'new' | 'final' | 'migrated') => {
    setCurrentFilterTab(tab);
    console.log('Filter tab changed to:', tab);
  };

  const filteredTokens = tokens.filter(token => {
    if (!activeFilters) return true;

    // Filter by keywords
    if (activeFilters.includeKeywords.length > 0) {
      const tokenText = `${token.name} ${token.symbol}`.toLowerCase();
      const hasIncludeKeyword = activeFilters.includeKeywords.some(keyword => 
        tokenText.includes(keyword.toLowerCase())
      );
      if (!hasIncludeKeyword) return false;
    }

    if (activeFilters.excludeKeywords.length > 0) {
      const tokenText = `${token.name} ${token.symbol}`.toLowerCase();
      const hasExcludeKeyword = activeFilters.excludeKeywords.some(keyword => 
        tokenText.includes(keyword.toLowerCase())
      );
      if (hasExcludeKeyword) return false;
    }

    // Filter by market cap
    if (activeFilters.metricsSettings.minMarketCap) {
      const minMC = parseFloat(activeFilters.metricsSettings.minMarketCap);
      if (token.marketCap < minMC) return false;
    }

    if (activeFilters.metricsSettings.maxMarketCap) {
      const maxMC = parseFloat(activeFilters.metricsSettings.maxMarketCap);
      if (token.marketCap > maxMC) return false;
    }

    // Filter by volume
    if (activeFilters.metricsSettings.minVolume) {
      const minVol = parseFloat(activeFilters.metricsSettings.minVolume);
      if (token.volume24h < minVol) return false;
    }

    if (activeFilters.metricsSettings.maxVolume) {
      const maxVol = parseFloat(activeFilters.metricsSettings.maxVolume);
      if (token.volume24h > maxVol) return false;
    }

    return true;
  });

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden" style={{backgroundColor: '#101114'}}>
      {/* Column Header - Responsive */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A] flex-shrink-0" style={{backgroundColor: '#101114'}}>
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium text-sm">{title}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Zap className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-[#9CA3AF] text-sm">{filteredTokens.length}</span>
          <BarChart3 className="w-4 h-4 text-[#9CA3AF]" />
          <div className="flex items-center space-x-1">
            <button onClick={()=>setSelectedPriority('1')} className={`${selectedPriority == '1' ? "bg-[#3B82F6]" : "text-[#9CA3AF]"} text-white px-2 py-1 rounded text-xs font-medium cursor-pointer`}>P1</button>
            <button onClick={()=>setSelectedPriority('2')} className={`${selectedPriority == '2' ? "bg-[#3B82F6]" : "text-[#9CA3AF]"} text-white px-2 py-1 rounded text-xs font-medium cursor-pointer`}>P2</button>
            <button onClick={()=>setSelectedPriority('3')} className={`${selectedPriority == '3' ? "bg-[#3B82F6]" : "text-[#9CA3AF]"} text-white px-2 py-1 rounded text-xs font-medium cursor-pointer`}>P3</button>
          </div>
          <button 
            onClick={() => setIsFiltersOpen(true)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Filters"
          >
            <Filter className="w-4 h-4 text-[#9CA3AF] hover:text-white" />
          </button>
          <ChevronUp className="w-4 h-4 text-[#9CA3AF]" />
        </div>
      </div>
      
      {/* Token List - Responsive content that expands to fill space */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #101114'}}>
        <div className="p-4 space-y-3 h-full" style={{minHeight: '100%', display: 'flex', flexDirection: 'column'}}>
          {filteredTokens.map((token) => (
            <div key={token.id} style={{minHeight: '120px', maxHeight: '200px', marginBottom: '30px'}}>
              {isNewPairs ? 
                <NewPairsTokenCard token={{
                  id: token.id.toString(),
                  name: token.name,
                  symbol: token.symbol,
                  age: token.age,
                  marketCap: token.marketCap.toString(),
                  price: token.price.toString(),
                  volume24h: token.volume24h.toString(),
                  transactions24h: token.transactions24h.toString(),
                  priceChange24h: token.priceChange24h.toString(),
                  image: token.image,
                  holders: token.holders.toString(),
                  buys: token.buys.toString(),
                  sells: token.sells.toString(),
                  creator: token.creator
                }} /> :
                <TokenCard token={{
                  id: token.id.toString(),
                  name: token.name,
                  symbol: token.symbol,
                  age: token.age,
                  marketCap: token.marketCap.toString(),
                  price: token.price.toString(),
                  volume24h: token.volume24h.toString(),
                  transactions24h: token.transactions24h.toString(),
                  priceChange24h: token.priceChange24h.toString(),
                  image: token.image,
                  holders: token.holders.toString(),
                  buys: token.buys.toString(),
                  sells: token.sells.toString(),
                  creator: token.creator
                }} />
              }
            </div>
          ))}
          {filteredTokens.length === 0 && (
            <div className="text-center py-8 text-[#9CA3AF] flex-1 flex items-center justify-center">
              {activeFilters ? 'No tokens match the current filters' : 'No tokens in this category'}
            </div>
          )}
        </div>
      </div>

      {/* Filters Modal */}
      <FiltersModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        activeTab={getActiveTab()}
        onApplyFilters={handleApplyFilters}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default ColumnSection;
