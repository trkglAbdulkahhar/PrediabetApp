export const PRE_TEST_POOL = [
    // Genetics & History (1-10)
    { id: 1, text: "Ailenizde (anne, baba, kardeş) diyabet tanısı almış birey var mı?", riskAnswer: true },
    { id: 2, text: "Daha önce doktorunuz kan şekerinizin sınırda olduğunu söyledi mi?", riskAnswer: true },
    { id: 3, text: "Gebelik döneminde şeker hastalığı (gestasyonel diyabet) geçirdiniz mi?", riskAnswer: true },
    { id: 4, text: "4 kilodan daha ağır bir bebek dünyaya getirdiniz mi?", riskAnswer: true },
    { id: 5, text: "Yüksek tansiyon ilacı kullanıyor musunuz?", riskAnswer: true },
    { id: 6, text: "Kolesterol veya trigliserid değerleriniz yüksek mi?", riskAnswer: true },
    { id: 7, text: "Polikistik Over Sendromu (PKOS) tanısı aldınız mı?", riskAnswer: true },
    { id: 8, text: "Düzenli olarak kortizon içeren ilaç kullanıyor musunuz?", riskAnswer: true },
    { id: 9, text: "Uyku apnesi veya horlama probleminiz var mı?", riskAnswer: true },
    { id: 10, text: "Birinci derece akrabalarınızda erken yaşta kalp hastalığı öyküsü var mı?", riskAnswer: true },

    // Symptoms (11-25)
    { id: 11, text: "Gün içinde sık sık susama hissi yaşıyor musunuz?", riskAnswer: true },
    { id: 12, text: "Geceleri idrara çıkmak için uyanıyor musunuz?", riskAnswer: true },
    { id: 13, text: "Açıklanamayan ani kilo kaybı yaşadınız mı?", riskAnswer: true },
    { id: 14, text: "Yemeklerden sonra üzerinize aşırı bir yorgunluk çöküyor mu?", riskAnswer: true },
    { id: 15, text: "Cilt yaralarınızın iyileşmesi normalden uzun sürüyor mu?", riskAnswer: true },
    { id: 16, text: "Ellerinizde veya ayaklarınızda uyuşma, karıncalanma oluyor mu?", riskAnswer: true },
    { id: 17, text: "Görmenizde bulanıklaşma veya odaklanma sorunu yaşıyor musunuz?", riskAnswer: true },
    { id: 18, text: "Cildinizde kuruma veya kaşıntı şikayetiniz arttı mı?", riskAnswer: true },
    { id: 19, text: "Diş eti problemlerini sık yaşıyor musunuz?", riskAnswer: true },
    { id: 20, text: "Sık sık idrar yolu enfeksiyonu veya mantar enfeksiyonu geçiriyor musunuz?", riskAnswer: true },
    { id: 21, text: "Boyun, koltuk altı veya kasık bölgesinde cilt renginde koyulaşma var mı?", riskAnswer: true },
    { id: 22, text: "Sabahları ağız kuruluğu ile uyanıyor musunuz?", riskAnswer: true },
    { id: 23, text: "Gün içinde ani açlık krizleri yaşıyor musunuz?", riskAnswer: true },
    { id: 24, text: "Sinirlilik veya ani öfke patlamaları (şeker düşmesine bağlı) yaşıyor musunuz?", riskAnswer: true },
    { id: 25, text: "Bacaklarınızda sık sık kramp giriyor mu?", riskAnswer: true },

    // Lifestyle & Habits (26-50)
    { id: 26, text: "Haftada en az 150 dakika orta tempolu yürüyüş/egzersiz yapıyor musunuz?", riskAnswer: false }, // Inverse
    { id: 27, text: "Günde en az 5 porsiyon sebze ve meyve tüketiyor musunuz?", riskAnswer: false }, // Inverse
    { id: 28, text: "Beyaz ekmek ve hamur işlerini haftada 3 günden fazla tüketiyor musunuz?", riskAnswer: true },
    { id: 29, text: "Şekerli ve gazlı içecekleri (kola, hazır meyve suyu) sık tüketir misiniz?", riskAnswer: true },
    { id: 30, text: "Sigara kullanıyor musunuz?", riskAnswer: true },
    { id: 31, text: "Alkol tüketiminiz haftada 2 kadehten fazla mı?", riskAnswer: true },
    { id: 32, text: "Günde 6 saatten az mı uyuyorsunuz?", riskAnswer: true },
    { id: 33, text: "Çok stresli bir yaşam tarzınız veya çalışma ortamınız var mı?", riskAnswer: true },
    { id: 34, text: "Öğünlerinizi düzenli saatlerde yiyor musunuz?", riskAnswer: false }, // Inverse
    { id: 35, text: "Gece geç saatlerde (yatmadan hemen önce) atıştırma alışkanlığınız var mı?", riskAnswer: true },
    { id: 36, text: "Vücut Kitle İndeksiniz (BKİ) 30'un üzerinde mi (Obezite)?", riskAnswer: true },
    { id: 37, text: "Bel çevreniz (Erkek > 102cm, Kadın > 88cm) riskli sınırda mı?", riskAnswer: true },
    { id: 38, text: "Evinizde yemekleri genellikle kızartma yöntemiyle mi pişiriyorsunuz?", riskAnswer: true },
    { id: 39, text: "İşlenmiş et ürünlerini (salam, sosis, sucuk) sık tüketir misiniz?", riskAnswer: true },
    { id: 40, text: "Günlük su tüketiminiz 2 litrenin altında mı?", riskAnswer: true },
    { id: 41, text: "Televizyon veya bilgisayar karşısında günde 4 saatten fazla oturuyor musunuz?", riskAnswer: true },
    { id: 42, text: "Kan şekeri ölçüm cihazınız var ve ara sıra ölçüm yapıyor musunuz?", riskAnswer: false }, // Inverse
    { id: 43, text: "Son 1 yılda doktor kontrolüne gittiniz mi?", riskAnswer: false }, // Inverse
    { id: 44, text: "Ailenizle birlikte sağlıklı beslenme konusunda destekleşiyor musunuz?", riskAnswer: false }, // Inverse
    { id: 45, text: "Hızlı yemek yeme alışkanlığınız var mı?", riskAnswer: true },
    { id: 46, text: "Tuzu yemeklerinize tadına bakmadan ekler misiniz?", riskAnswer: true },
    { id: 47, text: "Kahvaltı öğününü sık sık atlar mısınız?", riskAnswer: true },
    { id: 48, text: "Depresyon veya kaygı bozukluğu için tedavi gördünüz mü?", riskAnswer: true },
    { id: 49, text: "Doymuş yağ oranı yüksek gıdaları (tereyağı, kaymak) sık tüketir misiniz?", riskAnswer: true },
    { id: 50, text: "Kendinizi genel olarak enerjik hissediyor musunuz?", riskAnswer: false }, // Inverse
];

