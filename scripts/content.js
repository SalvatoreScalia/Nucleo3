function connectWebSockets() {
    socketData = WebSocketService.connectDataIncoming(
        configStrings["urlServer"]+":3001/data",
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
        'https://d3313e93-240b-45e4-be44-0ad52901106a-00-1r2w1zvo1mk1h.worf.replit.dev:3002/commands',
        () => {
            console.log('Conectado al servidor de comandos.');
            hideLoadingScreen();
        },
        (event) => console.error('Error de conexión con el servidor de comandos:', event),
        (event) =>{
            console.warn('Conexión commands cerrada:', event)
            hideLoadingScreen();
        }
    );
}

function reconnectSockets() {
    if(socketData.readyState === WebSocket.CLOSED && socketCommands.readyState === WebSocket.CLOSED){
        console.log('Reconectando sockets...');
        showLoadingScreen();
        connectWebSockets();   
    }
    else{
        console.log(`Ya estas conectado socketData: ${socketData.readyState} socketCommands: ${socketCommands.readyState}`);
    }
}

