
var player;
var currPlayer = 1;

var gameOver = false;
var board;

var rows = 6;
var cols = 7;

window.onload = function() {
    makeBoard();
}

function makeBoard() {
    board = [];
    resetButton = document.querySelector('.reset')
    resetButton.addEventListener("click", resetGame)

    board = new Array(); 
        for (let i = 0; i < rows; i++) {
            let row = [];

            for (let j = 0; j < cols; j++){
                row.push(-1);
                let tile = document.createElement("div");
                tile.id = i.toString() + "-" + j.toString();
                tile.classList.add("tile");
                tile.addEventListener("click", dropToken)
                document.getElementById("board").append(tile);
            }
            board.push(row);
    }
    let p = document.getElementById("player")
    p.innerText = "Player " + currPlayer + "'s Turn!"
}

    function dropToken() {
        let colNum = parseInt(this.id.split("-")[1])
        console.log(board);

        let arr = getCol(colNum);

        let count = 0;
        for(var i = 0; i < rows; i++) {
            if (arr[i] === -1) {
                count++;
            }
            else {
                break;
            }
        }
        if(count === 0) {
            return;
        }
        else {
            board[count - 1][colNum] = currPlayer;
            let tile = document.getElementById((count - 1).toString() + "-" + colNum.toString())
            console.log(tile)
            if(currPlayer === 1) {
                tile.classList.add("red-piece");
                gameOver = checkWin((count - 1), colNum);
                if (gameOver == true) {
                    winner();
                }
                currPlayer = 2;
                let p = document.getElementById("player")
                p.innerText = "Player " + currPlayer + "'s Turn!"
            }
            else {
                tile.classList.add("yellow-piece");
                gameOver = checkWin((count - 1), colNum);
                if (gameOver == true) {
                    winner();
                }
                currPlayer = 1;
                let p = document.getElementById("player")
                p.innerText = "Player " + currPlayer + "'s Turn!"
            }

        }
        return count;
    }    

    function getRow(row) {
        return(board[row]);
    }

    function getCol(col) {
        var retArr = new Array();
        for(var i = 0; i < rows; i++) {
            retArr.push(board[i][col]);
        }
        return retArr
    }

    function getUpRightDiag(row, col) {
        while((row < (rows - 1)) && (col > 0)) {
            row++;
            col--;
        }
        var retArr = new Array();
        while((row >= 0) && (col <= this.cols)) {
            retArr.push(board[row][col]);
            row--;
            col++;
        }
        return retArr;
    }

    function getDownRightDiag(row, col) {
        while((row > 0) && (col > 0)) {
            row--;
            col--;
        }
        var retArr = new Array();
        while((row <= (rows - 1)) && (col <= (cols - 1))) {
            retArr.push(board[row][col]);
            row++;
            col++;
        }
        return retArr;
    }

    function fourInARow(arr) {

        var lastToken = -1;
        var count = 0;
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] != -1) {
                if(arr[i] === lastToken) {
                    count++;
                    if (count >= 4) {
                        return lastToken;
                    }
                }
                else {
                    lastToken = arr[i];
                    count = 1;
                }
            }
            else {
                lastToken = -1;
                count = 0;
            }
        }
        return -1;

    }

    function checkWin(r, c) {
        let check = fourInARow(getRow(r));
        console.log (getRow(r));
        if(check === currPlayer) {
            return true;
        }

        check = fourInARow(getCol(c));
        if(check === currPlayer) {
            return true;
        }

        check = fourInARow(getUpRightDiag(r, c));
        if(check === currPlayer) {
            return true;
        }

        check = fourInARow(getDownRightDiag(r, c));
        if(check === currPlayer) {
            return true;
        }
        return gameOver;
    }

    function winner() {
        let w = document.getElementById("winner")
        if(currPlayer == 1) {
            w.innerText = "Player 1 Wins!"
            w.style.color = 'red'
            removeAL();
        }
        else {
            w.innerText = "Player 2 Wins!"
            w.style.color = 'yellow'
            removeAL();
        }
    }

    function removeAL() {

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let tile = document.getElementById(i.toString() + "-" + j.toString());
                console.log(tile);
                tile.removeEventListener("click", dropToken);
            }
        }
    }

    function resetGame() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let tile = document.getElementById(i.toString() + "-" + j.toString());
                tile.removeEventListener("click", dropToken);
                tile.remove();
            }
        }
        gameOver = false;
        let w = document.getElementById("winner");
        w.innerText = "";
        currPlayer = 1;
        makeBoard();
    }