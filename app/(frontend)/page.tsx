import { getPayload } from '@/lib/payload'
import CountdownPage from '@/components/countdown/CountdownPage'
import ExamResultsPage from '@/components/results/ExamResultsPage'
import type { Countdown, ExamResult } from '@/payload-types'
import Link from 'next/link'

export const revalidate = 30 // Revalidate every 30 seconds

export default async function HomePage() {
  let siteSettings = null
  let countdown: Countdown | null = null
  let examResults: ExamResult[] = []

  try {
    const payload = await getPayload()

    siteSettings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 2,
    })

    if (siteSettings?.activeContentType === 'countdown' && siteSettings.activeCountdown) {
      const id =
        typeof siteSettings.activeCountdown === 'object'
          ? siteSettings.activeCountdown.id
          : siteSettings.activeCountdown

      const result = await payload.findByID({
        collection: 'countdowns',
        id,
        depth: 2,
      })
      countdown = result as Countdown
    }

    if (siteSettings?.activeContentType === 'exam-results' && siteSettings.activeExamResult) {
      const selectedResults = Array.isArray(siteSettings.activeExamResult)
        ? siteSettings.activeExamResult
        : [siteSettings.activeExamResult]

      examResults = await Promise.all(
        selectedResults.map(async (selectedResult) => {
          if (typeof selectedResult === 'object') {
            return selectedResult as ExamResult
          }

          const result = await payload.findByID({
            collection: 'exam-results',
            id: selectedResult,
            depth: 2,
          })

          return result as ExamResult
        }),
      )
    }
  } catch (error) {
    console.error('Failed to load site settings:', error)
  }

  // No settings or content configured
  if (!siteSettings) {
    return <SetupPlaceholder />
  }

  if (siteSettings.activeContentType === 'countdown' && countdown) {
    return <CountdownPage countdown={countdown} />
  }

  if (siteSettings.activeContentType === 'exam-results' && examResults.length > 0) {
    return <ExamResultsPage examResults={examResults} />
  }

  return <NoContentPlaceholder contentType={siteSettings.activeContentType} />
}

function SetupPlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080810]">
      <div className="text-center max-w-md px-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}
        >
          <span className="text-3xl">⚙️</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Kurulum Gerekli</h1>
        <p className="text-white/40 text-sm mb-6">
          Site henüz yapılandırılmamış. Lütfen veritabanı bağlantısını kontrol edin ve yönetim
          paneline giriş yapın.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium"
          style={{ background: 'rgba(99,102,241,0.8)', color: 'white' }}
        >
          Yönetim Paneli →
        </Link>
      </div>
    </div>
  )
}

function NoContentPlaceholder({ contentType }: { contentType: string }) {
  const label = contentType === 'countdown' ? 'Geri Sayım' : 'Sınav Sonucu'
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080810]">
      <div className="text-center max-w-md px-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}
        >
          <span className="text-3xl">📋</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">İçerik Bulunamadı</h1>
        <p className="text-white/40 text-sm mb-6">
          Yayın türü <strong className="text-white/60">{label}</strong> olarak seçili, ancak aktif
          bir içerik belirlenmemiş. Lütfen yönetim panelinden bir içerik seçin.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium"
          style={{ background: 'rgba(99,102,241,0.8)', color: 'white' }}
        >
          Yönetim Paneli →
        </Link>
      </div>
    </div>
  )
}
