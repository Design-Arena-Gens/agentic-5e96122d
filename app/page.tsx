'use client'

import { useState, useEffect } from 'react'
import MarketAnalysis from '@/components/MarketAnalysis'
import ChartVisualization from '@/components/ChartVisualization'
import TradingSignals from '@/components/TradingSignals'
import PortfolioDashboard from '@/components/PortfolioDashboard'
import AIInsights from '@/components/AIInsights'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedAsset, setSelectedAsset] = useState('BTC/USD')

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Trading System
              </h1>
              <p className="text-gray-400 mt-2">Advanced Market Analysis & Automated Trading</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg border border-green-500/30">
                <span className="font-semibold">Status: </span>Active
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="mb-6">
          <div className="flex gap-2 bg-slate-800/50 p-1 rounded-lg backdrop-blur-sm">
            {['dashboard', 'charts', 'signals', 'analysis'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 rounded-md transition-all ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        {/* Asset Selector */}
        <div className="mb-6">
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-purple-500"
          >
            <option value="BTC/USD">Bitcoin (BTC/USD)</option>
            <option value="ETH/USD">Ethereum (ETH/USD)</option>
            <option value="SPY">S&P 500 (SPY)</option>
            <option value="AAPL">Apple (AAPL)</option>
            <option value="GOOGL">Google (GOOGL)</option>
            <option value="TSLA">Tesla (TSLA)</option>
          </select>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {activeTab === 'dashboard' && (
            <>
              <PortfolioDashboard />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartVisualization asset={selectedAsset} />
                <TradingSignals asset={selectedAsset} />
              </div>
              <AIInsights asset={selectedAsset} />
            </>
          )}

          {activeTab === 'charts' && (
            <div className="grid grid-cols-1 gap-6">
              <ChartVisualization asset={selectedAsset} fullSize />
              <AIInsights asset={selectedAsset} />
            </div>
          )}

          {activeTab === 'signals' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TradingSignals asset={selectedAsset} />
              <AIInsights asset={selectedAsset} />
            </div>
          )}

          {activeTab === 'analysis' && (
            <>
              <MarketAnalysis asset={selectedAsset} />
              <AIInsights asset={selectedAsset} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}
