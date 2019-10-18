let tiles;
let numMoves = 0;
let time = {
    minutes: 0,
    seconds: 0
}
let timerId;

let initTimer = () => {
    timerId = setInterval(() => {
        let timerElement = document.querySelector("#timer");
        if (time.seconds + 1 === 60) {
            time.minutes++;
            time.seconds = 0;
        } else {
            time.seconds++;
        }
        if (time.minutes > 0) {
            timerElement.innerText = time.minutes
            if (time.seconds > 9) timerElement.innerText += `m ${time.seconds}s`;
            else timerElement.innerText += `m 0${time.seconds}s`;
        } else {
            if (time.seconds > 9) timerElement.innerText = `${time.seconds}s`;
            else timerElement.innerText = `0${time.seconds}s`;
        }
    }, 1000);
}

window.onload = e => {
    tiles = document.querySelectorAll('td');
    generateRandomGame();
}

const BOARD_DIMENSIONS = {
    ROWS: 4,
    COLUMNS: 4
}

let shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let isValidMove = index => {
    let getIndex = index => index >= 0 && index < tiles.length ? index : null;
    let upperIndex = getIndex(index - BOARD_DIMENSIONS.COLUMNS);
    let lowerIndex = getIndex(index + BOARD_DIMENSIONS.COLUMNS);
    let leftIndex = getIndex(index - 1);
    let rightIndex = getIndex(index + 1);
    if (upperIndex != null && !tiles[upperIndex].innerText) return upperIndex;
    if (lowerIndex != null && !tiles[lowerIndex].innerText) return lowerIndex;
    if (leftIndex != null && !tiles[leftIndex].innerText) return leftIndex;
    if (rightIndex != null && !tiles[rightIndex].innerText) return rightIndex;
    return -1;
}

let gameWon = () => {
    let foundEmptyTileIndex = false;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].innerText === "") {
            foundEmptyTileIndex = true;
            continue;
        }
        if (parseInt(tiles[i].innerText) !== (foundEmptyTileIndex ? i : i + 1)) return false;
    }
    return true;
}

let makeMove = tileIndex => {
    let emptyTileIndex = isValidMove(tileIndex);
    if (emptyTileIndex > -1) {
        document.querySelector('.error-message').style.display = 'none';
        swapNodes(tiles[tileIndex], tileIndex, tiles[emptyTileIndex], emptyTileIndex);
        tiles = document.querySelectorAll('td');
        document.querySelector("#numMoves").innerText = ++numMoves;
        if (gameWon()) {
            clearInterval(timerId);
            document.querySelector('.win-message').style.display = 'block';
            let willPlayNewGame = confirm("You won! Would you like to play again?");
            if (willPlayNewGame) generateRandomGame();
            else tiles.forEach(td => td.onclick = null);
        }
    } else {
        document.querySelector('.error-message').style.display = 'block';
    }
}

let swapNodes = (element1, index1, element2, index2) => {
    var clonedElement1 = element1.cloneNode(true);
    var clonedElement2 = element2.cloneNode(true);

    clonedElement1.onclick = () => makeMove(index2);
    clonedElement2.onclick = () => makeMove(index1);

    element2.parentNode.replaceChild(clonedElement1, element2);
    element1.parentNode.replaceChild(clonedElement2, element1);
}

let reset = () => {
    document.querySelector('.error-message').style.display = 'none';
    document.querySelector('.win-message').style.display = 'none';
    clearInterval(timerId);
    document.querySelector("#timer").innerText = '00s';
    document.querySelector("#numMoves").innerText = "0";
    numMoves = 0;
    time.minutes = 0;
    time.seconds = 0;
    initTimer();
}

let generateRandomGame = () => {    
    reset();
    let shuffledTileNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
    shuffle(shuffledTileNums);

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].innerText = shuffledTileNums[i];
        tiles[i].onclick = () => makeMove(i);
    }
}

let generateSimpleGame = () => {
    reset();
    let tileNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, "", 13, 14, 15, 12]
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].innerText = tileNums[i];
        tiles[i].onclick = () => makeMove(i);
    }
}