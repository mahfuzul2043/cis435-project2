let tiles;
window.onload = e => {
    tiles = document.querySelectorAll('td');
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
    if (upperIndex && !tiles[upperIndex].innerText) return upperIndex;
    if (lowerIndex && !tiles[lowerIndex].innerText) return lowerIndex;
    if (leftIndex && !tiles[leftIndex].innerText) return leftIndex;
    if (rightIndex && !tiles[rightIndex].innerText) return rightIndex;
    return -1;
}
let makeMove = tileIndex => {
    let emptyTileIndex = isValidMove(tileIndex);
    if (emptyTileIndex > -1) {
        swapNodes(tiles[tileIndex], tileIndex, tiles[emptyTileIndex], emptyTileIndex);
        tiles = document.querySelectorAll('td');
    } else {
        alert("Invalid move.");
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
let generateRandomGame = () => {
    let shuffledTileNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
    shuffle(shuffledTileNums);

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].innerText = shuffledTileNums[i];
        tiles[i].onclick = () => makeMove(i);
    }
}
let generateSimpleGame = () => {

}