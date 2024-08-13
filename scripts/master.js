document.addEventListener('DOMContentLoaded', function() {
    const role = localStorage.getItem('userRole');
    
    if (!role || role !=='admin') {
        // Redirige al login si no hay rol en localStorage
        window.location.href = 'login.html';
        return;
    }
    if (role === 'admin') {
        document.getElementById('admin-container').style.display = 'block';
        // Conectar WebSockets aquí
        connectWebSockets();
    }

    setupEventListeners(this);
    //setInterval(() => clearBuffer(1), 15000);
});
