// domUtils.js

export function showLoadingScreen() {
    document.getElementById('loading-container').style.display = 'flex';
}

export function hideLoadingScreen() {
    document.getElementById('loading-container').style.display = 'none';
}

export function clearBuffer(numberOfLinesStartToEnd) {
    const mensajesDiv = document.getElementById('messages');
    while (mensajesDiv.childElementCount > numberOfLinesStartToEnd) {
        mensajesDiv.removeChild(mensajesDiv.firstChild);
    }
}
