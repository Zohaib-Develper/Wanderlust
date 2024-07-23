Wondurlust
Welcome to Wondurlust, a feature-rich web application inspired by Airbnb. This project showcases my skills in full-stack development using EJS, Node.js, Express, and MongoDB. Wondurlust allows users to explore, manage, and review property listings, all within a dynamic and user-friendly interface.

Table of Contents
Features
Technologies Used
Installation
Usage
API Endpoints
Contributing
License
Features
User Authentication & Authorization

Register, log in, and log out.
Manage personal listings and reviews.
Secure access to create, update, and delete listings and reviews.
Listing Management

Create, update, and delete property listings.
Upload photos to enhance listings.
Review System

Add and manage reviews for listings.
Delete own reviews.
Search & Filters

Search for properties based on criteria.
Apply filters to refine search results.
Form Validation

Front-end and back-end validation to ensure data integrity.
Cookies for Session Management

Manage user sessions and enhance interactions.
MVC Architecture

Implemented the Model-View-Controller pattern for a clean and scalable codebase.
Technologies Used
EJS (Embedded JavaScript Templates): For dynamic templating and rendering.
Node.js & Express: For server-side logic and API endpoints.
MongoDB: For data storage and management.
HTML/CSS/JavaScript: For front-end development and styling.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/wondurlust.git
cd wondurlust
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add the necessary environment variables for MongoDB and any other configuration required.
plaintext
Copy code
MONGODB_URI=your-mongodb-uri
SESSION_SECRET=your-session-secret
Run the application:

bash
Copy code
npm start
The application should now be running on http://localhost:3000.

Usage
Home Page: Visit the home page to explore featured listings and access various functionalities.
Browse Listings: Use the "Browse Listings" link in the navbar to view all available properties.
Search & Filters: Utilize the search bar and filters to find specific listings.
User Management: Register or log in to manage your listings and reviews.
Listing Management: Create, update, and delete your own listings.
Review Management: Add and manage reviews for properties.
API Endpoints
POST /register: Register a new user.
POST /login: Authenticate a user and create a session.
POST /logout: Log out the current user.
GET /listings: Get all property listings.
POST /listings: Create a new listing (authenticated users only).
PUT /listings/
: Update a specific listing (authenticated users only).
DELETE /listings/
: Delete a specific listing (authenticated users only).
POST /reviews: Add a review for a listing (authenticated users only).
DELETE /reviews/
: Delete a specific review (authenticated users only).
Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
