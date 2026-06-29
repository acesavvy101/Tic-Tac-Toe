function Gameboard () { 
    //instead of pushing into gameboard, we should already have an array with 9 spots, and we need to replace a certain ele in the array (direct indexing)
    let gameboard = ['','','','','','','','',''];

    return { //only returned variables are accessible outside the func
        add: (label, position) => { 
        //disable override, check if the position is empty
          if (gameboard[position]==='') {
            gameboard[position] = label;
          } else {
            return
          }
        },

        reset: () => {
            gameboard = ['','','','','','','','','']; //make it turn into it's initial state
        },

        getGameboard: () => gameboard //public getter (maintain encapsulation) | CONSIDER: making it readonly
    }
}


function GameRound (boardInstance, gameDisplay) {
    //for every round u play, get the player's info
    function createPlayer (name) {
        return {
            name: name
        }
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

    const restartGame = document.getElementById("restart")
    restartGame.addEventListener("click", () => {
        boardInstance.reset()
        gameDisplay.displayBoard() // changing the array doesnt automatically change the display, u need 2 call it
    })

    const displayResult = document.getElementById("displayResult")

    function gameOver () {
        function winCondition () {
            return winningCombos.some(([a, b, c]) => {
                return boardInstance.getGameboard()[a] !== '' &&
                boardInstance.getGameboard()[a] === boardInstance.getGameboard()[b] &&
                boardInstance.getGameboard()[a] === boardInstance.getGameboard()[c];
            });
        }

        if (winCondition()) {
            displayResult.textContent = `Player ${currentPlayer} Wins!`
        } else if (!boardInstance.getGameboard().includes('')) { //if the array has no empty strings, so no spots left to fill
            displayResult.textContent = "It's a Tie!"
        } else {
            //continue to play the game
            return
        }
    }

    let currentPlayer = "X" 
    const gridContainer = document.getElementById("gridContainer");
    gridContainer.addEventListener("click", (e) => {
    const box = e.target.closest(".box");  //determine which box was clicked
    if (!box) return; //ignore click if not box
    playerTurn (box.id)
    }) 
    function playerTurn (boxID) {
            //FIX: no skip turns if player accidentally picks an occupied spot
        if (boardInstance.getGameboard()[boxID] === "") {
            //identify which player is playing, add X and O
            if (currentPlayer === "X") {   
            boardInstance.add("X", boxID) //place mark
            gameOver()
            gameDisplay.displayBoard() 
            currentPlayer = "O"
            } else if (currentPlayer === "O") {
            boardInstance.add("O",boxID)
            gameOver()
            gameDisplay.displayBoard() 
            currentPlayer = "X"
            }
        } else {
            alert (`pick a different position!`)
            return
        }
    }

    return {
        createPlayer,
        gameOver
    }
}

function GameDisplay (boardInstance) {

    function displayBoard() {
        for (let i=0; i<=8; i++) {
            document.getElementById(`${i}`).textContent = boardInstance.getGameboard()[i] 
             //display the corresponding element in the array
        }
    }

    return {
        displayBoard
    }
}

const Gameboard1 = Gameboard();
const display = GameDisplay(Gameboard1);
const game = GameRound(Gameboard1, display);

display.displayBoard();


//WRAP EVERYTHING IN IIFE! | FIX: after a player wins, disable click