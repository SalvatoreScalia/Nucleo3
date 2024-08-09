document.addEventListener('DOMContentLoaded', function() {
    let autoScroll = true;
    const role = localStorage.getItem('userRole');

    if (!role) {
        // Redirige al login si no hay rol en localStorage
        window.location.href = 'login.html';
        return;
    }
    if (role === 'player') {
        document.getElementById('player-container').style.display = 'block';
        connectWebSockets();
    }
    else{
        // Redirige al login si no hay rol en localStorage
        window.location.href = 'login.html';
        return;
    }

    // Función para limpiar el buffer dejando solo el último mensaje
    function clearBuffer() {
        const mensajesDiv = document.getElementById('messages');
        const mensajes = mensajesDiv.children;
        
        if (mensajes.length > 1) {
            // Dejar solo el último mensaje
            while (mensajesDiv.childElementCount > 1) {
                mensajesDiv.removeChild(mensajesDiv.firstChild);
            }
        }
    }
    function reconnectSockets() {
        if(socketData.readyState === WebSocket.CLOSED && socketCommands.readyState === WebSocket.CLOSED){
            connectWebSockets();
        }   
        else{
            console.log(`Ya estas conectado socketData: ${socketData.readyState}`);
        }
    }
    function connectCommands() {
        socketComandos = WebSocketService.connectCommands(
            'ws://localhost:8766',
            function() {
                console.log('Conectado al servidor de comandos.');
            },
            function(event) {
                console.error('Error de conexión con el servidor de comandos:', event);
            }
        );
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

    document.getElementById('updateStatusButton').addEventListener('click', function() {
        const command = JSON.stringify({ index: 0, state: false });
        if (socketCommands.readyState === WebSocket.OPEN) {
            socketCommands.send(command);
        } else {
            console.error('La conexión con el servidor de comandos no está abierta.');
        }
    });
    //button for auto-auto scroll
    document.getElementById('toggleScrollButton')?.addEventListener('click', function() {
        autoScroll = !autoScroll;
        this.textContent = autoScroll ? 'Desactivar Auto-scroll' : 'Activar Auto-scroll';
        console.log(`Auto-scroll ${autoScroll ? 'activado' : 'desactivado'}.`);
    });

    document.getElementById('reconnectButton')?.addEventListener('click', function() {
        console.log('Intentando reconectar...');
        reconnectSockets();
    });

    document.getElementById('clearBufferButton')?.addEventListener('click', function() {//botton limpiar linkeado a la funcion.
        clearBuffer();
    });

    document.getElementById('logoutButton')?.addEventListener('click', function() {//logoutButton
        console.log('Cerrando sesión...');
        localStorage.removeItem('userRole'); // Limpia el rol al hacer logout
        window.location.href = 'login.html';
    });
    // Configurar la limpieza del buffer cada 15 segundos
    setInterval(clearBuffer, 15000);
});