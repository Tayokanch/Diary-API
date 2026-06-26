# NoteWatch — Secure CI/CD Deployment with Docker, Nginx & Cloudflare 

 

![Architecture Diagram](/src/doc//deploy.png) 

 

--- 

 

## 🔹 Project Overview 

 

I designed and implemented a ***CI/CD pipeline*** that automates deployment of containerized applications to a self-hosted VM, creating a secure, production-like environment using modern DevOps best practices. 

 

The project demonstrates how to deploy production-ready systems **without exposing public ports**, while supporting **HTTPS**, **automated deployments**, and **scalable service routing**. 

 

--- 

 

## 🔹 Architecture Overview 

 

- **Cloudflare Tunnel**: Securely connects the VM to the internet without opening any inbound ports. 

- **TLS Termination**: Managed by Cloudflare at the edge, so the server does not need certificates.  

- **Nginx**: Reverse proxy and load balancer routing requests to multiple API containers.  

- **Docker & Docker Compose**: Containerized orchestration for APIs and PostgreSQL database.  

- **Jenkins CI/CD**: Automated builds, testing, and deployments triggered on Git push.  

- **PostgreSQL**: Persistent storage using Docker volumes.  

- **Internal Docker Network**: Ensures services communicate securely without exposing unnecessary ports.  

 

--- 

 

## 🔹 Deployment Flow 

 

1. Push code to Git repository.  

2. Jenkins pipeline is triggered via webhook.  

3. Docker images are built on the target VM.  

4. Docker Compose deploys/redeploys services.  

5. Nginx load balances traffic across three API containers.  

6. Cloudflare Tunnel exposes the application securely over HTTPS. 

 

--- 

 

## 🔹 Key Outcomes 

 

- Secure deployment without exposing public ports.  

- Fully automated **CI/CD pipeline** with Jenkins.  

- Hostname-based routing that directs requests to multiple API services behind a single public endpoint..  

- TLS termination at Cloudflare — no local certificate management required.  

- Load balancing between multiple API containers.  

- PostgreSQL database with internal-only access.  

- Clean, modular separation of concerns for easier maintenance and security. 

 

--- 

 

## 🔹 Technologies Used 

 

 

- 🌐 **Cloudflare Tunnel** – Secure outbound-only access with TLS handled at the edge 

- 🌀 **Nginx** 

- 🐳 **Docker & Docker Compose**  

- ⚙️ **Jenkins CI/CD**  

- 🗄️ **PostgreSQL**  

- 🖥️ **Linux (Ubuntu)** – Self-hosted VM environment 

- 🟢 **Node.js** – 

- 🚀 **CI/CD Best Practices**  

 

--- 

 

## 🔹 API Endpoints 

 

## API Routing via Nginx 

All API traffic is routed through **Nginx**, which serves as both a reverse proxy and a **round-robin load balancer**.  

Incoming requests are distributed across **three identical API containers**, improving fault tolerance and ensuring consistent performance under load. 

Nginx communicates with the API services over Docker’s private bridge network, keeping internal ports isolated from public access while maintaining efficient service discovery. 

| Endpoint         | Service Container       | Port |
|-----------------|------------------------|------|
| `/user/login`   | API v1                 | 3000 |
| `/user/signup`  | API v2                 | 3001 |
| `/create-note`  | API v3                 | 3002 |
| `/get-notes`    | API v1                 | 3000 |
| `/request-logs` | API v2                 | 3002 |
| `/health`       | Health check for each API


## 🧪 How to Test the APPLICATION 

The DiaryHUB API is securely available over HTTPS at https://notewatch.tayolabs.dev, with TLS managed by Cloudflare and requests routed through Nginx to the backend services. 

 

 

You can test the endpoints using **Postman**, **insomnia**, **curl**, or any HTTP client. 

 

--- 

 

### 🧪 Test Flow 

 

Most endpoints require authentication using a **Bearer Access Token**. 

1. chech API health ('/health')

2. Create a diary (`/user/create-diary`) 

3. Log in (`/user/access-diary`  ) returns an `Authorization Token` 


**Request Body** 

```json 

1. POST /user/create-diary

{ 

"username": "Tester", 

"email": "tester@example.com", 

"password": "strongpassword123" 

} 

 

 

2. POST /user/access-diary

{ 

"email": "tester@example.com", 

"password": "strongpassword123" 

} 

 

Expected Response 

{ 
"message": "string",

"token": "JWT_ACCESS_TOKEN" 

} 

 

 

 

3. POST /user/create-journal

Authorization: Bearer <ACCESS_TOKEN> 

Body
  {
    "topic": "string",
    "note": "string"
}
 

 

4. GET /user/get-journal

Authorization: Bearer <JWT_ACCESS_TOKEN> 

 

5. PUT /user/update-journal`

Authorization: Bearer <JWT_ACCESS_TOKEN> 

{
"journalID": int,
"topic": "string",
"note": "string"
}
 

6. DELETE /user/delete-journal/{journalID} 

Authorization: Bearer <JWT_ACCESS_TOKEN> 


``` 

 

 