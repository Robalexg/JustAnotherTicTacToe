
let player = 'X'
let board = ['','','','','','','','','']
const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal (top-left to bottom-right)
    [2, 4, 6]  // Diagonal (top-right to bottom-left)
];


let checkWinner = (board) => {
    for(let i = 0; i < winPatterns.length; i++){
        let pos1 = board[winPatterns[i][0]];
        let pos2 = board[winPatterns[i][1]];
        let pos3 = board[winPatterns[i][2]];
        if (pos1 !== '' && pos1 === pos2 && pos2 === pos3) {
            return pos1;
        }
    }
    return null; 
}

let addPieceToBoard = (index,player) => {
    board[index] = player
    
    if(checkWinner(board)){
        gameOver(player)
    }else if(!board.includes("")){
        gameOver('draw')
    }
}

let getPiece = (target) => {
    if(!target.textContent){
        if(player === "X"){
            addPieceToBoard(target.id,player)
            player = 'O'
            return "X"
        }else{
            addPieceToBoard(target.id,player)
            player = "X"
            return "O"
        }
    }

    return target.textContent
}

let addEventsToSquares = () => {
    const square = document.querySelectorAll('.gameSquare')
    let onClick = (e) => {
        e.target.textContent = getPiece(e.target)
    }

    for(let i =0; i < square.length; i++){
        square[i].addEventListener('click',onClick)
    }
}

let gameOver = (winner) => {
    let gameOverMessage = document.querySelector(".gameOverMessage")
    let gameOverOverlay = document.querySelector('.gameOverOverlay')
    let playAgainBtn = document.querySelector('.playAgainBtn')
    playAgainBtn.style.display = 'block'
    gameOverOverlay.show()
    let message = document.createElement('h1')

    if(winner === 'draw'){
        message.textContent = "It's a draw!"
    }else{
        message.textContent = `Game Over! ${winner} wins!`
    }

    changeScore(winner)
    gameOverMessage.appendChild(message)
}

let restartGame = () => {
    let gameOverMessage = document.querySelector(".gameOverMessage")
    let gameOverOverlay = document.querySelector('.gameOverOverlay')
    let playAgainBtn = document.querySelector('.playAgainBtn')
    let squares = document.querySelectorAll('.gameSquare')

    playAgainBtn.style.display = 'none'
    gameOverMessage.textContent = ''
    gameOverOverlay.close()
    player = "X"
    board =  ['','','','','','','','','']
    
    for(let i = 0; i < squares.length; i++){
        squares[i].textContent = ''
    }


}

let changeScore = (winner) => {
    let playerX = document.querySelector('.playerX').children[1]
    let playerO = document.querySelector('.playerO').children[1]
    let draw = document.querySelector('.draw').children[1]


    if(winner === "draw"){
        let score = parseInt(draw.textContent,10)
        score++
        draw.textContent = score
    }else if(winner === "X"){
        let score = parseInt(playerX.textContent,10)
        score++
        playerX.textContent = score
    }else{
        let score = parseInt(playerO.textContent,10)
        score++
        playerO.textContent = score
    }
}

let init = () => {
    let playAgainBtn = document.querySelector('.playAgainBtn')
    addEventsToSquares()

    playAgainBtn.addEventListener("click",(e) => {
        restartGame()
    })
}

init()
