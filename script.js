/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                                BOARD RELATED FUNCTIONS
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

// Checks if the number is valid in the corresponding 3x3 box considering empty strings
function checkBoxString(board, x, y, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((i === x % 3 && j === y % 3) || board[x - (x % 3) + i][y - (y % 3) + j] === '')
                continue;
            else if (parseInt(board[x - (x % 3) + i][y - (y % 3) + j]) === num)
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

// Checks if the number is valid in the corresponding row considering empty strings
function checkRowString(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if ((i === col /* && i === 0 */ ) || board[row][i] === '')
            continue;
        /* else if (i === col && i === 8)
            continue; */
        if (parseInt(board[row][i]) === num)
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

// Checks if the number is valid in the corresponding column considering empty strings
function checkColString(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if ((i === row /* && i === 0 */ ) || board[row][i] === '')
            continue;
        /* else if (i === row && i === 8)
            continue; */
        else if (parseInt(board[i][col]) === num)
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

// Checks if a board is equal to another board
function areBoardsSame(board, otherBoard) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== otherBoard[i][j])
                return false;
        }
    }
    return true;
}

// Copies a board into a new board
function copyBoard(board) {
    let newBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++)
            newBoard[i][j] = board[i][j];
    }
    return newBoard;
}

// Checks if an array contains another array
function isArrayInArray(array, otherArray) {
    let otherArrayAsString = JSON.stringify(otherArray);

    let contains = array.some(function (e) {
        return JSON.stringify(e) === otherArrayAsString;
    });
    return contains;
}

// Randomly clears (setting to 0) n cells in a board
function clearCells(board, n) {
    let positions = [];
    for (let i = 0; i < n; i++) {
        let numA = getNum() - 1;
        let numB = getNum() - 1;
        let num = [numA, numB];
        while (isArrayInArray(positions, num)) {
            numA = getNum() - 1;
            numB = getNum() - 1;
            num = [numA, numB];
        }
        positions.push([numA, numB]);
    }
    for (let i = 0; i < n; i++) {
        board[positions[i][0]][positions[i][1]] = 0;
    }
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

/* ============================== DOM ==================================== */
const themeSwitch = document.querySelector(".switch input");
const body = document.querySelector("body");
const td = document.querySelectorAll("td");
const tbody = document.querySelectorAll("tbody");
const colgroup = document.querySelectorAll("colgroup");
const buttons = document.querySelectorAll(".numbers button");
const restartButton = document.querySelector(".restart-button");
const timer = document.querySelector(".timer");
const errorCounterText = document.querySelector(".error-counter");

/* ============================== EVENT LISTENERS ==================================== */

td.forEach((cell) => {
    cell.addEventListener('click', toggleSelected);
});

buttons.forEach((button) => {
    button.addEventListener('click', putNumber)
});

themeSwitch.addEventListener('change', () => {
    body.classList.toggle("light");
});

restartButton.addEventListener('click', () => {
    timer.textContent = "00:00";
    errorCounter = 0;
    seconds = 0;
    clearInterval(intervalTimer);
    intervalTimer = setInterval(setTimer, 1000);
    board = createBoard();
    solvedBoard = copyBoard(board);

    clearCells(board, 61);
    fillHTMLTable(board);
})

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                                    HTML FUNCTIONS
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

function toggleSelected() {
    if (this.classList.contains("selected")) {
        this.classList.toggle("selected");
        return;
    }
    td.forEach((selected) => {
        if (selected.classList.contains("selected"))
            selected.classList.remove("selected");
    });
    this.classList.toggle("selected");
}

function putNumber() {
    const selected = document.querySelector(".selected");
    if (!selected.classList.contains("untouchable")) {
        const row = parseInt(selected.outerHTML.charAt(9));
        const col = parseInt(selected.outerHTML.charAt(10));
        const num = parseInt(this.textContent);
        if (this.classList.contains("backspace-button")) {
            selected.textContent = '';
            board[row][col] = 0;
        }
        selected.textContent = this.textContent;
        selected.classList.add("player-guess");
        board[row][col] = num;
        const valid = checkBoxString(board, row, col, num) && checkRowString(board, row, col, num) && checkColString(board, row, col, num);
        if (!valid) {
            selected.classList.add("wrong");
            errorCounter++;
            setErrorCounter();
        } else if (valid && selected.classList.contains("wrong")) {
            selected.classList.remove("wrong");
        }
        const win = areBoardsSame(board, solvedBoard);
        if (win) {
            td.forEach((cell) => {
                cell.classList.add("win");
            });
            tbody.forEach((body) => {
                body.classList.add("win");
            });
            colgroup.forEach((col) => {
                col.classList.add("win");
            });
        } else if (!win && selected.classList.contains("win")) {
            td.forEach((cell) => {
                cell.classList.remove("win");
            });
            tbody.forEach((body) => {
                body.classList.remove("win");
            });
            colgroup.forEach((col) => {
                col.classList.remove("win");
            });
        }
    }
}

function setErrorCounter() {
    errorCounterText.textContent = `Errors: ${errorCounter}`;
}

function fillHTMLTable(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.querySelector(`#c${i}${j}`);
            if (cell.classList.contains("untouchable") || cell.classList.contains("player-guess") || cell.classList.contains("wrong")) {
                cell.classList.remove("untouchable");
                cell.classList.remove("player-guess");
                cell.classList.remove("wrong");
            }
            if (board[i][j] === 0) {
                cell.textContent = '';
            } else {
                cell.textContent = board[i][j];
                cell.classList.add("untouchable");
            }
        }
    }
}

function setTimer() {
    seconds++;
    let min = Math.trunc(seconds / 60);
    let sec = seconds % 60;
    if (min < 60) {
        timer.textContent = `${min.toString().length === 1 ? "0".concat(min.toString()) : min.toString()}:${sec.toString().length === 1 ? "0".concat(sec.toString()) : sec.toString()}`
    } else {
        let hour = Math.trunc(min / 60);
        min = min % 60;
        timer.textContent = `${hour.toString().length === 1 ? "0".concat(hour.toString()) : hour.toString()}:${min.toString().length === 1 ? "0".concat(min.toString()) : min.toString()}:${sec.toString().length === 1 ? "0".concat(sec.toString()) : sec.toString()}`
    }
}

// ===================================================================================

let board;
let errorCounter = 0;
let seconds = 0;
let intervalTimer;