# **MovieJaMMer**

MovieJaMMer is an full-stack movie web application that allows users to explore a vast collection of movies, register and log in, manage personal favorite lists, and perform dynamic searches. Built with a modern technology stack, it features a scalable backend and an interactive, user-friendly frontend. This project demonstrates best practices for building a real-world web application, handling both frontend and backend logic, user authentication, and smooth data integration.

Check out MovieJaMMer @https://movie-jammer.vercel.app/

## **Table of Contents**

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Deployment](#deployment)
4. [Project Structure](#project-structure)
5. [Future Enhancements](#future-enhancements)

## **Features**

- **Movie Searching**:
Easily search for movies and DVDs using a robust database, retrieving details such as titles, genres, release dates, ratings, and more.

- **Movie Favoriting**:
Add movies or DVDs to your favorites list for quick access. Manage your personal collection of favorite movies directly from your profile.

- **Account Authentication**:
Secure account management system using JWT for authentication. Features include registration, login, logout, and password protection with bcrypt hashing for enhanced security.

- **Advanced Movie/DVD Details**:
Dive deep into movie or DVD details with comprehensive metadata, including cast, crew, synopsis, runtime, user reviews, trailers, and availability in physical or streaming formats.

- **CRUD Operations on Account Details**:
Create, Read, Update, and Delete account information, such as profile details, contact information, and preferences. Includes a confirmation step for sensitive actions like account deletion.

## **Technology Stack**

### **Frontend:**

- **Framework:** Next.js (React-based framework for server-side rendering and static site generation)
- **Styling:** TailwindCSS for utility-first responsive design
- **API Calls**: Axios for seamless HTTP requests

### **Backend:**

- **Framework:** Express.js for building the RESTful API
- **Database:** MongoDB (NoSQL database) with Mongoose for schema and model management
- **Authentication:** JSON Web Tokens (JWT) for secure user authentication
- **Password Security:** bcrypt for password hashing
- **Hosting:** Localhost during development, with deployment-ready support for platforms like AWS, Vercel, or Heroku

## **Deployment:**

- **Vercel:** Frontend is deployed on Vercel for fast and reliable performance with automatic scaling. Backend APIS have also been deployed on Vercel (for free) using vercel.json file incorporation. 



## **Project Structure**

```bash
movieJammer/
├── frontend/              
│   ├── .next/              
│   ├── app/
│   │   ├── dashboard/page.js  
│   │   ├── fonts/GeistVF.woff         
│   │   ├── help/page.js
│   │   ├── login/page.js   
│   │   ├── movies/[id]/page.js         
│   │   ├── notifications/page.js
│   │   ├── profile/page.js   
│   │   ├── register/page.js         
│   │   ├── search/page.js
│   │   ├── favicon.ico  
│   │   ├── globals.css         
│   │   ├── layout.js    
│   │   └── page.js   
│   ├── components/
│   │   ├── ui/particles.jsx  
│   │   ├── Footer.js         
│   │   ├── Modal.js     
│   │   └── NavigationBar.js
│   ├── lib/
│   │   ├── apiCalls.js
│   │   ├── authenticate.js        
│   │   └── utils.js
│   ├── nodemodules/
│   ├── public/
│   ├── .env
│   ├── eslintrc.json
│   ├── .gitignore
│   ├── components.json
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── README.md       
│   └── tailwind.config.js     
├── movieAPI/             
│   ├── node_modules/    
│   ├── .env               
│   ├── .gitignore
│   ├── .package.json
│   ├── .package-lock.json                  
│   ├── server.js      
│   └── vercel.json       
├── userAPI/              
│   ├── node_modules/    
│   ├── .env               
│   ├── .gitignore
│   ├── .package.json
│   ├── .package-lock.json                  
│   ├── server.js      
│   └── vercel.json                         
└── README.md           

```

## **Future Enhancements**

- **Advanced Search Filters:**
Enable users to filter search results by genre, release year, ratings, language, and availability in streaming platforms.

- **User Reviews and Ratings:**
Allow users to leave reviews and rate movies directly on the platform, creating a community-driven experience.

- **Recommendations Engine:**
Implement a recommendation system based on user favorites, and genre preferences using machine learning.

- **Implement Remaining Pages:**
Develop the unfinished pages (once the user logs in)

- **Admin Dashboard:**
Develop an admin panel to manage users, movies, reviews, and reports, ensuring smooth platform maintenance (Permissions and authenication).

## **Contact** 

**Email:** [kabeerharjani@gmail.com](mailto:kabeerharjani@gmail.com)

**LinkedIn:** [linkedin/in/kabeer-harjani](https://www.linkedin.com/in/kabeer-harjani)

**Website:** [KabeerHarjani.netlify](https://kabeerharjani.netlify.app/)

