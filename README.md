# PREDIABE-TR | Mobil Diyabet Takip ve Bilgilendirme Sistemi

## 🎯 Proje Amacı
**PREDIABE-TR**, prediyabet (gizli şeker) tanısı almış veya risk grubundaki bireyler için özel olarak geliştirilmiş kapsamlı bir mobil sağlık asistanıdır. Uygulama, kullanıcıların kan şekeri takibini kolaylaştırmayı, vücut kitle indeksi (BKİ) hesaplamalarını yapabilmelerini, adım sayılarını takip ederek aktif kalmalarını ve sağlıklı yaşam konusunda doğru bilgiye ulaşmalarını hedefler. Tüm bu özellikler, kullanıcı dostu ve erişilebilir bir arayüz ile tek bir çatı altında sunulur.

## 🛠️ Teknik Özellikler

- **Framework**: React Native + Expo (SDK 54+ Güncel Sürüm)
- **Navigasyon**: `@react-navigation/native-stack` ile performanslı ve dinamik sayfa yönetimi.
- **State Yönetimi**: `useState` ve `useEffect` hook'ları ile gerçek zamanlı veri akışı ve reaktif UI güncellemeleri.
- **Platform**: iOS ve Android uyumlu, cross-platform mimari.

## ✅ Uygulanan Challenge Kriterleri

### 🚀 1. Navigasyon (Router & Navigation)
Uygulama içerisinde toplam **7 farklı ekran** arasında kusursuz ve akıcı bir geçiş yapısı kurulmuştur. `Stack Navigator` kullanılarak aşağıdaki ekranlar yönetilmektedir:
- **Ana Sayfa (Home)**: Grid yapısında tüm menülere erişim.
- **BKİ Hesaplama (BKI)**: Kişiselleştirilmiş hesaplama aracı.
- **Adımsayar (StepCounter)**: Günlük aktivite takibi.
- **S.S.S. (Faq)**: Sıkça sorulan sorular ve cevaplar.
- **İletişim (Contact)**: Destek ve iletişim formu.
- **Profil (Profile)**: Kullanıcı bilgileri ve ayarlar.
- **Hakkımızda (About)**: Uygulama vizyonu ve geliştirici bilgileri.

Orijinal tasarımda yer alan "Profil" ve "Hakkımızda" gibi kritik sayfalar profesyonel bir şekilde entegre edilmiştir.

### 📝 2. Veri ve Form Yönetimi
- **Dinamik Hesaplama**: BKİ ekranında kullanıcıdan boy ve kilo verileri alınarak anlık hesaplama yapılır ve sonuç (Zayıf, Normal, Kilolu vb.) kullanıcıya renk kodları ile sunulur.
- **Geçmiş Kaydı (History)**: Yapılan hesaplamalar bir liste (array) içerisinde tutularak kullanıcının geçmiş ölçümlerini görmesi sağlanır (State tabanlı geçici hafıza).
- **Profil Formu**: Profil ekranında `TextInput` bileşenleri ile kullanıcıdan veri girişi alınır ve şifre alanı `secureTextEntry` ile güvenli hale getirilmiştir.

### ⚠️ 3. Hata Yönetimi (Error Handling & Validation)
- **Form Validasyonu**: BKİ ve İletişim formlarında boş bırakılan alanlar için kullanıcıya anlık uyarılar (Alert) verilir.
- **Empty State**: Geçmiş hesaplamalar veya veri listeleri boş olduğunda kullanıcıya "Henüz kayıt bulunmamaktadır" şeklinde bilgilendirici özel tasarımlar gösterilir.
- **Sayısal Giriş Kontrolü**: Boy ve kilo gibi alanlara sadece sayısal değer girilmesi `keyboardType="numeric"` ile zorlanmıştır.

### 🎨 4. UI/UX Tasarım
- **Orijinal Tasarım Dili**: Proje isterlerinde belirtilen **kavisli (rounded) kırmızı header** yapısı tüm sayfalarda tutarlı bir şekilde uygulanmıştır.
- **Kullanıcı Dostu Arayüz**: Ana sayfada anlaşılır ikonlar ve grid menü yapısı kullanılarak erişilebilirlik artırılmıştır.
- **Görsel Zenginlik**: İkonlar (`@expo/vector-icons`), gölgelendirmeler (shadow/elevation) ve uyumlu renk paleti ile modern bir görünüm elde edilmiştir.

## 📦 Kurulum (Installation)

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

2.  **Uygulamayı Başlatın:**
    ```bash
    npx expo start
    ```
    *(Açılan QR kodu telefonunuzdaki Expo Go uygulaması ile taratabilir veya 'w' tuşuna basarak web tarayıcısında, 'a' ile Android emülatörde çalıştırabilirsiniz.)*

## 👨‍💻 Geliştirici Notu
Bu proje geliştirilirken **Clean Code** (Temiz Kod) prensiplerine sadık kalınmıştır. Bileşen tabanlı (Component-Based) mimari benimsenmiş, tekrar eden kod bloklarından kaçınılmış ve her ekran kendi dosyası (`src/screens/`) içerisinde modüler olarak yapılandırılmıştır. Kodun okunabilirliği ve sürdürülebilirliği ön planda tutulmuştur.

---
**Geliştirici**: [Adınız Soyadınız]
**Tarih**: 2024
