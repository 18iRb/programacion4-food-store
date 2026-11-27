# 🍔 Programación IV - Food Store

Trabajo Práctico Integrador de Programación IV.

Aplicación web para gestión de pedidos de comida desarrollada con arquitectura cliente-servidor:

- Backend: FastAPI + SQLModel
- Frontend: React + TypeScript

---

## 📋 Descripción

Food Store es una aplicación que permite gestionar un sistema de pedidos de comida con roles de usuario y administrador.

Los usuarios pueden:

- Registrarse e iniciar sesión.
- Visualizar productos disponibles.
- Agregar productos al carrito.
- Confirmar pedidos.
- Consultar sus pedidos.
- Cancelar pedidos pendientes.

Los administradores pueden:

- Gestionar usuarios.
- Gestionar categorías.
- Gestionar productos.
- Gestionar pedidos.
- Consultar métricas generales del negocio.

---

# 🏗 Arquitectura

## Backend

Desarrollado con:

- FastAPI
- SQLModel
- SQLAlchemy
- Pydantic
- JWT Authentication

Responsabilidades:

- Gestión de usuarios.
- Autenticación.
- Gestión de categorías.
- Gestión de productos.
- Gestión de pedidos.
- Reglas de negocio.
- Persistencia de datos.

---

## Frontend

Desarrollado con:

- React
- TypeScript
- React Router
- TanStack Query
- TanStack Table
- TanStack Form
- Zustand
- Axios
- TailwindCSS

Responsabilidades:

- Renderizado de interfaz.
- Manejo de formularios.
- Consumo de API.
- Estado global del carrito.
- Gestión de caché.
- Navegación.

---

# 🚀 Funcionalidades

## 👤 Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Protección de rutas.
- Persistencia de sesión mediante JWT.

---

## 🍔 Catálogo

- Listado de productos.
- Visualización de detalles.
- Filtrado por categorías.
- Productos disponibles.

---

## 🛒 Carrito

- Agregar productos.
- Incrementar cantidad.
- Disminuir cantidad.
- Eliminar productos.
- Vaciar carrito.
- Cálculo automático de total.

---

## 📦 Pedidos

### Usuario

- Crear pedido.
- Seleccionar forma de pago.
- Ingresar dirección de entrega.
- Agregar notas opcionales.
- Consultar historial.
- Cancelar pedidos pendientes.

### Estados

```text
PENDIENTE
EN_PREPARACION
ENTREGADO
CANCELADO
```

---

## ⚙️ Panel Administrativo

### Usuarios

- Listar usuarios.
- Activar / Desactivar usuarios.

---

### Categorías

- Crear categorías.
- Editar categorías.
- Activar / Desactivar categorías.

---

### Productos

- Crear productos.
- Editar productos.
- Administrar stock.
- Asociar categorías.
- Activar / Desactivar productos.

---

### Pedidos

- Visualizar todos los pedidos.
- Cambiar estados.
- Cancelar pedidos.
- Consultar información general.

---

### Resumen

Dashboard con métricas:

- Pedidos pendientes.
- Pedidos en preparación.
- Pedidos entregados.
- Pedidos cancelados.
- Pedidos realizados en el día.
- Ingresos generados.

---

# ▶️ Ejecución Backend

Instalar dependencias:

```bash
pip install -r requirements.txt
```

Ejecutar servidor:

```bash
uvicorn app.main:app --reload
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

# ▶️ Ejecución Frontend

Instalar dependencias:

```bash
pnpm install
```

Ejecutar proyecto:

```bash
pnpm run dev
```

Aplicación:

```text
http://localhost:5173
```

---

# 📚 Conceptos Aplicados

- Arquitectura cliente-servidor.
- REST API.
- Autenticación JWT.
- Manejo de estado global.
- Manejo de caché.
- CRUD completo.
- Validación de formularios.
- Componentes reutilizables.
- Programación orientada a objetos.
- Gestión de roles.
- Buenas prácticas de TypeScript.

---

# 🛠 Tecnologías

## Backend

- Python
- FastAPI
- SQLModel
- SQLAlchemy
- SQLite
- Pydantic

## Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- TanStack Query
- TanStack Table
- TanStack Form
- Zustand
- Axios

---

# 👨‍💻 Autor

Rodrigo Benítez

Tecnicatura Universitaria en Programación

Universidad Tecnológica Nacional (UTN)

---

# ✅ Estado del Proyecto

Proyecto funcional con:

- Autenticación.
- Catálogo.
- Carrito.
- Gestión de pedidos.
- Panel administrativo.
- Dashboard de métricas.

Trabajo Práctico Integrador - Programación IV.