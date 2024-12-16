let actionHistory = [];

// Oyuncu isimlerine göre videoları eşleştirme
const playerVideos = {
    ege: {
        "/": "1.mp4",
        "X": "2.mp4",
        "O": "3.mp4"
    }
    // Buraya yeni oyuncu isimleri eklenebilir, örneğin:
    // ali: { "/": "a1.mp4", "X": "a2.mp4", "O": "a3.mp4" }
};

// İşaretleme ve video oynatma
function toggleMark(cell, player) {
    const currentMark = cell.innerText;
    const newMark = currentMark === '' ? '/' : currentMark === '/' ? 'X' : currentMark === 'X' ? 'O' : '';
    actionHistory.push({ cell, previousMark: currentMark, wasBlack: cell.classList.contains('black') });
    cell.innerText = newMark;

    // Alan adı al (H veya B gibi)
    const specialField = cell.parentElement.children[1]?.innerText;

    // Özel alanlar (H ve B) için kontrol
    if (specialField === "H" || specialField === "B") {
        playSpecialFieldVideo(specialField, newMark);
    }

    // Genel işaretleme ve siyah arka plan
    if (newMark === 'O') {
        cell.classList.add('black');
    } else {
        cell.classList.remove('black');
    }

    // Oyuncu isimlerini kontrol et ve onlara özel videoları oynat
    checkPlayerVideos(newMark);
}

// Son işlemi geri al
function undoLastAction() {
    if (actionHistory.length > 0) {
        const lastAction = actionHistory.pop();
        lastAction.cell.innerText = lastAction.previousMark;

        if (lastAction.previousMark === 'O') {
            lastAction.cell.classList.add('black');
        } else {
            lastAction.cell.classList.remove('black');
        }
    }
}

// Tüm hücreleri temizle ve videoyu durdur
function clearAll() {
    const markCells = document.querySelectorAll('.mark-cell');
    markCells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('black');
    });
    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';
    actionHistory = [];
    stopVideo(); // Videoyu durdur
}

// H ve B alanları için özel video oynatma
function playSpecialFieldVideo(field, mark) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const videoPopup = document.getElementById('videoPopup');
    
    // H ve B alanları için video kaynakları
    const specialVideos = {
        H: {
            "/": "1.mp4",
            "X": "2.mp4",
            "O": "3.mp4"
        },
        B: {
            "O": "b.mp4"
        }
    };

    // Alan ve işarete göre video seçimi
    const selectedVideo = specialVideos[field]?.[mark];
    if (selectedVideo) {
        videoSource.src = selectedVideo;
        videoPlayer.load(); // Yeni video kaynağını yükle
        videoPopup.style.display = 'block'; // Popup'ı görünür yap
        videoPlayer.play(); // Videoyu başlat

        // 3 saniye sonra videoyu durdur ve popup'ı gizle
        setTimeout(() => {
            videoPlayer.pause();
            videoPlayer.currentTime = 0; // Videoyu başa sar
            videoPopup.style.display = 'none'; // Popup'ı gizle
        }, 3000);
    }
}

// Oyuncu isimlerine göre video kontrolü
function checkPlayerVideos(mark) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const videoPopup = document.getElementById('videoPopup');

    // Oyuncu isimlerini al ve küçük harfe çevirerek kontrol et
    const player1Name = document.getElementById('player1Name').value.trim().toLowerCase();
    const player2Name = document.getElementById('player2Name').value.trim().toLowerCase();

    if (playerVideos[player1Name]?.[mark]) {
        videoSource.src = playerVideos[player1Name][mark];
    } else if (playerVideos[player2Name]?.[mark]) {
        videoSource.src = playerVideos[player2Name][mark];
    } else {
        return;
    }

    videoPlayer.load();
    videoPopup.style.display = 'block';
    videoPlayer.play();

    // 3 saniye sonra durdur
    setTimeout(() => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0; // Videoyu başa sar
        videoPopup.style.display = 'none'; // Popup'ı gizle
    }, 3000);
}

function stopVideo() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoPopup = document.getElementById('videoPopup');
    videoPlayer.pause();
    videoPlayer.currentTime = 0; // Videoyu başa sar
    videoPopup.style.display = 'none'; // Popup'ı gizle
}