export const POST_TEST_POOL = [
    // Medication & Treatment Adherence (1-10)
    { id: 101, text: "Bu hafta doktorunuzun verdiği ilaçları/insülini hiçbir doz atlamadan kullandınız mı?", riskAnswer: false }, // Inverse
    { id: 102, text: "İlaçlarınızın yan etkileri nedeniyle kullanmayı bıraktığınız oldu mu?", riskAnswer: true },
    { id: 103, text: "Kan şekeri ölçümlerinizi doktorunuzun önerdiği sıklıkta yaptınız mı?", riskAnswer: false }, // Inverse
    { id: 104, text: "Son kontrol randevunuza zamanında gittiniz mi?", riskAnswer: false }, // Inverse
    { id: 105, text: "İlaç saatlerinizi hatırlamakta zorluk çekiyor musunuz?", riskAnswer: true },
    { id: 106, text: "Tansiyonunuzu bu hafta en az bir kez ölçtünüz mü?", riskAnswer: false }, // Inverse
    { id: 107, text: "Ayaklarınızda yara veya mantar kontrolünü her gün yapıyor musunuz?", riskAnswer: false }, // Inverse
    { id: 108, text: "Göz muayenenizi son 1 yıl içinde yaptırdınız mı?", riskAnswer: false }, // Inverse
    { id: 109, text: "Laboratuvar tahlil sonuçlarınızı (HbA1c vb.) takip ediyor musunuz?", riskAnswer: false }, // Inverse
    { id: 110, text: "Hastalığınız hakkında yeterli bilgiye sahip olduğunuzu düşünüyor musunuz?", riskAnswer: false }, // Inverse

    // Diet & Nutrition (11-25)
    { id: 111, text: "Bu hafta öğün atladığınız oldu mu?", riskAnswer: true },
    { id: 112, text: "Haftada 2 kereden fazla tatlı veya hamur işi tükettiniz mi?", riskAnswer: true },
    { id: 113, text: "Günlük su tüketiminize (en az 8-10 bardak) dikkat ettiniz mi?", riskAnswer: false }, // Inverse
    { id: 114, text: "Porsiyon kontrolü yaparak mı besleniyorsunuz?", riskAnswer: false }, // Inverse
    { id: 115, text: "Gece yatmadan önce atıştırma (meyve dahil) yaptınız mı?", riskAnswer: true },
    { id: 116, text: "Yemeklerinizi yavaş yiyip, çok çiğnemeye özen gösterdiniz mi?", riskAnswer: false }, // Inverse
    { id: 117, text: "Haftada en az 2 gün kuru baklagil tükettiniz mi?", riskAnswer: false }, // Inverse
    { id: 118, text: "Beyaz ekmek yerine tam tahıllı ürünleri tercih ettiniz mi?", riskAnswer: false }, // Inverse
    { id: 119, text: "Hazır paketli gıda veya fast-food tükettiniz mi?", riskAnswer: true },
    { id: 120, text: "Yemeklere ekstra tuz ekleme alışkanlığından vazgeçtiniz mi?", riskAnswer: false }, // Inverse
    { id: 121, text: "Meyve tüketiminde porsiyon sınırını aştığınız oldu mu?", riskAnswer: true },
    { id: 122, text: "Alkol tükettiniz mi?", riskAnswer: true },
    { id: 123, text: "Lifli gıdalar (sebze, salata) her ana öğünde tabağınızda var mıydı?", riskAnswer: false }, // Inverse
    { id: 124, text: "Dışarıda yemek yerken sağlıklı seçenekleri tercih edebildiniz mi?", riskAnswer: false }, // Inverse
    { id: 125, text: "Çay veya kahvenizi şekersiz içmeyi başardınız mı?", riskAnswer: false }, // Inverse

    // Physical Activity (26-35)
    { id: 126, text: "Bu hafta toplamda en az 150 dakika yürüyüş yaptınız mı?", riskAnswer: false }, // Inverse
    { id: 127, text: "Asansör yerine merdiven kullanmaya özen gösterdiniz mi?", riskAnswer: false }, // Inverse
    { id: 128, text: "Gün içinde uzun süre (2 saatten fazla) hareketsiz kaldınız mı?", riskAnswer: true },
    { id: 129, text: "Egzersiz yaparken nefes darlığı veya göğüs ağrısı hissetiniz mi?", riskAnswer: true }, // Risk but purely medical
    { id: 130, text: "Düzenli bir egzersiz programınız var mı?", riskAnswer: false }, // Inverse
    { id: 131, text: "Adımsayar hedefinize (örn. 5000-10000 adım) çoğu gün ulaştınız mı?", riskAnswer: false }, // Inverse
    { id: 132, text: "Egzersiz yaptıktan sonra kan şekerinizi ölçtünüz mü?", riskAnswer: false }, // Inverse
    { id: 133, text: "Spor yaparken uygun ayakkabı ve çorap kullandınız mı? (Ayak sağlığı için)", riskAnswer: false }, // Inverse
    { id: 134, text: "Haftada en az 1 gün kas güçlendirici egzersiz (ağırlık, direnç bandı) yaptınız mı?", riskAnswer: false }, // Inverse
    { id: 135, text: "Fiziksel aktiviteyi günlük yaşamınızın bir parçası haline getirebildiniz mi?", riskAnswer: false }, // Inverse

    // Psychology & Well-being (36-50)
    { id: 136, text: "Bu hafta diyabetle başa çıkma konusunda kendinizi tükenmiş hissettiniz mi?", riskAnswer: true },
    { id: 137, text: "Stresli anlarda 'duygusal yeme' (aşırı yeme) atağı yaşadınız mı?", riskAnswer: true },
    { id: 138, text: "Uykunuzu yeterince aldığınızı ve dinlendiğinizi hissediyor musunuz?", riskAnswer: false }, // Inverse
    { id: 139, text: "Hastalığınız nedeniyle sosyal ortamlardan kaçındığınız oldu mu?", riskAnswer: true },
    { id: 140, text: "Tedavinizi sürdürme konusunda ailenizden destek görüyor musunuz?", riskAnswer: false }, // Inverse
    { id: 141, text: "Gelecekle ilgili sağlığınız konusunda yoğun kaygı duyuyor musunuz?", riskAnswer: true },
    { id: 142, text: "Sigara içilen ortamlarda bulundunuz mu veya sigara içtiniz mi?", riskAnswer: true },
    { id: 143, text: "Kendinizi sık sık sinirli veya tahammülsüz hissediyor musunuz?", riskAnswer: true },
    { id: 144, text: "Diyabetin getirdiği yaşam tarzı değişikliklerine uyum sağladığınızı düşünüyor musunuz?", riskAnswer: false }, // Inverse
    { id: 145, text: "Kan şekeri düşüklüğü (hipoglisemi) korkusuyla gereğinden fazla yemek yiyor musunuz?", riskAnswer: true },
    { id: 146, text: "Doktorunuz veya diyetisyeninizle iletişiminizden memnun musunuz?", riskAnswer: false }, // Inverse
    { id: 147, text: "Kan şekeri değerleriniz yüksek çıktığında kendinizi suçlu hissediyor musunuz?", riskAnswer: true },
    { id: 148, text: "Bu hafta kendinize zaman ayırıp rahatlatıcı aktiviteler yaptınız mı?", riskAnswer: false }, // Inverse
    { id: 149, text: "Diyabetle yaşam konusunda çevrenizdekilere örnek olduğunuzu düşünüyor musunuz?", riskAnswer: false }, // Inverse
    { id: 150, text: "Genel olarak yaşam kalitenizin arttığını hissediyor musunuz?", riskAnswer: false }, // Inverse
];

/**
 * Returns a random selection of questions from the provided pool.
 * @param {Array} pool - The source array of questions.
 * @param {number} count - The number of questions to select.
 * @returns {Array} - An array of unique selected questions.
 */
export const getRandomQuestions = (pool, count) => {
    // Clone array to avoid modifying original
    const shuffled = [...pool];

    // Fisher-Yates Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selected = shuffled.slice(0, count);

    // Log for verification
    if (selected.length > 0) {
        console.log(`[Randomization Check] Selected ${count} questions. First ID: ${selected[0].id}`);
    }

    return selected;
};
