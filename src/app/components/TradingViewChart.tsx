"use client";

import React, { useEffect, useRef, useState } from 'react';

interface TradingViewChartProps {
  symbol: string;
  theme?: 'dark' | 'light';
  height?: number;
  interval?: string;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ 
  symbol, 
  theme = 'dark',
  height = 400,
  interval = '1'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadTradingView = () => {
      if (containerRef.current && window.TradingView) {
        const containerId = `tradingview_${symbol.replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}`;
        if (containerRef.current) {
          containerRef.current.id = containerId;
        }

        try {
          widgetRef.current = new window.TradingView.widget({
            autosize: true,
            symbol: symbol,
            interval: interval,
            timezone: 'Etc/UTC',
            theme: theme,
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            allow_symbol_change: false,
            container_id: containerId,
            width: '100%',
            height: height,
            studies: [
              'RSI@tv-basicstudies',
              'MACD@tv-basicstudies'
            ],
            disabled_features: [
              'use_localstorage_for_settings',
              'volume_force_overlay',
              'create_volume_indicator_by_default',
              'header_compare',
              'header_symbol_search',
              'header_undo_redo',
              'header_screenshot',
              'header_fullscreen_button',
              'header_settings',
              'header_indicators',
              'header_share',
              'header_chart_type',
              'timeframes_toolbar',
              'edit_buttons_in_legend',
              'context_menus',
              'border_around_the_chart',
              'header_saveload',
              'control_bar',
              'countdown',
              'display_market_status',
              'chart_property_page_background',
              'compare_symbol',
              'high_density_bars',
              'left_toolbar',
              'legend_widget',
              'pane_legend',
              'popup_hints',
              'quick_edit',
              'right_scale_series',
              'scalable_layout',
              'secondary_series_scale',
              'series_scale',
              'side_toolbar_in_fullscreen_mode'
            ],
            enabled_features: [
              'study_templates'
            ],
            overrides: {
              'paneProperties.background': '#131722',
              'paneProperties.vertGridProperties.color': '#363c4e',
              'paneProperties.horzGridProperties.color': '#363c4e',
              'symbolWatermarkProperties.transparency': 90,
              'scalesProperties.textColor': '#AAA',
              'mainSeriesProperties.candleStyle.wickUpColor': '#26a69a',
              'mainSeriesProperties.candleStyle.wickDownColor': '#ef5350',
              'mainSeriesProperties.candleStyle.upColor': '#26a69a',
              'mainSeriesProperties.candleStyle.downColor': '#ef5350',
              'mainSeriesProperties.candleStyle.borderUpColor': '#26a69a',
              'mainSeriesProperties.candleStyle.borderDownColor': '#ef5350'
            },
            loading_screen: { backgroundColor: "#131722" },
            custom_css_url: "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.css"
          });

          // Listen for chart ready event
          if (widgetRef.current && widgetRef.current.onChartReady) {
            widgetRef.current.onChartReady(() => {
              setIsLoading(false);
              setHasError(false);
            });
          } else {
            // Fallback if onChartReady is not available
            setTimeout(() => {
              setIsLoading(false);
              setHasError(false);
            }, 2000);
          }
        } catch (error) {
          console.error('TradingView widget error:', error);
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    // Load TradingView script if not already loaded
    if (!window.TradingView) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        setTimeout(loadTradingView, 100); // Small delay to ensure script is fully loaded
      };
      script.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else {
      setTimeout(loadTradingView, 100);
    }

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch (e) {
          console.log('Widget cleanup error:', e);
        }
      }
    };
  }, [symbol, theme, height, interval]);

  if (hasError) {
    return (
      <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-2xl mb-2">📈</div>
          <div>TradingView Chart</div>
          <div className="text-sm">Chart temporarily unavailable</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <div>Loading chart...</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full"
      style={{ height: `${height}px` }}
    />
  );
};

export default TradingViewChart; 