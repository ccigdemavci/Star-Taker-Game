const topDiv = document.getElementById('top');
let zipliyor = false;
let geriHareket = false;
let ileriHareket = false;

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyW' && !zipliyor) {
        zipliyor = true;
        zipla();
    }
    if (event.code === 'KeyA' && !geriHareket) {
        geriHareket = true;
        geriGit();
    }
    if (event.code === 'KeyD' && !ileriHareket) {
        ileriHareket = true;
        ileriGit();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyW') {
        zipliyor = false;
    }
    if (event.code === 'KeyA') {
        geriHareket = false;
    }
    if (event.code === 'KeyD') {
        ileriHareket = false;
    }
});

function zipla() {
    let yukseklik = 0;
    const ziplamaAraligi = setInterval(() => {
        topDiv.style.bottom = yukseklik + 'px';
        yukseklik += 7;
        if (yukseklik >= 250) {
            2
            clearInterval(ziplamaAraligi);
            let dususYuksekligi = 250;
            const dususAraligi = setInterval(() => {
                topDiv.style.bottom = dususYuksekligi + 'px';
                dususYuksekligi -= 5;
                if (dususYuksekligi <= 40) {
                    clearInterval(dususAraligi);
                    topDiv.style.bottom = '40px';
                }
            }, 20);
        }
    }, 20);
}

function geriGit() {
    const geriAraligi = setInterval(() => {
        let leftPos = parseInt(window.getComputedStyle(topDiv).left);
        leftPos -= 5;
        if (leftPos >= 0 && geriHareket) {
            topDiv.style.left = leftPos + 'px';
        } else {
            clearInterval(geriAraligi);
        }
    }, 20);
}

function ileriGit() {
    const ileriAraligi = setInterval(() => {
        let leftPos = parseInt(window.getComputedStyle(topDiv).left);
        leftPos += 5;
        if (leftPos + topDiv.offsetWidth <= window.innerWidth && ileriHareket) {
            topDiv.style.left = leftPos + 'px';
        } else {
            clearInterval(ileriAraligi);
        }
    }, 20);
}


let uretmeHizi = 3000; // Başlangıçta yıldız üretme hızı

function yeniYildizUret() {
    const yeniYildiz = document.createElement('img');
    yeniYildiz.src = 'yıldız.png';
    yeniYildiz.className = 'yildiz';

    const ekranGenislik = window.innerWidth;
    const rastgeleSol = Math.random() * ekranGenislik;
    const rastgeleYukseklik = Math.random() * (window.innerHeight - 1200) + 500;
    yeniYildiz.style.left = rastgeleSol + 'px';
    yeniYildiz.style.bottom = rastgeleYukseklik + 'px';

    document.body.appendChild(yeniYildiz);

    setTimeout(() => {
        yeniYildiz.remove();
    }, 7000);

    // Yıldız üretme hızını azalt
    uretmeHizi -= 100;
    if (uretmeHizi < 500) {
        uretmeHizi = 500; // Minimum hızı belirle
    }
}

// setInterval'i her döngüde güncel hızla çağır
setInterval(yeniYildizUret, uretmeHizi);






let uretimAraligi = 1000; // Başlangıçta 8 saniye

function siyahTopUret() {
    const siyahTop = document.createElement('div');
    siyahTop.className = 'siyah-top';

    const ekranGenislik = window.innerWidth;
    const rastgeleSol = Math.random() * ekranGenislik;
    const rastgeleYukseklik = Math.random() * (window.innerHeight - 500) + 500;
    siyahTop.style.left = rastgeleSol + 'px';
    siyahTop.style.bottom = rastgeleYukseklik + 'px';

    document.body.appendChild(siyahTop);

    const dusmeAraligi = setInterval(() => {
        let bottomPos = parseInt(window.getComputedStyle(siyahTop).bottom);
        bottomPos -= 5;
        siyahTop.style.bottom = bottomPos + 'px';

        if (bottomPos <= 40) {
            clearInterval(dusmeAraligi);
            siyahTop.remove();
        }
    }, 20);

    // Üretim aralığını azalt
    uretimAraligi *= 0.2; // Her üretim sonrası %10 azalt

    // Üretim aralığını en az 500 milisaniye olarak ayarla
    if (uretimAraligi < 500) {
        uretimAraligi = 500;
    }
}

setInterval(siyahTopUret, uretimAraligi);






function buyuTop() {
    const currentSize = parseInt(window.getComputedStyle(topDiv).width);
    const newSize = currentSize + 10;
    topDiv.style.width = newSize + 'px';
    topDiv.style.height = newSize + 'px';
}


function kucultTop() {
    let currentSize = parseInt(window.getComputedStyle(topDiv).width);
    let newSize = currentSize - 20; // Küçültme miktarı
    topDiv.style.width = newSize + 'px';
    topDiv.style.height = newSize + 'px';

    if (newSize <= 2) {
        oyunuBitir(); // Top boyutu 0 veya daha küçükse oyunu bitir
    }
}

let carpisanYildizlar = 0;

function carpismaKontrol() {
    const topRect = topDiv.getBoundingClientRect();
    const yildizlar = document.querySelectorAll('.yildiz');
    const siyahToplar = document.querySelectorAll('.siyah-top');

    yildizlar.forEach(yildiz => {
        const yildizRect = yildiz.getBoundingClientRect();

        if (topRect.bottom >= yildizRect.top &&
            topRect.top <= yildizRect.bottom &&
            topRect.right >= yildizRect.left &&
            topRect.left <= yildizRect.right) {
            yildiz.remove();
            buyuTop();
            carpisanYildizlar++; // Bir yıldız çarpıştığında sayacı arttır
            guncelleYildizSayisi(); // Yıldız sayısını güncelle
        }
    });

    siyahToplar.forEach(siyahTop => {
        const siyahTopRect = siyahTop.getBoundingClientRect();

        if (topRect.bottom >= siyahTopRect.top &&
            topRect.top <= siyahTopRect.bottom &&
            topRect.right >= siyahTopRect.left &&
            topRect.left <= siyahTopRect.right) {
            siyahTop.remove();
            kucultTop();

        }

    });
}
setInterval(carpismaKontrol, 100);

function guncelleYildizSayisi() {
    const yildizSayisiElementi = document.getElementById('yildizSayisi');
    yildizSayisiElementi.textContent = "Yıldız Sayısı: " + carpisanYildizlar;

    // Yıldız sayısı elementini diğer öğelerin üzerine taşı
    yildizSayisiElementi.style.position = "absolute";
    yildizSayisiElementi.style.top = "10px"; // İstenilen üst boşluk değeri
    yildizSayisiElementi.style.left = "10px"; // İstenilen sol boşluk değeri
}





function oyunuBitir() {

    // Ekranı siyah bir örtü ile kapat
    const ekranKaplayici = document.getElementById('ekranKaplayici');
    ekranKaplayici.style.display = 'block';
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
    yenidenBaslatButon.style.display = 'block';


}