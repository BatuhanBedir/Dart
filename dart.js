let actionHistory = [];

const playerVideos = {
    ege: {
        "/": "1.mp4",
        "X": "2.mp4",
        "O": "3.mp4"
    }
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
    stopVideo();
}

function playSpecialFieldVideo(field, mark) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const videoPopup = document.getElementById('videoPopup');
    
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

    const selectedVideo = specialVideos[field]?.[mark];
    if (selectedVideo) {
        videoSource.src = selectedVideo;
        videoPlayer.load();
        videoPopup.style.display = 'block';
        videoPlayer.play();

        setTimeout(() => {
            videoPlayer.pause();
            videoPlayer.currentTime = 0; // Videoyu başa sar
            videoPopup.style.display = 'none'; // Popup'ı gizle
        }, 6000);
    }
}

function checkPlayerVideos(mark) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const videoPopup = document.getElementById('videoPopup');

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

    setTimeout(() => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0; 
        videoPopup.style.display = 'none'; 
    }, 3000);
}

function stopVideo() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoPopup = document.getElementById('videoPopup');
    videoPlayer.pause();
    videoPlayer.currentTime = 0; 
    videoPopup.style.display = 'none';
}
