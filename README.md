# **MovieJaMMer**

MovieJaMMer is an full-stack movie web application that allows users to explore a vast collection of movies, register and log in, manage personal favorite lists, and perform dynamic searches. Built with a modern technology stack, it features a scalable backend and an interactive, user-friendly frontend. This project demonstrates best practices for building a real-world web application, handling both frontend and backend logic, user authentication, and smooth data integration.

Check out MovieJaMMer @https://movie-jammer.vercel.app/

## **Table of Contents**

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [API Endpoints](#api-endpoints)
6. [Environment Variables](#environment-variables)
7. [Deployment](#deployment)
8. [Testing](#testing)
9. [Future Enhancements](#future-enhancements)
10. [Contributing](#contributing)


## **Features**




## **Technology Stack**

### **Frontend:**



### **Backend:**


### **Deployment:**

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

## **Getting Started**

### **Prerequisites:**

- Node.js 
- MongoDB (Cloud or Local instance)

### **Installation Steps:**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/KabeerH/movieJammer.git
   ```
   
