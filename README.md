# Hotel Booking Web App

This is a straightforward hotel booking web platform where users can browse and book rooms. It also includes an admin panel for managing rooms and bookings.

## Tech Stack

**Client:** Built with React, React-Bootstrap, and other small, useful dependencies.

**Server:** Spring Boot, Spring Security (with JWT), JPA

**DB** : MySQL

## Features

- Authentication/Authorization System: Implements JWT and Spring Security, providing role-based access authentication.
- Room Booking: Users can browse and book rooms.
- Room Search: Includes filters for room type and availability, allowing users to search by dates.
- Admin panel :
  - Room Management: Create new rooms, room types, edit existing rooms, and delete rooms.
  - Booking Management: Provides an integrated date filter range for viewing existing bookings.
- Confirmation Code Search: Users can find bookings using the confirmation code.
- Profile Page: Allows users to view their booking history.

## Usage (Docker Environment)

1. Build the containers:

```
docker compose build
```

2. Run the containers:

```
docker-compose up
```

Access the application at [localhost:80](localhost:80)
