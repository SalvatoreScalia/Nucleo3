const url = 'wss://d3313e93-240b-45e4-be44-0ad52901106a-00-1r2w1zvo1mk1h.worf.replit.dev'; // URL base del servidor WebSocket
const port = ':3001';
const path = ''; // No hay subruta definida para comandos
let  socketData;

function connectWebSockets() {
    socketData = WebSocketService.connectDataInOut(
        (url+port+path),
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
            //console.log(langStrings);
            hideLoadingScreen();
        },
        (event) => console.error('Error de conexión con el servidor de DataInOut:', event),
        (event) => {
            console.warn('Conexión DataInOut cerrada:', event);
            hideLoadingScreen();
        }
    );
}


function reconnectSockets() {
    if (socketData.readyState === WebSocket.CLOSED) {
        console.log('Reconectando sockets...');
        showLoadingScreen(); // Descomenta esta línea si tienes una función de pantalla de carga
        connectWebSockets();
    } else {
        console.log(`Ya estás conectado... (websocket.readystate: ${socketData.readyState})`);
    }
}