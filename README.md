# Sınav Portalı — Next.js + Payload CMS

Tek sayfalık, CMS destekli modern web sitesi. Yönetici panelinden birkaç tıkla **Geri Sayım** veya **Sınav Sonuçları** ekranı yayınlanır.

---

## 🚀 Hızlı Başlangıç

### 1. Depoyu Klonla ve Bağımlılıkları Kur

```bash
git clone <repo-url>
cd sinav-portali
npm install
```

### 2. Ortam Değişkenlerini Ayarla

```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenle:

```env
PAYLOAD_SECRET=en-az-32-karakter-guvenli-anahtar
DATABASE_URI=postgresql://user:pass@host/db?sslmode=require
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 3. Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

- **Site:** http://localhost:3000
- **Yönetim Paneli:** http://localhost:3000/admin

---

## ☁️ Ücretsiz Deployment (Vercel + Neon)

### Adım 1 — Neon PostgreSQL

1. [neon.tech](https://neon.tech) → Ücretsiz hesap oluştur
2. Yeni proje oluştur → Connection string kopyala
3. Format: `postgresql://user:pass@host/db?sslmode=require`

### Adım 2 — Vercel

1. [vercel.com](https://vercel.com) → GitHub reposunu import et
2. Environment Variables ekle:
   - `PAYLOAD_SECRET` → Güçlü rastgele string
   - `DATABASE_URI` → Neon connection string
   - `NEXT_PUBLIC_SERVER_URL` → `https://proje-adi.vercel.app`
3. Deploy et

### Adım 3 — İlk Admin Kullanıcısı

Deploy sonrası `https://proje-adi.vercel.app/admin` adresine git ve hesap oluştur.

---

## 📁 Proje Yapısı

```
├── app/
│   ├── (payload)/          # Payload CMS routes
│   │   ├── admin/          # Admin panel
│   │   └── api/            # REST API
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Ana sayfa (CMS'den içerik çeker)
├── collections/
│   ├── Countdowns.ts        # Geri sayım koleksiyonu
│   ├── ExamResults.ts       # Sınav sonuçları koleksiyonu
│   └── Media.ts             # Medya koleksiyonu
├── globals/
│   └── SiteSettings.ts      # Site ayarları (aktif içerik tipi)
├── components/
│   ├── countdown/           # Geri sayım bileşenleri
│   ├── results/             # Sınav sonuçları bileşenleri
│   └── ui/                  # Ortak UI bileşenleri
├── lib/
│   └── payload.ts           # Payload singleton
└── payload.config.ts        # Ana Payload yapılandırması
```

---

## 🎛️ Yönetim Paneli Kullanımı

### Yayın Türünü Değiştirme

1. Admin panel → **Site Ayarları**
2. **Aktif Yayın Türü** → Geri Sayım veya Sınav Sonuçları seç
3. İlgili içeriği **Aktif Geri Sayım** / **Aktif Sınav Sonucu** alanından seç
4. Kaydet — Ana sayfa anında güncellenir (30 sn cache)

### Geri Sayım Ekleme

1. Admin panel → **Geri Sayımlar** → **Yeni Ekle**
2. Başlık, alt başlık, hedef tarih/saat gir
3. Arka plan görseli ve tema rengi (HEX) ekle
4. Süre dolunca mesajını yaz
5. Kaydet

### Sınav Sonucu Ekleme

1. Admin panel → **Sınav Sonuçları** → **Yeni Ekle**
2. Başlık ve açıklama gir
3. **Sonuç Görseli** (PNG/JPG) yükle
4. **Excel Dosyası** (XLSX) yükle (opsiyonel)
5. Kaydet

---

## ✨ Özellikler

- **Canlı geri sayım** — Gün, saat, dakika, saniye
- **Glassmorphism tasarım** — Premium cam efektleri
- **Görsel lightbox** — Tam ekran, zoom, sürükleme
- **Excel görüntüleyici** — Tablo görünümü + indirme
- **Karanlık tema** — Tamamen koyu, modern arayüz
- **Mobil uyumlu** — Tüm ekran boyutlarında mükemmel
- **SEO** — Metadata yönetimi
- **30 sn ISR** — İçerik değişikliği hızla yansır

---

## 🔧 Komutlar

```bash
npm run dev        # Geliştirme sunucusu
npm run build      # Production build
npm run start      # Production sunucu
npm run lint       # Kod denetimi
```

---

## 📝 Notlar

- Medya dosyaları `public/media/` klasörüne kaydedilir
- Vercel'de dosya sistemi kalıcı değildir — büyük projeler için S3/Cloudflare R2 kullan
- 1-2 haftalık kullanım için mevcut yapı yeterlidir
