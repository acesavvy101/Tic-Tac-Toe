const Gameboard1 = (function Gameboard () { 
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

        getGameboard: () => gameboard //public getter (maintain encapsulation) | FIX: return a copy
    }
})();


const display = (function GameDisplay (boardInstance) {

    function displayBoard() {
        for (let i=0; i<=8; i++) {
            document.getElementById(`${i}`).textContent = boardInstance.getGameboard()[i] 
             //display the corresponding element in the array
        }
    }

    return {
        displayBoard
    }
})(Gameboard1);


const game = (function GameRound (boardInstance, gameDisplay) {
    //for every round u play, get the player's info | FIX: use this to get player names later!
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
        isgameOver = false
        gameDisplay.displayBoard() // changing the array doesnt automatically change the display, u need 2 call it
        displayResult.textContent = `Make Your Move!`
    })

    const displayResult = document.getElementById("displayResult")

    let isgameOver = false; //make initial value which allows it to run at least once before checking!

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
            isgameOver = true 
        } else if (!boardInstance.getGameboard().includes('')) { //if the array has no empty strings, so no spots left to fill
            displayResult.textContent = "It's a Tie!"
            isgameOver = true
        } else {
            //continue to play the game
            isgameOver = false
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
        if (isgameOver) return //FIX: if isgameOver = true, disable additional turns
            //FIX: no skip turns if player accidentally picks an occupied spot
        else if (boardInstance.getGameboard()[boxID] === "") {
            //identify which player is playing, add X and O
            if (currentPlayer === "X") { 
                displayResult.textContent = "It's Player O's turn!" 
                boardInstance.add("X", boxID) //place mark
                gameOver()
                gameDisplay.displayBoard() 
                currentPlayer = "O"
            } else if (currentPlayer === "O") {
                displayResult.textContent = "It's Player X's turn!" 
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
})(Gameboard1, display);
