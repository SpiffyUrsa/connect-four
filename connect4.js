/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH_BOARD = 7;
const HEIGHT_BOARD = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

 // Makes the javascript board to hold all of the player piece data.
function makeBoard(WIDTH_BOARD, HEIGHT_BOARD) {
  for (let y = 0; y < HEIGHT_BOARD; y++) {
    board.push(Array.from({ length: WIDTH_BOARD }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

// Makes the HTML board layout.
function makeHtmlBoard() {
  let htmlBoard = document.getElementById('board');

  // Creates a top row that allows a player to click a cell and place a gamepiece in the respective column
  let playRow = document.createElement("tr");
  playRow.setAttribute("id", "column-top");
  playRow.addEventListener("click", handleClick);

  for (let xAxis = 0; xAxis < WIDTH_BOARD; xAxis++) {
    let playCell = document.createElement("td");
    playCell.setAttribute("id", xAxis);
    playRow.append(playCell);
  }
  htmlBoard.append(playRow);

  // Creating each row and column of the game board
  for (let yAxis = 0; yAxis < HEIGHT_BOARD; yAxis++) {
    let row = document.createElement("tr");
    for (let xAxis = 0; xAxis < WIDTH_BOARD; xAxis++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", `${yAxis}-${xAxis}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

// Checks each spot in the column to see if it is occupied. If not, returns the yAxis value.
// If all spots are occupied, returns null.
function findSpotForCol(xAxis) {
  for (let yAxis = HEIGHT_BOARD - 1; yAxis >= 0; yAxis--) {
    if (board[yAxis][xAxis] === undefined) {
      return yAxis;
    }
  }
  return null;
}

// Iterate from the total height towards the top of the gameboard (iterating from bottom to top)
// check the board array to see if it is already filled. If it is, then continue the loop. if not,
// return the y value there.
// return null

// Right now, the game drops always drops a piece to the top of the column, 
// even if a piece is already there. Fix this function so that it finds the lowest empty spot 
// in the game board and returns the y coordinate (or null if the column is filled).

/** placeInTable: update DOM to place piece into HTML table of board */

// Update the board to place the correct piece into the HTML board
function placeInTable(yAxis, xAxis) {
  let piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  let targetCell = document.getElementById(`${yAxis}-${xAxis}`)
  targetCell.append(piece);
}

//announce game end 
function endGame(msg) {
  setTimeout(function(){
    alert(msg)
  }, 300);
  //remove event handler to stop further moves
  let playRow = document.getElementById('column-top');
  playRow.removeEventListener('click', handleClick);
}
// do this

/** handleClick: handle click of column top to play piece */

// Handles the click functionality to drop pieces on the board and checks for win condition.
function handleClick(evt) {
  // get x from ID of clicked cell
  let xAxis = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let yAxis = findSpotForCol(xAxis);
  if (yAxis === null) {
    return;
  }
  // place piece in board and add to HTML table
  board[yAxis][xAxis] = currPlayer;
  placeInTable(yAxis, xAxis);
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  // check for tie - if all cells in board are filled then call endGame
  if(board.every((row) => 
      row.every((cell) => 
          cell !== undefined))) {
            endGame('Players Tie!');
          };
  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
// If the possible win cells are all the same player, then return true
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT_BOARD &&
        x >= 0 &&
        x < WIDTH_BOARD &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT_BOARD; y++) {
    for (var x = 0; x < WIDTH_BOARD; x++) {
      // the possible win conditions for the connect 4 game.
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // if the passed in values meet the conditions, return true;
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard(WIDTH_BOARD, HEIGHT_BOARD);
makeHtmlBoard();
