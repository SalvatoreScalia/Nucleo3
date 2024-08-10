// eventHandlers.js

export function setupEventListeners(socketCommands) {
    document.getElementById('updateStatusButton').addEventListener('click', function() {
        const command = JSON.stringify({ command: 'new', index: 0, state: true });
        if (socketCommands.readyState === WebSocket.OPEN) {
            socketCommands.send(command);
        } else {
            console.error('La conexión con el servidor de comandos no está abierta.');
        }
    });

    document.getElementById('toggleScrollButton')?.addEventListener('click', function() {
        autoScroll = !autoScroll;
        this.textContent = autoScroll ? 'Desactivar Auto-scroll' : 'Activar Auto-scroll';
        console.log(`Auto-scroll ${autoScroll ? 'activado' : 'desactivado'}.`);
    });

    document.getElementById('reconnectButton')?.addEventListener('click', function() {
        console.log('Intentando reconectar...');
        reconnectSockets();
    });

    document.getElementById('clearBufferButton')?.addEventListener('click', function() {
        clearBuffer(0);
        console.log('Buffer de mensajes limpiado manualmente.');
    });

    document.getElementById('logoutButton')?.addEventListener('click', function() {
        console.log('Cerrando sesión...');
        localStorage.removeItem('userRole');
        window.location.href = 'login.html';
    });
}
