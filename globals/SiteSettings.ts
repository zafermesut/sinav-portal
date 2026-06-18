import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Ayarları',
  admin: {
    description: 'Ana sayfada hangi içeriğin gösterileceğini buradan yönetin.',
    group: 'Yönetim',
  },
  fields: [
    {
      name: 'activeContentType',
      type: 'radio',
      label: 'Aktif Yayın Türü',
      required: true,
      defaultValue: 'countdown',
      options: [
        {
          label: '⏱ Geri Sayım',
          value: 'countdown',
        },
        {
          label: '📋 Sınav Sonuçları',
          value: 'exam-results',
        },
      ],
      admin: {
        description:
          'Ana sayfada gösterilecek içerik türünü seçin. Değişiklik anında aktif olur.',
        layout: 'horizontal',
      },
    },
    {
      name: 'activeCountdown',
      type: 'relationship',
      label: 'Aktif Geri Sayım',
      relationTo: 'countdowns',
      admin: {
        description: 'Gösterilecek geri sayımı seçin',
        condition: (data) => data.activeContentType === 'countdown',
      },
    },
    {
      name: 'activeExamResult',
      type: 'relationship',
      label: 'Aktif Sınav Sonuçları',
      relationTo: 'exam-results',
      hasMany: true,
      admin: {
        description: 'Slider içinde gösterilecek sınav sonuçlarını seçin',
        condition: (data) => data.activeContentType === 'exam-results',
      },
    },
    {
      type: 'collapsible',
      label: 'Site Bilgileri',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'siteName',
          type: 'text',
          label: 'Site Adı',
          defaultValue: 'Sınav Portalı',
        },
        {
          name: 'siteDescription',
          type: 'text',
          label: 'Site Açıklaması (SEO)',
          defaultValue: 'Sınav sonuçları ve duyurular için resmi portal',
        },
        {
          name: 'favicon',
          type: 'upload',
          label: 'Favicon',
          relationTo: 'media',
        },
      ],
    },
  ],
}
