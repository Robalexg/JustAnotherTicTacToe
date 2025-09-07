const square = document.querySelectorAll('.gameSquare')
let player = true

let getPiece = () => {
    if(player){
        player = !player
        return "X"
    }else{
        player = !player
        return "O"
    }
}

let addEventsToSquares = () => {
    let onClick = (e) => {
        e.target.textContent = getPiece()
    }

    for(let i =0; i < square.length; i++){
        square[i].addEventListener('click',onClick)
    }
}

let init = () => {
    addEventsToSquares()
}


init()
