const topDiv = document.getElementById('top'); // 'top' id'li elementi seç

// Zıplama, geri gitme ve ileri gitme durumlarını izlemek için değişkenler
let zipliyor = false;
let geriHareket = false;
let ileriHareket = false;

// Klavye olaylarını dinle
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyW' && !zipliyor) { // W tuşuna basıldığında ve zaten zıplamıyorsa
        zipliyor = true; // Zıplama durumunu true yap
        zipla(); // Zıpla fonksiyonunu çağır
    }
    if (event.code === 'KeyA' && !geriHareket) { // A tuşuna basıldığında ve geri gitmiyorsa
        geriHareket = true; // Geri gitme durumunu true yap
        geriGit(); // Geri git fonksiyonunu çağır
    }
    if (event.code === 'KeyD' && !ileriHareket) { // D tuşuna basıldığında ve ileri gitmiyorsa
        ileriHareket = true; // İleri gitme durumunu true yap
        ileriGit(); // İleri git fonksiyonunu çağır
    }
});

// Tuş bırakma olaylarını dinle
document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyW') { // W tuşu bırakıldığında
        zipliyor = false; // Zıplama durumunu false yap
    }
    if (event.code === 'KeyA') { // A tuşu bırakıldığında
        geriHareket = false; // Geri gitme durumunu false yap
    }
    if (event.code === 'KeyD') { // D tuşu bırakıldığında
        ileriHareket = false; // İleri gitme durumunu false yap
    }
});

// Topun zıplama fonksiyonu
function zipla() {
    let yukseklik = 0; // Başlangıç yüksekliği
    const ziplamaAraligi = setInterval(() => {
        topDiv.style.bottom = yukseklik + 'px'; // Topun alt mesafesini ayarla
        yukseklik += 7; // Zıplama yüksekliğini arttır
        if (yukseklik >= 450) { // Zıplama yüksekliği 450'yi geçtiğinde
            clearInterval(ziplamaAraligi); // Zıplama aralığını temizle
            let dususYuksekligi = 450; // Başlangıç düşüş yüksekliği
            const dususAraligi = setInterval(() => {
                topDiv.style.bottom = dususYuksekligi + 'px'; // Topun alt mesafesini ayarla
                dususYuksekligi -= 5; // Düşüş yüksekliğini azalt
                if (dususYuksekligi <= 40) { // Düşüş yüksekliği 40'ın altına indiğinde
                    clearInterval(dususAraligi); // Düşüş aralığını temizle
                    topDiv.style.bottom = '40px'; // Topu yerine yerleştir
                }
            }, 20);
        }
    }, 20);
}

// Topun geri gitme fonksiyonu
function geriGit() {
    const geriAraligi = setInterval(() => {
        let leftPos = parseInt(window.getComputedStyle(topDiv).left); // Topun sol pozisyonunu al
        leftPos -= 5; // Sol pozisyonu azalt
        if (leftPos >= 0 && geriHareket) { // Sol pozisyon ekran sınırlarını aşmamışsa ve geri hareket ediliyorsa
            topDiv.style.left = leftPos + 'px'; // Topun sol pozisyonunu ayarla
        } else {
            clearInterval(geriAraligi); // Geri gitme aralığını temizle
        }
    }, 20);
}

// Topun ileri gitme fonksiyonu
function ileriGit() {
    const ileriAraligi = setInterval(() => {
        let leftPos = parseInt(window.getComputedStyle(topDiv).left); // Topun sol pozisyonunu al
        leftPos += 5; // Sol pozisyonu arttır
        if (leftPos + topDiv.offsetWidth <= window.innerWidth && ileriHareket) { // Sağ pozisyon ekran sınırlarını aşmamışsa ve ileri hareket ediliyorsa
            topDiv.style.left = leftPos + 'px'; // Topun sol pozisyonunu ayarla
        } else {
            clearInterval(ileriAraligi); // İleri gitme aralığını temizle
        }
    }, 20);
}

// Yıldız üretme hızı
let uretmeHizi = 3000; // Başlangıçta yıldız üretme hızı

