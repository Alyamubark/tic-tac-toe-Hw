let board; 
let turn; 
let winner; 
let tie;

const squareEls = document.querySelectorAll('.square'); 
const messageEl = document.querySelector('#message'); 
console.log(squareEls, messageEl);

function init() {
  console.log('Initializing game...');
  board = ['', '', '', '', '', '', '', '', '']; 
  turn = 'X'; 
  winner = false; 
  tie = false; 
  render();
}

init();

function render() {
  updateBoard();
  updateMessage();
}
function updateBoard() {
  board.forEach((cell, index) => {
    squareEls[index].textContent = cell;
  });
}

function updateMessage() {
  if (winner) {
    messageEl.textContent = `${turn} wins!`;
  } else if (tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `${turn}'s turn`;
  }
}

function render() {
  updateBoard();
  updateMessage();
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


function placePiece(index) {
  board[index] = turn;
  console.log(board);
}

function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      return;
    }
  }
}

function checkForTie() {
  if (winner) return;
  if (board.every(cell => cell !== '')) {
    tie = true;
  }
}

function switchPlayerTurn() {
  if (winner) return;
  turn = (turn === 'X') ? 'O' : 'X';
  console.log(turn);
}

function handleClick(event) {
  const squareIndex = parseInt(event.target.id);
  if (board[squareIndex] !== '' || winner) return;
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});

const resetBtnEl = document.getElementById('reset');

resetBtnEl.addEventListener('click', init)

