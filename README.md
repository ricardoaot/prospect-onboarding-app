<p align="center">
  <a href="https://www.finalis.com//" target="blank"><img src="https://cdn.prod.website-files.com/63358611d4c8ab8cb0b5a30e/6335b5d1071432ea9613d2be_Logo-Finalks-White.svg" width="200" alt="Finalis Logo" /></a>
</p>

# Prospect Onboarding Process
## by Ricardo Olivari

## 📖 Index
- [📝 Planning](#-planning)
- [🏗️ Architecture Design](#-architecture-design)
- [🛠️ Tech Stack](#-tech-stack)
- [🔮 Pendings & Future Improvements](#-pendings--future-improvements)
- [⚙️ Install Instructions](#-install-instructions)
- [🌍 UAT Environments](#-uat-environments)

---


## 📝 Planning

  - ### 🚀 Approach Strategy
    - An agile development approach was used, with incremental deliveries that provide value from the first days.

  - ### 📅 MVP Roadmap
    - #### MVP - Increment - Day 1:
      - Create Roadmap.
      - Design Solution
      - Backend setup. 
        - Install Nest, graphql, mongo, mongoose libs. 
        - Create Scaffolding for Prospect domain.

    - #### MVP - Increment - Day 2:
      - Implement stepper with MUI
      - Create Basic Onboarding Form for **Personal Information**
      - Create endpoint to Save Personal Information

    - #### MVP - Increment - Day 3:
      - Add rest of fields column items
      - Frontend integration with GraphQL

    - #### MVP - Increment - Day 4:
      - List all prospects
      - Qualify prospect
      - Tabs for status: **Pending, Approved, Rejected**
      - Install Tailwind CSS

    - #### MVP - Increment - Day 5:
      - Optimize listing prospect query
      - Implement server side rendering for first fetching of prospects
      - Add **home Page** with link to interfaces


    - #### MVP - Increment - Day 6:
      - Deploy 
        - Backend in Render
        - Frontend in Vercel
        - Mongo in Mongo Atlas
      - Configure CI/CD with Github Actions
      - Save all prospect columns.
      - Upload **profile picture** to Cloudinary (Pending)

    - #### MVP - Increment - Day 7:
      - Documentation. Readme file.
      - Test & Quick fixes
      - Blacklisted validation (Pending)
      - **Country currency** validation (Pending)
      - **Google Maps address integration** (Pending)

[🔝 Back to Index](#-index)

---

## 🏗️ Architecture Design

  - ### 📂 DDD (Domain-Driven Design)
    - Apply **domain models** to structure business logic. The scope of the proyect could allow the creation of diferent entities such as PersonalInformation , LocationInformation, BankInformation, OtherInformation, UploadedFile. But for time reasons we will focused on the
    core domain Prospect and a root entity with the same name. 

  - ### 🛠️ Hexagonal Architecture
    - Use **ports and adapters** to ensure flexibility and maintainability.

  [🔝 Back to Index](#-index)

---

## 🛠️ Tech Stack

  - ### 📌 Frontend
    - **Next.js with TypeScript**
    - **React Hook Form**
    - **Material UI**

  - ### 📌 Backend
    - **NestJS**
    - **Mongoose**
    - **MongoDB**
    - **GraphQL**

  - ### 📌 Infrastructure & CI/CD
    - **Vercel** (Frontend Deployment)
    - **Render** (Backend Deployment)
    - **Mongo Atlas** (Database Hosting)
    - **GitHub & GitHub Actions**

    **NOTE**: Regarding the database election, with a possible low traffic and a very well defined data structure in the scope, a realtional DB like Postgres would be the best option. However in this opportunity I wanted to challenging myself and show my skills with a no SQL DB.

[🔝 Back to Index](#-index)

---

## 🔮 Pendings & Future Improvements
  - Country Currency validation via country combo box with Server side rendering 
  - limit status types in backend
  - Address finder  with google map with pin
  - Install **Swagger** for API documentation.
  - Improve **error handling**.
  - Add **unit and integration tests**.
  - Use of MUI in all buttons.
  - DTO’s implementation
  - Add Auth0 security layer for authentication
  - Multilingual Support with i18 implementation
  - Add security layers in enpoints by guards
  - DDD modeling with all entities, domain and subdomains
  - Backend conteinerization with Docker Compose
  - Improve cpu cores management of the backend API with node workers

[🔝 Back to Index](#-index)

---

## ⚙️ Install Instructions

- ### 🖥️ Backend
```sh
git clone https://github.com/ricardoaot/prospect-onboarding-api.git
cd onboarding/backend
npm install
npm run start:dev
```

- ### 🌐 Frontend
```sh
git clone https://github.com/ricardoaot/prospect-onboarding-app.git
cd onboarding/frontend
npm install
npm run dev
```

Then create the .env based on the file that I send you separately for security reason 



[🔝 Back to Index](#-index)

---

## 🌍 UAT Environments

- **Backend:** [Onboarding API](https://prospect-onboarding-api.onrender.com)
- **Frontend:** [Onboarding App](https://prospect-onboarding-app.vercel.app)

Disclaimer: This project was deployed on a free tier of Render & Vercel. Low performance in loading is expected.
First, load the backend in the browser to wake up the server, and then try accessing Vercel.

[🔝 Back to Index](#-index)