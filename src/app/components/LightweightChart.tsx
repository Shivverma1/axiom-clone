"use client";

import React, { useEffect, useRef, useState } from 'react';

interface LightweightChartProps {
  symbol: string;
  height?: number;
}

interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

const LightweightChart: React.FC<LightweightChartProps> = ({ symbol, height = 256 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const renderChart = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Get the actual container dimensions
      const container = canvas.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = height;

      // Set canvas size with proper pixel ratio
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = containerWidth * pixelRatio;
      canvas.height = containerHeight * pixelRatio;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);

      // Generate realistic candlestick data
      const generateCandleData = (): CandleData[] => {
        const data: CandleData[] = [];
        let basePrice = 50000;
        const now = Date.now();
        
        for (let i = 0; i < 80; i++) {
          const time = now - (80 - i) * 60000; // 1 minute intervals
          const volatility = 0.015;
          const change = (Math.random() - 0.5) * volatility * basePrice;
          
          const open = basePrice;
          const close = basePrice + change;
          const high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.3;
          const low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.3;
          
          data.push({
            time,
            open,
            high,
            low,
            close
          });
          
          basePrice = close;
        }
        return data;
      };

      const data = generateCandleData();
      const width = containerWidth;
      const chartHeight = containerHeight - 60;
      const padding = 50;
      const candleWidth = Math.max(3, (width - 2 * padding) / data.length);

      // Clear canvas
      ctx.fillStyle = '#131722';
      ctx.fillRect(0, 0, width, containerHeight);

      // Find min and max for scaling
      const min = Math.min(...data.map(d => d.low));
      const max = Math.max(...data.map(d => d.high));
      const range = max - min;

      if (range === 0) return; // Prevent division by zero

      // Draw grid
      ctx.strokeStyle = '#363c4e';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }

      // Draw vertical grid lines
      for (let i = 0; i <= 8; i++) {
        const x = padding + (width - 2 * padding) * (i / 8);
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, padding + chartHeight);
        ctx.stroke();
      }

      // Draw candlesticks
      data.forEach((candle, i) => {
        const x = padding + i * candleWidth;
        const openY = padding + chartHeight - ((candle.open - min) / range) * chartHeight;
        const closeY = padding + chartHeight - ((candle.close - min) / range) * chartHeight;
        const highY = padding + chartHeight - ((candle.high - min) / range) * chartHeight;
        const lowY = padding + chartHeight - ((candle.low - min) / range) * chartHeight;

        const isGreen = candle.close > candle.open;
        ctx.strokeStyle = isGreen ? '#26a69a' : '#ef5350';
        ctx.fillStyle = isGreen ? '#26a69a' : '#ef5350';
        ctx.lineWidth = 1;

        // Draw wick
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, highY);
        ctx.lineTo(x + candleWidth / 2, lowY);
        ctx.stroke();

        // Draw body
        const bodyHeight = Math.max(1, Math.abs(closeY - openY));
        const bodyY = Math.min(openY, closeY);
        ctx.fillRect(x + 1, bodyY, Math.max(1, candleWidth - 2), bodyHeight);
      });

      // Draw price labels
      ctx.fillStyle = '#AAA';
      ctx.font = '11px Arial';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 5; i++) {
        const price = max - (range / 5) * i;
        const y = padding + (chartHeight / 5) * i;
        ctx.fillText(`$${price.toFixed(0)}`, padding - 8, y + 4);
      }

      // Draw time labels
      ctx.fillStyle = '#AAA';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      for (let i = 0; i <= 4; i++) {
        const index = Math.floor((data.length - 1) * (i / 4));
        if (index < data.length) {
          const time = new Date(data[index].time);
          const timeStr = time.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          });
          const x = padding + index * candleWidth;
          ctx.fillText(timeStr, x, containerHeight - 15);
        }
      }

      // Draw symbol and current price
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${symbol} Chart`, padding, 20);
      
      const currentPrice = data[data.length - 1].close;
      ctx.fillStyle = '#26a69a';
      ctx.fillText(`$${currentPrice.toFixed(2)}`, padding, 35);

      setIsLoading(false);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(renderChart, 100);
    return () => clearTimeout(timer);
  }, [symbol, height]);

  return (
    <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
          <div className="text-center text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <div>Loading chart...</div>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

export default LightweightChart; 