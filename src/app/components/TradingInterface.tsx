"use client";

import React, { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, Star, Bell, Settings, Camera, Maximize2, ChevronDown } from 'lucide-react';
import TradingViewChart from './TradingViewChart.tsx';
import SimpleChart from './SimpleChart.tsx';
import LightweightChart from './LightweightChart.tsx';
import WorkingChart from './WorkingChart.tsx';

interface TradingInterfaceProps {
  token: {
    id: string;
    name: string;
    symbol: string;
    price: string;
    priceChange: string;
    marketCap: string;
    volume: string;
    image: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const TradingInterface: React.FC<TradingInterfaceProps> = ({ token, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'trades' | 'positions' | 'orders' | 'holders' | 'traders' | 'dev'>('positions');
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'advanced'>('market');
  const [amount, setAmount] = useState('0.0');
  const [selectedPercentage, setSelectedPercentage] = useState('20%');
  const [timeframe, setTimeframe] = useState('1m');
  const [chartType, setChartType] = useState<'working' | 'lightweight' | 'tradingview' | 'simple'>('working');

  if (!isOpen) return null;

  // Map token symbol to TradingView symbol format
  const getTradingViewSymbol = (symbol: string) => {
    const symbolMap: { [key: string]: string } = {
      'BTC': 'BINANCE:BTCUSDT',
      'ETH': 'BINANCE:ETHUSDT',
      'SOL': 'BINANCE:SOLUSDT',
      'DOGE': 'BINANCE:DOGEUSDT',
      'BNB': 'BINANCE:BNBUSDT',
      'LTC': 'BINANCE:LTCUSDT',
      'ADA': 'BINANCE:ADAUSDT',
      'DOT': 'BINANCE:DOTUSDT',
      'LINK': 'BINANCE:LINKUSDT',
      'UNI': 'BINANCE:UNIUSDT',
      'MATIC': 'BINANCE:MATICUSDT',
      'AVAX': 'BINANCE:AVAXUSDT',
      'ATOM': 'BINANCE:ATOMUSDT',
      'FTM': 'BINANCE:FTMUSDT',
      'NEAR': 'BINANCE:NEARUSDT',
      'ALGO': 'BINANCE:ALGOUSDT',
      'VET': 'BINANCE:VETUSDT',
      'ICP': 'BINANCE:ICPUSDT',
      'FIL': 'BINANCE:FILUSDT',
      'THETA': 'BINANCE:THETAUSDT',
    };
    
    // Extract base symbol (remove numbers and special characters)
    const baseSymbol = symbol.replace(/[0-9_]/g, '').toUpperCase();
    return symbolMap[baseSymbol] || 'BINANCE:BTCUSDT'; // Default to BTC if not found
  };

  const getChartComponent = () => {
    switch (chartType) {
      case 'tradingview':
        return (
          <TradingViewChart 
            symbol={getTradingViewSymbol(token.symbol)}
            theme="dark"
            height={256}
            interval={timeframe}
          />
        );
      case 'simple':
        return (
          <SimpleChart 
            symbol={token.symbol}
            height={256}
          />
        );
      case 'lightweight':
        return (
          <LightweightChart 
            symbol={token.symbol}
            height={256}
          />
        );
      default:
        return (
          <WorkingChart 
            symbol={token.symbol}
            height={256}
          />
        );
    }
  };

  const getChartTypeLabel = () => {
    switch (chartType) {
      case 'tradingview':
        return 'TradingView Chart';
      case 'simple':
        return 'Simple Chart';
      case 'lightweight':
        return 'Lightweight Chart';
      default:
        return 'Working Chart';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#0A0A0A] w-full h-full max-w-7xl max-h-[95vh] rounded-lg border border-gray-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-2 sm:p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <img src={token.image} alt={token.name} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
              <span className="text-white font-semibold text-sm sm:text-base">{token.name} {token.symbol}</span>
            </div>
            <div className="text-green-400 font-semibold text-sm sm:text-base">${token.price}</div>
            <div className="text-green-400 text-sm sm:text-base">+${token.priceChange}</div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-gray-400 text-xs">
              <span>Liquidity ${token.volume}</span>
              <span>Supply 1B</span>
              <span>Global Fees Paid Ξ 0.01</span>
              <span>B.Curve 0%</span>
              <span>Platform Bonk</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button 
                className="p-1 sm:p-2 hover:bg-gray-800 rounded"
                onClick={() => {
                  const types = ['working', 'lightweight', 'tradingview', 'simple'];
                  const currentIndex = types.indexOf(chartType);
                  const nextIndex = (currentIndex + 1) % types.length;
                  setChartType(types[nextIndex] as any);
                }}
                title={`Switch to ${chartType === 'working' ? 'Lightweight' : chartType === 'lightweight' ? 'TradingView' : chartType === 'tradingview' ? 'Simple' : 'Working'} Chart`}
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              </button>
              <button className="p-1 sm:p-2 hover:bg-gray-800 rounded">
                <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              </button>
              <button className="p-1 sm:p-2 hover:bg-gray-800 rounded">
                <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              </button>
              <button onClick={onClose} className="p-1 sm:p-2 hover:bg-gray-800 rounded">
                <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Chart Area */}
          <div className="flex-1 p-2 sm:p-4">
            <div className="bg-gray-900 rounded-lg p-2 sm:p-4 h-full">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="text-white font-semibold text-xs sm:text-sm">{token.symbol}/USD on LaunchLab • 1 • axiom.trade</span>
                  <span className="text-gray-400 text-xs sm:text-sm">Volume 931.64</span>
                  <span className="text-xs text-gray-500 hidden sm:inline">
                    {getChartTypeLabel()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-xs sm:text-sm">O5.51K H6.02K L5.51K C5.55K</span>
                </div>
              </div>
              
              {/* Chart */}
              <div className="bg-gray-800 rounded-lg h-48 sm:h-64 overflow-hidden">
                {getChartComponent()}
              </div>

              {/* Chart Controls */}
              <div className="flex items-center justify-between mt-2 sm:mt-4">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button 
                    className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${timeframe === '3m' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setTimeframe('3m')}
                  >
                    3m
                  </button>
                  <button 
                    className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${timeframe === '1m' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setTimeframe('1m')}
                  >
                    1m
                  </button>
                  <button 
                    className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${timeframe === '5d' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setTimeframe('5d')}
                  >
                    5d
                  </button>
                  <button 
                    className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${timeframe === '1d' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                    onClick={() => setTimeframe('1d')}
                  >
                    1d
                  </button>
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">17:27:07 (UTC) % log auto</div>
              </div>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="w-full lg:w-80 bg-gray-900 p-2 sm:p-4 border-t lg:border-t-0 lg:border-l border-gray-800">
            <div className="space-y-2 sm:space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="text-gray-400">5m Vol $953.9</div>
                <div className="text-green-400">Buys 6 / $517.1</div>
                <div className="text-red-400">Sells 5 / $436.8</div>
                <div className="text-green-400">Net Vol. +$80.26</div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm">
                  Buy
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm">
                  Sell
                </button>
              </div>

              {/* Order Types */}
              <div className="flex space-x-1">
                <button 
                  className={`flex-1 py-1 sm:py-2 px-2 sm:px-3 rounded text-xs sm:text-sm ${orderType === 'market' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                  onClick={() => setOrderType('market')}
                >
                  Market
                </button>
                <button 
                  className={`flex-1 py-1 sm:py-2 px-2 sm:px-3 rounded text-xs sm:text-sm ${orderType === 'limit' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                  onClick={() => setOrderType('limit')}
                >
                  Limit
                </button>
                <button 
                  className={`flex-1 py-1 sm:py-2 px-2 sm:px-3 rounded text-xs sm:text-sm ${orderType === 'advanced' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                  onClick={() => setOrderType('advanced')}
                >
                  Adv.
                </button>
              </div>

              {/* Amount Input */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-gray-400 text-xs sm:text-sm">AMOUNT</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-gray-800 text-white px-2 sm:px-3 py-1 sm:py-2 rounded border border-gray-700 text-sm"
                    placeholder="0.0"
                  />
                  <button className="p-1 sm:p-2 bg-gray-800 rounded">
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  </button>
                </div>
                <div className="flex space-x-1 sm:space-x-2">
                  <button className="px-1 sm:px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">0.01</button>
                  <button className="px-1 sm:px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">0.1</button>
                  <button className="px-1 sm:px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">1</button>
                  <button className="px-1 sm:px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">10</button>
                </div>
              </div>

              {/* Percentage/Fee Options */}
              <div className="flex space-x-1 sm:space-x-2">
                <button 
                  className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${selectedPercentage === '20%' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                  onClick={() => setSelectedPercentage('20%')}
                >
                  20%
                </button>
                <button className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded text-xs sm:text-sm">Ξ 0.001</button>
                <button className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded text-xs sm:text-sm">Ξ 0.01</button>
                <button className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded text-xs sm:text-sm">Off</button>
              </div>

              {/* Advanced Strategy */}
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-300 text-xs sm:text-sm">Advanced Trading Strategy</span>
              </div>

              {/* Buy Button */}
              <button className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm">
                Buy {token.symbol}
              </button>

              {/* Position Summary */}
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Bought Ξ 0</span>
                  <span className="text-green-400">+0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sold Ξ 0</span>
                  <span className="text-red-400">+0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Holding Ξ 0</span>
                  <span className="text-gray-300">+0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">PnL Ξ +0</span>
                  <span className="text-green-400">(+0%)</span>
                </div>
              </div>

              {/* Presets */}
              <div className="flex space-x-1 sm:space-x-2">
                <button className="flex-1 py-1 sm:py-2 px-2 sm:px-3 bg-gray-800 text-gray-300 rounded text-xs sm:text-sm">PRESET 1</button>
                <button className="flex-1 py-1 sm:py-2 px-2 sm:px-3 bg-gray-800 text-gray-300 rounded text-xs sm:text-sm">PRESET 2</button>
                <button className="flex-1 py-1 sm:py-2 px-2 sm:px-3 bg-gray-800 text-gray-300 rounded text-xs sm:text-sm">PRESET 3</button>
              </div>

              {/* Token Info */}
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <div className="text-gray-400">Top 10 H. 1.29%</div>
                <div className="text-gray-400">Dev H. 0%</div>
                <div className="text-gray-400">Snipers H. 1.29%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tabs */}
        <div className="border-t border-gray-800">
          <div className="flex items-center justify-between p-2 sm:p-4">
            <div className="flex space-x-1 overflow-x-auto">
              <button 
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm whitespace-nowrap ${activeTab === 'trades' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                onClick={() => setActiveTab('trades')}
              >
                Trades
              </button>
              <button 
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm whitespace-nowrap ${activeTab === 'positions' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                onClick={() => setActiveTab('positions')}
              >
                Positions
              </button>
              <button 
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm whitespace-nowrap ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </button>
              <button 
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm whitespace-nowrap ${activeTab === 'holders' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                onClick={() => setActiveTab('holders')}
              >
                Holders (2)
              </button>
              <button 
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm whitespace-nowrap ${activeTab === 'traders' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                onClick={() => setActiveTab('traders')}
              >
                Top Traders
              </button>
              <button 
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm whitespace-nowrap ${activeTab === 'dev' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                onClick={() => setActiveTab('dev')}
              >
                Dev Tokens (0)
              </button>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-400 text-sm">Show Hidden</span>
              </div>
              <button className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-sm">
                <span>⚡</span>
                <span>Instant Trade</span>
              </button>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-400 text-sm">Trades Panel</span>
              </div>
              <button className="text-gray-400 text-sm">↑↓USD</button>
            </div>
          </div>

          {/* Table Area */}
          <div className="px-2 sm:px-4 pb-2 sm:pb-4">
            <div className="bg-gray-900 rounded-lg p-2 sm:p-4">
              <div className="grid grid-cols-6 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 border-b border-gray-800 pb-2">
                <div>Token</div>
                <div>Bought</div>
                <div>Sold</div>
                <div>Remaining</div>
                <div>PnL</div>
                <div>Actions</div>
              </div>
              <div className="text-gray-600 text-center py-8">
                No data to display
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="border-t border-gray-800 p-1 sm:p-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="bg-gray-800 px-1 sm:px-2 py-1 rounded text-xs">PRESET 1</button>
              <span>1</span>
              <span>0</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <span>Wallet Tracker</span>
              <span>Twitter Tracker</span>
              <span>Pulse Tracker</span>
              <span>PnL Tracker</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <span>$117.9K</span>
              <span>$380</span>
              <span>$186.82</span>
              <span>$75.7K</span>
              <span>0.003</span>
              <span>0.0228</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="hidden sm:inline">Connection is stable</span>
              <span className="sm:hidden">Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1">
                <span className="hidden sm:inline">GLOBAL</span>
                <span className="sm:hidden">GL</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <span>📁</span>
              <span>?</span>
              <span>📱</span>
              <span>📄</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingInterface; 