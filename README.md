# Laravel and React Mortgage Application

## Introduction

This project is a mortgage application built with Laravel (PHP) for the backend and React for the frontend. The application allows anonymous users to view a table of mortgage information and provides admin users with the capability to add, edit, and delete mortgage records.

## Features

### Anonymous Users
- View a table of mortgages displaying:
  - Bank name
  - House cost
  - Monthly payment
- Search functionality by bank name
- Filtering options for:
  - House cost (greater than, less than)
  - Monthly payment (greater than, less than)

### Admin Users
- Preloaded admin user can log in with a username and password
- Admin functionalities include:
  - Adding new mortgages
  - Editing existing mortgages
  - Deleting mortgages

## Installation

### Prerequisites
- PHP 8.2
- Composer
- Node.js
- MySQL
- tabaleplus for sqlite 

### Backend (Laravel)
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/eliyaho/laravel_And_React.git
   cd laravel_And_React
   \`\`\`

2. Install PHP dependencies:
   \`\`\`bash
   composer install
   \`\`\`

3. Set up the environment file:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Update the `.env` file with your database configuration.

4. Generate application key:
   \`\`\`bash
   php artisan key:generate
   \`\`\`

5. Run database migrations and seed the database:
   \`\`\`bash
   php artisan migrate --seed
   \`\`\`

6. Start the Laravel development server:
   \`\`\`bash
   php artisan serve
   \`\`\`

### Frontend (React)
1. Navigate to the `client` directory:
   \`\`\`bash
   cd client
   \`\`\`

2. Install JavaScript dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the React development server:
   \`\`\`bash
   npm start
   \`\`\`

### Accessing the Application
- The Laravel backend server will be available at `http://localhost:8000`.
- The React frontend server will be available at `http://localhost:3000`.

## Usage

### API Routes
- `/mortgages/preload` (POST): Preload mortgages into the database.
- `/mortgages/fetch` (GET): Fetch mortgages with optional search and filter parameters.

### Middleware
- `CorsMiddleware`: Handles CORS headers to allow communication between the React frontend and Laravel backend.

### Controllers
- `MortgageController`: Manages mortgage-related operations such as preloading and fetching mortgages.

### Models
- `Mortgage`: Represents the mortgage data structure.

