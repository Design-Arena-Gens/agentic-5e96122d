'use client'

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'

interface ChartVisualizationProps {
  asset: string
  fullSize?: boolean
}

export default function ChartVisualization({ asset, fullSize = false }: ChartVisualizationProps) {
  const [timeframe, setTimeframe] = useState('1D')
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Generate realistic looking price data
    const generateData = () => {
      const basePrice = asset.includes('BTC') ? 85000 : asset.includes('ETH') ? 3700 : 180
      const points = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : 30
      const data = []

      let currentPrice = basePrice
      for (let i = 0; i < points; i++) {
        const volatility = basePrice * 0.02
        const change = (Math.random() - 0.5) * volatility
        currentPrice += change

        data.push({
          time: timeframe === '1D' ? `${i}:00` : `Day ${i + 1}`,
          price: parseFloat(currentPrice.toFixed(2)),
          volume: Math.floor(Math.random() * 10000000 + 5000000)
        })
      }
      return data
    }

    setChartData(generateData())
  }, [asset, timeframe])

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0
  const startPrice = chartData.length > 0 ? chartData[0].price : 0
  const priceChange = currentPrice - startPrice
  const priceChangePercent = startPrice ? ((priceChange / startPrice) * 100).toFixed(2) : '0.00'

  return (
    <div className={`bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm p-6 ${fullSize ? 'col-span-full' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{asset}</h2>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-2xl font-bold text-white">
              ${currentPrice.toLocaleString()}
            </span>
            <span className={`text-sm font-semibold ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChangePercent}%
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {['1D', '1W', '1M'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded ${
                timeframe === tf
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={fullSize ? 500 : 300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#e1e7ef' }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8b5cf6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Technical Indicators */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700">
        <div>
          <p className="text-gray-400 text-sm">24h High</p>
          <p className="text-white font-semibold">${(currentPrice * 1.05).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">24h Low</p>
          <p className="text-white font-semibold">${(currentPrice * 0.95).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">24h Volume</p>
          <p className="text-white font-semibold">${(Math.random() * 100 + 50).toFixed(1)}M</p>
        </div>
      </div>
    </div>
  )
}
