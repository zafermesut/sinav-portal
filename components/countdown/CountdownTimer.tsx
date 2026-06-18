'use client'

import { useEffect, useState, useRef } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

interface CountdownTimerProps {
  targetDate: string
  targetTime: string
  themeColor: string
  expiredMessage: string
}

function calculateTimeLeft(targetDate: string, targetTime: string): TimeLeft {
  const [hours, minutes] = targetTime.split(':').map(Number)
  const target = new Date(targetDate)
  target.setHours(hours, minutes, 0, 0)

  const now = new Date()
  const diff = target.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    expired: false,
  }
}

function TimeUnit({
  value,
  label,
  themeColor,
}: {
  value: number
  label: string
  themeColor: string
}) {
  const [prevValue, setPrevValue] = useState(value)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (value !== prevValue) {
      setAnimating(true)
      const t = setTimeout(() => {
        setPrevValue(value)
        setAnimating(false)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [value, prevValue])

  const formatted = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div
        className="relative w-20 h-24 sm:w-28 sm:h-32 md:w-36 md:h-44 lg:w-40 lg:h-48 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)`,
          border: `1px solid rgba(255,255,255,0.12)`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
        }}
      >
        {/* Glass reflection */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Center divider line */}
        <div
          className="absolute left-0 right-0 top-1/2 h-px"
          style={{ background: `rgba(0,0,0,0.4)`, transform: 'translateY(-50%)' }}
        />

        {/* Number */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            animating ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          }`}
        >
          <span
            className="font-black tabular-nums select-none"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: '#ffffff',
              textShadow: `0 0 40px ${themeColor}80`,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatted}
          </span>
        </div>

        {/* Glow dot */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: themeColor, boxShadow: `0 0 8px ${themeColor}` }}
        />
      </div>

      <span
        className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function CountdownTimer({
  targetDate,
  targetTime,
  themeColor,
  expiredMessage,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate, targetTime),
  )
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate, targetTime))
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [targetDate, targetTime])

  if (timeLeft.expired) {
    return (
      <div className="flex flex-col items-center gap-6 py-12 animate-fade-in">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: `${themeColor}20`, border: `2px solid ${themeColor}60` }}
        >
          <span className="text-4xl">🎉</span>
        </div>
        <p
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
          style={{ color: themeColor }}
        >
          {expiredMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="flex items-end gap-3 sm:gap-4 md:gap-6 lg:gap-8">
      <TimeUnit value={timeLeft.days} label="Gün" themeColor={themeColor} />
      <Separator themeColor={themeColor} />
      <TimeUnit value={timeLeft.hours} label="Saat" themeColor={themeColor} />
      <Separator themeColor={themeColor} />
      <TimeUnit value={timeLeft.minutes} label="Dakika" themeColor={themeColor} />
      <Separator themeColor={themeColor} />
      <TimeUnit value={timeLeft.seconds} label="Saniye" themeColor={themeColor} />
    </div>
  )
}

function Separator({ themeColor }: { themeColor: string }) {
  return (
    <div className="flex flex-col gap-3 pb-10 sm:pb-12">
      <div
        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse"
        style={{ background: themeColor, boxShadow: `0 0 10px ${themeColor}` }}
      />
      <div
        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse"
        style={{
          background: themeColor,
          boxShadow: `0 0 10px ${themeColor}`,
          animationDelay: '0.5s',
        }}
      />
    </div>
  )
}
