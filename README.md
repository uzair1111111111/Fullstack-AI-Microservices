# Enterprise Fitness Tracker - Microservices & AI Integration

## 📌 Project Strategy
This project is an enterprise-grade fitness management system built on a **Microservices Architecture**. The goal was to create a decoupled system where the AI engine and Activity tracking can scale independently.

---

## 🚀 Key Technical Deliverables (My Work)

### 1. AI Insights Engine (`aiservice`)
* **Service Implementation:** Integrated **Google Gemini 1.5 Flash** using Spring WebFlux's non-blocking `WebClient`.
* **Intelligent Parsing:** Developed a robust parsing logic to handle AI responses and transform them into actionable health data.
* **Data Persistence:** Implemented H2 Database storage to ensure historical recommendations are available for user progress tracking.

### 2. Activity & Health Core (`activityservice`)
* **Scalable APIs:** Designed and implemented RESTful endpoints for real-time activity logging (Walking, Running, etc.).
* **Business Logic:** Developed the backend processing for calorie tracking and user activity history.

### 3. Unified Dashboard (`fitness-frontend`)
* **Modern Stack:** Built using **React (Vite)** with a focus on performance and responsive design.
* **API Orchestration:** Connected multiple backend services through a single UI, handling cross-origin requests and data synchronization.

---

## 🏗️ Architecture Stack
* **Discovery & Routing:** Netflix Eureka & Spring Cloud Gateway.
* **Configuration:** Centralized Config Server for environment-specific settings.
* **Backend:** Java 17, Spring Boot 3.x.
* **Database:** H2 In-memory (Switchable to MySQL/PostgreSQL for production).

---

## 🧪 Current Status & Future Roadmap
* **Functional:** Authentication, Activity Logging, and AI Logic are fully integrated.
* **Optimized:** The system handles asynchronous calls to avoid blocking the main thread.
* **Roadmap:** Future updates will include real-time streaming of AI advice and more detailed health analytics.
