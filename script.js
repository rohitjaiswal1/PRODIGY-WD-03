let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    updateBoard();

    if (checkWinner()) {
      displayResult(currentPlayer + 'wins!');
      gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
      displayResult('It\'s a draw!');
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (currentPlayer === 'O' && gameActive) {
        setTimeout(makeRandomMove, 500);
      }
    }
  }
}

function updateBoard() {
  const boardElement = document.getElementById('board');
  for (let i = 0; i < 9; i++) {
    boardElement.children[i].innerText = gameBoard[i];
  }
}

function makeRandomMove() {
  if (gameActive) {
    let emptyCells = gameBoard.reduce((acc, cell, index) => {
      if (cell === '') acc.push(index);
      return acc;
    }, []);

    if (emptyCells.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyCells.length);
      handleCellClick(emptyCells[randomIndex]);
    }
  }
}

function displayResult(message) {
  document.getElementById('result').innerText = message;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => gameBoard[index] === currentPlayer)
  );
}

function initGameBoard() {
  const boardElement = document.getElementById('board');
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => handleCellClick(i));
    boardElement.appendChild(cell);
  }
}

window.onload = () => {
  initGameBoard();
};