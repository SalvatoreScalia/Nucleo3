document.addEventListener('DOMContentLoaded', function() {
    const socketEstado = new WebSocket('ws://localhost:8765');
    const socketComandos = new WebSocket('ws://localhost:8766');
    let autoScroll = true;


    socketEstado.onmessage = function(event) {
        const mensajesDiv = document.getElementById('mensajes');
        const mensaje = document.createElement('p');
        mensaje.textContent = `Mensaje recibido: ${event.data}`;
        mensajesDiv.appendChild(mensaje);
        if (autoScroll) {//lee la variable autoScroll y permite el auto scroll esta despues de appenChild
            const mensajesContainer = document.getElementById('mensajes-container');
            mensajesContainer.scrollTop = mensajesContainer.scrollHeight;
        }

        // Mantener el scroll al final
        const mensajesContainer = document.getElementById('mensajes-container');
        mensajesContainer.scrollTop = mensajesContainer.scrollHeight;
    };

    // Función para limpiar el buffer dejando solo el último mensaje
    function limpiarBuffer() {
        const mensajesDiv = document.getElementById('mensajes');
        const mensajes = mensajesDiv.children;
        
        if (mensajes.length > 1) {
            // Dejar solo el último mensaje
            while (mensajesDiv.childElementCount > 1) {
                mensajesDiv.removeChild(mensajesDiv.firstChild);
            }
        }
    }

    document.getElementById('updateStatusButton').addEventListener('click', function() {
        const comando = JSON.stringify({ id: 1, estado: "touch p1" });
        if (socketComandos.readyState === WebSocket.OPEN) {
            socketComandos.send(comando);
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
        conectarEstado();
    });

    // Configurar la limpieza del buffer cada 15 segundos
    setInterval(limpiarBuffer, 15000);
});
