# toyquaise.com

Toyquaise stüdyosunun web sitesi: Google Play (ve ileride App Store) gibi mağazalarda geliştirici
kimliği olarak gösterilen resmi site. Oyunları ve uygulamaları tanıtır, her birinin gizlilik
politikasını ve destek sayfasını barındırır.

Site İngilizce (kök adres) ve Türkçedir (`/tr/`). Bağımlılığı yoktur; yalnızca Node.js gerekir.

## Sayfalar

| Adres | İçerik |
|---|---|
| `/` · `/tr/` | Ana sayfa: stüdyo, oyunlar ve uygulamalar, hakkında, iletişim |
| `/carfactycoon/` · `/rapidreader/` | Proje sayfası: özellikler, ekran görüntüleri, bilgiler, mağaza bağlantıları |
| `/carfactycoon/privacy/` · `/rapidreader/privacy/` | Uygulamanın gizlilik politikası |
| `/privacy/` | Tüm gizlilik politikaları ve sitenin kendi gizlilik notu |
| `/support/` | Destek: e-posta ve uygulama başına sık sorulan sorular |
| `/app-ads.txt` | AdMob yetkili satıcı dosyası (kök alan adında durmak zorunda) |

Türkçe sürümler aynı adreslerin başına `/tr` eklenmiş hâlidir (ör. `/tr/rapidreader/privacy/`).

## Çalıştırma

```bash
npm run dev       # http://localhost:4321, dosya değişince yeniden derler
npm run build     # dist/ klasörüne derler ve kırık iç bağlantı varsa hata verir
```

## Nerede ne var

```
src/site.mjs                 Stüdyo adı, alan adı, iletişim e-postası, AdMob yayıncı kimliği
src/i18n.mjs                 Sayfalardaki ortak metinler (İngilizce ve Türkçe)
src/projects/<proje>.mjs     Her projenin metinleri, SSS'si ve gizlilik politikası
src/projects/index.mjs       Sitede gösterilen projeler ve sıraları
src/pages.mjs                Sayfa şablonları
src/styles.css               Tüm stil (açık ve koyu tema)
public/                      Olduğu gibi kopyalanan dosyalar: görseller, yazı tipleri, app-ads.txt, CNAME
scripts/build.mjs            Derleyici ve bağlantı denetimi
```

### Sık yapılacak değişiklikler

- **Uygulama Google Play'de yayına girdi:** ilgili `src/projects/<proje>.mjs` dosyasında
  `googlePlay: { ..., live: false }` değerini `true` yap. "Yakında Google Play'de" yazısı
  mağaza bağlantısına dönüşür.
- **İletişim e-postası:** `src/site.mjs` içindeki `email`. Tüm sayfalar ve gizlilik
  politikaları bunu kullanır.
- **Gizlilik politikası değişti:** projenin dosyasındaki `privacy` bölümünü düzenle ve
  `updated` tarihini yenile.
- **Yeni proje:** `src/projects/` altına mevcut bir dosyanın kopyasını ekle, `index.mjs`'teki
  listeye yaz, görselleri `public/img/<slug>/` altına koy:
  `icon.webp` (256×256), `en/` ve `tr/` klasörlerinde `feature.webp` ve `feature.jpg`
  (1024×500, mağazadaki öne çıkan görsel) ile `shot-1.webp`, `shot-2.webp`… (540×960).

## Yayınlama (GitHub Pages)

`main` dalına her gönderimde `.github/workflows/deploy.yml` siteyi derleyip GitHub Pages'e
yayınlar. Bir kez yapılacaklar:

1. GitHub → bu repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Alan adını satın aldığın yerin DNS ayarlarına şu kayıtları ekle:

   | Tür | Ad | Değer |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `ozdoganosman.github.io` |

3. **Settings → Pages → Custom domain:** `toyquaise.com` yazıp kaydet. DNS yayıldıktan sonra
   (birkaç dakika ile birkaç saat) **Enforce HTTPS** kutusunu işaretle.
4. Önerilir: GitHub → profil **Settings → Pages → Add a domain** ile `toyquaise.com`'u
   doğrula; başkası alan adını kendi GitHub sayfasına bağlayamaz.

## Mağazalarda kullanılacak adresler

**Google Play Console**

- **Geliştirici adı** (Ayarlar → Geliştirici hesabı → Hesap ayrıntıları): `Toyquaise`
- **Web sitesi** (Mağaza varlığı → Mağaza ayarları → Mağaza girişi iletişim bilgileri):
  `https://toyquaise.com`. AdMob `app-ads.txt` dosyasını bu adresin kökünde arar;
  dosya `https://toyquaise.com/app-ads.txt` adresinde hazır.
- **E-posta:** `src/site.mjs` içindeki adres.
- **Gizlilik politikası** (Politika → Uygulama içeriği):
  - CarFacTycoon: `https://toyquaise.com/carfactycoon/privacy/`
  - RapidReader: `https://toyquaise.com/rapidreader/privacy/`

  Türkçe mağaza sayfası için `/tr/` ile başlayan adresler kullanılabilir.

**App Store Connect** (ileride): Support URL `https://toyquaise.com/support/`,
Marketing URL `https://toyquaise.com/<proje>/`, Privacy Policy URL yukarıdakiler.

**AdMob:** Uygulamalar → app-ads.txt sekmesi, site yayına girdikten sonra dosyayı birkaç gün
içinde bulur. `public/app-ads.txt` içindeki yayıncı kimliği `src/site.mjs` ile aynı olmalı;
derleme bunu denetler.

## Lisanslar

Yazı tipleri SIL Open Font License 1.1 ile dağıtılır: Bricolage Grotesque ve Inter
(`public/fonts/*-OFL.txt`). Oyun ve uygulama görselleri ile metinleri Toyquaise'e aittir.
