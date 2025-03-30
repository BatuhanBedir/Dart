let actionHistory = [];

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
    actionHistory = [];
    stopVideo();
}

function playSpecialFieldVideo(field, mark) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const videoPopup = document.getElementById('videoPopup');
    const imagePopup = document.getElementById('imagePopup');
    const imagePopupImg = document.getElementById('imagePopupImg'); // <img> öğesini buradan al

    const specialVideos = {
        H: { "/": "3.mp4", "X": "h2.mp4", "O": "h3.mp4" },
        B: { "X": "b.mp4", "O": "wsp.jpg" }
    };

    const selectedMedia = specialVideos[field]?.[mark];
    if (selectedMedia) {
        if (selectedMedia.endsWith('.mp4')) {
            videoSource.src = selectedMedia;
            videoPlayer.load();
            videoPopup.style.display = 'block';
            imagePopup.style.display = 'none';
            videoPlayer.play();

            // setTimeout(() => {
            //     stopVideo();
            // }, 3000);
        } else if (selectedMedia.endsWith('.jpg')) {
            imagePopup.style.display = 'block';
            imagePopupImg.src = selectedMedia; 
            videoPopup.style.display = 'none';

            setTimeout(() => {
                imagePopup.style.display = 'none';  
            }, 1000);
        }
    }
}


function stopVideo() {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    document.getElementById('videoPopup').style.display = 'none';
}


function stopVideo() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoPopup = document.getElementById('videoPopup');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPopup.style.display = 'none';
}

function playVideo(videoFile) {
    var videoPopup = document.getElementById("videoPopup");
    var videoPlayer = document.getElementById("videoPlayer");
    var videoSource = document.getElementById("videoSource");

    videoSource.src = videoFile;
    videoPlayer.load();
    videoPopup.style.display = "block";
    videoPlayer.play();

    videoPlayer.onended = function() {
        videoPopup.style.display = "none";
        videoPlayer.pause(); // Videoyu durdur
    };
}

function firstDotButton() {
    playVideo("nok1.mp4");
}

// function secondDotButton() {
//     playVideo("nok2.mp4");
// }

function thirdDotButton() {
    playVideo("nok3.mp4");
}

document.getElementById("videoPopup").addEventListener("click", function() {
    this.style.display = "none";
    document.getElementById("videoPlayer").pause();
});
