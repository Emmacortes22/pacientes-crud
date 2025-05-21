# 🩺 CRUD de Pacientes - Vue 3 + Pinia + .NET 6

Este proyecto es un CRUD básico de pacientes que conecta un frontend hecho en Vue 3 con Pinia a una API REST construida en .NET 6. Ideal para practicar comunicación entre cliente y servidor.

## 🚀 Tecnologías usadas

- **Frontend:** Vue 3, Pinia, Axios
- **Backend:** .NET 6 Web API
- **Estado:** Local en memoria (sin base de datos aún)

## 📂 Estructura del proyecto

```plaintext
pacientes-crud/
│
├── pacientes-crud/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── stores/
│   │   └── App.vue, main.js...
│   └── package.json
│
├── PacientesApi/
│   ├── Controllers/
│   ├── Models/
│   └── Program.cs, *.csproj...
└── README.md
```

## ⚙️ Cómo ejecutar

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
dotnet run
```
