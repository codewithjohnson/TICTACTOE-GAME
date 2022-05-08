const container = document.querySelector('.container');
const BOARD = document.querySelector('.board');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.start-btn');
const playerTurnDisplay = document.querySelector('.turn');

const turn = document.querySelector('.turn');
const turnWin = document.querySelector('.turn-win');
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



function endGame(a, b, c) {
    turn.classList.add('d-none');
    changeBg(a, b, c);
    setTimeout(() => {
        turnWin.classList.add('d-none');
        BOARD.classList.add('d-none');
        countContainer.classList.add('d-none');
        restartContainer.classList.remove('d-none');
    }, 2000);

}

function winMessage(current_player) {
    winner.textContent = current_player;
    turnWin.innerHTML = `PLAYER ${current_player} WINS!!`;
   
}

function playGame() {
    BOARD.addEventListener('click', (e) => {
        let boardTile = e.target;
        enterPlayerPosition(boardTile);
    });
}


function restartGame() {
    restartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        container.innerHTML = "";
        location.reload();
        game();
    });
}


function changeBg(a, b, c) {
    const winColor = 'yellow';
    const winBg = 'rgba(0, 0, 0, 0.80)';
    const fontWeight = 'bolder';

    a.style.backgroundColor = winBg;
    a.style.color = winColor;
    a.style.fontWeight = fontWeight;

    b.style.backgroundColor = winBg;
    b.style.color = winColor;
    b.style.fontWeight = fontWeight;

    c.style.backgroundColor = winBg;
    c.style.color = winColor;
    c.style.fontWeight = fontWeight;
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
        endGame(a, b, c);
        winMessage(current_player);

    } else if (board_4 === current_player && board_5 === current_player && board_6 === current_player) {
        endGame(d, e, f);
        winMessage(current_player);
    } else if (board_7 === current_player && board_8 === current_player && board_9 === current_player) {
        endGame(g, h, i);
        winMessage(current_player);
    }

    // COLUMN CHECK FOR WINNER 
    else if (board_1 === current_player && board_4 === current_player && board_7 === current_player) {
        endGame(a, d, g);
        winMessage(current_player);

    } else if (board_2 === current_player && board_5 === current_player && board_8 === current_player) {
        endGame(b, e, h);
        winMessage(current_player);

    } else if (board_3 === current_player && board_6 === current_player && board_9 === current_player) {
        endGame(c, f, i);
        winMessage(current_player);
    }

    // DIAGONAL CHECK FOR WINNER
    else if (board_1 === current_player && board_5 === current_player && board_9 === current_player) {
        endGame(a, e, i);

    } else if (board_3 === current_player && board_5 === current_player && board_7 === current_player) {
        endGame(c, e, g);

    }

    // DRAW CHECK 
    else if (board_1 != '' && board_2 != '' && board_3 != '' && board_4 && board_5 != '' && board_6 != '' && board_7 != '' && board_8 != '' && board_9 != '') {
        console.log('DRAW');
    }
}


StartGame();
restartGame();