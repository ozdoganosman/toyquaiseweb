// RapidReader: texts come from the app's store listing (store/listing*.md) and its privacy
// policy (web/privacy-policy*.html) in the RapidReader repository.

const googlePolicy = 'https://policies.google.com/privacy';

export default {
  slug: 'rapidreader',
  name: 'RapidReader',
  appId: 'com.rapidreader.rapid_reader',
  // Colours of the app's own screens (project page header) and its slab on the home page.
  theme: { accent: '#f0525a', ink: '#ffffff', surface: '#121212' },
  slab: { light: '#e4e3fa', dark: '#262745' },
  // Play-dough illustration from art/scenes.mjs.
  art: 'books',
  links: {
    // Set live: true once the app is public on Google Play; until then the button reads "Coming soon".
    googlePlay: { url: 'https://play.google.com/store/apps/details?id=com.rapidreader.rapid_reader', live: true },
    web: 'https://ozdoganosman.github.io/RapidReader/',
  },
  // schema.org category, for search engines.
  schemaCategory: 'EducationalApplication',
  platforms: ['android', 'web'],
  languageNames: ['English', 'Türkçe'],
  screenshotCount: 5,

  en: {
    kind: 'Speed reading app',
    tagline: 'Speed read word by word, with guided reading and an easy-on-the-eyes page.',
    learn: [
      'Reading word by word (RSVP) without moving your eyes along the line',
      'The focus letter (ORP) your eye locks onto in every word',
      'Raising your speed step by step, from 100 to 1000 words a minute',
      'Practising on the classics: Dickens, Kafka, Ömer Seyfettin',
      'Guided reading and a dyslexia-friendly font',
    ],
    summary:
      'Words appear one at a time at the centre of the screen, with the focus letter marked in red, so your eyes never travel along the line.',
    intro: [
      'RapidReader shows text word by word (RSVP, rapid serial visual presentation). The focus letter of every word is marked in red and always sits on the same point, so your eyes don’t have to travel along the line: you read faster and stay focused.',
      'Open every chapter the way you like: as speed reading, or as a comfortable page with guided reading, your favourite font and a theme that is easy on the eyes.',
    ],
    features: [
      { title: 'Speed reading', text: '100 to 1000 words per minute, one word at a time or in meaningful groups of 2–3, automatically slower for long words and at the end of sentences.' },
      { title: 'Guided reading', text: 'Read the text as a page while a highlight moves word by word at the speed you choose.' },
      { title: 'Easy on the eyes', text: 'Literata, Merriweather, Lora, the dyslexia-friendly OpenDyslexic and more; light, sepia, gray, dark and night themes, or your own colours.' },
      { title: 'A library in your pocket', text: 'A Tale of Two Cities, The Metamorphosis, stories by Ömer Seyfettin and the Qur’an with its Arabic text.' },
      { title: 'Your own texts', text: 'Type or paste, open TXT, PDF and EPUB files, fetch an article from a web address or send text from other apps with Share.' },
      { title: 'Pick up where you left off', text: 'Your place is saved in every book and chapter; get back to it with one tap on Continue.' },
    ],
    screenshots: [
      'Speed reading: a single word with its focus letter in red',
      'Choosing Speed Reading or Plain Text for a chapter',
      'Guided reading: a highlight moves across the page',
      'Font, text size, theme and colour settings',
      'The home screen with reading speed, Continue and the library',
    ],
    facts: {
      price: 'Free · Contains ads',
      category: 'Education',
    },
    faq: [
      { q: 'Do I need an account?', a: 'No. Your settings, texts and reading position are stored only on your device.' },
      { q: 'Which files can I open?', a: 'TXT, PDF and EPUB. You can also type or paste text, fetch an article from a web address, or send text, links and files to RapidReader from another app’s Share menu on Android.' },
      { q: 'Why can’t the web version open some articles?', a: 'Browser security rules stop most websites from being read by another page. In the web version, copy the article text and paste it instead. The Android app does not have this limit.' },
      { q: 'How do I change my ad consent?', a: 'Open <strong>Settings → Privacy → Ad consent</strong> in the app.' },
      { q: 'How do I change the language?', a: 'RapidReader follows your device language (Turkish or English). To change it, open <strong>Settings → Language</strong>. The library switches with it.' },
    ],
  },

  tr: {
    kind: 'Hızlı okuma uygulaması',
    tagline: 'Kelime kelime hızlı oku; rehberli okuma ve göz yormayan bir sayfayla.',
    learn: [
      'Gözünü satırda gezdirmeden kelime kelime okumak (RSVP)',
      'Gözün her kelimede tutunduğu odak harfi (ORP)',
      'Okuma hızını dakikada 100’den 1000 kelimeye adım adım artırmak',
      'Klasiklerle pratik: Dickens, Kafka, Ömer Seyfettin',
      'Rehberli okuma ve disleksi dostu yazı tipi',
    ],
    summary:
      'Kelimeler ekranın ortasında tek tek belirir, odak harfi kırmızıyla işaretlenir; gözün satır boyunca hiç gezinmez.',
    intro: [
      'RapidReader metni kelime kelime gösterir (RSVP, hızlı seri görsel sunum). Her kelimenin odak harfi kırmızıyla vurgulanır ve hep aynı noktada durur; gözün satır boyunca hareket etmediği için daha hızlı okur, daha kolay odaklanırsın.',
      'Her bölümü istediğin gibi aç: hızlı okuma olarak ya da rehberli okuma, sevdiğin yazı tipi ve göz yormayan bir temayla rahat bir sayfa olarak.',
    ],
    features: [
      { title: 'Hızlı okuma', text: 'Dakikada 100 ile 1000 kelime; kelimeler tek tek ya da anlamlı 2–3’lü gruplar hâlinde, uzun kelimelerde ve cümle sonlarında kendiliğinden yavaşlayarak.' },
      { title: 'Rehberli okuma', text: 'Metni sayfa olarak oku; seçtiğin hızda kelime kelime ilerleyen bir vurgu gözüne yol gösterir.' },
      { title: 'Göz yormayan sayfa', text: 'Literata, Merriweather, Lora, disleksi dostu OpenDyslexic ve daha fazlası; açık, sepya, gri, koyu ve gece temaları ya da kendi renklerin.' },
      { title: 'Cebinde bir kütüphane', text: 'İki Şehrin Hikâyesi, Dönüşüm, Ömer Seyfettin hikâyeleri ve Arapça metniyle Kur’an-ı Kerim.' },
      { title: 'Kendi metinlerin', text: 'Yaz ya da yapıştır; TXT, PDF ve EPUB dosyalarını aç, bir web adresindeki makaleyi getir ya da başka uygulamalardan “Paylaş” ile gönder.' },
      { title: 'Kaldığın yerden devam', text: 'Her kitapta ve bölümde yerin saklanır; ana ekrandaki “Devam Et” ile tek dokunuşla dönersin.' },
    ],
    screenshots: [
      'Hızlı okuma: odak harfi kırmızı olan tek bir kelime',
      'Bir bölüm için Hızlı Okuma ya da Düz Metin seçimi',
      'Rehberli okuma: sayfada ilerleyen vurgu',
      'Yazı tipi, yazı boyutu, tema ve renk ayarları',
      'Okuma hızı, Devam Et ve kütüphaneyle ana ekran',
    ],
    facts: {
      price: 'Ücretsiz · Reklam içerir',
      category: 'Eğitim',
    },
    faq: [
      { q: 'Hesap gerekiyor mu?', a: 'Hayır. Ayarların, metinlerin ve okuma konumun yalnızca cihazında saklanır.' },
      { q: 'Hangi dosyaları açabilirim?', a: 'TXT, PDF ve EPUB. Metni yazabilir ya da yapıştırabilir, bir web adresindeki makaleyi getirebilir, Android’de başka bir uygulamanın “Paylaş” menüsünden metin, bağlantı ya da dosya gönderebilirsin.' },
      { q: 'Web sürümü neden bazı makaleleri açamıyor?', a: 'Tarayıcıların güvenlik kuralları çoğu sitenin başka bir sayfa tarafından okunmasını engeller. Web sürümünde makale metnini kopyalayıp yapıştır. Android uygulamasında bu sınır yoktur.' },
      { q: 'Reklam iznimi nasıl değiştiririm?', a: 'Uygulamada <strong>Ayarlar → Gizlilik → Reklam izinleri</strong>.' },
      { q: 'Dili nasıl değiştiririm?', a: 'RapidReader cihazının dilini (Türkçe ya da İngilizce) izler. Değiştirmek için <strong>Ayarlar → Dil</strong>. Kütüphane de dile göre değişir.' },
    ],
  },

  privacy: {
    updated: '2026-09-29',
    en: (email) => [
      {
        id: 'intro',
        title: 'Introduction',
        html: `<p>Thank you for using RapidReader, developed and published by Toyquaise. We respect your privacy and are committed to protecting your personal data.</p>`,
      },
      {
        id: 'data',
        title: 'Data we keep',
        html: `
          <p>RapidReader keeps the following data:</p>
          <ul>
            <li><strong>Reading settings:</strong> your preferences such as reading speed, font size and chunk size are stored locally on your device.</li>
            <li><strong>Your texts:</strong> the texts you add (typed, imported from a file, pasted from the clipboard, fetched from a web address or received through other apps’ Share menu) are stored locally on your device and are not sent to our servers. The clipboard is only read when you tap “Paste”.</li>
            <li><strong>Reading position:</strong> where you left off in a book is stored only on your device.</li>
          </ul>`,
      },
      {
        id: 'ads',
        title: 'Advertising',
        html: `
          <p>Our app uses the Google AdMob advertising service. Google may use device identifiers and cookies to personalise ads. For Google’s privacy policy, see <a href="${googlePolicy}">${googlePolicy}</a>.</p>
          <p>Users in the European Economic Area, the United Kingdom and Switzerland are shown Google’s consent form when the app opens, and ads are only loaded after that choice. You can change your choice later in the app under <strong>Settings → Privacy → Ad consent</strong>.</p>`,
      },
      {
        id: 'web',
        title: 'Web articles',
        html: `<p>When you open a page with “Web Address” or send a link through the Share menu, the page is downloaded directly from that site. Like with any web request, the site can see technical information such as your IP address, and its own privacy policy applies. The address and the page text are not sent to us.</p>`,
      },
      {
        id: 'sharing',
        title: 'Data sharing',
        html: `<p>We do not share your personal data with third parties. Apart from the advertising and web article services described above, no data leaves your device; all reading data and preferences are stored locally on your device.</p>`,
      },
      {
        id: 'security',
        title: 'Data security',
        html: `<p>Your data is kept in your device’s local storage. No personal data is transferred to our servers. Uninstalling the app deletes everything it stored on your device.</p>`,
      },
      {
        id: 'children',
        title: 'Children’s privacy',
        html: `<p>Our app does not knowingly collect personal information from children under 13.</p>`,
      },
      {
        id: 'changes',
        title: 'Changes',
        html: `<p>We may update this privacy policy from time to time. Changes will be published on this page with a new date.</p>`,
      },
      {
        id: 'contact',
        title: 'Contact',
        html: `<p>If you have questions about this privacy policy, email <a href="mailto:${email}">${email}</a>.</p>`,
      },
    ],
    tr: (email) => [
      {
        id: 'intro',
        title: 'Giriş',
        html: `<p>Toyquaise tarafından geliştirilen ve yayımlanan RapidReader’ı kullandığınız için teşekkür ederiz. Gizliliğinize saygı duyuyor ve kişisel verilerinizi korumayı taahhüt ediyoruz.</p>`,
      },
      {
        id: 'data',
        title: 'Saklanan veriler',
        html: `
          <p>RapidReader aşağıdaki verileri saklar:</p>
          <ul>
            <li><strong>Okuma ayarları:</strong> okuma hızı, yazı boyutu, kelime grubu boyutu gibi tercihleriniz cihazınızda yerel olarak saklanır.</li>
            <li><strong>Metinleriniz:</strong> eklediğiniz metinler (elle yazdığınız, dosyadan, panodan, web adresinden ya da başka uygulamaların Paylaş menüsünden aldığınız metinler) cihazınızda yerel olarak saklanır ve sunucularımıza gönderilmez. Pano yalnızca “Panodan” düğmesine dokunduğunuzda okunur.</li>
            <li><strong>Okuma konumu:</strong> kitaplarda kaldığınız yer yalnızca cihazınızda saklanır.</li>
          </ul>`,
      },
      {
        id: 'ads',
        title: 'Reklam hizmetleri',
        html: `
          <p>Uygulamamız Google AdMob reklam hizmetini kullanmaktadır. Google, reklamları kişiselleştirmek için cihaz tanımlayıcıları ve çerezler kullanabilir. Google’ın gizlilik politikası için: <a href="${googlePolicy}">${googlePolicy}</a></p>
          <p>Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre’deki kullanıcılara uygulama açıldığında Google’ın izin formu gösterilir ve reklamlar ancak bu seçimden sonra yüklenir. Seçiminizi daha sonra uygulamadaki <strong>Ayarlar → Gizlilik → Reklam izinleri</strong> bölümünden değiştirebilirsiniz.</p>`,
      },
      {
        id: 'web',
        title: 'Web makaleleri',
        html: `<p>“Web Adresi” ile bir sayfa açtığınızda ya da Paylaş menüsünden bir bağlantı gönderdiğinizde, sayfa doğrudan o siteden indirilir. Site, her web isteğinde olduğu gibi IP adresiniz gibi teknik bilgileri görebilir ve kendi gizlilik politikasına tabidir. Adres ve sayfa metni bize gönderilmez.</p>`,
      },
      {
        id: 'sharing',
        title: 'Veri paylaşımı',
        html: `<p>Kişisel verilerinizi üçüncü taraflarla paylaşmıyoruz. Yukarıda anlatılan reklam ve web makalesi hizmetleri dışında hiçbir veri cihazınızdan çıkmaz; tüm okuma verileri ve tercihleriniz cihazınızda yerel olarak saklanır.</p>`,
      },
      {
        id: 'security',
        title: 'Veri güvenliği',
        html: `<p>Verileriniz cihazınızın yerel depolama alanında saklanır. Sunucularımıza herhangi bir kişisel veri aktarılmaz. Uygulamayı kaldırdığınızda cihazınızda sakladığı her şey silinir.</p>`,
      },
      {
        id: 'children',
        title: 'Çocukların gizliliği',
        html: `<p>Uygulamamız 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamaz.</p>`,
      },
      {
        id: 'changes',
        title: 'Değişiklikler',
        html: `<p>Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yeni tarihiyle yayımlanır.</p>`,
      },
      {
        id: 'contact',
        title: 'İletişim',
        html: `<p>Bu gizlilik politikası hakkında sorularınız için <a href="mailto:${email}">${email}</a> adresine yazabilirsiniz.</p>`,
      },
    ],
  },
};
