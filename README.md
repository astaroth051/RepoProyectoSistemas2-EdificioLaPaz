# RepoProyectoSistemas2-EdificioLaPaz

Sistema integral diseñado para la administración eficiente de copropietarios y la gestión operativa de un micromarket dentro del Edificio La Paz. Permite a los copropietarios acceder a información relevante y facilita el control de productos y ventas del micromarket.

## Características Principales

- **Gestión de Productos Avanzada:**
    - Administración de un catálogo de productos con categorías detalladas.
    - Control de stock en tiempo real para evitar desabastecimientos y pérdidas.
    - Funcionalidad para agregar, editar y eliminar productos fácilmente.
- **Módulo de Compra para Micromarket:**
    - Interfaz intuitiva para la compra de productos por parte de los residentes.
    - Registro de ventas y generación de facturas o comprobantes.
- **Reportes Financieros para Copropietarios:**
    - Visualización clara de los movimientos monetarios relevantes para cada copropietario.
    - Posibilidad de consultar saldos, recargas y transacciones.
- **Sistema de Autenticación y Roles:**
    - Acceso seguro al sistema mediante autenticación de usuarios.
    - Implementación de roles (administrador, copropietario, etc.) con permisos específicos.
- **Interfaz de Usuario Intuitiva y Responsive:**
    - Diseño moderno y fácil de usar en diferentes dispositivos (ordenadores, tablets, móviles).
- **Gestión de Pedidos Pendientes (Micromarket):**
    - Visualización de los pedidos realizados que aún no han sido entregados.
    - Funcionalidad para marcar pedidos como "Entregados", actualizando el estado en tiempo real.
- **Recarga de Saldo para Copropietarios:**
    - Módulo para que los administradores gestionen las recargas de saldo de los copropietarios.
    - Historial de recargas por usuario.
- **Búsqueda y Filtrado:**
    - Opciones de búsqueda y filtrado para facilitar la localización de productos y copropietarios.

## Tecnologías Utilizadas

- **Backend:** Laravel 12 (PHP) - Framework robusto para el desarrollo de aplicaciones web con sintaxis elegante.
- **Frontend:** React.js - Librería de JavaScript para construir interfaces de usuario dinámicas y reactivas
- **Base de Datos:** MySQL - Sistema de gestión de bases de datos relacional de alto rendimiento.
- **Otros:**
    - FontAwesome - Librería de iconos vectoriales para mejorar la interfaz de usuario.
    - DomPDF - Librería PHP para la generación de documentos PDF (posiblemente para reportes o facturas).
    - Flaticon - Plataforma de iconos utilizada para elementos visuales dentro de la aplicación.

## Instalación (Opcional)

Si deseas ejecutar este proyecto localmente, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/sindresorhus/del](https://github.com/sindresorhus/del)
    cd RepoProyectoSistemas2-EdificioLaPaz
    ```
2.  **Instala las dependencias de Composer (Backend):**
    ```bash
    composer install
    ```
3.  **Copia el archivo `.env.example` a `.env` y configura las variables de entorno (base de datos, etc.).**
    ```bash
    cp .env.example .env
    ```
4.  **Genera la clave de la aplicación Laravel:**
    ```bash
    php artisan key:generate
    ```
5.  **Configura la base de datos en el archivo `.env` y ejecuta las migraciones:**
    ```bash
    php artisan migrate --seed
    ```
6.  **Instala las dependencias de Node.js (Frontend):**
    ```bash
    npm install
    # o
    yarn install
    ```
7.  **Compila los assets del frontend:**
    ```bash
    npm run dev
    # o
    yarn run dev
    ```
8.  **Sirve la aplicación Laravel:**
    ```bash
    php artisan serve
    ```
    Puedes acceder a la aplicación en `http://localhost:8000`.
