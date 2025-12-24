'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react'

export default function PortfolioDashboard() {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 125430.50,
    dayChange: 2345.20,
    dayChangePercent: 1.91,
    totalProfit: 25430.50,
    totalProfitPercent: 25.43,
    winRate: 68.5
  })

  const positions = [
    { symbol: 'BTC/USD', amount: 0.5, value: 42500, profit: 5200, profitPercent: 13.92 },
    { symbol: 'ETH/USD', amount: 5, value: 18500, profit: 2100, profitPercent: 12.79 },
    { symbol: 'AAPL', amount: 50, value: 8750, profit: 1250, profitPercent: 16.67 },
    { symbol: 'GOOGL', amount: 30, value: 4200, profit: 450, profitPercent: 12.00 },
  ]

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Portfolio Overview</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Value</p>
              <p className="text-2xl font-bold text-white">
                ${portfolioData.totalValue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-400" />
          </div>
          <div className={`mt-2 text-sm ${portfolioData.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolioData.dayChange >= 0 ? '+' : ''}{portfolioData.dayChangePercent}% today
          </div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Profit</p>
              <p className="text-2xl font-bold text-green-400">
                +${portfolioData.totalProfit.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <div className="mt-2 text-sm text-green-400">
            +{portfolioData.totalProfitPercent}%
          </div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Win Rate</p>
              <p className="text-2xl font-bold text-white">
                {portfolioData.winRate}%
              </p>
            </div>
            <Activity className="w-8 h-8 text-purple-400" />
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Last 30 days
          </div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Positions</p>
              <p className="text-2xl font-bold text-white">
                {positions.length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Across markets
          </div>
        </div>
      </div>

      {/* Positions Table */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Active Positions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-slate-700">
                <th className="pb-2">Asset</th>
                <th className="pb-2 text-right">Amount</th>
                <th className="pb-2 text-right">Value</th>
                <th className="pb-2 text-right">Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.symbol} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                  <td className="py-3 font-medium text-white">{position.symbol}</td>
                  <td className="py-3 text-right text-gray-300">{position.amount}</td>
                  <td className="py-3 text-right text-white">${position.value.toLocaleString()}</td>
                  <td className={`py-3 text-right font-semibold ${position.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    +${position.profit.toLocaleString()} ({position.profitPercent}%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
