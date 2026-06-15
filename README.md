# TP5 — API Backend con Express + Sequelize + PostgreSQL

API REST para la gestión de **Socios**, **Transacciones**, **Empleados** y **Publicaciones**, desarrollada como trabajo práctico de la cursada.

---

## Stack

| Herramienta | Versión |
|-------------|---------|
| Node.js | 18+ |
| Express | 5.x |
| Sequelize | 6.x |
| PostgreSQL (Neon) | 16 |
| pnpm | 11+ |

---

## Arranque rápido

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar servidor
pnpm dev
```

El servidor se levanta en `http://localhost:3000`.

> La conexión a la base de datos PostgreSQL (Neon) ya está configurada en `.env`. No requiere configuración adicional.

---

## Endpoints

### Socios

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/socios` | Dar de alta un socio |
| `GET` | `/api/socios` | Obtener todos los socios |
| `GET` | `/api/socios/:id` | Obtener un socio por ID |
| `GET` | `/api/socios/activos` | Obtener solo socios activos |
| `PUT` | `/api/socios/:id` | Modificar un socio |
| `DELETE` | `/api/socios/:id` | Eliminar un socio |

**Payload ejemplo — POST /api/socios:**

```json
{
  "nombre": "Matías",
  "apellido": "Ortega",
  "foto": "https://randomuser.me/api/portraits/men/1.jpg",
  "dni": "12345678",
  "numero_socio": 1001,
  "activo": true
}
```

---

### Transacciones

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/transacciones` | Registrar una transacción |
| `GET` | `/api/transacciones` | Obtener todas las transacciones |
| `GET` | `/api/transacciones/cliente/:email` | Historial de transacciones por email del cliente |
| `GET` | `/api/transacciones/idiomas/:origen/:destino` | Transacciones filtradas por idioma origen y destino |

**Payload ejemplo — POST /api/transacciones:**

```json
{
  "idioma_origen": "es",
  "TextoOrigen": "Hola mundo",
  "idioma_destino": "en",
  "texto_destino": "Hello world",
  "email_cliente": "cliente@example.com"
}
```

---

### Empleados

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/empleados` | Dar de alta un empleado |
| `GET` | `/api/empleados` | Obtener todos los empleados |
| `GET` | `/api/empleados/:id` | Obtener un empleado por ID |

**Payload ejemplo — POST /api/empleados:**

```json
{
  "apellido": "Pérez",
  "nombre": "Juan",
  "dni": "87654321",
  "email": "juan.perez@example.com"
}
```

---

### Publicaciones

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/publicaciones` | Crear una publicación (vinculada a un empleado) |
| `GET` | `/api/publicaciones` | Obtener todas las publicaciones (con datos del empleado) |
| `GET` | `/api/publicaciones/buscar?titulo=X&vigente=true` | Buscar publicaciones por título (búsqueda parcial) y/o vigencia |
| `PUT` | `/api/publicaciones/:id` | Modificar una publicación |
| `DELETE` | `/api/publicaciones/:id` | Eliminar una publicación |

**Payload ejemplo — POST /api/publicaciones:**

```json
{
  "titulo": "Introducción a Node.js",
  "contenido": "Node.js es un entorno de ejecución para JavaScript del lado del servidor.",
  "imagen_asociada": "",
  "fecha_publicacion": "2026-06-14",
  "empleado": {
    "id": 1
  },
  "vigente": true
}
```

> El empleado se envía como objeto anidado con su `id`. La API se encarga de vincular la publicación al empleado existente.

**Búsqueda combinada — GET /api/publicaciones/buscar:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `titulo` | string (opcional) | Búsqueda parcial (LIKE). Ej: `?titulo=Node` |
| `vigente` | boolean (opcional) | Filtro exacto. Ej: `?vigente=true` |

> Al menos uno de los dos parámetros es requerido. Si no se envía ninguno, la API responde con **400 Bad Request**.

---

## Health Check

```
GET /
```

Respuesta esperada:

```json
{
  "message": "TP5 API running"
}
```

---

## Probar con Postman

Podés importar la colección incluida en el proyecto:

1. Abrí Postman
2. `File` → `Import` → seleccioná `TP5-API.postman_collection.json`
3. Ejecutá los requests en orden dentro de cada carpeta

La colección incluye ejemplos con datos de muestra y scripts que guardan automáticamente los IDs creados.

---

## Estructura del proyecto

```
src/
├── app.js                        # Entry point: Express + middleware + routers + DB sync
├── db.js                         # Conexión Sequelize a PostgreSQL (Neon)
├── models/
│   ├── Socio.js                  # Modelo Socio
│   ├── Transaccion.js            # Modelo Transaccion
│   ├── Empleado.js               # Modelo Empleado
│   ├── Publicacion.js            # Modelo Publicacion (FK → Empleado)
│   └── index.js                  # Asociaciones entre modelos
├── controllers/
│   ├── SocioController.js        # CRUD + filtro activos
│   ├── TransaccionController.js  # CRUD + filtros por email e idiomas
│   ├── EmpleadoController.js     # CRUD
│   └── PublicacionController.js  # CRUD + búsqueda combinada
└── routes/
    ├── socios.routes.js
    ├── transacciones.routes.js
    ├── empleados.routes.js
    └── publicaciones.routes.js
```

---

## Consideraciones

- La base de datos se sincroniza automáticamente al iniciar el servidor (`sync({ alter: true })`). Las tablas se crean si no existen y se actualizan si el modelo cambia.
- Los campos `TextoOrigen` y `texto_destino` se modelan como string (texto traducido), no como número.
- El campo `fecha_publicacion` se escribe sin tilde para evitar problemas con PostgreSQL.
- Los endpoints con rutas fijas (`activos`, `buscar`, `cliente/:email`, `idiomas/:origen/:destino`) están declarados antes que las rutas con parámetros dinámicos (`:id`) para evitar conflictos de ruteo.
