let actionHistory = [];

function toggleMark(cell, player) {
    const currentMark = cell.innerText;
    const newMark = currentMark === '' ? '/' : currentMark === '/' ? 'X' : currentMark === 'X' ? 'O' : 'O';
    actionHistory.push({ cell, previousMark: currentMark });
    cell.innerText = newMark;
}

function undoLastAction() {
    if (actionHistory.length > 0) {
        const lastAction = actionHistory.pop();
        lastAction.cell.innerText = lastAction.previousMark;
    }
}

function clearAll() {
    const markCells = document.querySelectorAll('.mark-cell');
    markCells.forEach(cell => {
        cell.innerText = '';
    });
    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';
    actionHistory = [];
}
