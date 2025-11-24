"use client";

import React from "react";
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
      {/* Fixed / sticky Header on top */}
      <Header />
      {/* Main content area grows and centers the Main frame */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Main />
      </div>
      {/* Fixed footer at bottom */}
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