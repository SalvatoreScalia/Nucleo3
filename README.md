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
   ```

2. **Instalar dependencias:**

   ```sh
   pip install aiohttp websockets
   ```

3. **Iniciar el servidor:**

   ```sh
   python servidor.py
   ```

4. **Acceder a la aplicación:**
   - Página de inicio de sesión: `http://localhost:8080/login.html`
   - Página principal (admin): `http://localhost:8080/index.html`
   - Página de jugador: `http://localhost:8080/player.html`

## Uso

### Iniciar Sesión

- Los usuarios pueden iniciar sesión utilizando sus credenciales. Los roles disponibles son "admin" y "player".

### Interfaz de Administrador

- **Ver Estado en Tiempo Real**: Muestra mensajes y estados recibidos del servidor.
- **Comandos**: Permite enviar comandos como detener el servidor (`stop`), reconectar, activar/desactivar auto-scroll, y limpiar el buffer de mensajes.

### Interfaz de Jugador

- **Ver Estado en Tiempo Real**: Muestra mensajes y estados recibidos del servidor.
- **Actualizar Estado**: Permite a los jugadores enviar comandos para cambiar su estado.

## Futuras Expansiones

Este proyecto está pensado para crecer en el futuro, añadiendo funcionalidades como:
- Sistema de tablero de juego interactivo.
- Ampliación de roles y permisos.
- Soporte para múltiples salas de juego.

## Contribución

Si deseas contribuir a este proyecto, por favor, haz un fork del repositorio y envía tus pull requests.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
