const express = require('express');
const mysql = require('mysql2');

const app = express();

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yashu@123',
  database: 'bus_booking' // Make sure this database exists
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connection has been created");

  // Users Table
  const usersTable = `
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE
    )
  `;

  connection.execute(usersTable, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Users table is created");
  });

  // Buses Table
  const busesTable = `
    CREATE TABLE IF NOT EXISTS Buses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      busNumber VARCHAR(50) UNIQUE,
      totalSeats INT,
      availableSeats INT
    )
  `;

  connection.execute(busesTable, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Buses table is created");
  });

  // Bookings Table
  const bookingsTable = `
    CREATE TABLE IF NOT EXISTS Bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      busId INT,
      seatNumber INT,
      FOREIGN KEY (userId) REFERENCES Users(id),
      FOREIGN KEY (busId) REFERENCES Buses(id)
    )
  `;

  connection.execute(bookingsTable, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Bookings table is created");
  });

  // Payments Table
  const paymentsTable = `
    CREATE TABLE IF NOT EXISTS Payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      bookingId INT,
      amountPaid DECIMAL(10, 2),
      paymentStatus VARCHAR(50),
      FOREIGN KEY (bookingId) REFERENCES Bookings(id)
    )
  `;

  connection.execute(paymentsTable, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Payments table is created");
  });
});

// Express route
app.get('/', (req, res) => {
  res.send("Bus Booking System is running!");
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
