let autoScroll = true;

function showLoadingScreen() {
    document.getElementById('loading-container').style.display = 'flex';
}

function hideLoadingScreen() {
    document.getElementById('loading-container').style.display = 'none';
}

function clearBuffer(numberOfLinesStartToEnd) {
    const mensajesDiv = document.getElementById('messages');
    while (mensajesDiv.childElementCount > numberOfLinesStartToEnd) {
        mensajesDiv.removeChild(mensajesDiv.firstChild);
    }
    console.log('Buffer de mensajes limpiado.');
}

function toggleAutoScroll(button) {
    autoScroll = !autoScroll;
    button.textContent = autoScroll ? 'Desactivar Auto-scroll' : 'Activar Auto-scroll';
    console.log(`Auto-scroll ${autoScroll ? 'activado' : 'desactivado'}.`);
}

function isAutoScrollEnabled() {
    return autoScroll;
}