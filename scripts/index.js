const container = document.querySelector('.container');
const BOARD = document.querySelector('.board');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.start-btn');
const playerTurnDisplay = document.querySelector('.turn');

const turn = document.querySelector('.turn');
const playerXCount = document.querySelector('.player-x-count');
const playerOCount = document.querySelector('.player-o-count');
const countContainer = document.querySelector('.inform');

const restartContainer = document.querySelector('.restart-container');
const endTitle = document.querySelector('.end-title ');
const restartBtn = document.querySelector('.restart-btn');

const winner = document.querySelector('.winner');



let player_x = 'X';
let player_o = 'O';

let current_player = player_x;
let count_X = 0;
let count_O = 0;

function StartGame() {
    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        game();
    });
}

function game() {
    displayBoard();
    HideTitleAndStartBtn();
    displayTurn(current_player);
    playGame();
}

function HideTitleAndStartBtn() {
    title.hidden = 'true';
    startBtn.hidden = true;
    // restartContainer.hidden = true;
}


function displayBoard() {
    BOARD.classList.remove('d-none');
    countContainer.classList.remove('d-none');
}


function enterPlayerPosition(boardTile) {
    if (boardTile.textContent !== player_x && boardTile.textContent !== player_o && boardTile.textContent === '') {
        boardTile.textContent = current_player;
        displayCounts(current_player);
        checkWinner();
        nextTurn();
        displayTurn(current_player);
    } else {}
}


function nextTurn() {
    current_player = current_player === player_x ? player_o : player_x;

}


function displayCounts(current_player) {
    if (current_player == player_x) {
        count_X += 1;
        playerXCount.textContent = count_X;
    } else if (current_player == player_o) {
        count_O += 1;
        playerOCount.textContent = count_O;
    }
}


function displayTurn(current_player) {
    playerTurnDisplay.innerHTML = `Player ${current_player}'s Turn`;
}


function endGame() {
    turn.classList.add('d-none');
    BOARD.classList.add('d-none');
    countContainer.classList.add('d-none');
    restartContainer.classList.remove('d-none');
}

function winMessage(current_player) {
    winner.textContent = current_player;
}


function playGame() {
    BOARD.addEventListener('click', (e) => {
        let boardTile = e.target;
        enterPlayerPosition(boardTile);
    });
}



function checkWinner() {
    let use = [];
    let use2 = [];
    const tiles = document.querySelectorAll('.col');
    tiles.forEach((each) => {
        use2.push(each);
        use.push(each.textContent);
        [board_1, board_2, board_3, board_4, board_5, board_6, board_7, board_8, board_9] = use;
        [a, b, c, d, e, f, g, h, i] = use2;
    });

    // ROW CHECK FOR WINNER
    if (board_1 === current_player && board_2 === current_player && board_3 === current_player) {
        console.log(a, b, c);
        changeBg();
        endGame();
        winMessage(current_player);

    } else if (board_4 === current_player && board_5 === current_player && board_6 === current_player) {
        endGame();
        winMessage(current_player);
    } else if (board_7 === current_player && board_8 === current_player && board_9 === current_player) {
        endGame();
        winMessage(current_player);
    }

    // COLUMN CHECK FOR WINNER 
    else if (board_1 === current_player && board_4 === current_player && board_7 === current_player) {
        endGame();
        winMessage(current_player);
    } else if (board_2 === current_player && board_5 === current_player && board_8 === current_player) {
        endGame();
        winMessage(current_player);
    } else if (board_3 === current_player && board_6 === current_player && board_9 === current_player) {
        endGame();
        winMessage(current_player);
    }

    // DIAGONAL CHECK FOR WINNER
    else if (board_1 === current_player && board_5 === current_player && board_9 === current_player) {
        endGame();
        console.log('DIAGONAL1 wins');
    } else if (board_3 === current_player && board_5 === current_player && board_7 === current_player) {
        endGame();
        console.log('DIAGONAL2 wins');
    }

    // DRAW CHECK 
    else if (board_1 != '' && board_2 != '' && board_3 != '' && board_4 && board_5 != '' && board_6 != '' && board_7 != '' && board_8 != '' && board_9 != '') {
        console.log('DRAW');
    }
}


function restartGame() {
    restartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        container.innerHTML = "";
        location.reload();
        game();
    });
}

function changeBg() {
    setTimeout(() => {
        a.style.backgroundColor = 'black';
        b.style.backgroundColor = 'black';
        c.style.backgroundColor = 'black';
    }, 1000);

}



StartGame();
restartGame();