'use client'

import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

interface ExcelViewerProps {
  fileUrl: string
  fileName?: string
}

type RowData = (string | number | boolean | null | undefined)[]

export default function ExcelViewer({ fileUrl, fileName }: ExcelViewerProps) {
  const [data, setData] = useState<RowData[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 20

  const loadExcel = async () => {
    if (isVisible) {
      setIsVisible(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(fileUrl)
      const arrayBuffer = await response.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json<RowData>(sheet, { header: 1 })

      if (jsonData.length > 0) {
        setHeaders(jsonData[0].map((h) => String(h ?? '')))
        setData(jsonData.slice(1))
      }
      setIsVisible(true)
    } catch {
      setError('Excel dosyası yüklenirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(data.length / rowsPerPage)
  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={fileUrl}
          download={fileName || 'sonuclar.xlsx'}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
          style={{
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#22c55e',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Excel İndir
        </a>

        <button
          onClick={loadExcel}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#818cf8',
          }}
        >
          {loading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Yükleniyor...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              {isVisible ? 'Tabloyu Gizle' : 'Tabloda Görüntüle'}
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {isVisible && data.length > 0 && (
        <div className="animate-fade-in">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <th
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'rgba(255,255,255,0.4)', minWidth: '40px' }}
                    >
                      #
                    </th>
                    {headers.map((header, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className="transition-colors hover:bg-white/5"
                      style={{
                        borderTop: '1px solid rgba(255,255,255,0.04)',
                        background: rowIdx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        {(currentPage - 1) * rowsPerPage + rowIdx + 1}
                      </td>
                      {headers.map((_, colIdx) => (
                        <td
                          key={colIdx}
                          className="px-4 py-3 whitespace-nowrap"
                          style={{ color: 'rgba(255,255,255,0.75)' }}
                        >
                          {String(row[colIdx] ?? '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Toplam {data.length} kayıt
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg text-xs transition-colors disabled:opacity-30"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                  >
                    ← Önceki
                  </button>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg text-xs transition-colors disabled:opacity-30"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                  >
                    Sonraki →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
