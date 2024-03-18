# MERN Stack E-commerce Application

This is a comprehensive README file for the MERN Stack E-commerce application, detailing its features, technologies used, setup instructions, and acknowledgments.

## Table of Contents
1. [Features](#features)
2. [Product Features](#product-features)
3. [Pending Features](#pending-features)
4. [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installations](#installations)
    - [Setup Database](#setup-database)
5. [Contributors](#contributors)
6. [License](#license)
7. [Acknowledgments](#acknowledgments)

## Features
- **Authentication**: Users can log in to the application via two ways one is with OTP (via SMS or Email) and the other one is by entering their username/email and password.
- **JWT Integration**: JSON Web Tokens (JWT) are used for secure authentication and authorization.
- **Product Categories**: The application displays products in various categories, including Clothes for Men and Women, Women's Fashionable Items, Jewellery, Electronics, Movies from around the world, and Others.
- **Backend Integration**: Utilizes Node.js for backend server handling and REST APIs to interact with MongoDB and MySQL databases.
- **Architecture**: Follows an MVC architecture for clear separation of concerns and a router system to organize features.
- **External API Integration**: Integrates with TMDB (The Movie Database) to fetch movie-related data and Twilio for providing SMS integration.
- **User Profile**: Retrieves user profile data from MySQL database.
- **UI Library**: Utilizes React for the user interface.
- **State Management**: Redux (@reduxjs/toolkit) and redux-thunk are used for state management and asynchronous operations.
- **YouTube Integration**: Utilizes react-youtube library for viewing movie trailers.
- **Context Handling**: Uses useContext for context handling in certain components.
- **Responsive Design**: UI is responsive and compatible with various devices.
- **Component Library**: Integrates with React Material UI library for components and icons.
- **Security**: Sensitive data is stored in configuration files and .env files for adherence to security standards.
- **OTP Integration**: Uses speakeasy library for OTP generation and QRCode library for generating QR codes.
- **SMS Integration**: Utilizes Twilio for sending OTP via SMS.

## Product Features
- **Product Search**: Users can search for products by name.
- **Filtering and Sorting**: Products can be filtered based on categories and sorted in ascending or descending order.
- **Product Details**: Detailed information about a product is available upon selection.
- **Add to Cart**: Users can add selected items to their cart.
- **Cart Management**: View all selected products in the cart with itemized pricing and total amount.
- **Navigation**: Users can navigate between Home, Cart, and Checkout pages seamlessly.
- **Movies**: Users can browse and filter movies from around the world.
- **Movie Trailers**: View trailers of selected movies.
- **Logout**: Users can log out of the application.

## Pending Features
- **Movie Cart Integration**: Adding movies to the cart section.
- **Payment Gateway Integration**: Pending integration with a payment gateway for purchasing products.

## Setup Instructions
### Prerequisites
- Node.js installed on your system.
- MongoDB and MySQL databases set up.

### Installations
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables in config and .env file. These should reflect your DB Details( MongoDB, MySQL)
4. Run the backend server:
    - Navigate to the root folder and then the server folder.
    - Run `node server.js`.
5. Run the frontend server:
    - Go to the root folder.
    - Run `npm run dev`.
6. Ensure both MongoDB and MySQL are up and running.

### Setup Database. 
 
- **MongoDB Atlas**: Used for login-related functionality. Create a table with user details including userid, username, email, and hashed passwords for security purposes.
- **MySQL Database**:
    - Create a table for UserProfile details with the following structure:
        ```sql
        CREATE TABLE user_profile (
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            phone_number VARCHAR(20),
            dob DATE,
            gender ENUM('male', 'female', 'other')
        );
        ```

## Contributors
- ASIF SHAIK

## License
This project is licensed under the MIT License.

## Acknowledgments
Special thanks to:
- [Twilio](https://www.twilio.com/) for providing SMS integration.
- [TMDB](https://www.themoviedb.org/) for providing movie-related data.
- Speak Easy for OTP related functionality.

