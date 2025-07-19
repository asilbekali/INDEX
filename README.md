# 🧩 Intex Platform — Full Stack Web App

This is a full stack web application based on the **Intex** UI design built with **NestJS (backend)** and **Prisma ORM**, and designed using [Figma](https://www.figma.com/design/xswPNtoPR6pJNF5hSVjebh/intex?node-id=105-688&t=wqhSDZa0aOOV7ZMs-0).

## 📌 Project Overview

The Intex platform is a responsive multi-page website UI that includes:

- Landing page with modern layout  
- Services and features section  
- About us & team  
- Contact form  
- Admin or client dashboard *(optional based on logic)*

---

## 🛠️ Tech Stack

### 📦 Backend

- [NestJS](https://nestjs.com/) — Node.js framework  
- [Prisma](https://www.prisma.io/) — ORM for database  
- PostgreSQL / MySQL (configurable)  
- [Swagger](https://swagger.io/) for API documentation  
- Role-based access (RBAC)  
- JWT authentication  

### 🎨 Frontend *(planned or in progress)*

- HTML / CSS / TailwindCSS  
- React / Next.js *(optional)*

---

## 🗂️ Folder Structure

intex-backend/
├── src/
│ ├── auth/
│ ├── user/
│ ├── elon/ # Example module
│ ├── prisma/ # Prisma service
│ └── main.ts
├── prisma/
│ └── schema.prisma
├── .env
├── package.json
└── README.md

yaml
Копировать
Редактировать

---

## ⚙️ Getting Started (Backend)

### 1. Clone the repo

```bash
git clone https:[//github.com/your-username/intex.git](https://github.com/asilbekali/INTEX.git)
cd intex-backend
2. Install dependencies
bash
Копировать
Редактировать
npm install
# or
yarn install
3. Set up environment variables
Create a .env file in the project root and add the following:

env
Копировать
Редактировать
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/intex_db"
JWT_SECRET="your_jwt_secret"
4. Prisma setup
bash
Копировать
Редактировать
npx prisma generate
npx prisma migrate dev --name init
5. Run the server
bash
Копировать
Редактировать
npm run start:dev
🧪 API Documentation
Once the server is running, open the following URL to view Swagger API documentation:

📎 http://localhost:3000/api

🧑‍💻 Developer Notes
✅ RBAC implemented (admin / super_admin roles)

🔐 Auth module with JWT access token

🧱 Clean architecture with services, modules, DTOs

⚙️ Prisma client injected globally

📄 License
This project is licensed under the MIT License.

🎨 UI Design Source
🔗 View Figma Design | https://www.figma.com/design/xswPNtoPR6pJNF5hSVjebh/intex?node-id=105-688&t=wqhSDZa0aOOV7ZMs-0

