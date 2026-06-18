import type { CollectionConfig } from 'payload'

export const ExamResults: CollectionConfig = {
  slug: 'exam-results',
  admin: {
    useAsTitle: 'title',
    description: 'Sınav sonuçlarını buradan yönetin.',
    defaultColumns: ['title', 'publishDate', 'active', 'updatedAt'],
    group: 'İçerik',
  },
  labels: {
    singular: 'Sınav Sonucu',
    plural: 'Sınav Sonuçları',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Başlık',
      required: true,
      admin: {
        description: 'Sınav sonuçlarının başlığı (örn. "2024 Üniversite Sınavı Sonuçları")',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Alt Başlık',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama',
      admin: {
        description: 'Sonuçlar hakkında genel bilgi',
      },
    },
    {
      name: 'resultImage',
      type: 'upload',
      label: 'Sonuç Görseli (PNG/JPG)',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Sınav sonuç listesi görseli (yüksek çözünürlüklü)',
      },
    },
    {
      name: 'resultExcel',
      type: 'upload',
      label: 'Sonuç Excel Dosyası (XLSX)',
      relationTo: 'media',
      admin: {
        description: 'İndirilebilir Excel dosyası (opsiyonel)',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Arka Plan Görseli',
      relationTo: 'media',
    },
    {
      name: 'publishDate',
      type: 'date',
      label: 'Yayın Tarihi',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktif',
      defaultValue: false,
      admin: {
        description: 'Bu sonucu aktif et (Site Ayarları\'nda Sınav Sonuçları seçiliyken görünür)',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
