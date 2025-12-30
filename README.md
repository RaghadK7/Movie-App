# Movie Explorer

**Movie Explorer** is an interactive web application that allows users to search for movies, view trending titles, and explore detailed information about each film. Built with **React** and **Tailwind CSS**, it fetches data from the **TMDB API** and displays movie posters, descriptions, ratings, trailers, and cast in a clean, Netflix-inspired design.

## Features
- **Search Movies:** Find any movie by name with real-time search using debouncing for performance.
- **Trending Movies:** Displays the most popular movies currently trending.
- **Movie Details Page:** Includes:
  - Movie poster
  - Overview/description
  - TMDB rating
  - Trailer video embedded from YouTube
  - Main cast with photos and character names
- **Responsive Design:** Works smoothly on mobile, tablet, and desktop.
- **Clean UI:** Netflix-inspired layout with hero background and smooth styling.
- **Navigation:** React Router for seamless page transitions.

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **API:** TMDB API
- **Backend (optional):** Appwrite for storing search term counts
- **Routing:** React Router
- **Language:** JavaScript (ES6+)

## Installation & Running Locally
1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-explorer.git
Navigate to the project folder:

cd movie-explorer


Install dependencies:

npm install


Create a .env file in the project root and add your TMDB API key:

VITE_TMDB_API_KEY=your_tmdb_api_key


Run the development server:

npm run dev
