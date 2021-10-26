const playerX = 'x';
const playerZero = 'circle';
const winnCombination = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8], 
    [0,4,8], 
    [2,4,6]
];
let currPlayersTurn;

const startingCard = document.querySelector(".starting-page");
const choose = document.querySelectorAll(".choose");
const gameCard = document.querySelector(".game-page");
const endGameCard = document.querySelector(".end-game-page");
const endGameWinnerText = document.querySelector(".winner-text");
const endGameDrawText = document.querySelector(".draw-text");
const cellElemenst = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const endGameMessageTextElement = document.querySelector('[data-endgame-message-text]');
const restartGameButton = document.getElementById('restart-btn');


//Select Which to play
choose.forEach(currentChoose => {
    currentChoose.addEventListener("click", () => {
        if(currentChoose.id === "player-x"){
            currPlayersTurn = false;
        }else{
            currPlayersTurn = true;
        }
        startingCard.style.display = "none";
        gameCard.style.display = "block";
        startGame();
    })
});

const clickOnCellHandler = (event) => {
    const cellPos = event.target;
    const currenPlayer = currPlayersTurn ?  playerZero : playerX;
    placeMarkOnCell(cellPos, currenPlayer);
    if(checkWinner(currenPlayer)){
        console.log('winner');
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swithTurns();
        setBoardHoverNextTurn();
    }
};

const endGame = (draw) => {
    if(draw){
        endGameDrawText.style.display = "flex";
    }else{
        endGameMessageTextElement.innerText = `${currPlayersTurn ? "O" : "X"}!`;
        endGameWinnerText.style.display = "flex";
    }
    gameCard.style.display = "none";
    endGameCard.style.display = "flex";
};

const isDraw = () => {
    return [...cellElemenst].every(cell => {
        return cell.classList.contains(playerX) || cell.classList.contains(playerZero);
    });
};

const checkWinner = (currenPlayer) => {
    return winnCombination.some(combination => {
        return combination.every(index => {
            return cellElemenst[index].classList.contains(currenPlayer);
        });
    });
};

const startGame = () => {
    cellElemenst.forEach(cell => {
        cell.addEventListener('click', clickOnCellHandler, {once:true})
    });
    setBoardHoverNextTurn();
};

const placeMarkOnCell = (cell, currenPlayer) => {
    cell.classList.add(currenPlayer);
};

const swithTurns = () =>{
    currPlayersTurn = !currPlayersTurn;
};

const  setBoardHoverNextTurn = () => {
    board.classList.remove(playerX);
    board.classList.remove(playerZero);
    if(currPlayersTurn){
        board.classList.add(playerZero);
    }else{
        board.classList.add(playerX);
    }
};

restartGameButton.addEventListener('click', () => {
    window.location.reload();
});


