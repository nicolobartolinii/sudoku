function getNum() {
    return Math.round((Math.random() * 8) + 1);
}

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