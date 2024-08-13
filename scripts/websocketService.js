
const url = "wss//d3313e93-240b-45e4-be44-0ad52901106a-00-1r2w1zvo1mk1h.worf.replit.dev";
const portCommands = ":3002";
const portData = ":3001";
const pathCommands = "/commands";
const pathData = "/data";

const WebSocketService = (function() {
    let socketData = null;
    let socketCommands = null;


    function connectDataIncoming( onMessage,onOpen, onError, onClose) {
        socketData = new WebSocket(url+portData+pathData);
        socketData.onmessage = onMessage;
        socketData.onopen = onOpen
        socketData.onerror = onError;
        socketData.onclose = onClose;
        return socketData;
    }

    function connectCommands( onOpen, onError, onClose) {
        socketCommands = new WebSocket(url+portCommands+pathCommands);
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

