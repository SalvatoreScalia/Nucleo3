document.addEventListener('DOMContentLoaded', function() {
    let autoScroll = true;
    let socketEstado, socketComandos;
    
    //bloque de role
    const role = localStorage.getItem('userRole');

    if (!role) {
        // Redirige al login si no hay rol en localStorage
        window.location.href = 'login.html';
        return;
    }

    if (role === 'admin') {
        document.getElementById('admin-container').style.display = 'block';
        // Conectar WebSockets aquí
        conectarWebSockets();
        conectarComandos();
    }else{
        // Redirige al login si no hay rol en localStorage
        window.location.href = 'login.html';
        return;
    }

    function reconectarEstado() {
        socketEstado = WebSocketService.conectarEstado(
            'ws://localhost:8765',
            function(event) {
                const mensajesDiv = document.getElementById('mensajes');
                const mensaje = document.createElement('p');
                mensaje.textContent = `Mensaje recibido: ${event.data}`;
                mensajesDiv.appendChild(mensaje);

                if (autoScroll) {
                    const mensajesContainer = document.getElementById('mensajes-container');
                    mensajesContainer.scrollTop = mensajesContainer.scrollHeight;
                }
            },
            function(event) {
                console.error('Error de conexión con el servidor de estado:', event);
            }
        );
    }

    function conectarWebSockets() {
        socketEstado =  WebSocketService.conectarEstado(
            'ws://localhost:8765',
            function(event) {
                const mensajesDiv = document.getElementById('mensajes');
                const mensaje = document.createElement('p');
                mensaje.textContent = `Mensaje recibido: ${event.data}`;
                mensajesDiv.appendChild(mensaje);

                if (autoScroll) {
                    const mensajesContainer = document.getElementById('mensajes-container');
                    mensajesContainer.scrollTop = mensajesContainer.scrollHeight;
                }
            },
            function(event) {
                console.error('Error de conexión con el servidor de estado:', event);
            }
        );

        WebSocketService.conectarComandos(
            'ws://localhost:8766',
            function() {
                console.log('Conectado al servidor de comandos.');
            },
            function(event) {
                console.error('Error de conexión con el servidor de comandos:', event);
            }
        );
    }

    function conectarComandos() {
        socketComandos = WebSocketService.conectarComandos(
            'ws://localhost:8766',
            function() {
                console.log('Conectado al servidor de comandos.');
            },
            function(event) {
                console.error('Error de conexión con el servidor de comandos:', event);
            }
        );
    }

    function enviarComando(comando) {
        if (socketComandos && socketComandos.readyState === WebSocket.OPEN) {
            socketComandos.send(comando);
        } else {
            console.error('La conexión con el servidor de comandos no está abierta.');
        }
    }

    document.getElementById('stopButton')?.addEventListener('click', function() {
        let stop = JSON.stringify("stop");
        enviarComando(stop);
        console.log('Comando "stop" enviado.');
    });

    document.getElementById('reconnectButton')?.addEventListener('click', function() {
        console.log('Intentando reconectar...');
        reconectarEstado();
        conectarComandos();
    });

    document.getElementById('toggleScrollButton')?.addEventListener('click', function() {
        autoScroll = !autoScroll;
        this.textContent = autoScroll ? 'Desactivar Auto-scroll' : 'Activar Auto-scroll';
        console.log(`Auto-scroll ${autoScroll ? 'activado' : 'desactivado'}.`);
    });

    document.getElementById('clearBufferButton')?.addEventListener('click', function() {
        const mensajesDiv = document.getElementById('mensajes');
        while (mensajesDiv.firstChild) {
            mensajesDiv.removeChild(mensajesDiv.firstChild);
        }
        const mensajesContainer = document.getElementById('mensajes-container');
        mensajesContainer.scrollTop = 0;
        console.log('Buffer de mensajes limpiado manualmente.');
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
        console.log('Cerrando sesión...');
        localStorage.removeItem('userRole'); // Limpia el rol al hacer logout
        window.location.href = 'login.html';
    });
});
