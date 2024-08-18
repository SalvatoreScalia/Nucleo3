document.addEventListener('DOMContentLoaded', function() {
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('id');
    if (!role || role !=='admin') {
        // Redirige al login si no hay rol en localStorage
        window.location.href = 'login.html';
        return;
    }
    if (role === 'admin') {
        document.getElementById('admin-container').style.display = 'block';
        // Inicia la conexión de WebSockets cuando la página se carga
        window.addEventListener('load', () => {
            connectWebSockets();
        });
        console.log(replacePlaceholders(langStrings.connectWelcomeMessage,));
    }

    setupEventListeners(this);
    //setInterval(() => clearBuffer(1), 15000);
});
