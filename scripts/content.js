const url = '//d3313e93-240b-45e4-be44-0ad52901106a-00-1r2w1zvo1mk1h.worf.replit.dev';
const portCommands = ':3002';
const portData = ':3001';
const pathCommands = '/commands';
const pathData = '/data';

function connectWebSockets() {
    socketData = WebSocketService.connectDataIncoming((url+portData+pathData),
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

    socketCommands = WebSocketService.connectCommands((url+portCommands+pathCommands),
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