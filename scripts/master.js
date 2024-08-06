document.addEventListener('DOMContentLoaded', function() {
    let autoScroll = true;
    let socketData, socketCommands;
    const role = localStorage.getItem('userRole');//bloque de role

    if (!role) {
        // Redirige al login si no hay rol en localStorage
        window.location.href = 'login.html';
        return;
    }
    if (role === 'admin') {
        document.getElementById('admin-container').style.display = 'block';
        // Conectar WebSockets aquí
        connectWebSockets();
    }else{
        // Redirige al login si no hay rol en localStorage
        window.location.href = 'login.html';
        return;
    }

    function reconnectSockets() {
        if(socketData.readyState === WebSocket.CLOSED && socketCommands.readyState === WebSocket.CLOSED){
            connectWebSockets();
        }   
        else{
            console.log(`Ya estas conectado socketData: ${socketData.readyState}`);
        }
    }

    function connectWebSockets() {
        socketData =  WebSocketService.connectDataIncoming(
            'ws://localhost:8765',
            function(event) {
                const messaageDiv = document.getElementById('messages');
                const message = document.createElement('p');
                message.textContent = `Mensaje recibido: ${event.data}`;
                messaageDiv.appendChild(message);

                if (autoScroll) {
                    const messageContainer = document.getElementById('messages-container');
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                }
            },
            function(event) {
                console.error('Error de conexión con el servidor de DataIncoming:', event);
            },
            function(event){
                console.warn('Conexión dataIncoming cerrada: ',event);
            }
        );

        socketCommands = WebSocketService.connectCommands(
            'ws://localhost:8766',
            function() {
                console.log('Conectado al servidor de comandos.');
            },
            function(event) {
                console.error('Error de conexión con el servidor de comandos:', event);
            },
            function(event){
                console.warn('Conexión commands cerrada: ', event);
            }
        );
    }

    function connectCommands() {
        socketCommands = WebSocketService.connectCommands(
            'ws://localhost:8766',
            function() {
                console.log('Conectado al servidor de comandos.');
            },
            function(event) {
                console.error('Error de conexión con el servidor de comandos:', event);
            },
            function(event){
                console.warn('Conexión cerrada: ', event);
            }
        );
    }

    function sendCommand(comando) {
        if (socketCommands && socketCommands.readyState === WebSocket.OPEN) {
            socketCommands.send(comando);
        } else {
            console.error('La conexión con el servidor de comandos no está abierta.');
        }
    }

    document.getElementById('stopButton')?.addEventListener('click', function() {
        let stop = JSON.stringify("stop");
        sendCommand(stop);
    });

    document.getElementById('reconnectButton')?.addEventListener('click', function() {
        console.log('Intentando reconectar...');
        reconnectSockets();
    });

    document.getElementById('toggleScrollButton')?.addEventListener('click', function() {
        autoScroll = !autoScroll;
        this.textContent = autoScroll ? 'Desactivar Auto-scroll' : 'Activar Auto-scroll';
        console.log(`Auto-scroll ${autoScroll ? 'activado' : 'desactivado'}.`);
    });

    document.getElementById('clearBufferButton')?.addEventListener('click', function() {
        const messageDiv = document.getElementById('messages');
        while (messageDiv.firstChild) {
            messageDiv.removeChild(messageDiv.firstChild);
        }
        const mensajesContainer = document.getElementById('messages-container');
        mensajesContainer.scrollTop = 0;
        console.log('Buffer de mensajes limpiado manualmente.');
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
        console.log('Cerrando sesión...');
        localStorage.removeItem('userRole'); // Limpia el rol al hacer logout
        window.location.href = 'login.html';
    });
});