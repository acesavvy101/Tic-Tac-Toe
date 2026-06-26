/* PSEUDOCODE
1. make a Gameboard object using factory functions,
2. store gameboard array inside the object
3. plauyers are going to be stored in objects not in Gameboard 
4. in the game logic/ players take turns adding X and O to the array
5. the array will be appended to the display in displayBoard()
4. add, reset behaviors objects*/

function Gameboard () { 
    //Gameboard should represent the state of the board at fixed positions
    let gameboard = [];

    return { 
        add: (item) => {
            if (gameboard.length < 9) {
                gameboard.push(item) //limit to 9 spots
            } else {
                return;
            }
        } 
        reset: () => {
            gameboard.length = 0 
        }
    }
}


function gameLogic () {
    //for every round u play, get the player's info
    function createPlayer (name) {
        return {
            name: name,
        };
    }
    const player1 = createPlayer('alice');
    const player2 = createPlayer('bob');

    //this is where players take turns adding X and O to the array
}

