// master.js

import { WebSocketService } from './websocketService.js';
import { showLoadingScreen, hideLoadingScreen, clearBuffer } from './domUtils.js';
import { setupEventListeners } from './eventHandlers.js';

document.addEventListener('DOMContentLoaded', function() {
    let autoScroll = true;
    const role = localStorage.getItem('userRole');
    if (!role || role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('admin-container').style.display = 'block';
    let socketCommands, socketData;

    function connectWebSockets() {
        socketData = WebSocketService.connectDataIncoming(
            'ws://localhost:8765',
            (event) => {
                const messageDiv = document.getElementById('messages');
                const message = document.createElement('p');
                message.textContent = `Mensaje recibido: ${event.data}`;
                messageDiv.appendChild(message);
                if (autoScroll) {
                    const messageContainer = document.getElementById('messages-container');
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                }
                hideLoadingScreen();
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

    connectWebSockets();
    setupEventListeners(socketCommands);

    setInterval(() => clearBuffer(1), 15000);
});
