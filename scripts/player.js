document.addEventListener('DOMContentLoaded', function() {
    const role = localStorage.getItem('userRole');

    if (!role || role !=='player') {
        // Redirige al login si no hay rol en localStorage
        window.location.href = 'login.html';
        return;
    }
    if (role === 'player') {
        document.getElementById('player-container').style.display = 'block';
        // Conectar WebSockets aquí
        connectWebSockets();
    }

    setupEventListeners(this);
    //setInterval(() => clearBuffer(0), 15000);
});
