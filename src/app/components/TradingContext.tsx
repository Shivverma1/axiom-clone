"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TradingToken {
  id: string;
  name: string;
  symbol: string;
  price: string;
  priceChange: string;
  marketCap: string;
  volume: string;
  image: string;
}

interface TradingContextType {
  isTradingOpen: boolean;
  selectedToken: TradingToken | null;
  openTrading: (token: TradingToken) => void;
  closeTrading: () => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};

interface TradingProviderProps {
  children: ReactNode;
}

export const TradingProvider: React.FC<TradingProviderProps> = ({ children }) => {
  const [isTradingOpen, setIsTradingOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TradingToken | null>(null);

  const openTrading = (token: TradingToken) => {
    setSelectedToken(token);
    setIsTradingOpen(true);
  };

  const closeTrading = () => {
    setIsTradingOpen(false);
    setSelectedToken(null);
  };

  return (
    <TradingContext.Provider value={{
      isTradingOpen,
      selectedToken,
      openTrading,
      closeTrading,
    }}>
      {children}
    </TradingContext.Provider>
  );
}; 