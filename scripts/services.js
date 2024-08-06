const WebSocketService = (function() {
    let socketData = null;
    let socketCommands = null;

    function connectDataIncoming(url, onMessage, onError, onClose) {
        socketData = new WebSocket(url);
        socketData.onmessage = onMessage;
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

    return {
        connectDataIncoming: connectDataIncoming,
        connectCommands: connectCommands
    };
})();