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

//Select Which you play
const startingCard = document.querySelector(".startingPage");
const choose = document.querySelectorAll(".choose");
const gameCard = document.querySelector(".gameCard");
const endGameWinnerCard = document.querySelector(".endGameWinner");
const endGameDrawCard = document.querySelector(".endGameDraw");
const cellElemenst = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
//const endGameMessageElement = document.getElementById('endGameMessage');
const endGameMessageTextElement = document.querySelector('[data-endgame-message-text]');
const restartGameButton1 = document.getElementById('restartButtonWinner');
const restartGameButton2 = document.getElementById('restartButtonDraw');

choose.forEach(currentChoose => {
    currentChoose.addEventListener("click", () => {
        if(currentChoose.id === "playerX"){
            currPlayersTurn = false;
           // console.log(currPlayersTurn);
        }else{
            currPlayersTurn = true;
            //console.log(currPlayersTurn);
        }
        startingCard.style.display = "none";
        gameCard.style.display = "block";
        startGame();
    })
});

const clickOnCellHandler = (event) => {
    // console.log("click");
    const cellPos = event.target;
    const currenPlayer = currPlayersTurn ?  playerZero : playerX;
    // console.log(currenPlayer);
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
        // endGameMessageTextElement.innerText = 'Draw!';
        gameCard.style.display = "none";
        endGameDrawCard.style.display = "flex";
    }else{
        endGameMessageTextElement.innerText = `${currPlayersTurn ? "O" : "X"}!`;
        gameCard.style.display = "none";
        endGameWinnerCard.style.display = "flex";
    }
    //endGameMessageElement.classList.add('show');
    //  gameCard.style.display = "none";
    // endGameCard.style.display = "flex";
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
    //currPlayersTurn = false;
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

restartGameButton1.addEventListener('click', () => {
    window.location.reload();
});

restartGameButton2.addEventListener('click', () => {
    window.location.reload();
});

