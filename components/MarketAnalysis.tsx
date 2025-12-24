'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface MarketAnalysisProps {
  asset: string
}

export default function MarketAnalysis({ asset }: MarketAnalysisProps) {
  const [sentimentData, setSentimentData] = useState([
    { name: 'Very Bullish', value: 35, color: '#22c55e' },
    { name: 'Bullish', value: 28, color: '#84cc16' },
    { name: 'Neutral', value: 20, color: '#eab308' },
    { name: 'Bearish', value: 12, color: '#f97316' },
    { name: 'Very Bearish', value: 5, color: '#ef4444' },
  ])

  const [volumeData, setVolumeData] = useState([
    { time: '9:00', volume: 250 },
    { time: '10:00', volume: 420 },
    { time: '11:00', volume: 380 },
    { time: '12:00', volume: 590 },
    { time: '13:00', volume: 480 },
    { time: '14:00', volume: 710 },
    { time: '15:00', volume: 520 },
  ])

  const indicators = [
    { name: 'RSI (14)', value: '67.5', status: 'Neutral', color: 'text-yellow-400' },
    { name: 'MACD', value: '0.85', status: 'Bullish', color: 'text-green-400' },
    { name: 'Moving Avg (50)', value: 'Above', status: 'Bullish', color: 'text-green-400' },
    { name: 'Bollinger Bands', value: 'Mid', status: 'Neutral', color: 'text-yellow-400' },
    { name: 'Volume', value: 'High', status: 'Bullish', color: 'text-green-400' },
    { name: 'Stochastic', value: '72.3', status: 'Overbought', color: 'text-orange-400' },
  ]

  return (
    <div className="space-y-6">
      {/* Technical Indicators */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm p-6">
        <h2 className="text-xl font-bold mb-6 text-white">Technical Indicators - {asset}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {indicators.map((indicator, index) => (
            <div key={index} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <p className="text-gray-400 text-sm mb-1">{indicator.name}</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-white">{indicator.value}</p>
                <span className={`text-sm font-semibold ${indicator.color}`}>
                  {indicator.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Sentiment */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm p-6">
          <h3 className="text-lg font-bold mb-4 text-white">Market Sentiment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">Overall Sentiment</p>
            <p className="text-2xl font-bold text-green-400">Bullish</p>
            <p className="text-sm text-gray-400 mt-1">Based on 10,234 data points</p>
          </div>
        </div>

        {/* Volume Analysis */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm p-6">
          <h3 className="text-lg font-bold mb-4 text-white">Volume Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="volume" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">Average Volume</p>
            <p className="text-2xl font-bold text-white">478M</p>
            <p className="text-sm text-green-400 mt-1">+15.3% above average</p>
          </div>
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm p-6">
        <h3 className="text-lg font-bold mb-4 text-white">Risk Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <p className="text-gray-400 text-sm mb-2">Volatility</p>
            <p className="text-xl font-bold text-orange-400">Medium</p>
            <div className="mt-2 bg-slate-800 rounded-full h-2">
              <div className="bg-orange-400 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <p className="text-gray-400 text-sm mb-2">Liquidity</p>
            <p className="text-xl font-bold text-green-400">High</p>
            <div className="mt-2 bg-slate-800 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <p className="text-gray-400 text-sm mb-2">Risk Score</p>
            <p className="text-xl font-bold text-yellow-400">5.2/10</p>
            <div className="mt-2 bg-slate-800 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '52%' }}></div>
            </div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <p className="text-gray-400 text-sm mb-2">Trend Strength</p>
            <p className="text-xl font-bold text-green-400">Strong</p>
            <div className="mt-2 bg-slate-800 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
