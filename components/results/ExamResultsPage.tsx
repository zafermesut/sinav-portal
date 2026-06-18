'use client'

import { useState } from 'react'
import Lightbox from '../ui/Lightbox'
import ExcelViewer from '../ui/ExcelViewer'
import type { ExamResult } from '@/payload-types'

interface ExamResultsPageProps {
  examResult: ExamResult
}

export default function ExamResultsPage({ examResult }: ExamResultsPageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const bgImage =
    examResult.backgroundImage &&
    typeof examResult.backgroundImage === 'object' &&
    'url' in examResult.backgroundImage
      ? (examResult.backgroundImage as { url?: string }).url
      : null

  const resultImage =
    examResult.resultImage &&
    typeof examResult.resultImage === 'object' &&
    'url' in examResult.resultImage
      ? (examResult.resultImage as { url?: string; alt?: string; filename?: string })
      : null

  const excelFile =
    examResult.resultExcel &&
    typeof examResult.resultExcel === 'object' &&
    'url' in examResult.resultExcel
      ? (examResult.resultExcel as { url?: string; filename?: string })
      : null

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        {bgImage ? (
          <>
            <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/80" />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 60%),
                           radial-gradient(ellipse at 70% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 60%),
                           linear-gradient(135deg, #080810 0%, #0d0d1a 50%, #080810 100%)`,
            }}
          />
        )}

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
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex-none pt-16 pb-8 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest mb-6"
            style={{
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#818cf8',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Sonuçlar Yayında
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{ color: '#ffffff' }}
          >
            {examResult.title}
          </h1>

          {examResult.subtitle && (
            <p className="text-lg sm:text-xl font-light mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {examResult.subtitle}
            </p>
          )}

          {examResult.description && (
            <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {examResult.description}
            </p>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 px-4 pb-16 max-w-6xl mx-auto w-full">
          {/* Result image */}
          {resultImage?.url && (
            <div className="mb-8">
              <div
                className="rounded-2xl overflow-hidden cursor-zoom-in relative group"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                }}
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={resultImage.url}
                  alt={resultImage.alt || examResult.title}
                  className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  style={{ maxHeight: '70vh' }}
                />

                {/* Overlay hint */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(0,0,0,0.4)' }}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    Tam Ekran Görüntüle
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mt-3 gap-2">
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  Büyüt / Tam Ekran
                </button>
              </div>
            </div>
          )}

          {/* Excel section */}
          {excelFile?.url && (
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h3
                className="text-base font-semibold mb-4 flex items-center gap-2"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#22c55e' }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                Excel Sonuç Listesi
              </h3>
              <ExcelViewer
                fileUrl={excelFile.url}
                fileName={excelFile.filename || 'sonuclar.xlsx'}
              />
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {resultImage?.url && (
        <Lightbox
          src={resultImage.url}
          alt={resultImage.alt || examResult.title}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}
