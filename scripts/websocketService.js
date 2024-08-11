const WebSocketService = (function() {
    let socketData = null;
    let socketCommands = null;

    function connectDataIncoming(url, onMessage,onOpen, onError, onClose) {
        socketData = new WebSocket(url);
        socketData.onmessage = onMessage;
        socketData.onopen = onOpen
        socketData.onerror = onError;
        socketData.onclose = onClose;
        return socketData;
    }

    function connectCommands(url, onOpen, onError, onClose) {
        socketCommands = new WebSocket(url);
        socketCommands.onopen = onOpen;
        socketCommands.onerror = onError;
        socketCommands.onclose = onClose;
        return socketCommands;
    }

    function reconnectSockets() {
        if(socketData.readyState === WebSocket.CLOSED && socketCommands.readyState === WebSocket.CLOSED){
            console.log('Reconectando sockets...');
            showLoadingScreen();
            // Reconnect
            connectDataIncoming(
                'ws://9f4da686-0560-4b5d-b7a4-0dbc8199db2c-00-1l5hizes5v288.kirk.replit.dev:3001/data',
                socketData.onmessage,     
                () => {
                    console.log('Conectado al servidor dataIncoming.');
                    //hideLoadingScreen();
                },
                (event) => console.error('Error de conexión con el servidor de DataIncoming:', event),
                (event) => console.warn('Conexión dataIncoming cerrada:', event)
            );

            connectCommands(
                'ws://9f4da686-0560-4b5d-b7a4-0dbc8199db2c-00-1l5hizes5v288.kirk.replit.dev:3002/commands',
                () => {
                    console.log('Conectado al servidor de comandos.');
                    hideLoadingScreen();
                },
                (event) => console.error('Error de conexión con el servidor de comandos:', event),
                (event) => {
                    hideLoadingScreen();
                    console.warn('Conexión commands cerrada:', event)
                }
            );
        }
        else{
            console.log(`Ya estas conectado socketData: ${socketData.readyState} socketCommands: ${socketCommands.readyState}`);
        }
    }

    function sendCommand(command) {
        if (socketCommands && socketCommands.readyState === WebSocket.OPEN) {
            socketCommands.send(command);
        } else {
            console.error('La conexión con el servidor de comandos no está abierta.');
        }
    }

    return {
        connectDataIncoming: connectDataIncoming,
        connectCommands: connectCommands,
        reconnectSockets: reconnectSockets,
        sendCommand: sendCommand
    };
})();