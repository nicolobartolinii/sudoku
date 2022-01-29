/* function createBoard() {
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
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (i === j) {
                fillBox(board, i, j);
            }
        }
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (i !== j) {
                fillBox(board, i, j);
            }
        }
    }
    return board;
}



function checkDiagonalBox(board, x, y, num) {
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
        for (let j = 0; j < 3 && isValid; j++) {
            if (i !== row && j !== col)
                if (board[row + i][col + j] === num) {
                    isValid = false;
                }
        }
    }
    return isValid;
}

function checkRow(board, row, col, num) {
    let isValid = true;
    for (let i = 0; i < 9 && isValid; i++) {
        if (i !== col)
            if (board[row][i] === num)
                isValid = false;
    }
    return isValid;
}

function checkColumn(board, row, col, num) {
    let isValid = true;
    for (let i = 0; i < 9 && isValid; i++) {
        if (i !== row)
            if (board[i][col] === num)
                isValid = false;
    }
    return isValid;
}

function checkTotal(board, row, col, num) {
    while (!(checkBox(board, row, col, num) && checkRow(board, row, col, num) && checkColumn(board, row, col, num))) {
        num = getNum();
    }
    return num;
}

function fillBox(board, rowStart, colStart) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (rowStart === colStart)
                board[rowStart + i][colStart + j] = checkDiagonalBox(board, rowStart, colStart, getNum());
            else
                board[rowStart + i][colStart + j] = checkTotal(board, rowStart, colStart, getNum());
        }
    }
} */

function getNum() {
    return Math.round((Math.random() * 8) + 1);
}

function fillDiagBox(board, x, y) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let num = getNum();
            while (!checkBox(board, x, y, num))
                num = getNum();
            board[x + i][y + j] = num;
        }
    }
}

function checkBox(board, x, y, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[x - (x % 3) + i][y - (y % 3) + j] === num)
                return false;
        }
    }
    return true;
}

function checkRow(board, row, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num)
            return false;
    }
    return true;
}

function checkCol(board, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num)
            return false;
    }
    return true;
}

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
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (i === j) {
                fillDiagBox(board, i, j);
            }
        }
    }
    /* for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {

            }
        }
    } */

    return board;
}


function solver(board, startRow = 0, startCol = 0, backtracking = false) {
    for (let i = startRow; i < 9; i++) {
        for (let j = i === startRow ? startCol : 0; j < 9; j++) {
            if (board[i][j] === 0 || backtracking) {
                let possibilities = [];
                console.log(possibilities.length);
                for (let k = 0; k < 9; k++) {
                    if (checkBox(board, i, j, k) && checkRow(board, i, k) && checkCol(board, j, k))
                        possibilities.push(k);
                }
                if (possibilities.length > 0)
                    board[i][j] = possibilities[0];
                else if (possibilities.length === 1)
                    board[i][j] = possibilities[0];
                else if (possibilities.length === 0) {
                    solver(board, j === 0 ? i - 1 : i, j === 0 ? 8 : j - 1, true);
                }
                console.log(`Solver. [${i}][${j}]: ${possibilities}. Length: ${possibilities.length}`);
            }
        }
    }
    return board;
}