# CRUD Alejo - Car Management System

Este es un proyecto gestionado con Docker que incluye un Frontend (React/Vite), un Backend (Node.js) y una Base de Datos (PostgreSQL), configurados con redes aisladas por seguridad.

## Prerrequisitos

*   Tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop/) (o Docker Daemon y Docker Compose).

## Configuración

Asegúrate de que existe un archivo `.env` en la raíz del proyecto para que Docker Compose pueda leer las contraseñas. Si no existe o lo clonaste de otro lado, crea uno así:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=2026
POSTGRES_DB=dbcarros
DB_HOST=postgres
DB_PORT=5432
```

## Comandos de Docker

Abre tu terminal en la raíz del proyecto (la carpeta `ttabajoalejo`, donde se encuentra el archivo `docker-compose.yml`) y utiliza los siguientes comandos:

---

### 🚀 1. Arrancar el Proyecto por Primera Vez o tras Cambios de Código

Este comando lee el `docker-compose.yml`, construye las imágenes del Back y el Front, y levanta todos los servicios de fondo:

```bash
docker-compose up --build -d
```
*   `--build`: Obliga a Docker a reconstruir las imágenes por si hiciste cambios en el código (`frontend` o `backend`).
*   `-d`: Modo *Detached* (segundo plano). Libera tu consola para que puedas seguir escribiendo otros comandos.

### 🛑 2. Detener el Proyecto

Si quieres parar todos los servidores y contenedores temporalmente:

```bash
docker-compose stop
```
(Para volver a iniciarlos rápidamente sin reconstruir, usa `docker-compose start`).

### 🗑️ 3. Apagar y Destruir Contenedores (Sin borrar los datos de la Base de Datos)

```bash
docker-compose down
```

### 💥 4. Reset Total (Borrón y Cuenta Nueva)

**¡Peligro!** Este comando apaga todo y además **borra el volumen de datos de PostgreSQL**. Úsalo si quieres limpiar completamente tu base de datos y volver a empezar de cero:

```bash
docker-compose down -v
```

### 🔍 5. Ver los Logs (Consola de errores)

Si algo falla, aquí puedes ver qué se está imprimiendo en consola (errores del Node.js o de Vite):

*   **Para ver todo:** `docker-compose logs -f`
*   **Solo el backend:** `docker-compose logs -f backend`
*   **Solo el frontend:** `docker-compose logs -f frontend`
*   *(Nota: Presiona `Ctrl + C` para dejar de ver los logs).*

### 📊 6. Revisar el Estado

Ver qué contenedores están encendidos en este proyecto y qué puertos están usando:

```bash
docker-compose ps
```

---

## Redes y Puertos de la Arquitectura

Por motivos de **Seguridad (Aislamiento de redes)**:
- El **Frontend** y el **Backend** pueden verse a través de `frontend_network`.
- El **Backend** y la **Base de Datos** pueden verse a través de `backend_network`.
- El **Frontend nunca puede acceder a la Base de datos directamente**.

| Servicio | Puerto Local a usar en Navegador/Postman |
| :--- | :--- |
| **Frontend (React)** | `http://localhost:5173` |
| **Backend (Node API)** | `http://localhost:3000` |
| **PostgreSQL** | `localhost:5432` (Para pgAdmin/DBeaver) |
