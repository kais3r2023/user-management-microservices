# 🚀 Proyecto Fullstack con NestJS, Kafka y CQRS

Este proyecto implementa una arquitectura **CQRS** con microservicios en **NestJS**, utilizando **Kafka** como sistema de mensajería.  
Incluye un **API Gateway** y un **User Service** para la gestión de usuarios.

---

## 📦 Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado y corriendo
- [Node.js](https://nodejs.org/) (recomendado usar versión LTS)
- [Yarn](https://yarnpkg.com/) (gestor de dependencias)
- Powershell (para ejecutar scripts en Windows)

---

## ⚙️ Levantar infraestructura (Kafka + Zookeeper)

1. Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
Levantar los contenedores de Kafka y Zookeeper con Docker Compose:

bash
Copiar código
docker-compose up -d
Esto levanta:

Zookeeper en localhost:2181

Kafka en localhost:9092

Crear los tópicos necesarios para los microservicios (solo la primera vez o si borras los volúmenes):

powershell
Copiar código
./scripts/create-topics.ps1
Esto crea los siguientes tópicos:

users.create

users.update

users.delete

🛠️ Instalación de dependencias
Cada servicio tiene su propio package.json, por lo tanto necesitas instalar dependencias en ambos:

API Gateway
bash
Copiar código
cd api-gateway
yarn install
User Service
bash
Copiar código
cd ../user-service
yarn install
▶️ Levantar los microservicios
API Gateway
bash
Copiar código
cd api-gateway
yarn start:dev
Disponible en:
👉 http://localhost:3000

User Service
bash
Copiar código
cd ../user-service
yarn start:dev
📡 Endpoints disponibles
Crear un usuario
http
Copiar código
POST http://localhost:3000/users
Content-Type: application/json

{
  "id": "1",
  "name": "Daniel",
  "email": "daniel@example.com"
}
Actualizar un usuario
http
Copiar código
PUT http://localhost:3000/users/1
Content-Type: application/json

{
  "name": "Daniel Canales",
  "email": "daniel.canales@example.com"
}
Eliminar un usuario
http
Copiar código
DELETE http://localhost:3000/users/1
🗑️ Limpiar contenedores
Si quieres detener y eliminar los contenedores, redes y volúmenes:

bash
Copiar código
docker-compose down -v
⚠️ Esto también borrará los tópicos de Kafka.
En ese caso tendrás que volver a ejecutar el script create-topics.ps1.

📂 Estructura del proyecto
bash
Copiar código
├── api-gateway/          # Gateway que expone endpoints REST
├── user-service/         # Microservicio de usuarios (CQRS + Kafka)
├── create-topics.ps1     # Script para crear tópicos en Kafka
├── docker-compose.yml    # Configuración de Kafka + Zookeeper
└── README.md
```
