# "Book MyPlane" Flight Booking Website

Book MyPlane is a Flight Booking Website built with Vite + React, Node.js, Express.js and MongoDB. It allows users to select their departure and destination countries, filter available flights based on their preferred departure date and time, and make bookings. Additionally, it includes an admin panel that allows administrators to create, edit, or delete flights, and view the details of the number of bookings made on each flight.

## Installation
To install and run this project, follow these steps:

1. Clone this repository.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running npm install.
4. Create a .env file in the root directory with the following variables:
    - MONGO_URI - the URI for your MongoDB database.
5. Start the development server by running npm run dev.

## Features

Book MyPlane Flight Booking Website includes the following features:

- *Country Selection:* Users can select their departure and destination countries from a dropdown list.
- *Departure Date and Time Filter:* Users can filter available flights based on their preferred departure date and time.
- *Live Map:* During country selection, a live map marks the selected countries using React Simple Maps.
- *Booking:* Users can make bookings for available flights.
- *Admin Panel:* Administrators can create, edit, or delete flights, and view the details of the number of bookings made on each flight.
- *Three.js 3D Visualization:* A 3D model is displayed using Three.js.

## Technologies Used

Book MyPlane Flight Booking Website was built with the following technologies:

- **MongoDB:** a NoSQL database used for storing flight and booking data.
- **Express.js:** a web framework used for building the server-side REST API.
- **React:** a JavaScript library used for building the user interface.
- **Node.js:** a JavaScript runtime used for building the server-side REST API.
- **Vite:** a build tool used for bundling and optimizing the client-side code.
- **React Simple Maps:** a lightweight library used for creating interactive maps.
- **Three.js:** a 3D graphics library used for visualizing the selected plane model.

## Conclusion
Book MyPlane Flight Booking Website is a powerful and feature-rich flight booking application that provides a seamless and user-friendly experience for customers. With the use of React Simple Maps, customers can easily select their desired departure and destination countries, and visualize their selection on a live map. The admin panel provides easy management of flights and bookings. Overall, Book MyPlane Flight Booking Website is a great example of a full-stack MERN application and provides a unique and modern approach to flight booking. Try it out now and experience the future of flight booking!
