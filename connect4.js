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

function makeBoard(WIDTH_BOARD, HEIGHT_BOARD) {
  for (let y = 1; y <= HEIGHT_BOARD; y++) {
    board.push(Array.from({ length: WIDTH_BOARD }));
  }
}


// First figure out how many empty rows are going be in the board array.
// For each iteration over the height of the board push in an array that is the width of the board.

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
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

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  
}

//

/** placeInTable: update DOM to place piece into HTML table of board */

// Update the board to place the correct piece into the HTML board
function placeInTable(yAxis, xAxis) {
  let piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  let targetCell = document.getElementById(`${yAxis}-${xAxis}`)
  targetCell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