// Yeni yıldız üretme fonksiyonu
function yeniYildizUret() {
    const yeniYildiz = document.createElement('img'); // Yeni bir img elementi oluştur
    yeniYildiz.src = 'yıldız.png'; // Resim kaynağını belirle
    yeniYildiz.className = 'yildiz'; // Class ekleyerek stili belirle

    // Ekran genişliğine ve yüksekliğine göre rastgele pozisyon ayarla
    const ekranGenislik = window.innerWidth;
    const rastgeleSol = Math.random() * ekranGenislik;
    const rastgeleYukseklik = Math.random() * (window.innerHeight - 1200) + 500;
    yeniYildiz.style.left = rastgeleSol + 'px';
    yeniYildiz.style.bottom = rastgeleYukseklik + 'px';

    document.body.appendChild(yeniYildiz); // Yeni yıldızı ekrana ekle

    setTimeout(() => {
        yeniYildiz.remove(); // Belirli bir süre sonra yıldızı kaldır
    }, 7000);

    // Yıldız üretme hızını azalt
    uretmeHizi -= 100;
    if (uretmeHizi < 500) {
        uretmeHizi = 500; // Minimum hızı belirle
    }
}

// Yıldız üretme aralığını güncel hızla çağır
setInterval(yeniYildizUret, uretmeHizi);

// Siyah top üretme aralığı
let uretimAraligi = 1000; // Başlangıçta 8 saniye

// Siyah top üretme fonksiyonu
function siyahTopUret() {
    const siyahTop = document.createElement('div'); // Yeni bir div elementi oluştur
    siyahTop.className = 'siyah-top'; // Class ekleyerek stili belirle

    // Ekran genişliğine ve yüksekliğine göre rastgele pozisyon ayarla
    const ekranGenislik = window.innerWidth;
    const rastgeleSol = Math.random() * ekranGenislik;
    const rastgeleYukseklik = Math.random() * (window.innerHeight - 500) + 500;
    siyahTop.style.left = rastgeleSol + 'px';
    siyahTop.style.bottom = rastgeleYukseklik + 'px';

    document.body.appendChild(siyahTop); // Siyah topu ekrana ekle

    // Düşme aralığını ayarla
    const dusmeAraligi = setInterval(() => {
        let bottomPos = parseInt(window.getComputedStyle(siyahTop).bottom); // Siyah topun alt pozisyonunu al
        bottomPos -= 5; // Alt pozisyonu azalt
        siyahTop.style.bottom = bottomPos + 'px'; // Siyah topun alt pozisyonunu ayarla

        if (bottomPos <= 40) { // Siyah top yere değdiğinde
            clearInterval(dusmeAraligi); // Düşme aralığını temizle
            siyahTop.remove(); // Siyah topu kaldır
        }
    }, 20);

    // Üretim aralığını azalt
    uretimAraligi *= 0.2; // Her üretim sonrası %10 azalt

    // Üretim aralığını en az 500 milisaniye olarak ayarla
    if (uretimAraligi < 500) {
        uretimAraligi = 500;
    }
}

// Siyah top üretme aralığını güncel hızla çağır
setInterval(siyahTopUret, uretimAraligi);

// Topu büyütme fonksiyonu
function buyuTop() {
    const currentSize = parseInt(window.getComputedStyle(topDiv).width);
    const newSize = currentSize + 10;
    topDiv.style.width = newSize + 'px';
    topDiv.style.height = newSize + 'px';
}

// Topu küçültme fonksiyonu
function kucultTop() {
    let currentSize = parseInt(window.getComputedStyle(topDiv).width);
    let newSize = currentSize - 20; // Küçültme miktarı
    topDiv.style.width = newSize + 'px';
    topDiv.style.height = newSize + 'px';

    if (newSize <= 2) {
        oyunuBitir(); // Top boyutu 0 veya daha küçükse oyunu bitir
    }
}

// Çarpışma kontrol fonksiyonu
let carpisanYildizlar = 0; // Çarpışan yıldız sayısı

