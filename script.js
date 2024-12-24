const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.querySelector('.winner-message');
const winnerText = document.getElementById('winner');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
const board = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] || checkWin()) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    winnerText.textContent = currentPlayer;
    winnerMessage.classList.add('active');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === currentPlayer)
  );
}

function restartGame() {
  board.fill(null);
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  winnerMessage.classList.remove('active');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
