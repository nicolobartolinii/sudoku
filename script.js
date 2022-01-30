/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                                BOARD GENERATION FUNCTIONS
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
// Returns a random number between 1 and 9
function getNum() {
    return Math.round((Math.random() * 8) + 1);
}

// Checks if the number is valid in the corresponding 3x3 box
function checkBox(board, x, y, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === x % 3 && j === y % 3)
                continue;
            else if (board[x - (x % 3) + i][y - (y % 3) + j] === num)
                return false;
        }
    }
    return true;
}

// Checks if the number is valid in the corresponding row
function checkRow(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (i === col && i === 0)
            continue;
        else if (i === col && i === 8)
            continue;
        if (board[row][i] === num)
            return false;
    }
    return true;
}

// Checks if the number is valid in the corresponding column
function checkCol(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (i === row && i === 0)
            continue;
        else if (i === row && i === 8)
            continue;
        else if (board[i][col] === num)
            return false;
    }
    return true;
}

// Creates and returns an array with 9 random numbers within 1 and 9 (randomly arranged)
function fillRandomArray() {
    let array = [];
    for (let i = 0; i < 9; i++) {
        let num = getNum();
        while (array.includes(num)) {
            num = getNum();
        }
        array[i] = num;
    }
    return array;
}

// Solves a sudoku board (possibly empty) with a backtracking algorithm
function solver(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                for (let k = 0; k < 9; k++) {
                    let randArray = fillRandomArray();
                    let num = randArray[k];
                    if (checkBox(board, i, j, num) && checkRow(board, i, j, num) && checkCol(board, i, j, num)) {
                        board[i][j] = num;
                        if (solver(board)) {
                            return true;
                        } else {
                            board[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Creates a sudoku board using the solver function
function createBoard() {
    let board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    if (solver(board)) {
        return board;
    } else
        return "Errore";
}

// ========================= CONTROL FUNCTIONS ============================
function findNumbers(board) {
    for (let k = 1; k <= 9; k++) {
        let counter = 0;
        for (let i = 0; i < 9; i++) {
            if (board[i].includes(k))
                counter++;
        }
        console.log(`Number ${k} is present ${counter} times.`);
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                                    HTML FUNCTIONS
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

let board = createBoard();

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        let cell = document.querySelector(`#c${i}${j}`);
        console.log(cell);
        cell.textContent = `${board[i][j]}`;
    }
}