function carpismaKontrol() {
    const topRect = topDiv.getBoundingClientRect(); // Topun dikdörtgen sınırlarını al
    const yildizlar = document.querySelectorAll('.yildiz'); // Tüm yıldızları seç
    const siyahToplar = document.querySelectorAll('.siyah-top'); // Tüm siyah topları seç

    // Yıldızlarla çarpışmayı kontrol et
    yildizlar.forEach(yildiz => {
        const yildizRect = yildiz.getBoundingClientRect(); // Yıldızın dikdörtgen sınırlarını al

        if (topRect.bottom >= yildizRect.top &&
            topRect.top <= yildizRect.bottom &&
            topRect.right >= yildizRect.left &&
            topRect.left <= yildizRect.right) { // Top, yıldıza çarparsa
            yildiz.remove(); // Yıldızı kaldır
            buyuTop(); // Topu büyüt
            carpisanYildizlar++; // Bir yıldız çarpıştığında sayacı arttır
            guncelleYildizSayisi(); // Yıldız sayısını güncelle
        }
    });

    // Siyah toplarla çarpışmayı kontrol et
    siyahToplar.forEach(siyahTop => {
        const siyahTopRect = siyahTop.getBoundingClientRect(); // Siyah topun dikdörtgen sınırlarını al

        if (topRect.bottom >= siyahTopRect.top &&
            topRect.top <= siyahTopRect.bottom &&
            topRect.right >= siyahTopRect.left &&
            topRect.left <= siyahTopRect.right) { // Top, siyah topa çarparsa
            siyahTop.remove(); // Siyah topu kaldır
            kucultTop(); // Topu küçült
        }
    });
}

// Belirli aralıklarla çarpışma kontrol fonksiyonunu çağır
setInterval(carpismaKontrol, 100);

// Yıldız sayısını güncelleyen fonksiyon
function guncelleYildizSayisi() {
    const yildizSayisiElementi = document.getElementById('yildizSayisi'); // Yıldız sayısı gösteren elementi seç
    yildizSayisiElementi.textContent = "Yıldız Sayısı: " + carpisanYildizlar; // Yıldız sayısını güncelle

    // Yıldız sayısı elementini diğer öğelerin üzerine taşı
    yildizSayisiElementi.style.position = "absolute";
    yildizSayisiElementi.style.top = "10px"; // İstenilen üst boşluk değeri
    yildizSayisiElementi.style.left = "10px"; // İstenilen sol boşluk değeri
}

// Oyunu bitirme fonksiyonu
function oyunuBitir() {
    const ekranKaplayici = document.getElementById('ekranKaplayici'); // Ekranı kaplayan elementi seç
    ekranKaplayici.style.display = 'block'; // Ekranı göster

    // Oyun bitti yazısını oluştur
    const gameOverYazisi = document.createElement('div');
    gameOverYazisi.textContent = 'Game Over';
    gameOverYazisi.style.fontSize = '5em'; // Yazı boyutunu ayarla
    gameOverYazisi.style.color = 'white'; // Yazı rengini beyaz yap
    gameOverYazisi.style.position = 'absolute'; // Pozisyonunu ayarla
    gameOverYazisi.style.top = '50%'; // Dikey ortalamayı yap
    gameOverYazisi.style.left = '50%'; // Yatay ortalamayı yap
    gameOverYazisi.style.transform = 'translate(-50%, -50%)'; // Merkeze hizala

    // Yazıyı ekran kaplayıcısına ekle
    ekranKaplayici.appendChild(gameOverYazisi);

    // Yeniden oynamak için mesaj oluştur
    const yenidenOynamakMesaji = document.createElement('div');
    yenidenOynamakMesaji.textContent = 'Tekrar oynamak için sayfayı yenileyin!';
    yenidenOynamakMesaji.style.fontSize = '1em'; // Yazı boyutunu ayarla
    yenidenOynamakMesaji.style.color = 'white'; // Yazı rengini beyaz yap
    yenidenOynamakMesaji.style.position = 'absolute'; // Pozisyonunu ayarla
    yenidenOynamakMesaji.style.top = '60%'; // Dikey ortalamayı yap
    yenidenOynamakMesaji.style.left = '50%'; // Yatay ortalamayı yap
    yenidenOynamakMesaji.style.transform = 'translate(-50%, -50%)'; // Merkeze hizala

    // Mesajı ekran kaplayıcısına ekle
    ekranKaplayici.appendChild(yenidenOynamakMesaji);

    // Oyun bittiğini kullanıcıya bildir
    alert("Oyun bitti!");
}

// Yeniden başlat butonunu göster
yenidenBaslatButon.style.display = 'block';