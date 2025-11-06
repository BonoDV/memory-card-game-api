# Memory Card Game API

API REST para el juego Memory Card Game, desarrollada con Express.js y TypeScript.

## 🚀 Características

- ✅ TypeScript con tipado estricto
- ✅ Estructura escalable y organizada
- ✅ Manejo centralizado de errores
- ✅ Variables de entorno con dotenv
- ✅ Endpoints RESTful
- ✅ Código documentado con comentarios claros

## 📁 Estructura del Proyecto

```
memory-card-game-api/
├── src/
│   ├── config/           # Configuración de la aplicación
│   │   └── index.ts      # Variables de entorno y configuración
│   ├── controllers/      # Lógica de negocio
│   │   └── status.controller.ts
│   ├── middlewares/      # Middlewares personalizados
│   │   └── errorHandler.ts
│   ├── routes/          # Definición de rutas
│   │   ├── index.ts
│   │   └── status.routes.ts
│   ├── types/           # Tipos e interfaces TypeScript
│   │   └── index.ts
│   ├── app.ts           # Configuración de Express
│   └── server.ts        # Punto de entrada
├── dist/                # Archivos compilados (generado)
├── .env                 # Variables de entorno (no commitear)
├── .env.example         # Ejemplo de variables de entorno
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Instalación

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Configurar variables de entorno**

   Las variables de entorno ya están configuradas en `.env`. Puedes modificarlas según tus necesidades.

## 🏃 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

El servidor se reiniciará automáticamente al detectar cambios en los archivos.

### Modo Producción

```bash
# Compilar TypeScript a JavaScript
npm run build

# Ejecutar el servidor compilado
npm start
```

### Verificar tipos TypeScript

```bash
npm run type-check
```

## 📡 Endpoints Disponibles

### Raíz

- **GET /** - Información básica de la API

### Estado del Servidor

- **GET /api/v1/status** - Estado detallado del servidor
- **GET /api/v1/health** - Health check simple

### Ejemplo de respuesta (GET /api/v1/status)

```json
{
  "success": true,
  "data": {
    "status": "online",
    "timestamp": "2025-11-06T10:30:00.000Z",
    "uptime": 123.45,
    "environment": "development",
    "version": "v1"
  },
  "message": "API funcionando correctamente"
}
```

## 🔧 Variables de Entorno

| Variable      | Descripción             | Valor por Defecto      |
| ------------- | ----------------------- | ---------------------- |
| `PORT`        | Puerto del servidor     | `3000`                 |
| `NODE_ENV`    | Entorno de ejecución    | `development`          |
| `APP_NAME`    | Nombre de la aplicación | `Memory Card Game API` |
| `API_VERSION` | Versión de la API       | `v1`                   |

## 📝 Scripts Disponibles

| Script               | Descripción                                          |
| -------------------- | ---------------------------------------------------- |
| `npm run dev`        | Inicia el servidor en modo desarrollo con hot-reload |
| `npm run build`      | Compila TypeScript a JavaScript                      |
| `npm start`          | Ejecuta el servidor compilado en producción          |
| `npm run type-check` | Verifica tipos sin compilar                          |

## 🏗️ Agregar Nuevas Funcionalidades

### 1. Crear un nuevo controlador

Crea un archivo en `src/controllers/`:

```typescript
// src/controllers/game.controller.ts
import { Request, Response, NextFunction } from "express";

export const getAllGames = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Tu lógica aquí
    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    next(error);
  }
};
```

### 2. Crear rutas

Crea un archivo en `src/routes/`:

```typescript
// src/routes/game.routes.ts
import { Router } from "express";
import { getAllGames } from "../controllers/game.controller";

const router = Router();
router.get("/games", getAllGames);

export default router;
```

### 3. Registrar las rutas

Edita `src/routes/index.ts`:

```typescript
import gameRoutes from "./game.routes";

router.use("/games", gameRoutes);
```

## 🛡️ Manejo de Errores

La API utiliza un sistema centralizado de manejo de errores. Para lanzar un error personalizado:

```typescript
import { CustomError } from "../middlewares/errorHandler";

throw new CustomError("Mensaje de error", 400);
```

## 📚 Tecnologías

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **TypeScript** - Superset de JavaScript con tipado estático
- **dotenv** - Gestión de variables de entorno
- **ts-node-dev** - Desarrollo con hot-reload

## 📄 Licencia

ISC
