// CarFacTycoon: texts come from the game's store listing (fastlane/metadata/android) and its
// privacy policy (public/privacy.html) in the CarFacTycoon repository.

const googlePolicy = 'https://policies.google.com/privacy';
const googlePartners = 'https://policies.google.com/technologies/partner-sites';

export default {
  slug: 'carfactycoon',
  name: 'CarFacTycoon',
  appId: 'io.github.ozdoganosman.carfactycoon',
  // Colours of the game's own screens (project page header) and its slab on the home page.
  theme: { accent: '#b8492f', ink: '#fbf7ef', surface: '#26241f' },
  slab: { light: '#fbe3d3', dark: '#3a2820' },
  // Play-dough illustration from art/scenes.mjs.
  art: 'car',
  links: {
    // Set live: true once the game is public on Google Play; until then the button reads "Coming soon".
    googlePlay: { url: 'https://play.google.com/store/apps/details?id=io.github.ozdoganosman.carfactycoon', live: false },
    web: null,
  },
  // schema.org category, for search engines.
  schemaCategory: 'GameApplication',
  platforms: ['android'],
  languageNames: ['English', 'Türkçe', 'Deutsch', 'Español', 'हिन्दी', 'العربية'],
  screenshotCount: 6,

  en: {
    kind: 'Tycoon game',
    tagline: 'America, 1900: design your cars, build the factory, grow state by state.',
    learn: [
      'How a four-stroke engine works: compression, knock and firing order',
      'Reading a torque curve and choosing a cylinder layout',
      'Mass production: presses, bottlenecks, night shifts and the moving line',
      'Running a public company: shares, dividends and a board that wants growth',
      'Car history from 1900 to 1960, the 1929 crash included',
    ],
    summary:
      'Start with a small workshop, a handful of engineers and a little money. Your goal: one of the country’s great car makers by 1960.',
    intro: [
      'America, 1900. A small workshop, a handful of engineers and a little money. Every model is a project: you design it, develop it, test it, build it and sell it. Get it right and the brand grows; get it wrong and there are recalls and bankruptcy.',
      'Research the real technologies of the era and live through the war years and the 1929 crash. Period newspapers announce every breakthrough, and “why does it work like this?” cards teach real automotive engineering as you play.',
    ],
    features: [
      { title: 'Design part by part', text: 'Body, chassis, suspension, gearbox and an engine you tune cylinder by cylinder. Raise the compression, listen for knock, watch the torque curve change.' },
      { title: 'Hear your engine', text: 'Every engine you design has its own voice. Rev it to the redline.' },
      { title: 'Test before launch', text: 'Find hidden flaws in your prototypes. On launch day the magazines rate your car and owners write letters.' },
      { title: 'Grow state by state', text: 'Look for dealers on a period map, open service shops and see how many of your cars are on the road.' },
      { title: 'Build the factory', text: 'Presses, body, paint and assembly, bottlenecks, night shifts and the moving line.' },
      { title: 'Rivals and the market', text: 'Price wars, cars built to beat yours, mergers and raids on your shares. Go public, and the board wants growth every year.' },
    ],
    screenshots: [
      'Dealer and service map of the United States in 1928',
      'Designing the body of a car, with quality and hidden defects',
      'An inline-four engine with its torque curve',
      'Magazine reviews on launch day',
      'The factory floor with presses, body, paint and assembly',
      'A period newspaper announcing a breakthrough',
    ],
    facts: {
      price: 'Free · Contains ads · Optional purchase to remove ads',
      category: 'Simulation',
    },
    faq: [
      { q: 'Do I need an account or an internet connection?', a: 'No. CarFacTycoon plays offline and needs no account. Your game is saved on your device every quarter.' },
      { q: 'How do I remove ads?', a: 'In the game, open <strong>Settings → Ads → Remove ads</strong>. It is a one-time purchase through Google Play. Optional sponsor ads, which pay your company in the game, stay available if you want them.' },
      { q: 'I changed phones. How do I get “Remove ads” back?', a: 'Sign in to Google Play with the same account, then open <strong>Settings → Ads → Restore purchase</strong>.' },
      { q: 'How do I change my ad consent?', a: 'Open <strong>Settings → Ads → Ad privacy options</strong>. You can also reset or delete your advertising ID in Android’s settings.' },
      { q: 'How do I stop sharing or delete the data I sent?', a: 'Open <strong>Feedback</strong> in the game menu and choose <strong>Turn off automatic sharing</strong> or <strong>Delete the data I sent</strong>. See the <a href="{privacy}#delete">privacy policy</a> for details.' },
    ],
  },

  tr: {
    kind: 'Tycoon oyunu',
    tagline: '1900 Amerika’sı: arabanı tasarla, fabrikanı kur, eyalet eyalet büyü.',
    learn: [
      'Dört zamanlı motor nasıl çalışır: sıkıştırma, vuruntu, ateşleme sırası',
      'Tork eğrisini okumak ve silindir dizilimi seçmek',
      'Seri üretim: pres, darboğaz, gece vardiyası ve yürüyen bant',
      'Halka açık şirket yönetmek: hisse, temettü, büyüme bekleyen yönetim kurulu',
      '1900’den 1960’a otomobil tarihi, 1929 buhranı dahil',
    ],
    summary:
      'Küçük bir atölye, bir avuç mühendis ve biraz parayla başla. Amacın 1960’a kadar ülkenin büyük otomobil markalarından biri olmak.',
    intro: [
      '1900 yılı, Amerika. Küçük bir atölye, bir avuç mühendis ve biraz para. Her model bir proje: tasarlıyorsun, geliştiriyorsun, test ediyorsun, üretiyorsun, satıyorsun. Başarırsan marka büyüyor; hata yaparsan geri çağırmalar ve iflas var.',
      'Dönemin gerçek teknolojilerini araştır, savaş yıllarını ve 1929 buhranını atlat. Gazeteler her yeniliği manşetten duyurur; “neden böyle çalışıyor?” kartlarıyla oynarken gerçek otomobil mühendisliğini öğrenirsin.',
    ],
    features: [
      { title: 'Parça parça tasarla', text: 'Gövde, şasi, süspansiyon, şanzıman ve silindir silindir motor. Sıkıştırmayı artır, vuruntuyu dinle, tork eğrisinin değiştiğini gör.' },
      { title: 'Motorunu dinle', text: 'Tasarladığın her motorun kendi sesi var. Kırmızı çizgiye kadar gaz ver.' },
      { title: 'Lansmandan önce test et', text: 'Prototiplerdeki gizli kusurları bul. Lansman günü dergiler arabanı puanlar, alıcılar mektup yazar.' },
      { title: 'Eyalet eyalet büyü', text: 'Dönem haritasında bayi ara, servis atölyesi aç, yollardaki arabalarını gör.' },
      { title: 'Fabrikanı kur', text: 'Pres, gövde, boya ve montaj; darboğazlar, gece vardiyası ve yürüyen bant.' },
      { title: 'Rakipler ve borsa', text: 'Fiyat savaşları, sana karşı yapılmış modeller, birleşmeler, hisse baskınları. Borsaya açıl; yönetim kurulu her yıl büyüme ister.' },
    ],
    screenshots: [
      '1928’de Amerika’nın bayi ve servis haritası',
      'Kalite ve gizli kusurlarla araba gövdesi tasarımı',
      'Tork eğrisiyle birlikte dört silindirli sıra motor',
      'Lansman günü dergi puanları',
      'Pres, gövde, boya ve montaj istasyonlarıyla fabrika',
      'Bir yeniliği duyuran dönem gazetesi',
    ],
    facts: {
      price: 'Ücretsiz · Reklam içerir · Reklamları kaldırmak için isteğe bağlı satın alma',
      category: 'Simülasyon',
    },
    faq: [
      { q: 'Hesap ya da internet gerekiyor mu?', a: 'Hayır. CarFacTycoon internetsiz oynanır ve hesap gerektirmez. Oyunun her çeyrekte cihazına kaydedilir.' },
      { q: 'Reklamları nasıl kaldırırım?', a: 'Oyunda <strong>Ayarlar → Reklamlar → Reklamları kaldır</strong>. Google Play üzerinden tek seferlik bir satın almadır. Şirketine para kazandıran isteğe bağlı sponsor reklamları istersen yine izlenebilir.' },
      { q: 'Telefon değiştirdim. “Reklamları kaldır”ı nasıl geri alırım?', a: 'Google Play’e aynı hesapla giriş yap, sonra <strong>Ayarlar → Reklamlar → Satın alımı geri yükle</strong>.' },
      { q: 'Reklam iznimi nasıl değiştiririm?', a: '<strong>Ayarlar → Reklamlar → Reklam gizlilik seçenekleri</strong>. Reklam kimliğini Android ayarlarından da sıfırlayabilir ya da silebilirsin.' },
      { q: 'Paylaşımı nasıl kapatırım, gönderdiğim verileri nasıl silerim?', a: 'Oyun menüsünde <strong>Geri bildirim</strong>’i aç; <strong>Otomatik paylaşımı kapat</strong> ya da <strong>Gönderdiğim verileri sil</strong>’i seç. Ayrıntılar <a href="{privacy}#delete">gizlilik politikasında</a>.' },
    ],
  },

  privacy: {
    updated: '2026-09-29',
    en: (email) => [
      {
        id: 'summary',
        title: 'In short',
        html: `
          <p>CarFacTycoon is developed and published by Toyquaise. The game sends nothing to the developer without your permission. If you choose <strong>Share</strong> when the game asks whether you want to share your game with the developer, the information below is collected to fix and improve the game. You can turn this off at any time and delete what you sent from inside the game.</p>
          <p>The Android app shows ads; they are served by Google (AdMob), which processes some device information to do so (see <a href="#ads">Ads and purchases</a>). The version played in a browser has no ads.</p>`,
      },
      {
        id: 'collected',
        title: 'What is collected (only with your permission)',
        html: `
          <ul>
            <li><strong>Your saved games:</strong> the whole game (the cars you design, your decisions, sales, errors that occur in the game), the company name you choose and notes you write to the developer.</li>
            <li><strong>Gameplay information:</strong> the screens you visit, the buttons you tap, key decisions, year-end results, game errors and a recording of the game screen. Text fields are masked in recordings.</li>
            <li><strong>Technical information:</strong> device and browser type, operating system, screen size, language and an approximate location (country, city) derived from your connection.</li>
            <li><strong>A random player number:</strong> assigned to your device; it does not identify you as a person and only links games played on the same device.</li>
          </ul>`,
      },
      {
        id: 'not-collected',
        title: 'What is not collected',
        html: `<p>The developer does not collect your name, email, phone number, contacts, photos, precise location or advertising ID. No account is needed.</p>`,
      },
      {
        id: 'use',
        title: 'How it is used',
        html: `<p>Only to fix, balance and improve the game. The game data you share is not sold, not used for advertising and not shared with anyone.</p>`,
      },
      {
        id: 'ads',
        title: 'Ads and purchases (Android app)',
        html: `
          <ul>
            <li>The app shows ads through Google AdMob: optional rewarded ads (sponsor money), a year-end ad, full-screen ads at natural breaks in the game and an advertisement in the newspaper. To serve and measure ads and to prevent fraud, Google processes your device’s advertising ID, IP address and the approximate location derived from it, device and app information and your interactions with ads. The developer does not see this data; it is subject to Google’s <a href="${googlePolicy}">privacy policy</a> and <a href="${googlePartners}">how Google uses information from partner sites and apps</a>.</li>
            <li>In the European Economic Area, the UK and Switzerland (and wherever the law requires it), Google’s consent message appears before any ad; you may refuse personalised ads. You can change your choice in the game under <strong>Settings → Ads → Ad privacy options</strong>. You can reset or delete your advertising ID in Android’s settings.</li>
            <li><strong>Remove ads</strong> is a one-time purchase paid through Google Play. The developer receives no payment details; the app only learns from Google Play that the purchase was made.</li>
          </ul>`,
      },
      {
        id: 'storage',
        title: 'Where and how long it is kept',
        html: `
          <ul>
            <li>Saved games are stored with Supabase on servers in the European Union (Frankfurt).</li>
            <li>Gameplay information is stored with PostHog on servers in the European Union.</li>
            <li>All connections are encrypted (HTTPS).</li>
            <li>Saved games are kept for at most 24 months and then deleted automatically. Gameplay information is kept for PostHog’s retention period (at most 24 months).</li>
          </ul>`,
      },
      {
        id: 'delete',
        title: 'Your rights and deleting your data',
        html: `
          <ul>
            <li><strong>To stop sharing:</strong> in the game, <strong>Feedback → Turn off automatic sharing</strong>.</li>
            <li><strong>To delete what you sent:</strong> in the game, <strong>Feedback → Delete the data I sent</strong>. Your saved games and notes are deleted at once; your gameplay information is marked for deletion and deleted within 30 days.</li>
            <li>For access, correction or any other question, contact us at the address below. Your rights under the GDPR and the Turkish KVKK are reserved.</li>
          </ul>`,
      },
      {
        id: 'children',
        title: 'Children',
        html: `<p>The game is not directed at children under 13 and does not knowingly collect data from them.</p>`,
      },
      {
        id: 'changes',
        title: 'Changes',
        html: `<p>If this policy changes, the new version is published on this page with a new date.</p>`,
      },
      {
        id: 'contact',
        title: 'Contact',
        html: `<p>Leave a note from the in-game <strong>Feedback</strong> window, or email <a href="mailto:${email}">${email}</a>.</p>`,
      },
    ],
    tr: (email) => [
      {
        id: 'summary',
        title: 'Kısaca',
        html: `
          <p>CarFacTycoon, Toyquaise tarafından geliştirilir ve yayımlanır. Oyun, sen izin vermeden geliştiriciye hiçbir veri göndermez. Oyunun içindeki “Oyununu geliştiriciyle paylaşır mısın?” sorusuna <strong>Paylaş</strong> dersen, oyunu düzeltmek ve geliştirmek için aşağıdaki bilgiler toplanır. Bu izni istediğin an kapatabilir, gönderdiklerini oyunun içinden silebilirsin.</p>
          <p>Android uygulaması reklam gösterir; reklamları Google (AdMob) sunar ve bunun için Google bazı cihaz bilgilerini işler (bkz. <a href="#ads">Reklamlar ve satın alma</a>). Tarayıcıda oynanan sürümde reklam yoktur.</p>`,
      },
      {
        id: 'collected',
        title: 'Neler toplanır (yalnızca izin verirsen)',
        html: `
          <ul>
            <li><strong>Oyun kayıtların:</strong> oyunun tamamı (tasarladığın arabalar, kararların, satışların, oyunda oluşan hatalar), şirketine verdiğin ad ve geliştiriciye yazdığın notlar.</li>
            <li><strong>Oynanış bilgileri:</strong> hangi ekranlara girdiğin, dokunduğun düğmeler, önemli kararların, yıl sonu sonuçların, oyun hataları ve oyun ekranının kaydı. Kayıtlarda yazı alanları gizlenir.</li>
            <li><strong>Teknik bilgiler:</strong> cihaz ve tarayıcı türü, işletim sistemi, ekran boyutu, dil ayarı ve bağlantından çıkarılan yaklaşık konum (ülke, şehir).</li>
            <li><strong>Rastgele bir oyuncu numarası:</strong> cihazına verilen, seni kişi olarak tanımlamayan bir numara; aynı cihazdaki oyunları birbirine bağlamaya yarar.</li>
          </ul>`,
      },
      {
        id: 'not-collected',
        title: 'Neler toplanmaz',
        html: `<p>Geliştirici adını, e-postanı, telefon numaranı, rehberini, fotoğraflarını, kesin konumunu ya da reklam kimliğini toplamaz. Hesap açman gerekmez.</p>`,
      },
      {
        id: 'use',
        title: 'Ne için kullanılır',
        html: `<p>Yalnızca oyunu düzeltmek, dengelemek ve geliştirmek için: hataları bulmak, nerede zorlandığını ya da sıkıldığını görmek. Paylaştığın oyun verileri satılmaz, reklam için kullanılmaz ve kimseyle paylaşılmaz.</p>`,
      },
      {
        id: 'ads',
        title: 'Reklamlar ve satın alma (Android uygulaması)',
        html: `
          <ul>
            <li>Uygulama Google AdMob ile reklam gösterir: isteğe bağlı ödüllü reklamlar (sponsor parası), yıl sonu reklamı, oyunun doğal aralarında tam ekran reklamlar ve gazetede bir ilan. Reklamları göstermek, ölçmek ve kötüye kullanımı önlemek için Google cihazının reklam kimliğini, IP adresini ve ondan çıkan yaklaşık konumu, cihaz ve uygulama bilgilerini ve reklamlarla etkileşimini işler. Bu verileri geliştirici görmez; Google’ın <a href="${googlePolicy}">gizlilik politikasına</a> ve <a href="${googlePartners}">ortak sitelerde veri kullanımına</a> tabidir.</li>
            <li>Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre’de (ve yasanın gerektirdiği başka yerlerde) reklamlardan önce Google’ın onay penceresi açılır; kişiselleştirilmiş reklamlara izin vermeyebilirsin. Seçimini oyunda <strong>Ayarlar → Reklamlar → Reklam gizlilik seçenekleri</strong>’nden değiştirebilirsin. Reklam kimliğini Android ayarlarından sıfırlayabilir ya da silebilirsin.</li>
            <li><strong>Reklamları kaldır</strong> tek seferlik bir satın almadır ve ödemeyi Google Play alır. Geliştiriciye ödeme bilgilerin gelmez; uygulama yalnızca Google Play’den satın almanın yapıldığını öğrenir.</li>
          </ul>`,
      },
      {
        id: 'storage',
        title: 'Nerede ve ne kadar saklanır',
        html: `
          <ul>
            <li>Oyun kayıtları Supabase üzerinde, Avrupa Birliği’ndeki (Frankfurt) sunucularda tutulur.</li>
            <li>Oynanış bilgileri PostHog’un Avrupa Birliği sunucularında tutulur.</li>
            <li>Tüm bağlantılar şifrelidir (HTTPS).</li>
            <li>Oyun kayıtları en fazla 24 ay saklanır, sonra kendiliğinden silinir. Oynanış bilgileri PostHog’un saklama süresi boyunca (en fazla 24 ay) tutulur.</li>
          </ul>`,
      },
      {
        id: 'delete',
        title: 'Hakların ve verilerini silme',
        html: `
          <ul>
            <li><strong>Paylaşımı kapatmak için:</strong> oyunda <strong>Geri bildirim → Otomatik paylaşımı kapat</strong>.</li>
            <li><strong>Gönderdiklerini silmek için:</strong> oyunda <strong>Geri bildirim → Gönderdiğim verileri sil</strong>. Oyun kayıtların ve notların hemen silinir; oynanış bilgilerin de silinmek üzere işaretlenir ve en geç 30 gün içinde silinir.</li>
            <li>Verilerine erişmek, düzeltmek ya da başka bir soru için aşağıdaki adresten bize ulaşabilirsin. KVKK ve GDPR kapsamındaki tüm hakların saklıdır.</li>
          </ul>`,
      },
      {
        id: 'children',
        title: 'Çocuklar',
        html: `<p>Oyun 13 yaş altındaki çocuklara yönelik değildir ve onlardan bilerek veri toplamaz.</p>`,
      },
      {
        id: 'changes',
        title: 'Değişiklikler',
        html: `<p>Bu politika değişirse güncel hali bu sayfada yayımlanır ve yukarıdaki tarih yenilenir.</p>`,
      },
      {
        id: 'contact',
        title: 'İletişim',
        html: `<p>Oyunun içindeki <strong>Geri bildirim</strong> penceresinden not bırakabilir ya da <a href="mailto:${email}">${email}</a> adresine e-posta gönderebilirsin.</p>`,
      },
    ],
  },
};
