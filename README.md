# 🩸 GlucoPredia: Yapay Zeka Destekli Diyabet Yönetim Asistanı

![GlucoPredia Logo](./assets/images/Logo.png)

> **"Sessiz Salgına Karşı Dijital Kalkan"**

**GlucoPredia**, Tip 2 Diyabet riskini erken aşamada tespit etmek, bireyleri bu konuda bilinçlendirmek ve yaşam tarzı değişikliklerini (beslenme, egzersiz, uyku) teşvik ederek diyabetin önlenmesine katkıda bulunmak amacıyla geliştirilmiş, **React Native** tabanlı bir mobil sağlık uygulamasıdır.

Uygulamamız, sadece veri toplayan bir araç değil; kullanıcılarının sağlık verilerini analiz eden, kişiye özel **klinik karar destek raporları** sunan ve sürekli öğrenen bir **sağlık koçudur**.

---

## 🚀 Temel Özellikler (Key Features)

### 🔐 Gelişmiş Kimlik Doğrulama & Güvenlik
*   **Kullanıcı İzolasyonu:** Her kullanıcının verisi (test sonuçları, aktivite geçmişi) tamamen izoledir.
*   **Kalıcı Oturum:** `AsyncStorage` tabanlı mimari sayesinde kullanıcılar uygulamayı kapatsalar bile verileri güvenle saklanır ve oturumları korunur.

### 🧠 Akıllı Soru Bankası (Smart Question Bank)
*   **Dinamik Havuz:** Arka planda **100'den fazla** profesyonel ve akademik sorudan oluşan dev bir havuz bulunur.
*   **Randomizasyon Motoru:** Her test başladığında, **Fisher-Yates Shuffle** algoritması devreye girer ve havuzdan rastgele, benzersiz 20 soru seçer. Bu sayede kullanıcı asla aynı testi çözdüğü hissine kapılmaz.

### 🩺 Klinik Karar Destek Sistemi (CDSS)
*   **Parametrik Analiz:** Kullanıcının **Risk Skoru** (Ön Test) ve **Uyum Skoru** (Son Test) verilerini anlık olarak analiz eder.
*   **4 Farklı Klinik Senaryo:**
    1.  **🟢 Mükemmel Denge:** Risk düşük, uyum yüksek.
    2.  **🟠 Kontrollü Yönetim:** Risk yüksek ama hasta bilinçli.
    3.  **🟡 Gizli Tehdit:** Risk düşük ama yaşam tarzı kötü (Rehavet uyarısı).
    4.  **🔴 KRİTİK DURUM:** Risk yüksek ve uyum düşük (Acil tıbbi müdahale çağrısı).
*   **Detaylı Raporlama:** Her senaryo için özel olarak hazırlanmış, **500+ kelimelik**, akademik referanslı beslenme ve egzersiz reçeteleri sunar.

### ⏳ Zaman Bazlı Veri Yönetimi
*   **Oto-Arşivleme:** Gece yarısı (00:00) olduğunda, uygulama otomatik olarak gün sonu işlemlerini (Daily Batch) çalıştırır. O günkü adım sayısını arşivler ve yeni güne sıfırdan başlatır.
*   **Haftalık Trend Analizi:** Kullanıcıların aktivite geçmişini grafiksel olarak takip etmelerini sağlar.

---

## 🛠️ Teknik Mimari (Tech Stack)

Projemiz, modern mobil uygulama geliştirme standartlarına uygun olarak inşa edilmiştir:

| Teknoloji | Kullanım Amacı |
| :--- | :--- |
| **React Native** | Cross-Platform Mobil Uygulama Geliştirme |
| **Expo SDK** | Hızlı Geliştirme, Build ve Test Süreçleri |
| **Context API** | Global State Management (Kullanıcı verisi, tema, test sonuçları) |
| **React Navigation** | Stack ve Tab tabanlı gelişmiş navigasyon yapısı |
| **AsyncStorage** | Cihaz üzerinde şifreli ve kalıcı veri saklama (Local DB) |
| **Fisher-Yates Algo** | Test sorularının adil ve rastgele dağıtımı için |

---

## 📲 Kurulum Rehberi

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Repoyu Klonlayın:**
    ```bash
    git clone https://github.com/kullaniciadi/GlucoPredia.git
    cd GlucoPredia
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **Uygulamayı Başlatın:**
    ```bash
    npx expo start
    ```

4.  **Test Edin:** Terminalde çıkan QR kodu telefonunuzdaki **Expo Go** uygulamasıyla okutarak veya `a` (Android) / `i` (iOS) tuşlarına basarak emülatörde çalıştırın.

---

## 🎨 Tasarım & Kurumsal Kimlik

Uygulamamız, tıbbi güvenilirliği ve aciliyeti simgeleyen **Kırmızı (#C62828)** ve **Beyaz (#FFFFFF)** renk paleti üzerine kurulmuştur.

*   **Tipografi:** Okunabilirlik ön planda tutulmuş, akademik metinler için serif, arayüz elemanları için modern sans-serif fontlar tercih edilmiştir.
*   **Görsel Hiyerarşi:** Önemli uyarılar ve risk durumları (Yüksek Risk), kullanıcıyı harekete geçirecek renk kodlarıyla (Kırmızı/Turuncu) vurgulanmıştır.

---

## 🎓 Akademik Not: Diyabetle Mücadelede Bilimsel Yaklaşım

GlucoPredia, sadece bir yazılım projesi değil, bir **halk sağlığı girişimidir**.

Tip 2 Diyabet, "önlenebilir" kronik hastalıkların başında gelir. Ancak yapılan araştırmalar, bireylerin kendi risk faktörlerinin farkında olmadıklarını (Diyabetik Farkındalık Eksikliği) göstermektedir. Projemiz, **FINDRISC** (Finlandiya Diyabet Risk Skoru) tabanlı algoritmaları dijitalleştirerek, bu farkındalığı artırmayı hedefler.

Ayrıca, "İlaç Uyumu" (Medication Adherence) ve "Yaşam Tarzı Modifikasyonu" (Lifestyle Modification) kavramlarını oyunlaştırarak (Gamification), hastaların tedavi süreçlerine aktif katılımını sağlar.

---

> *Bu proje, Abdulkahhar Türkoğlu tarafından Mobil Uygulamalar dersi kapsamında geliştirilmiştir.*
> *© 2026 GlucoPredia - Tüm Hakları Saklıdır.*