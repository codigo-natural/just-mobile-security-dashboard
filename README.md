# Just Mobile Security - Pentester Dashboard

Este proyecto es una aplicación Next.js para visualizar los resultados de análisis de código estático de Just Mobile Security.

## Requerimientos Técnicos Cumplidos

-   **Framework:** Next.js (con App Router)
-   **SDK Mínimo:** Se ha creado un SDK en `src/lib/sdk` que consume API Routes locales.
-   **Endpoints REST Locales:** Implementados usando API Routes de Next.js en `src/app/api`.
-   **UI/UX:** Se utiliza Tailwind CSS y shadcn/ui para un diseño claro y moderno.
-   **Navegabilidad y URLs:** URLs claras y uso de parámetros dinámicos de Next.js.
-   **Gráficos:** Se utiliza Recharts para visualizaciones estadísticas.
-   **Calidad de Código:** TypeScript, ESLint, Prettier. El proyecto compila sin errores de tipo y pasa el linting.
-   **Estándares Web:** Se utilizan bibliotecas estándar y se siguen las mejores prácticas.

## Funcionalidades

-   **Dashboard Principal:**
    -   Estadísticas generales sobre servicios y vulnerabilidades.
    -   Gráficos de distribución.
-   **Listado de Servicios:**
    -   Vista de tarjeta para cada servicio con información relevante.
    -   Navegación a la vista detallada del servicio.
-   **Vista Detallada del Servicio:**
    -   Resumen completo del servicio.
    -   Listado de vulnerabilidades encontradas.
    -   Filtrado de vulnerabilidades por severidad y búsqueda por texto.
-   **Vista Detallada de Vulnerabilidad:**
    -   Información completa: título, descripción, impacto, remediación, referencias OWASP.
    -   Evidencias en formato de bloque de código con resaltado de sintaxis.
    -   Soporte para traducciones (inglés/español) con selector.
-   **Links Compartibles:** Todas las vistas de detalle (servicio, vulnerabilidad) tienen URLs únicas y compartibles. Las evidencias tienen anclas para enlace directo.

## Cómo Empezar

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/codigo-natural/just-mobile-security-dashboard.git
    cd just-mobile-security-dashboard
    ```

2.  **Instalar dependencias:**
    Asegúrate de tener Node.js (v20+) y npm instalados.
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto:
    ```bash
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
    ```
    En producción, actualiza esta variable con la URL de tu API.

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

## Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Construye la aplicación para producción.
-   `npm run start`: Inicia un servidor de producción (después de `build`).
-   `npm run lint`: Ejecuta ESLint.
-   `npm run typecheck`: Ejecuta el chequeo de tipos de TypeScript.

## Deployment
url de la aplicacion desplegada: 