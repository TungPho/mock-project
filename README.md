# Mock Project

## Table of Contents

- [Introduction](#introduction)
- [Folder Structure](#folder-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [API-Endpoints](#api-endpoints)
- [Testing](#testing)

---

## Introduction

A simple web application that allows users to fill out a health declaration form for COVID-19 or general health tracking purposes. This project is designed to collect personal and health-related information through a clean and user-friendly form interface.

Key Features:

- Collects user information: name, contact, travel history, symptoms.
- Submits data to the backend via REST API.

Technology Stack:

- Frontend: ReactJS, TailwindCSS, Axios
- Backend: Node.js, Express.js
- Database: MySQL
- Others: Docker (for containerization), Vitest & Testing Library (for unit testing)

---

## 📂 Folder structure:

```
mock-project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── record.controller.js
│   │   ├── dbs/
│   │   │   ├── db.connect.js
│   │   │   └── db.instance.js
│   │   ├── middlewares/
│   │   │   └── validate.record.js
│   │   ├── models/
│   │   │   ├── index.js
│   │   │   ├── record.model.js
│   │   │   └── symtom.model.js
│   │   ├── routers/
│   │   │   ├── main.router.js
│   │   │   └── record/
│   │   │       └── record.router.js
│   │   ├── services/
│   │   │   └── record.service.js
│   │   └── app.js
│   ├── tests/
│   ├── .dockerignore
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── nginx/
│   │   └── default.conf
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.instance.js
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── SubmittedForm.jsx
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── HealthDeclarationForm.jsx
│   │   │   ├── HealthRecordsTable.jsx
│   │   │   └── Root.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── tests/
│   │   └── HealthDeclarationForm.test.jsx
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── index.html
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── vitest.config.js
│   ├── vitest.setup.js
│   └── README.md
│
├── docker-compose.yml
└── README.md
```

---

## Requirements

- [Node.js](https://nodejs.org/) (version 20)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker] (https://www.docker.com/products/docker-desktop/)
- [MySQL] (https://www.mysql.com/downloads/) (for manual install only)

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone hhttps://github.com/TungPho/mock-project.git
   cd mock-project
   ```
2. **Run with Docker (Recommended)**

```sh
    cd mock-project
   docker compose up --build
```

- Frontend: [http://localhost]
- Backend: [http://localhost:6868]
- MySQL: port 3307, user: root, pass: 123456

3. **Run manually**

```sh
   cd mock-project
   cd frontend
   npm install
   npm run dev
```

```sh
    cd mock-project
cd backend
npm install
npm run start
```

---

## API Endpoints

GET /api/v1/records (Get list of records)

Example response: (http://localhost:6868/api/v1/records) (JSON):

```json
{
  "message": "Get all records success",
  "records": [
    {
      "id": 2,
      "name": "Tùng Phó",
      "temperature": 35.1,
      "contact_with_covid": false,
      "createdAt": "2025-07-10T07:00:09.000Z",
      "updatedAt": "2025-07-10T07:00:09.000Z",
      "Symptoms": [
        {
          "id": 2,
          "symptom_name": "Cough",
          "record_id": 2,
          "createdAt": "2025-07-10T07:00:09.000Z",
          "updatedAt": "2025-07-10T07:00:09.000Z"
        }
      ]
    }
  ]
}
```

POST /api/v1/records (Create 1 new record)

Example response (http://localhost:6868/api/v1/records) (JSON):

```json
{
  "message": "Created new record success",
  "record": {
    "id": 3,
    "name": "Trần Văn B",
    "temperature": 38.2,
    "contact_with_covid": true,
    "Symptoms": [
      {
        "id": 3,
        "symptom_name": "Ho",
        "record_id": 3,
        "updatedAt": "2025-07-10T07:28:27.532Z",
        "createdAt": "2025-07-10T07:28:27.532Z"
      },
      {
        "id": 4,
        "symptom_name": "Sốt",
        "record_id": 3,
        "updatedAt": "2025-07-10T07:28:27.532Z",
        "createdAt": "2025-07-10T07:28:27.532Z"
      },
      {
        "id": 5,
        "symptom_name": "Khó thở",
        "record_id": 3,
        "updatedAt": "2025-07-10T07:28:27.532Z",
        "createdAt": "2025-07-10T07:28:27.532Z"
      },
      {
        "id": 6,
        "symptom_name": "Đau cơ",
        "record_id": 3,
        "updatedAt": "2025-07-10T07:28:27.534Z",
        "createdAt": "2025-07-10T07:28:27.534Z"
      }
    ],
    "updatedAt": "2025-07-10T07:28:27.372Z",
    "createdAt": "2025-07-10T07:28:27.372Z"
  }
}
```

---

## Testing:

1. Run all tests for backend:

```bash
cd backend
npm run test
```

2. Run all tests for frontend

```bash
cd frontend
npm run test
```

---

## Demo application:

1. Health Declaration Form
   ![HealthDeclarationForm](./assets/form.png)
2. Record Lists table
   ![RecordsTable](./assets/table.png)

## Lisence:

- Author: Tùng Phó
- email : ductungpho1005@gmail.com
- github: https://github.com/TungPho
