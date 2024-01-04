document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell')
    const gameStatus = document.getElementById('gameStatus')
    const resetButton = document.getElementById('reset')

    let currentPlayer = 'X'
    let isGameActive = true
    let board = new Array(9).fill('')

    const winningConditions = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // left diagonal
        [2, 4, 6] // right diagonal
    ]

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target
        const clickedCellIndex = parseInt(clickedCell.getAttribute('id').replace('cell', '')) - 1;

        if (board[clickedCellIndex] !== '' || !isGameActive) {
            return
        }

        updateCell(clickedCell, clickedCellIndex);
        checkResult();
    }

    function updateCell(clickedCell, clickedCellIndex) {
        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    
        if (currentPlayer === 'X') {
            clickedCell.classList.add('playerX');
            clickedCell.classList.remove('playerO'); // Make sure to remove the other class
        } else {
            clickedCell.classList.add('playerO');
            clickedCell.classList.remove('playerX'); // Make sure to remove the other class
        }
    }

    function checkResult() {
        let roundWon = false
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i]
            const a = board[winCondition[0]]
            const b = board[winCondition[1]]
            const c = board[winCondition[2]]

            if (a === '' || b === '' || c === '') {
                continue
            }

            if (a === b && b === c) {
                roundWon = true
                break
            }
        }

        if (roundWon) {
            gameStatus.innerHTML = `Player ${currentPlayer} Wins!`;
            isGameActive = false
            return
        }

        let roundDraw = !board.includes('')
        if (roundDraw) {
            gameStatus.innerHTML = 'Game is a draw!'
            isGameActive = false
            return
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function resetGame() {
        currentPlayer = 'X'
        isGameActive = true
        board = new Array(9).fill('')
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
        cells.forEach(cell => cell.innerHTML = '')
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick))
    resetButton.addEventListener('click', resetGame)

})