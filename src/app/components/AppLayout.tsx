"use client";

import React from "react";

// 🔥 MUST include .tsx extensions
import ReduxProvider from "./ReduxProvider.tsx";
import Header from "./Header.tsx";
import Main from "./Main.tsx";
import Footer from "./Footer.tsx";

import { TradingProvider } from "./TradingContext.tsx";
import TradingInterface from "./TradingInterface.tsx";
import { useTrading } from "./TradingContext.tsx";

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
