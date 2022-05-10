const title = document.querySelector('.title');
const startBtn = document.querySelector('.start-btn');
const playerTurnDisplay = document.querySelector('.turn');
const turnWin = document.querySelector('.turn-win');
const BOARD = document.querySelector('.board');
const countContainer = document.querySelector('.inform');
const playerXCount = document.querySelector('.player-x-count');
const playerOCount = document.querySelector('.player-o-count');
const restartContainer = document.querySelector('.restart-container');
const restartBtn = document.querySelector('.restart-btn');
startBtn.addEventListener('click', gameState);

let player_x = 'X';
let player_o = 'O';

let current_player = player_x;
let count_X = 0;
let count_O = 0;




function gameState() {
    DisplayGameView();
    playGame();

}


function DisplayGameView() {
    // display BOARD
    displayBoard();

    // hide TITLE
    HideTitle();

    // hide START BTN
    hideStartBtn();

    // display TURNS
    displayTurns();

    // hide WIN MESSAGE CONTAINER
    HideWinMessage();

    // hide WIN MESSAGE
}


function displayBoard() {
    BOARD.classList.remove('d-none');
}

function HideBoard() {
    BOARD.classList.add('d-none');
}



function displayTitle() {
    title.classList.remove('d-none');
}

function HideTitle() {
    title.classList.add('d-none');
}



function displayStartBtn() {
    startBtn.classList.remove('d-none');
}

function hideStartBtn() {
    startBtn.classList.add('d-none');
}


function displayTurns() {
    playerTurnDisplay.innerHTML = `Player ${current_player}'s Turn`;
}

function hideTurns() {
    playerTurnDisplay.classList.add('d-none');
}


function displayWinMessage() {
    turnWin.classList.remove('d-none');
    turnWin.innerHTML = `PLAYER ${current_player} WINS!!`;
}

function HideWinMessage() {
    turnWin.classList.add('d-none');
}

function displayRestartBtn(){
    restartContainer.classList.remove('d-none');
}
function HideRestartBtn(){
    restartContainer.classList.add('d-none');
}


function displayTurnCountContainer() {
    countContainer.classList.remove('d-none');
    if (current_player == player_x) {
        count_X += 1;
        playerXCount.textContent = count_X;
    } else if (current_player == player_o) {
        count_O += 1;
        playerOCount.textContent = count_O;
    }
}

function hideTurnCountContainer() {
    countContainer.classList.add('d-none');
}





// PLAY GAME STATE
function playGame() {
    BOARD.addEventListener('click', gameOn);
}


function gameOn(ev) {
    let boardTile = ev.target;
    enterPlayerPosition(boardTile, current_player);
}


function enterPlayerPosition(boardTile, current_player) {
    if (boardTile.textContent !== player_x && boardTile.textContent !== player_o && boardTile.textContent === '') {
        boardTile.textContent = current_player;
        displayTurnCountContainer();
        checkWinner();
        nextTurn();
        displayTurns();
    }
}


function nextTurn() {
    current_player = current_player === player_x ? player_o : player_x;
}


function checkWinner() {
    let boardContents = [];
    let boards = [];
    const tiles = document.querySelectorAll('.col');
    tiles.forEach((each) => {
        boardContents.push(each.textContent);
        boards.push(each);

        [board_1, board_2, board_3, board_4, board_5, board_6, board_7, board_8, board_9] = boardContents;
       
        [board_a, board_b, board_c, board_d, board_e, board_f, board_g, board_h, board_i] = boards;
    });
    
    // ROW CHECK FOR WINNER
    if (board_1 === current_player && board_2 === current_player && board_3 === current_player) {
        gameOver(board_a,board_b,board_c);
    } 
    else if (board_4 === current_player && board_5 === current_player && board_6 === current_player) {
        gameOver(board_d,board_e,board_f);
    } 
    else if (board_7 === current_player && board_8 === current_player && board_9 === current_player) {
        gameOver(board_g,board_h,board_i);
    }


    // COLUMN CHECK FOR WINNER 
    else if (board_1 === current_player && board_4 === current_player && board_7 === current_player) {
        gameOver(board_a,board_d,board_g);
    } 
    else if (board_2 === current_player && board_5 === current_player && board_8 === current_player) {
        gameOver(board_b,board_e,board_h);
    } 
    else if (board_3 === current_player && board_6 === current_player && board_9 === current_player) {
        gameOver(board_c,board_f,board_i);
    }


    // DIAGONAL CHECK FOR WINNER
    else if (board_1 === current_player && board_5 === current_player && board_9 === current_player) {
        gameOver(board_a,board_e,board_i);
    } else if (board_3 === current_player && board_5 === current_player && board_7 === current_player) {
        gameOver(board_c,board_e,board_g);
    }

    // DRAW CHECK 
    else if (board_1 != '' && board_2 != '' && board_3 != '' && board_4 && board_5 != '' && board_6 != '' && board_7 != '' && board_8 != '' && board_9 != '') {
        gameDrawHandler();

    }
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


function gameOver(a,b,c) {
    BOARD.removeEventListener('click', gameOn);

    // DISPLAY WINNER
    displayWinMessage();

    // CHANGE WIN BOARD BACKGROUND
    changeBg(a, b, c);

    // HIDE TURN DISPLAY
    hideTurns();

    // HIDE TURN COUNTS
    hideTurnCountContainer();

    restartGame();
}


function restartGame() {
    // SHOW RESTART Button
    displayRestartBtn();

    //  RELOAD PAGE
    restartBtn.addEventListener("click",()=>{
        location.reload();
    });
}


function gameDrawHandler() {
    BOARD.removeEventListener('click', gameOn);
    drawMessage();
    hideTurns();
    hideTurnCountContainer();
    restartGame();
   
}

function drawMessage() {
    turnWin.classList.remove('d-none');
    turnWin.innerHTML = `NO WINNER !!`;
}