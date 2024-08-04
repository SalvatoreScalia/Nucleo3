const WebSocketService = (function() {
    let socketEstado = null;
    let socketComandos = null;

    function conectarEstado(url, onMessage, onError) {
        socketEstado = new WebSocket(url);
        socketEstado.onmessage = onMessage;
        socketEstado.onerror = onError;
        return socketEstado;
    }

    function conectarComandos(url, onOpen, onError) {
        socketComandos = new WebSocket(url);
        socketComandos.onopen = onOpen;
        socketComandos.onerror = onError;
        return socketComandos;
    }

    return {
        conectarEstado: conectarEstado,
        conectarComandos: conectarComandos
    };
})();
