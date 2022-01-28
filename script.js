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
    /* for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (i === j) {
                fillBox(board, i, j);
            }
        }
    }
    console.log("Completate diagonali");
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (i !== j) {
                fillBox(board, i, j);
            }
        }
    } */
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            checkTotal(board, i, j);
        }
    }
    return board;
}

function getNum() {
    return Math.round((Math.random() * 8) + 1);
}

function checkCell(board, x, y, num) {
    let isValid = true;
    for (let i = 0; i < 3 && isValid; i++) {
        for (let j = 0; j < 3 && isValid; j++) {
            if (board[x - (x % 3) + i][y - (y % 3) + j] === num) {
                isValid = false;
            }
        }
    }
    return isValid ? num : checkCell(board, x, y, getNum());
}

function checkBox(board, row, col, num) {
    let isValid = true;
    for (let i = 0; i < 3 && isValid; i++) {
        console.log("Primo for checkBox");
        for (let j = 0; j < 3 && isValid; j++) {
            console.log("Secondo for checkBox");
            if (board[row - (row % 3) + i][col - (col % 3) + j] === num) {
                isValid = false;
            }
        }
    }
    return isValid;
}

function checkRow(board, row, col, num) {
    let isValid = true;
    for (let i = 0; i < 9 && isValid; i++) {
        console.log("for checkRow");
        if (board[row][i] === num)
            isValid = false;
    }
    return isValid;
}

function checkColumn(board, row, col, num) {
    let isValid = true;
    for (let i = 0; i < 9 && isValid; i++) {
        console.log("for checkColumn");
        if (i !== row)
            if (board[i][col] === num)
                isValid = false;
    }
    return isValid;
}

function checkTotal(board, row, col) {
    for (let k = 0; k < col; k++) {
        for (let i = 0; i < 9; i++) {
            if ((checkBox(board, row, col, i) && checkRow(board, row, col, i) && checkColumn(board, row, col, i))) {
                board[row][col] = i;
                return;
            }
        }
        checkTotal(board, row, col - 1);
    }
    checkTotal(board, row - 1, 8);
}

function fillBox(board, rowStart, colStart) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (rowStart === colStart)
                board[rowStart + i][colStart + j] = checkCell(board, rowStart, colStart, getNum());
            else
                board[rowStart + i][colStart + j] = checkTotal(board, rowStart, colStart, getNum());
        }
    }
}