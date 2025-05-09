


          
# Automatización de Pruebas de API con Cypress - ReqRes.in

## Descripción del Proyecto
Este proyecto implementa pruebas automatizadas para la API de demostración ReqRes.in utilizando Cypress. Las pruebas cubren los principales endpoints de la API y están estructuradas de manera modular para facilitar su mantenimiento y extensión.

## Acerca de ReqRes.in
ReqRes.in es una API REST de prueba que simula un sistema de gestión de usuarios, proporcionando endpoints para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre recursos de usuario. Esta API es ampliamente utilizada para aprendizaje y demostración de pruebas de API.

## Requisitos Previos
- Node.js (versión 14 o superior)
- npm (Node Package Manager)

## Instalación
1. Clona este repositorio:
```bash
git clone <url-del-repositorio>
```

2. Instala las dependencias:
```bash
npm install
```

## Estructura del Proyecto
```plaintext
cypress/
├── e2e/
│   └── api/
│       ├── user-create.cy.js
│       ├── user-delete.cy.js
│       ├── user-single.cy.js
│       ├── user-update.cy.js
│       └── users-list.cy.js
├── fixtures/
│   └── api-config.json
└── support/
    ├── commands.js
    └── e2e.js
```

## Casos de Prueba Implementados

### 1. Gestión de Usuarios
- **Listar Usuarios** (users-list.cy.js)
  - Obtener lista de usuarios con paginación
  - Verificar estructura de respuesta
  - Validar tiempos de respuesta

- **Obtener Usuario Individual** (user-single.cy.js)
  - Obtener información de un usuario específico
  - Manejar casos de usuario no encontrado

- **Crear Usuario** (user-create.cy.js)
  - Crear nuevo usuario con datos válidos
  - Validar respuesta y código de estado 201
  - Manejar casos de datos inválidos

- **Actualizar Usuario** (user-update.cy.js)
  - Actualizar información de usuario con PUT
  - Actualizar información parcial con PATCH
  - Verificar persistencia de cambios

- **Eliminar Usuario** (user-delete.cy.js)
  - Eliminar usuario existente
  - Verificar código de estado 204

## Configuración
La configuración de la API se encuentra en el archivo `fixtures/api-config.json`:

```json
{
  "baseUrl": "https://reqres.in/api",
  "timeoutThreshold": 2000
}
```

## Ejecución de Pruebas

### Modo Interactivo
```bash
npx cypress open
```

### Modo Headless
```bash
npx cypress run
```

### Ejecutar Tests Específicos de API
```bash
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"
```

## Buenas Prácticas Implementadas

1. **Modularidad**: Cada tipo de operación CRUD tiene su propio archivo de prueba
2. **Configuración Centralizada**: Valores como URL base y umbrales de tiempo están en archivos de configuración
3. **Validaciones Completas**:
   - Códigos de estado HTTP
   - Estructura de respuesta
   - Tiempos de respuesta
   - Manejo de errores
4. **Independencia de Pruebas**: Cada test puede ejecutarse de forma aislada

## Consideraciones de Diseño

1. **Enfoque en Pruebas de Contrato**: Verificación de la estructura y formato de las respuestas
2. **Validación de Rendimiento Básica**: Comprobación de tiempos de respuesta contra umbrales definidos
3. **Manejo de Errores**: Pruebas para escenarios negativos y respuestas de error
4. **Datos Dinámicos**: Generación de datos de prueba para crear y actualizar usuarios

## Notas Importantes
- Las pruebas están diseñadas para ser independientes entre sí
- La API ReqRes.in es una API simulada, por lo que algunas operaciones como DELETE no persisten realmente los cambios
- Los tiempos de respuesta pueden variar dependiendo de la conexión a internet

## Contribución
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crea un Pull Request

## Licencia
MIT

        