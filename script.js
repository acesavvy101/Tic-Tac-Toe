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

    return { 
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
//inspect board state
const Gameboard1 = Gameboard();
Gameboard1.add('X', 0);
Gameboard1.add('O',4);
console.log(Gameboard1.getGameboard());


function gameLogic () {
    //for every round u play, get the player's info
    function createPlayer (name) {
        return {
            name: name,
            login() {
                console.log(`${name} has logged in`)
        }
    }
    const player1 = createPlayer('alice');
    const player2 = createPlayer('bob');

    //identify which player is playing, add X and O, identify winning condition
    //switching turns, check if that position is already taken

    /*winning conditions:
        0,1,2
        3,4,5
        6,7,8
        0,3,6
        1,4,7
        2,5,8
        0,4,8
        2,4,6*/
}
}
