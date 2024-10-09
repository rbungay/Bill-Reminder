# BillBuddy - Bill Tracker

**BillBuddy** is a simple and efficient bill management application. It allows users to create, view, update, and delete bills, as well as track unpaid, paid, and overdue bills. The app provides an intuitive user interface for managing bills and ensures that important due dates are never missed. Built using MongoDB, Express.js, Node.js, and EJS templating, this project showcases full CRUD functionality.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)

## Features

- **Full CRUD Functionality**: Create, read, update, and delete bills.
- **Bill Categories**: Track unpaid, paid, and overdue bills.
- **User Authentication**: Secure login and session handling.
- **Bill Filtering**: Filter bills by status and view upcoming bills.
- **Responsive Design**: Optimized for mobile and desktop devices.

## Technologies

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: EJS, CSS
- **Authentication**: Express-session, bcrypt
- **Date Management**: JavaScript's Date object for bill due dates
- **Views**: EJS templating engine

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rbungay/Bill-Reminder.git
   ```

2. Navigage to the project directory:

   ```bash
   cd Bill-Reminder
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your environmental variabls. Create a **.env** file in the root directory and add the following:

   ```makefile
   MONGODB_URI=<your-mongodb-connection-string>
   SESSION_SECRET=<your-session-secret>
   ```

- Replace "<**your-mongodb-connection-string**>" with the MongoDB connection string you are using.

- Replace "<**your-session-secret**>" with a random secret string for your session.

5. Start the application

   ```bash
   nodemon server.js
   ```

6. Open your browser and go to **http://localhost:3000** to view the app.

## Usage

- **Create Bill**: Add new bills by specifying a name, amount, due date, status (unpaid, paid, overdue), and category.
- **View Bills**: View all unpaid, paid, and overdue bills on the dashboard.
- **Update Bill**: Edit existing bills from the bill management page.
- **Delete Bill**: Remove bills that are no longer relevant.

## Folder Structure

```plaintext
BillBuddy/


├── middleware/     # Logic to confirm is user is in session.
├── models/         # Mongoose schemas for the Bill and User models
├── public/         # Static files - CSS
├── controllers/    # Route definitions for bill management and user authentication
├── views/          # EJS templates for rendering pages
├── .env            # Environment variables
├── package.json    # Project metadata and dependencies
└── server.js       # Entry point of the application

```

## Screenshots

1. Dashboard

![BillBuddyDashBoard](/images/BillBuddy-Dashboard.png)

- View a summary of unpaid, paid, and overdue bills.

2. Add New Bill

![AddNewBillUI](/images/AddNewBill.png)

- Form to add a new bill with details like name, amount, due date, and status.

3. Wireframes/Userstories from [Trello](https://trello.com/invite/b/66fdab2b1f08f0d5d4379395/ATTI9ce86102df775ae45b7a80473fdc76a6EBF69F9F/bill-reminder)

![TrelloWireframe](/images/TrelloBoard.png)

## Future Improvements

I have several goals for this project including but not limited to:

- Rewrite the JS in **TypeScript**: I'd like to be able to practice converint my current Javascript files into a typescript for me to allow other users to clearly read coding further.

- Have my code DRY: As this is my first project doing a full CRUD, I find myself rewriting several codes that I believe can be simplified even further.

- **SMS/Email Reminders**: Notify users about upcoming bill due dates via SMS or email.

- **Dashboard Analytics**: Show financial statistics based on paid and unpaid bills.

- Add a **Payment Processor**: Implementing Stripe or another form of payment taker.
