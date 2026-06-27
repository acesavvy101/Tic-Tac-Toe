/* PSEUDOCODE
1. make a Gameboard object using factory functions,
2. store gameboard array inside the object
3. plauyers are going to be stored in objects not in Gameboard 
4. in the game logic/ players take turns adding X and O to the array
5. the array will be appended to the display in displayBoard()
4. add, reset behaviors objects
wrap in IIFE*/

function Gameboard () { 
    //instead of pushing into gameboard, we should already have an array with 9 spots, and we need to replace a certain ele in the array (direct indexing)
    let gameboard = ['','','','','','','','',''];

    return { //only returned variables are accessible outside the func
        add: (label, position) => { 
        //disable override, check if the position is empty
          if (gameboard[position]==='') {
            gameboard[position] = label;
          } else {
            console.log(`choose a different position!`)
          }
        },

        reset: () => {
            gameboard = ['','','','','','','','','']; //make it turn into it's initial state
        },

        getGameboard: () => gameboard //public getter (maintain encapsulation) | CONSIDER: making it readonly
    }
}


function GameRound (boardInstance) {
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

    function gameOver () {
        function winCondition () {
            return winningCombos.some(([a, b, c]) => {
                return boardInstance.getGameboard()[a] !== '' &&
                boardInstance.getGameboard()[a] === boardInstance.getGameboard()[b] &&
                boardInstance.getGameboard()[a] === boardInstance.getGameboard()[c];
            });
        }

        if (winCondition()) {
            console.log(boardInstance.getGameboard())
            console.log(`you win`)
        } else if (!boardInstance.getGameboard().includes('')) { //if the array has no empty strings, so no spots left to fill
            console.log(boardInstance.getGameboard())
            console.log(`its a tie!`)
        } else {
            //continue to play the game
            return
        }
    }

    return {
        createPlayer,
        gameOver
    }
    //identify which player is playing, add X and O
    //switching turns, get the board after every turn
}

function GameDisplay (boardInstance) {

    function displayBoard() {
        const grid0 = document.getElementById("0");
        grid0.textContent = boardInstance.getGameboard()[0]  //display the corresponding element in the array
        const grid1 = document.getElementById("1");
        grid1.textContent = boardInstance.getGameboard()[1]
        const grid2 = document.getElementById("2");
        grid2.textContent = boardInstance.getGameboard()[2]
        const grid3 = document.getElementById("3");
        grid3.textContent = boardInstance.getGameboard()[3]
        const grid4 = document.getElementById("4");
        grid4.textContent = boardInstance.getGameboard()[4]
        const grid5 = document.getElementById("5");
        grid5.textContent = boardInstance.getGameboard()[5]
        const grid6 = document.getElementById("6");
        grid6.textContent = boardInstance.getGameboard()[6]
        const grid7 = document.getElementById("7");
        grid7.textContent = boardInstance.getGameboard()[7]
        const grid8 = document.getElementById("8");
        grid8.textContent = boardInstance.getGameboard()[8]
    }

    return {
        displayBoard
    }
}


//inspect board state
const Gameboard1 = Gameboard();
Gameboard1.add('X', 0);
Gameboard1.add('O', 1);
Gameboard1.add('X', 2);

Gameboard1.add('O', 3);
Gameboard1.add('X', 4);
Gameboard1.add('O', 5);

Gameboard1.add('O', 6);
Gameboard1.add('X', 7);
Gameboard1.add('O', 8);

const round1 = GameRound(Gameboard1);
round1.gameOver();

const trial = GameDisplay(Gameboard1)
trial.displayBoard()
