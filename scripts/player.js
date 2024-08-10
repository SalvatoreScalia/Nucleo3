document.addEventListener('DOMContentLoaded', function() {
    let socketCommands, socketData;
    const role = localStorage.getItem('userRole');

    if (!role || role !=='player') {
        // Redirige al login si no hay rol en localStorage
        window.location.href = 'login.html';
        return;
    }
    if (role === 'player') {
        document.getElementById('player-container').style.display = 'block';
        // Conectar WebSockets aquí
        connectWebSockets();
    }

    function connectWebSockets() {
        socketData = WebSocketService.connectDataIncoming(
            'ws://localhost:8765',
            (event) => {
                const messageDiv = document.getElementById('messages');
                const message = document.createElement('p');
                message.textContent = `Mensaje recibido: ${event.data}`;
                messageDiv.appendChild(message);
                if (isAutoScrollEnabled()) {
                    const messageContainer = document.getElementById('messages-container');
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                }
            },
            () => {
                console.log('Conectado al servidor dataIncoming.');
                //hideLoadingScreen();
            },
            (event) => console.error('Error de conexión con el servidor de DataIncoming:', event),
            (event) => console.warn('Conexión dataIncoming cerrada:', event)
        );

        socketCommands = WebSocketService.connectCommands(
            'ws://localhost:8766',
            () => {
                console.log('Conectado al servidor de comandos.');
                hideLoadingScreen();
            },
            (event) => console.error('Error de conexión con el servidor de comandos:', event),
            (event) => console.warn('Conexión commands cerrada:', event)
        );
    }

    setupEventListeners();
    setInterval(() => clearBuffer(0), 15000);
});
