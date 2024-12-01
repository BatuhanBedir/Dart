let actionHistory = [];

function toggleMark(cell, player) {
    const currentMark = cell.innerText;
    const newMark = currentMark === '' ? '/' : currentMark === '/' ? 'X' : currentMark === 'X' ? 'O' : '';
    actionHistory.push({ cell, previousMark: currentMark, wasBlack: cell.classList.contains('black') });
    cell.innerText = newMark;

    if (newMark === 'O') {
        cell.classList.add('black');
    } else {
        cell.classList.remove('black'); 
    }
}

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
 
function clearAll() {
    const markCells = document.querySelectorAll('.mark-cell');
    markCells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('black'); 
    });
    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';
    actionHistory = [];
}
