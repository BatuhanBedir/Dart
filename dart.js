let actionHistory = [];

// İşaretleme ve video oynatma
function toggleMark(cell) {
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
    document.querySelectorAll('.mark-cell').forEach(cell => {
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
        H: { "/": "1.mp4", "X": "2.mp4", "O": "3.mp4" },
        B: { "O": "b.mp4" }
    };

    const selectedVideo = specialVideos[field]?.[mark];
    if (selectedVideo) {
        videoSource.src = selectedVideo;
        videoPlayer.load();
        videoPopup.style.display = 'block';
        videoPlayer.play();

        setTimeout(() => {
            stopVideo();
        }, 6000);
    }
}

function stopVideo() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoPopup = document.getElementById('videoPopup');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPopup.style.display = 'none';
}
