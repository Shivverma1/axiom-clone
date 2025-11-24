"use client";

import React from "react";

// 🔥 MUST include .tsx extensions
import ReduxProvider from "./ReduxProvider";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import { TradingProvider } from "./TradingContext";
import TradingInterface from "./TradingInterface";
import { useTrading } from "./TradingContext";

const AppContent: React.FC = () => {
  const { isTradingOpen, selectedToken, closeTrading } = useTrading();

  return (
    <div className="h-screen bg-[#0A0A0A] flex flex-col relative overflow-hidden">
      {/* Fixed Header */}
      <Header />

      {/* Main content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Main />
      </div>

      {/* Footer */}
      <Footer />

      {/* Trading Interface */}
      {selectedToken && (
        <TradingInterface
          token={selectedToken}
          isOpen={isTradingOpen}
          onClose={closeTrading}
        />
      )}
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <ReduxProvider>
      <TradingProvider>
        <AppContent />
      </TradingProvider>
    </ReduxProvider>
  );
};

export default AppLayout;
