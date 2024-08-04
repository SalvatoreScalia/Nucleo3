# Nucleo3 futoro sandBox Table

Este proyecto es una aplicación web que utiliza WebSockets para comunicación en tiempo real y un sistema de autenticación básico para gestionar diferentes roles de usuario (admin y player). La aplicación está diseñada para expandirse en el futuro y convertirse en una plataforma interactiva de juego en línea.

## Estructura del Proyecto

- **`login.html`**: Página de inicio de sesión donde los usuarios ingresan su nombre de usuario y contraseña.
- **`index.html`**: Interfaz principal para administradores, donde pueden ver mensajes en tiempo real y enviar comandos.
- **`player.html`**: Interfaz para jugadores, que permite ver mensajes en tiempo real y realizar acciones específicas.
- **`main.js`**: Lógica de la interfaz de administrador, incluyendo la gestión de WebSockets y eventos de usuario.
- **`player.js`**: Lógica de la interfaz de jugador, incluyendo la gestión de WebSockets y eventos de usuario.
- **`services.js`**: Servicio de WebSocket para gestionar conexiones y comunicaciones.
- **`styles.css`**: Hoja de estilos para la aplicación.
- **`servidor.py`**: Servidor backend en Python que maneja la autenticación, la gestión de conexiones WebSocket y el control de estado.

## Instalación y Ejecución

### Requisitos

- Python 3.7 o superior
- aiohttp
- websockets

### Instrucciones

1. **Clonar el repositorio:**

   ```sh
   git clone https://github.com/tuusuario/tu-repo.git
   cd tu-repo
