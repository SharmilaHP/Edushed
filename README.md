EduSched Tutor-Class Scheduling Mini SaaS

A full-stack scheduling and class-booking platform for private tutors and students.

EduSched provides weekly availability management, booking automation, and a clean tutor dashboard built using modern frontend & backend technologies.

Features
Tutor Availability Management

Tutors can:

Add weekly availability slots

Specify: subject, start time, end time, mode (online/offline), notes

View all availability

Edit or Delete slots

Slots automatically turn unavailable after booking

Public Booking (Student View)

Students can:

View available, booked, and unavailable slots

See day, actual date, and notes

Book a class by entering:

Name

Email

Phone

Backend prevents double-booking

Slot instantly moves → Booked Section

Tutor Dashboard

Includes:

Home Page

Total bookings

Upcoming

Completed

Cancelled

Bookings Page

Upcoming & Past bookings (separate lists)

Update class status:

Conducted

Cancelled

Absent

Availability Page

Add, edit, delete weekly slots

View all availability

Public Booking Page

Direct student booking link

Tech Stack
Frontend

React (Vite)

React Router DOM

React Icons

Fetch API

Backend

Node.js

Express.js

Prisma ORM

SQLite (local development)

Dev Tools

Nodemon

Postman / Thunder Client

GitHub

📁 Project Structure 
EduSched
├── client
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       └── pages
│           ├── AvailabilityPage.jsx
│           ├── BookingPage.jsx
│           ├── BookingsPage.jsx
│           ├── Dashboard.jsx
│           ├── HomePage.jsx
│           ├── LandingPage.jsx
│           ├── PublicBooking.jsx
│           └── TutorLogin.jsx
│
└── server
    ├── index.js
    ├── package.json
    ├── prisma
    │   ├── dev.db
    │   ├── schema.prisma
    │   └── migrations
    │       └── 20251115140321_init
    │           └── migration_lock.toml
    └── prisma.config.ts

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone <your-repo-url>
cd EduSched

2️⃣ Backend Setup (Server)
cd server
npm install


Create .env:

DATABASE_URL="file:./dev.db"


Run Prisma migrations:

npx prisma migrate dev --name init


Start backend:

npm run dev


Backend runs at:
👉 http://localhost:3000

3️⃣ Frontend Setup (Client)
cd ../client
npm install
npm run dev


Frontend runs at:
👉 http://localhost:5173

🧪 API Endpoints
Availability

POST /availability

GET /availability

DELETE /availability/:id

Bookings

POST /book

GET /bookings

PUT /bookings/:id/status

GET /bookings/future

GET /bookings/past

✔ Backend prevents double booking.

📹 Demo Video

The full demonstration video (108 MB) is available under the GitHub Releases section.

📝 Design Highlights

Clean REST API separation

Prisma schema + migrations ensure DB stability

React Router + clean component structure

Live UI updates after every user action

Strict separation:

Tutor dashboard

Public student booking page

Future-friendly architecture

⚠️ Limitations

No authentication system

No calendar (weekly only)

No recurring exceptions

No notifications

No pagination for large datasets

🚀 Future Improvements

Tutor Login (JWT Auth)

Student Accounts

Monthly Calendar UI

Email/SMS Notifications

Payment Integration

Multi-Tutor Support

