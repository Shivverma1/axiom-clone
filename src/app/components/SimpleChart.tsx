"use client";

import React, { useEffect, useRef } from 'react';

interface SimpleChartProps {
  symbol: string;
  height?: number;
}

const SimpleChart: React.FC<SimpleChartProps> = ({ symbol, height = 256 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = height;

    // Generate mock candlestick data
    const generateMockData = () => {
      const data = [];
      let price = 50000;
      for (let i = 0; i < 50; i++) {
        const change = (Math.random() - 0.5) * 2000;
        const open = price;
        const close = price + change;
        const high = Math.max(open, close) + Math.random() * 500;
        const low = Math.min(open, close) - Math.random() * 500;
        
        data.push({ open, high, low, close });
        price = close;
      }
      return data;
    };

    const data = generateMockData();
    const width = canvas.width;
    const chartHeight = height - 40;
    const padding = 20;
    const candleWidth = (width - 2 * padding) / data.length;

    // Clear canvas
    ctx.fillStyle = '#131722';
    ctx.fillRect(0, 0, width, height);

    // Find min and max for scaling
    const min = Math.min(...data.map(d => d.low));
    const max = Math.max(...data.map(d => d.high));
    const range = max - min;

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

      // Draw wick
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, highY);
      ctx.lineTo(x + candleWidth / 2, lowY);
      ctx.stroke();

      // Draw body
      const bodyHeight = Math.abs(closeY - openY);
      const bodyY = Math.min(openY, closeY);
      ctx.fillRect(x + 1, bodyY, candleWidth - 2, bodyHeight);
    });

    // Draw price labels
    ctx.fillStyle = '#AAA';
    ctx.font = '12px Arial';
    for (let i = 0; i <= 5; i++) {
      const price = max - (range / 5) * i;
      const y = padding + (chartHeight / 5) * i;
      ctx.fillText(`$${price.toFixed(0)}`, 5, y + 4);
    }

    // Draw symbol
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '16px Arial';
    ctx.fillText(`${symbol} Chart`, padding, 20);

  }, [symbol, height]);

  return (
    <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

export default SimpleChart; 