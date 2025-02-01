# TravelTrucks - Camper Rental Web App

## Overview

TravelTrucks is a frontend web application for "TravelTrucks", a camper rental company. The application allows users to browse, filter, and book campers through a simple and intuitive interface. It includes several pages such as a home page, a catalog of campers, and a detailed camper page with reviews and a booking form.

The app integrates with a backend API to fetch camper data and manage user interactions such as filtering and booking.

**API**: [https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers](https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers)

## Features

- **Home Page**: Contains a banner with a main call-to-action to view available campers.
- **Catalog Page**: Displays a list of campers with options for filtering by location, camper type, and features (e.g., air conditioning, kitchen).
- **Camper Detail Page**: Shows detailed information about each camper, including a photo gallery, reviews, and a booking form.

## Functional Requirements

- **Navigation**: Users can navigate to the catalog page from the home page by clicking a "View Now" button.
- **Filtering**: Users can filter campers by location, type, and available amenities (such as air conditioning and kitchen). Filtering is done on the backend.
- **Favorites**: Users can add campers to a favorites list, which persists across page reloads.
- **Details Page**: Clicking "Show More" on a camper card in the catalog takes the user to the detailed page of that camper.
- **Pagination**: The catalog page includes a "Load More" button to load additional camper cards based on the applied filters.
- **Reviews**: Reviews are displayed on the camper detail page, where users can rate campers on a five-star scale.
- **Booking Form**: Users can fill out a booking form to reserve a camper, with a success notification on successful submission.

## Technologies Used

- **React + Vite**: For building a fast and efficient frontend application.
- **Redux Toolkit**: For state management (campers list, selected filters, and favorites).
- **React Router**: For navigating between the pages.
- **Axios**: For making API requests to fetch camper data.
- **CSS**: You can use any CSS library of your choice (e.g., CSS modules, styled-components, MUI).

## Pages

- **Home Page**: Features a banner with the main call-to-action.
- **Catalog Page**: Displays all available campers with filtering options.
- **Camper Detail Page**: Shows detailed information about a selected camper, including images, reviews, and a booking form.

## API Endpoints

- `GET /campers`: Fetch all camper listings. Filtering is done on the backend.
- `GET /campers/:id`: Fetch the details of a specific camper by its ID.

## Application State

State management is handled by Redux. The state includes:

- **Camper List**: A list of all campers fetched from the API.
- **Filters**: Selected filters for location, type, and amenities.
- **Favorites**: A list of campers added to the user's favorites.

## How to Run the Project

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/haydaycher/travelttruckscampers.git
cd travelttruckscampers
```

### Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
# or
yarn install
```

### Run the Development Server

Start the local development server:

```bash
npm run dev
# or
yarn dev
```

<!--
### View the App
Open [http://localhost:5173](http://localhost:5173) in your browser to see the app in action.

## Deployed Project
The project is deployed on Vercel. You can view the live app here: [TravelTrucks - Vercel](https://your-vercel-link) -->

## Design

The application follows the provided design mockups, which can be found here: [Figma Design](https://www.figma.com/design/6vTbzaB3EPgOreQz2jOJJe/Campers?node-id=0-1&t=wWUj9PeSd7v1KZ5q-1)

## Development Practices

- The code follows DRY (Don't Repeat Yourself) principles.
- Clean and readable code with comments where necessary.
- Semantic HTML with valid markup.
- The app uses component-based architecture.

## Author

- **Yevheniia Cherepashchuk**
- [GitHub Profile](https://github.com/haydaycher)
