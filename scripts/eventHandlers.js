function setupEventListeners() {
    const reconnectButton = document.getElementById('reconnectButton');
    const updateStatusButton = document.getElementById('updateStatusButton');
    const stopButton = document.getElementById('stopButton');
    let command;

    if (reconnectButton) {
        reconnectButton.addEventListener('click', function() {
            WebSocketService.reconnectSockets();
        });
    }

    if (updateStatusButton){
        updateStatusButton.addEventListener('click', function() {
            command = JSON.stringify({ command: 'new', index: 0, state: true });
            WebSocketService.sendCommand(command);
        });
    }

    if (stopButton){
        stopButton.addEventListener('click', function(){
            command = JSON.stringify("stop");
            WebSocketService.sendCommand(command);
        })
    }

    document.getElementById('toggleScrollButton')?.addEventListener('click',function(){
        toggleAutoScroll(this);
    })
    document.getElementById('clearBufferButton')?.addEventListener('click', function() {
        clearBuffer(0);
    });
    document.getElementById('logoutButton')?.addEventListener('click', function() {
        localStorage.removeItem('userRole');
        window.location.href = 'login.html';
    });
}