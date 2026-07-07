# 📚 Books API

API REST desarrollada con **Node.js**, **Express** y **TypeScript** para la administración de un catálogo de productos (libros), con autenticación mediante **JWT** y persistencia de datos en **Firebase Firestore**.

Proyecto final del programa de formación backend Node JS de TechLab.

---

## 📋 Tabla de contenidos

- [Contexto del proyecto](#-contexto-del-proyecto)
- [Consigna original](#-consigna-original)
- [Stack tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Variables de entorno](#-variables-de-entorno)
- [Configuración de Firebase](#-configuración-de-firebase)
- [Scripts disponibles](#-scripts-disponibles)
- [Endpoints](#-endpoints)
- [Autenticación](#-autenticación)
- [Credenciales de prueba](#-credenciales-de-prueba)
- [Manejo de errores](#-manejo-de-errores)
- [Decisiones técnicas y desviaciones de la consigna](#-decisiones-técnicas-y-desviaciones-de-la-consigna)
- [Autor](#-autor)

---

## 🎯 Contexto del proyecto

Un cliente cuenta con diversos productos en catálogo y necesita disponer de una API REST desde donde su tienda oficial pueda administrarlos: leer, crear, actualizar y eliminar información sobre los productos. La aplicación cuenta con una capa de autenticación para resguardar la seguridad de los datos, que se encuentran alojados en una base de datos en la nube mediante Firestore de Firebase.

La arquitectura del proyecto está separada en capas (rutas, controladores, servicios y modelos), además de las carpetas correspondientes para middlewares y configuración de servicios externos, priorizando la escalabilidad y el orden del código.

## 📄 Consigna original

<details>
<summary>Ver consigna completa del Proyecto Final</summary>

**Premisa:**

Actualmente el cliente tiene diversos productos en catálogo y precisa disponer de una API REST desde donde su tienda oficial pueda administrarlos, habilitando la posibilidad de Leer, Crear, Actualizar y Eliminar la información sobre los productos.

La aplicación debe contar con una capa de autenticación para resguardar la seguridad de los datos que estarán alojados en una base de datos en la nube mediante el servicio Firestore de Firebase.

> Es importante definir una arquitectura escalable, separando las distintas responsabilidades de la aplicación en capas que permitan establecer rutas, controladores, servicios y modelos de forma clara y prolija, además de las carpetas necesarias para guardar middlewares y configuración a servicios externos.

Finalmente, la aplicación debe contemplar el manejo de errores de forma clara, teniendo en cuenta fallos del tipo 404 para rutas no definidas, los estados 401 y 403 ante errores de autenticación y códigos de estado 400 y 500 cuando las peticiones contienen errores o los servicios externos de datos no responden.

**Requerimiento #1: Configuración Inicial**

- Crear un directorio donde alojar el proyecto e incluir un archivo `index.js` como punto de entrada.
- Iniciar Node.js y configurar npm usando el comando `npm init -y`.
- Agregar la propiedad `"type": "module"` en el archivo `package.json` para habilitar ESModules.
- Configurar un script llamado `start` para ejecutar el programa con el comando `npm run start`.

**Requerimiento #2: Instalación de dependencias**

- Instalar `express`, `cors`, `body-parser`, `dotenv`, `firebase` y `jsonwebtoken` como dependencias del proyecto.

**Requerimiento #3: Configuración del servidor**

- Crear un servidor web con express y realizar su configuración en el archivo `index.js`.
- Configurar CORS para habilitar las peticiones de origen cruzado.
- Configurar el middleware global de body-parser para interpretar los body en formato JSON.
- Establecer un middleware que maneje las rutas desconocidas, devolviendo el estado 404 y un mensaje.
- Crear un archivo `.env` donde se alojen las variables de entorno del proyecto.

**Requerimiento #4: Rutas**

- Crear la capa de rutas del proyecto.
- `products.routes.js`:
  - `GET /api/products` devuelve todos los productos.
  - `GET /api/products/:id` devuelve el producto con el ID indicado.
  - `POST /api/products/create` recibe en el body la información del nuevo producto.
  - `DELETE /api/products/:id` elimina el producto con el ID indicado.
- `auth.routes.js`:
  - `POST /auth/login` recibe las credenciales y devuelve el Bearer token si son válidas, o un error de autenticación en caso contrario.

**Requerimiento #5: Controladores y Servicios**

- Crear la capa de controladores para cada una de las rutas establecidas.
- Crear la capa de servicios para atender a cada uno de los controladores.

**Requerimiento #6: Acceso a los datos**

- Crear la capa de modelos de la aplicación.
- Crear un proyecto de Firestore en Firebase, agregar una colección para registrar productos y crear el primer documento para darle estructura y tipos de datos.
- Configurar y conectar Firebase en el proyecto.
- Utilizar la instancia de Firebase creada y crear los métodos necesarios para que el modelo interactúe con la base de datos remota.
- Conectar los servicios con los modelos.

**Requerimiento #7: Protege tus rutas**

- Configurar JWT en el proyecto.
- Crear un middleware de autenticación y proteger las rutas correspondientes.
- Agregar la lógica en el controlador de login para validar la identidad del usuario y devolver un Bearer Token.

</details>

## 🛠 Stack tecnológico

| Tecnología                 | Uso                                                |
| -------------------------- | -------------------------------------------------- |
| **Node.js**                | Entorno de ejecución                               |
| **TypeScript**             | Lenguaje principal del proyecto                    |
| **Express 5**              | Framework del servidor HTTP                        |
| **Firebase (SDK cliente)** | Persistencia de datos en Firestore                 |
| **jsonwebtoken**           | Generación y verificación de JWT                   |
| **cors**                   | Habilitar peticiones de origen cruzado             |
| **body-parser**            | Parseo de bodies JSON                              |
| **dotenv**                 | Manejo de variables de entorno                     |
| **tsx**                    | Ejecución de TypeScript en desarrollo (watch mode) |

## 🏗 Arquitectura

El proyecto sigue una arquitectura en capas, donde cada una tiene una única responsabilidad:

```
Request → Router → Middleware (auth) → Controller → Service → Model → Firestore
```

- **Routes**: definen los endpoints disponibles y qué controlador atiende cada uno.
- **Controllers**: reciben la request/response de Express, llaman al servicio correspondiente y devuelven la respuesta HTTP con el código de estado adecuado.
- **Services**: contienen la lógica de negocio intermedia entre el controlador y el modelo.
- **Models**: encapsulan el acceso directo a Firestore (colección `books`).
- **Middlewares**: lógica transversal (autenticación JWT, manejo de rutas no encontradas).
- **Config**: configuración de servicios externos (variables de entorno, conexión a Firebase).

## 📁 Estructura del proyecto

```
backend/
├── src/
│   ├── config/
│   │   ├── env.ts              # Variables de entorno centralizadas
│   │   └── firebaseData.ts     # Inicialización de Firebase y Firestore
│   ├── controllers/
│   │   ├── authControllers.ts
│   │   └── productsControllers.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts       # Verificación de Bearer Token (JWT)
│   │   └── notFoundMiddleware.ts   # Manejo de rutas no definidas (404)
│   ├── models/
│   │   └── booksModel.ts       # Acceso a la colección "books" en Firestore
│   ├── routes/
│   │   ├── authRouter.ts
│   │   └── productsRouter.ts
│   ├── services/
│   │   ├── authServices.ts
│   │   └── productsServices.ts
│   ├── app.ts                  # Configuración de Express (middlewares y rutas)
│   └── index.ts                # Punto de entrada del servidor
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/k-hroma/Entrega-Final-Back-End-NodeJS.git

# Ingresar a la carpeta del backend
cd Entrega-Final-Back-End-NodeJS/backend

# Instalar dependencias
npm install

# Crear el archivo de variables de entorno a partir del ejemplo
cp .env.example .env
```

Completá el `.env` con tus propios valores (ver sección [Variables de entorno](#-variables-de-entorno)).

## 🔑 Variables de entorno

El proyecto centraliza todas las variables de entorno en `src/config/env.ts`. Se necesitan las siguientes, definidas en un archivo `.env` en la raíz de `backend/` (ver `.env.example`):

| Variable                       | Descripción                                          |
| ------------------------------ | ---------------------------------------------------- |
| `PORT`                         | Puerto en el que corre el servidor (default: `3000`) |
| `FIREBASE_API_KEY`             | API Key de la configuración web de Firebase          |
| `FIREBASE_AUTH_DOMAIN`         | Auth domain del proyecto de Firebase                 |
| `FIREBASE_PROJECT_ID`          | ID del proyecto de Firebase                          |
| `FIREBASE_STORAGE_BUCKET`      | Storage bucket del proyecto de Firebase              |
| `FIREBASE_MESSAGING_SENDER_ID` | Sender ID de Firebase Cloud Messaging                |
| `FIREBASE_APP_ID`              | App ID de la configuración web de Firebase           |
| `JWT_SECRET`                   | Secreto usado para firmar y verificar los JWT        |

> ⚠️ El archivo `.env` nunca se sube al repositorio (está en `.gitignore`). Usá `.env.example` como referencia.

Para generar un `JWT_SECRET` seguro:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🔥 Configuración de Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com).
2. Ir a **Compilación → Firestore Database** → **Crear base de datos** (modo de prueba).
3. Crear una colección llamada `books` y cargar un primer documento con esta estructura:

   ```json
   {
     "title": "El Tunel",
     "authorFirstname": "Ernesto",
     "authorLastname": "Sabato",
     "price": 25000
   }
   ```

4. Ir a ⚙️ **Configuración del proyecto → General → Tus apps**, registrar una app web (ícono `</>`) y copiar los valores de `firebaseConfig` al `.env`.

## 📜 Scripts disponibles

| Script  | Comando         | Descripción                                                   |
| ------- | --------------- | ------------------------------------------------------------- |
| `dev`   | `npm run dev`   | Levanta el servidor en modo desarrollo con `tsx` (hot reload) |
| `build` | `npm run build` | Compila el proyecto TypeScript a JavaScript (`dist/`)         |
| `start` | `npm run start` | Ejecuta la versión compilada (requiere correr `build` antes)  |

## 🌐 Endpoints

### Productos (`/api/products`)

| Método   | Endpoint               | Protegido | Descripción                              |
| -------- | ---------------------- | --------- | ---------------------------------------- |
| `GET`    | `/api/products`        | No        | Devuelve todos los productos             |
| `GET`    | `/api/products/:id`    | No        | Devuelve el producto con el ID indicado  |
| `POST`   | `/api/products/create` | Sí (JWT)  | Crea un nuevo producto                   |
| `PUT`    | `/api/products/:id`    | Sí (JWT)  | Actualiza el producto con el ID indicado |
| `DELETE` | `/api/products/:id`    | Sí (JWT)  | Elimina el producto con el ID indicado   |

**Body esperado para `POST /api/products/create`:**

```json
{
  "title": "1984",
  "authorFirstname": "George",
  "authorLastname": "Orwell",
  "price": 15000
}
```

**Body esperado para `PUT /api/products/:id`** (acepta actualización parcial):

```json
{
  "price": 18000
}
```

### Autenticación (`/auth`)

| Método | Endpoint      | Descripción                                    |
| ------ | ------------- | ---------------------------------------------- |
| `POST` | `/auth/login` | Recibe credenciales y devuelve un Bearer Token |

**Body esperado para `POST /auth/login`:**

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

**Respuesta exitosa:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🔐 Autenticación

Las rutas que modifican datos (`POST /api/products/create`, `PUT /api/products/:id` y `DELETE /api/products/:id`) requieren un Bearer Token válido, obtenido previamente desde `POST /auth/login`.

Las rutas de lectura (`GET /api/products` y `GET /api/products/:id`) son públicas, siguiendo el criterio estándar de una API REST: cualquiera puede consultar el catálogo, pero solo un usuario autenticado puede modificarlo.

Para consumir una ruta protegida, incluir el header:

```
Authorization: Bearer <token>
```

## 🧪 Credenciales de prueba

Para generar un token y probar las rutas protegidas, usá:

- **email**: `admin@gmail.com`
- **password**: `123456`

## ⚠️ Manejo de errores

| Código | Cuándo se devuelve                                                     |
| ------ | ---------------------------------------------------------------------- |
| `400`  | Producto no encontrado por ID, o error en los datos de la petición     |
| `401`  | Token no proporcionado, o credenciales de login inválidas              |
| `403`  | Token inválido o expirado                                              |
| `404`  | Ruta no definida en la API                                             |
| `500`  | Error interno del servidor o del servicio de datos externo (Firestore) |

## 🧭 Decisiones técnicas y desviaciones de la consigna

El proyecto sigue la consigna al pie de la letra en todos sus requerimientos funcionales, con las siguientes adaptaciones justificadas:

- **TypeScript en vez de JavaScript puro**: se mantiene la misma arquitectura y los mismos archivos que pide la consigna (`index.js` → `index.ts`, `products.routes.js` → `productsRouter.ts`, etc.), compilando a JavaScript mediante `tsc`.
- **`firebase` (SDK cliente) en vez de `firebase-admin`**: se utiliza el paquete `firebase` tal como indica la consigna literalmente, en lugar del SDK administrativo. Esto implica que la conexión a Firestore se realiza con la configuración web pública del proyecto (`apiKey`, `authDomain`, etc.) en lugar de una Service Account.
- **Rutas de lectura públicas**: la consigna no especifica cuáles rutas deben protegerse con JWT. Se optó por proteger únicamente las rutas que modifican datos (`POST` y `DELETE`), dejando la lectura (`GET`) pública, siguiendo el criterio estándar de diseño de APIs REST.
- **Colección `books`**: la colección de Firestore se llama `books`, ya que el catálogo del cliente corresponde a productos del tipo libro.

## 👤 Autor

**k-hroma**

Proyecto final — Formación Backend con Node.js, Express y TypeScript.
