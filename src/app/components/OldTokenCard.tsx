import React, { useState, useEffect } from "react";
import { EnhancedToken } from "./tokenUtils";

const OldTokenCard: React.FC<{ token: EnhancedToken }> = ({ token }) => {
  const [currentPrice, setCurrentPrice] = useState(token.price);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.05;
      const newPrice = Math.max(1, currentPrice * (1 + change));
      if (newPrice > currentPrice) {
        setPriceDirection('up');
      } else if (newPrice < currentPrice) {
        setPriceDirection('down');
      }
      setCurrentPrice(newPrice);
    }, 2000);
    return () => clearInterval(interval);
  }, [currentPrice]);

  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <span className="font-bold text-white text-lg">{token.name}</span>
        <span className={`text-sm font-semibold ${priceDirection === 'up' ? 'text-green-400' : priceDirection === 'down' ? 'text-red-400' : 'text-white'}`}>{currentPrice.toFixed(2)}</span>
      </div>
      {/* ...other token details... */}
    </div>
  );
};

export default OldTokenCard;
