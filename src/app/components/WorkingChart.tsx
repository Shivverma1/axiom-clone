"use client";

import React, { useEffect, useRef } from 'react';

interface WorkingChartProps {
  symbol: string;
  height?: number;
}

const WorkingChart: React.FC<WorkingChartProps> = ({ symbol, height = 256 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const container = canvas.parentElement;
    const width = container?.clientWidth || 400;
    canvas.width = width;
    canvas.height = height;

    // Generate data
    const data = [];
    let price = 50000;
    for (let i = 0; i < 50; i++) {
      const change = (Math.random() - 0.5) * 1000;
      const open = price;
      const close = price + change;
      const high = Math.max(open, close) + Math.random() * 200;
      const low = Math.min(open, close) - Math.random() * 200;
      
      data.push({ open, high, low, close });
      price = close;
    }

    // Clear canvas
    ctx.fillStyle = '#131722';
    ctx.fillRect(0, 0, width, height);

    // Find min and max
    const min = Math.min(...data.map(d => d.low));
    const max = Math.max(...data.map(d => d.high));
    const range = max - min;

    // Draw grid
    ctx.strokeStyle = '#363c4e';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = 40 + (height - 80) / 5 * i;
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
    }

    // Draw candlesticks
    const candleWidth = (width - 80) / data.length;
    data.forEach((candle, i) => {
      const x = 60 + i * candleWidth;
      const openY = 40 + (height - 80) - ((candle.open - min) / range) * (height - 80);
      const closeY = 40 + (height - 80) - ((candle.close - min) / range) * (height - 80);
      const highY = 40 + (height - 80) - ((candle.high - min) / range) * (height - 80);
      const lowY = 40 + (height - 80) - ((candle.low - min) / range) * (height - 80);

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
      ctx.fillRect(x + 2, bodyY, candleWidth - 4, bodyHeight);
    });

    // Draw price labels
    ctx.fillStyle = '#AAA';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const price = max - (range / 5) * i;
      const y = 40 + (height - 80) / 5 * i;
      ctx.fillText(`$${price.toFixed(0)}`, 55, y + 4);
    }

    // Draw title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${symbol} Chart`, 60, 25);

    // Draw current price
    const currentPrice = data[data.length - 1].close;
    ctx.fillStyle = '#26a69a';
    ctx.fillText(`$${currentPrice.toFixed(2)}`, 60, 45);

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

export default WorkingChart; 