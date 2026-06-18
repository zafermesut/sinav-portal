import type { CollectionConfig } from 'payload'

export const Countdowns: CollectionConfig = {
  slug: 'countdowns',
  admin: {
    useAsTitle: 'title',
    description: 'Geri sayım yayınlarını buradan yönetin.',
    defaultColumns: ['title', 'targetDate', 'active', 'updatedAt'],
    group: 'İçerik',
  },
  labels: {
    singular: 'Geri Sayım',
    plural: 'Geri Sayımlar',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Başlık',
      required: true,
      admin: {
        description: 'Ana başlık metni (örn. "Sınav Sonuçları Açıklanıyor")',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Alt Başlık',
      admin: {
        description: 'Başlığın altında görünen kısa açıklama',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama Metni',
      admin: {
        description: 'Geri sayımın altında görünecek açıklama',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'targetDate',
          type: 'date',
          label: 'Hedef Tarih',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'dd/MM/yyyy',
            },
            width: '50%',
          },
        },
        {
          name: 'targetTime',
          type: 'text',
          label: 'Hedef Saat (SS:DD)',
          required: true,
          defaultValue: '09:00',
          admin: {
            description: 'Format: 09:00, 14:30',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Arka Plan Görseli',
      relationTo: 'media',
      admin: {
        description: 'Geri sayım sayfası arka plan görseli',
      },
    },
    {
      name: 'themeColor',
      type: 'text',
      label: 'Tema Rengi (HEX)',
      defaultValue: '#6366f1',
      admin: {
        description: 'Vurgu rengi, örn. #6366f1 (varsayılan indigo)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'Buton Metni (opsiyonel)',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Buton Linki (opsiyonel)',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'expiredMessage',
      type: 'text',
      label: 'Süre Dolunca Mesajı',
      defaultValue: 'Sonuçlar açıklandı!',
      admin: {
        description: 'Geri sayım sıfıra ulaştığında gösterilecek mesaj',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktif',
      defaultValue: false,
      admin: {
        description: 'Bu geri sayımı aktif et (Site Ayarları\'nda Geri Sayım seçiliyken görünür)',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
