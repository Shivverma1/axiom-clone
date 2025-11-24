"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTrading } from './TradingContext.tsx';

interface TokenData {
  name: string;
  subtitle: string;
  timeago: string;
  logo: {
    background: string;
    border?: string;
    emoji?: string;
    badge: string;
    image: string; // added image path
  };
  stats: {
    users: number;
    charts: number;
    trophies: number;
    crowns: number;
  };
  address: string;
  marketData: {
    mc: string;
    volume: string;
    f: string;
    tx: string;
  };
  percentages: {
    user: { value: string; color: string };
    ghost: { value: string; time?: string; color: string };
    target: { value: string; color: string };
    lock: { value: string; color: string };
    warning: { value: string; color: string };
  };
  icons: {
    pen: boolean;
    globe: boolean;
    telegram: boolean;
    search: boolean;
  };
  rightIcons: Array<{ icon: string; color: string }>;
  showSolButton: boolean;
}

interface Token {
  id: string;
  name: string;
  symbol: string;
  age: string;
  marketCap: string;
  price: string;
  volume24h: string;
  transactions24h: string;
  priceChange24h: string;
  image: string;
  holders: string;
  buys: string;
  sells: string;
  creator: string;
}

const formatMarketCap = (marketCap: string) => {
  const num = parseFloat(marketCap);
  if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
  return `$${num.toFixed(0)}`;
};

const formatPrice = (price: string) => {
  const num = parseFloat(price);
  if (num < 0.01) return num.toFixed(4);
  if (num < 1) return num.toFixed(3);
  return num.toFixed(2);
};

class MockWebSocket {
  private callbacks: ((data: any) => void)[] = [];
  private interval: NodeJS.Timeout | null = null;

  connect() {
    setTimeout(() => {
      console.log('Mock WebSocket connected');
      this.startUpdates();
    }, 800);
  }

  onMessage(callback: (data: any) => void) {
    this.callbacks.push(callback);
  }

  private startUpdates() {
    this.interval = setInterval(() => {
      const updateInterval = Math.random() * 8000 + 5000; // 5-13 seconds (slower)
      setTimeout(() => {
        const mockData = this.generateMockData();
        this.callbacks.forEach(callback => callback(mockData));
      }, updateInterval);
    }, 500); // Increased from 100ms to 500ms
  }

  private generateMockData() {
    return {
      marketCap: (Math.random() * 1000000 + 1000).toFixed(0),
      price: (Math.random() * 1000 + 0.001).toFixed(4),
      volume: (Math.random() * 500000 + 1000).toFixed(0),
      transactions: Math.floor(Math.random() * 1000 + 1).toString(),
      users: Math.floor(Math.random() * 1000 + 1),
      charts: Math.floor(Math.random() * 500 + 1),
      trophies: Math.floor(Math.random() * 100 + 1),
      crowns: Math.floor(Math.random() * 50 + 1),
      percentages: {
        user: Math.floor(Math.random() * 20 + 1),
        ghost: Math.floor(Math.random() * 15 + 1),
        target: Math.floor(Math.random() * 25 + 1),
        lock: Math.floor(Math.random() * 10),
        warning: Math.floor(Math.random() * 15 + 1)
      },
      timeago: `${Math.floor(Math.random() * 60 + 1)}s`
    };
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

const SingleTokenComponent: React.FC<{ tokenData: TokenData; tokenId: string }> = ({ tokenData, tokenId }) => {
  const [localTokenData, setLocalTokenData] = useState(tokenData);
  const [showPreview, setShowPreview] = useState(false);
  const [previewCoords, setPreviewCoords] = useState({ x: 0, y: 0 });
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewPosition, setPreviewPosition] = useState<'above' | 'below'>('below');
  const wsRef = useRef<MockWebSocket | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const { openTrading } = useTrading();

  useEffect(() => {
    wsRef.current = new MockWebSocket();

    wsRef.current.onMessage((data) => {
      setIsUpdating(true);
      setLocalTokenData(prev => ({
        ...prev,
        marketData: {
          ...prev.marketData,
          mc: data.marketCap,
          volume: data.volume,
          f: data.price,
          tx: data.transactions
        }
      }));
      setTimeout(() => setIsUpdating(false), 500);
    });

    wsRef.current.connect();
    return () => wsRef.current?.disconnect();
  }, [tokenId]);

  const handleMouseEnter = () => {
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const logoBottom = rect.bottom;
      const logoCenterX = rect.left + rect.width / 2;

      if (logoBottom > viewportHeight * 0.7) {
        setPreviewPosition('above');
        setPreviewCoords({ x: logoCenterX, y: rect.top - 180 });
      } else {
        setPreviewPosition('below');
        setPreviewCoords({ x: logoCenterX, y: rect.bottom + 20 });
      }
      setShowPreview(true);
    }
  };

  const handleMouseLeave = () => setShowPreview(false);

