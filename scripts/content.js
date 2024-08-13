function connectWebSockets() {
    socketData = WebSocketService.connectDataIncoming(
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