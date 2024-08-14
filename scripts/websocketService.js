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
        sendCommand: sendCommand
    };
})();

