import CountdownTimer from './CountdownTimer'
import type { Countdown } from '@/payload-types'

interface CountdownPageProps {
  countdown: Countdown
}

export default function CountdownPage({ countdown }: CountdownPageProps) {
  const bgImage =
    countdown.backgroundImage &&
    typeof countdown.backgroundImage === 'object' &&
    'url' in countdown.backgroundImage
      ? (countdown.backgroundImage as { url?: string }).url
      : null

  const themeColor = countdown.themeColor || '#6366f1'

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {bgImage ? (
          <>
            <img
              src={bgImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 20% 50%, ${themeColor}25 0%, transparent 60%),
                           radial-gradient(ellipse at 80% 50%, ${themeColor}15 0%, transparent 60%),
                           linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)`,
            }}
          />
        )}

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-float"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                background: themeColor,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 8}s`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12 px-4 py-16 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium uppercase tracking-widest"
          style={{
            background: `${themeColor}15`,
            border: `1px solid ${themeColor}40`,
            color: themeColor,
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: themeColor }}
          />
          Geri Sayım Başladı
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none"
            style={{ color: '#ffffff' }}
          >
            {countdown.title}
          </h1>
          {countdown.subtitle && (
            <p
              className="text-lg sm:text-xl md:text-2xl font-light"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {countdown.subtitle}
            </p>
          )}
        </div>

        {/* Countdown */}
        <CountdownTimer
          targetDate={countdown.targetDate}
          targetTime={countdown.targetTime}
          themeColor={themeColor}
          expiredMessage={countdown.expiredMessage || 'Sonuçlar açıklandı!'}
        />

        {/* Description */}
        {countdown.description && (
          <p
            className="max-w-lg text-sm sm:text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            {countdown.description}
          </p>
        )}

        {/* Button */}
        {countdown.buttonText && countdown.buttonLink && (
          <a
            href={countdown.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:brightness-110"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)`,
              color: '#ffffff',
              boxShadow: `0 8px 32px ${themeColor}40`,
            }}
          >
            {countdown.buttonText}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
      />
    </div>
  )
}