  const handleCardClick = () => {
    openTrading({
      id: tokenId,
      name: localTokenData.name,
      symbol: localTokenData.subtitle,
      price: localTokenData.marketData.f,
      priceChange: "0.055",
      marketCap: localTokenData.marketData.mc,
      volume: localTokenData.marketData.volume,
      image: localTokenData.logo.image,
    });
  };

  useEffect(() => {
    const logoElement = logoRef.current;
    if (logoElement) {
      logoElement.addEventListener('mouseenter', handleMouseEnter);
      logoElement.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        logoElement.removeEventListener('mouseenter', handleMouseEnter);
        logoElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div 
      className={`bg-gray-950 text-white font-sans transition-all duration-300 ${isUpdating ? 'bg-opacity-80' : ''}`} style={{ backgroundColor: 'rgb(16,17,20)' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div className="p-3 border-b border-gray-800">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
          <div className="flex items-start space-x-2 min-w-0 flex-1">
            <div className="relative flex-shrink-0" ref={logoRef}>
              <div className={`w-20 h-20 rounded-lg ${localTokenData.logo.border || ''} flex items-center justify-center overflow-hidden cursor-pointer`}>
                <img 
                  src={localTokenData.logo.image} 
                  alt={localTokenData.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="text-gray-300 text-xs mt-2 break-all">{localTokenData.address}</div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1 mb-1">
                <span className="font-bold text-xs truncate">{localTokenData.name}</span>
                <span className="text-gray-400 text-xs truncate">{localTokenData.subtitle}</span>
                <span className="text-gray-500 text-xs flex-shrink-0">📋</span>
              </div>

              <div className="flex items-center flex-wrap gap-1 text-xs mb-3">
                <span className="text-green-400">{localTokenData.timeago}</span>
                {localTokenData.icons.pen && <span className="text-gray-400">🖊️</span>}
                {localTokenData.icons.globe && <span className="text-gray-400">🌐</span>}
                {localTokenData.icons.telegram && <span className="text-gray-400">📢</span>}
                {localTokenData.icons.search && <span className="text-gray-400">🔍</span>}
                <span className="text-gray-400">👥{localTokenData.stats.users}</span>
                <span className="text-gray-400">📊{localTokenData.stats.charts}</span>
                <span className="text-gray-400">🏆{localTokenData.stats.trophies}</span>
                <span className="text-gray-400">👑{localTokenData.stats.crowns}</span>
              </div>

              <div className="flex items-center flex-wrap gap-1 text-xs mt-2">
                {Object.entries(localTokenData.percentages).map(([key, val]) => (
                  <span key={key} className={`${val.color} flex items-center space-x-1`}>
                    <span>{key === 'user' ? '👤' : key === 'ghost' ? '👻' : key === 'target' ? '🎯' : key === 'lock' ? '🔒' : '⚠️'}</span>
                    <span>{val.value}</span>
                    {'time' in val && val.time && <span>{val.time}</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-white text-base font-bold">MC {localTokenData.marketData.mc}</div>
            <div className="text-gray-300 text-base">V {localTokenData.marketData.volume}</div>
            <div className="text-xs text-gray-400">F ≡ {localTokenData.marketData.f} TX {localTokenData.marketData.tx} ▬</div>
            {localTokenData.showSolButton && (
              <button className="bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm font-medium mt-2">SOL</button>
            )}
          </div>
        </div>
      </div>

      <div 
        className={`fixed transition-opacity duration-200 pointer-events-none z-[9999] transform -translate-x-1/2 ${showPreview ? 'opacity-100' : 'opacity-0'}`}
        style={{ left: `${previewCoords.x}px`, top: `${previewCoords.y}px` }}
      >
        <div className="bg-gray-800 rounded-lg p-2 shadow-lg border border-gray-600">
          <div className="w-40 h-40 rounded-lg overflow-hidden">
            <img 
              src={localTokenData.logo.image} 
              alt={localTokenData.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TokenCard: React.FC<{ token: Token }> = ({ token }) => {
  const tokenData: TokenData = {
    name: token.name,
    subtitle: token.symbol,
    timeago: token.age,
    logo: {
      background: "bg-yellow-100",
      border: "",
      badge: "🔥",
      image: token.image,
    },
    stats: {
      users: parseInt(token.holders) || 0,
      charts: parseInt(token.buys) || 0,
      trophies: 0,
      crowns: 0,
    },
    address: token.creator,
    marketData: {
      mc: formatMarketCap(token.marketCap),
      volume: formatMarketCap(token.volume24h),
      f: formatPrice(token.price),
      tx: token.transactions24h,
    },
    percentages: {
      user: { value: "4%", color: "text-green-400" },
      ghost: { value: "3%", time: "2d", color: "text-green-400" },
      target: { value: "4%", color: "text-green-400" },
      lock: { value: "0%", color: "text-green-400" },
      warning: { value: "4%", color: "text-green-400" },
    },
    icons: {
      pen: true,
      globe: false,
      telegram: false,
      search: true,
    },
    rightIcons: [],
    showSolButton: true,
  };

  return <SingleTokenComponent tokenData={tokenData} tokenId={token.id} />;
};

export default TokenCard;
