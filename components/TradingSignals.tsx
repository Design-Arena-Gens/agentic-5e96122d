'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

interface TradingSignalsProps {
  asset: string
}

export default function TradingSignals({ asset }: TradingSignalsProps) {
  const [signals, setSignals] = useState<any[]>([])

  useEffect(() => {
    // Generate trading signals
    const generateSignals = () => {
      const signalTypes = ['BUY', 'SELL', 'HOLD']
      const indicators = ['RSI', 'MACD', 'Moving Average', 'Bollinger Bands', 'Volume']
      const newSignals = []

      for (let i = 0; i < 5; i++) {
        const signalType = signalTypes[Math.floor(Math.random() * signalTypes.length)]
        const confidence = Math.floor(Math.random() * 30 + 70)
        const indicator = indicators[Math.floor(Math.random() * indicators.length)]

        newSignals.push({
          id: i,
          type: signalType,
          confidence,
          indicator,
          timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
          reason: generateReason(signalType, indicator)
        })
      }

      return newSignals
    }

    const generateReason = (type: string, indicator: string) => {
      if (type === 'BUY') {
        return `${indicator} indicates oversold conditions with strong buying momentum`
      } else if (type === 'SELL') {
        return `${indicator} shows overbought levels with weakening momentum`
      } else {
        return `${indicator} suggests neutral market conditions, awaiting clearer signals`
      }
    }

    setSignals(generateSignals())
  }, [asset])

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'BUY':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'SELL':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
  }

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'BUY':
        return <TrendingUp className="w-5 h-5" />
      case 'SELL':
        return <TrendingDown className="w-5 h-5" />
      default:
        return <AlertCircle className="w-5 h-5" />
    }
  }

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">AI Trading Signals</h2>
        <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">
          Live
        </div>
      </div>

      <div className="space-y-3">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className={`p-4 rounded-lg border ${getSignalColor(signal.type)} transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getSignalIcon(signal.type)}
                <span className="font-bold text-lg">{signal.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{signal.timestamp}</span>
                <div className="bg-slate-900/50 px-2 py-1 rounded text-sm">
                  {signal.confidence}% confidence
                </div>
              </div>
            </div>

            <div className="text-sm opacity-90 mb-2">
              <span className="font-semibold">Indicator:</span> {signal.indicator}
            </div>

            <p className="text-sm opacity-80">{signal.reason}</p>

            {signal.type !== 'HOLD' && (
              <button
                className={`mt-3 w-full py-2 rounded-lg font-semibold transition-all ${
                  signal.type === 'BUY'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                Execute {signal.type} Order
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Signal Summary */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Signal Distribution</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-green-500/10 p-3 rounded-lg text-center border border-green-500/20">
            <p className="text-2xl font-bold text-green-400">
              {signals.filter(s => s.type === 'BUY').length}
            </p>
            <p className="text-xs text-gray-400 mt-1">Buy Signals</p>
          </div>
          <div className="bg-yellow-500/10 p-3 rounded-lg text-center border border-yellow-500/20">
            <p className="text-2xl font-bold text-yellow-400">
              {signals.filter(s => s.type === 'HOLD').length}
            </p>
            <p className="text-xs text-gray-400 mt-1">Hold Signals</p>
          </div>
          <div className="bg-red-500/10 p-3 rounded-lg text-center border border-red-500/20">
            <p className="text-2xl font-bold text-red-400">
              {signals.filter(s => s.type === 'SELL').length}
            </p>
            <p className="text-xs text-gray-400 mt-1">Sell Signals</p>
          </div>
        </div>
      </div>
    </div>
  )
}
