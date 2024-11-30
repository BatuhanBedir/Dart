let actionHistory = [];

function toggleMark(cell, player) {
    const currentMark = cell.innerText;
    const newMark = currentMark === '' ? '/' : currentMark === '/' ? 'X' : currentMark === 'X' ? 'O' : 'O';
    
    actionHistory.push({ cell, previousMark: currentMark, wasBlack: cell.classList.contains('black') });
    cell.innerText = newMark;

    // Sadece 'O' olduğunda siyah arka plan ekle
    if (newMark === 'O') {
        cell.classList.add('black');
    } else {
        cell.classList.remove('black'); 
        // Diğer durumlar için siyah rengi kaldır
    }
}

function undoLastAction() {
    if (actionHistory.length > 0) {
        const lastAction = actionHistory.pop();
        lastAction.cell.innerText = lastAction.previousMark;

        // Yeşil renk durumunu geri yükle
        if (lastAction.previousMark === 'O') {
            lastAction.cell.classList.add('black');
        } else {
            lastAction.cell.classList.remove('black');
        }
    }
}

function clearAll() {
    const markCells = document.querySelectorAll('.mark-cell');
    markCells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('black'); // Siyah rengi temizle
    });
    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';
    actionHistory = [];
}
