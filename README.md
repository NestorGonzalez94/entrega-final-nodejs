# API de productos TechLab

API REST desarrollada con Node.js, Express, Firestore y JWT. Usa una arquitectura por capas: rutas, controladores, servicios, modelos, configuración y middlewares.

## Instalación

1. Ejecutar `npm install`.
2. Copiar `.env.example` como `.env` y completar las credenciales de Firebase y autenticación.
3. En Firebase, crear una base Firestore y una colección llamada `products`.
4. Ejecutar `npm run start`.

## Endpoints

| Método | Ruta | Protegida | Descripción |
| --- | --- | --- | --- |
| POST | `/auth/login` | No | Devuelve un token JWT con `{ "email", "password" }` |
| GET | `/api/products` | Sí | Lista productos |
| GET | `/api/products/:id` | Sí | Obtiene un producto |
| POST | `/api/products/create` | Sí | Crea un producto |
| PUT | `/api/products/:id` | Sí | Actualiza un producto |
| DELETE | `/api/products/:id` | Sí | Elimina un producto |

En las rutas protegidas enviar: `Authorization: Bearer TU_TOKEN`.

Ejemplo de producto:

```json
{ "name": "Auriculares", "price": 25000, "stock": 12, "category": "Audio" }
```
