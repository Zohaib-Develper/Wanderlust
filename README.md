# Wanderlust

This project is live at [Wanderlust](https://wanderlustapp.vercel.app)
Welcome to **Wanderlust**, a feature-rich web application inspired by Airbnb website. This project showcases my skills in full-stack development using EJS, Bootstrap, Node.js, Express, and MongoDB. Wanderlust allows users to explore, manage, and review property listings, all within a dynamic and user-friendly interface.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Installation

### Prerequisites

- **Node.js**
- **Git**

### Clone the Repository

1. Open your terminal or command prompt.
2. Clone the repository:

   ```bash
   git clone https://github.com/Zohaib-Develper/Wanderlust.git
   ```

3. Navigate into the project directory:

   ```bash
   cd wanderlust
   ```

4. Install Dependancies
   ```bash
   npm install
   ```
5. Environment Configuration
   Create a .env file in the root directory of the project and add:
   ```bash
   CLOUD_NAME=your-cloud-name
   CLOUD_API=your-cloud-api-key
   CLOUD_API_SECRET=your-cloud-api-secret
   MONGODB_URL=your-mongodb-url
   SECRET=your-secret-key
   ```
6. Run the Application
   Start the development server:
   ```bash
   npm start
   ```
   This will run the application on the port 8080, go to http://localhost:8080.

## Features

### User Authentication

- **Registration:** Users can register with unique usernames.
- **Login/Logout:** Registered users can securely log in and log out.
- **Password Security:** Passwords are hashed and salted using Passport for enhanced security.
- **Cookies:** Implemented cookies for session management.

### Listings

- **Create Listing:** Registered users can create new listings with detailed descriptions and can upload images for their listings.
- **Update Listing:** Users can update only the listings they have created.
- **Delete Listing:** Users can delete only the listings they have created.
- **Search Listings:** Users can search for listings based on various criteria.
- **Filter Listings:** Users can set filters to narrow down listing search results.

### Reviews

- **Create Review:** Registered users can leave reviews for listings.
- **Delete Review:** Users can delete only the reviews they have created.

### Error Handling and Validation

- **Form Validation:** Comprehensive form validation is implemented both on the front end and the backend.
- **Error Handling:** Proper error handling is in place to manage any failures or issues.

### MVC Architecture

- **Model-View-Controller:** The application is structured following the MVC architecture for better organization and maintainability.

## Technologies Used

- **EJS (Embedded JavaScript Templates) and Bootstrap**: For Frontend.
- **Node.js & Express**: For server-side logic and API endpoints.
- **MongoDB**: For data storage and management.
