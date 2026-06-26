# 📓 DiaryHub Platform – Docker, Nginx & CI/CD System

![Architecture Diagram](/src/doc/diaryhub.gif) 

A containerised, microservices-based diary application platform built with **Node.js, Docker, Nginx reverse proxy, PostgreSQL, and CI/CD automation**.  
Designed for scalable deployment, service isolation, and production-like infrastructure practice.

The project demonstrates a production-style backend architecture using **Docker, Nginx reverse proxy, JWT authentication, and secure service-to-service communication**.

DiaryHub allows users to create an account, authenticate via JWT, and manage personal journals within their private diary space.

---

# 🔹 Deployment Flow

The system is deployed using a fully automated CI/CD pipeline and containerised infrastructure.

1. Code is pushed to a Git repository  
2. Jenkins pipeline is triggered via webhook  
3. Docker images are built on the target VM  
4. Docker Compose redeploys services  
5. Nginx acts as a reverse proxy and load balancer for API traffic  
6. Cloudflare Tunnel exposes the application securely over HTTPS  

---

# 🔹 Key Outcomes

- Secure deployment without direct public exposure of backend services  
- Fully automated **CI/CD pipeline using Jenkins**  
- Hostname-based routing via Nginx reverse proxy  
- TLS termination at Cloudflare edge  
- Load balancing across multiple API container replicas  
- PostgreSQL database with internal-only network access  
- Internal Docker networking for service communication  
- JWT-based authentication and authorization system  
- Health check endpoints for monitoring service availability  
- Scalable, stateless API design using container replicas  
- Clean separation of infrastructure and application layers  

---

# 🔹 Technologies Used

- 🌐 **Cloudflare Tunnel** – Secure HTTPS exposure via edge routing  
- 🌀 **Nginx** – Reverse proxy and load balancing layer  
- 🐳 **Docker & Docker Compose** – Container orchestration  
- ⚙️ **Jenkins CI/CD** – Automated build and deployment pipeline  
- 🗄️ **PostgreSQL** – Relational database system  
- 🖥️ **Linux (Ubuntu)** – Self-hosted VM environment  
- 🟢 **Node.js (Express)** – Backend API framework  
- 🔐 **JWT (JSON Web Tokens)** – Authentication system  
- 🚀 **CI/CD Best Practices** – Automated deployment workflow  

---

# 🔹 API Endpoints

## 📡 API Routing Architecture

All traffic is routed through **Nginx**, which distributes requests across **three identical DiaryHub API replicas**.

These replicas are:
- Stateless
- Interchangeable
- Load-balanced automatically via Nginx

---

## 📊 Endpoint Table (Load Balanced System)

| Endpoint | Method | Authentication | Description | Handled By |
|----------|--------|----------------|-------------|-------------|
| `/user/create-diary` | POST | ❌ | Create a new user diary account | Any API replica |
| `/user/access-diary` | POST | ❌ | Authenticate user and return JWT token | Any API replica |
| `/user/create-journal` | POST | ✅ JWT | Create a journal entry | Any API replica |
| `/user/get-journal` | GET | ✅ JWT | Retrieve all user journals | Any API replica |
| `/user/update-journal` | PUT | ✅ JWT | Update a journal entry | Any API replica |
| `/user/delete-journal/:id` | DELETE | ✅ JWT | Delete a journal entry | Any API replica |
| `/health` | GET | ❌ | Service health check endpoint | Any API replica |

---

# 🔹 Load Balancing Behaviour

DiaryHub API runs as **three identical stateless replicas** behind Nginx.

- All replicas share the same codebase and functionality  
- No endpoint is tied to a specific container  
- Requests are distributed dynamically using **round-robin load balancing**  
- Any replica can handle any request at any time  
- If one replica fails, traffic is automatically routed to healthy instances  

---

# 🔹 Test Flow

Most endpoints require authentication using a **Bearer JWT token**.

## BaseURL
  `https://diaryhubapi.tayolabs.dev`
---

## 1. Health Check
GET /health

---

## 2. Create Diary
POST /user/create-diary

Request Body:
{
  "username": "Tester",
  "email": "tester@example.com",
  "password": "strongpassword123"
}

---

## 3. Access Diary (Login)
POST /user/access-diary

Request Body:
{
  "email": "tester@example.com",
  "password": "strongpassword123"
}

Expected Response:
{
  "message": "Login successful",
  "token": "JWT_ACCESS_TOKEN"
}

---

## 4. Create Journal
POST /user/create-journal

Headers:
Authorization: Bearer <ACCESS_TOKEN>

Request Body:
{
  "topic": "string",
  "note": "string"
}

---

## 5. Get Journals
GET /user/get-journal

Headers:
Authorization: Bearer <ACCESS_TOKEN>

---

## 6. Update Journal
PUT /user/update-journal

Headers:
Authorization: Bearer <ACCESS_TOKEN>

Request Body:
{
  "journalID": 1,
  "topic": "string",
  "note": "string"
}

---

## 7. Delete Journal
DELETE /user/delete-journal/:journalID

Headers:
Authorization: Bearer <ACCESS_TOKEN>