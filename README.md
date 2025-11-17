EduSched — A Tutor-Class Scheduling Mini-SaaS
A full-stack scheduling and class-booking platform
________________________________________
Overview
EduSched is a minimal SaaS platform designed to help private tutors manage their teaching schedule and allow students to book available class slots.
It demonstrates full-stack engineering skills including:
1.API design
2.Database modelling
3.Backend development with Express & Prisma
4.Frontend development with React
5.State management
6.Routing
7.UI/UX structure
8.Data validation
9.Practical engineering trade-offs
________________________________________️
1) Tutor Availability Setup 
Tutor can:
•	Add weekly availability slots
•	Each slot contains:
  subject, start time, end time, mode (online/offline), notes
•	View all availability
•	Delete availability
•	Slots automatically become unavailable once booked
•	Edit Slots
________________________________________
2) Public Booking Page 
Students can:
•	View available slots
•	View booked/unavailable slots
•	See day, actual date, notes
•	Book a class by entering:
o	Name
o	Email
o	Phone
•	Double-booking is prevented on backend
•	Once booked, the slot moves from Available → Booked immediately
________________________________________
3) Tutor Dashboard for Class Management 
Dashboard includes:
•	Home Page with:
o	Total bookings count
o	Upcoming
o	Completed
o	Cancelled
•	Bookings Page:
o	Lists Upcoming & Past classes separately
o	Ability to mark class as:
	Conducted
	Cancelled
	Student Absent
•	Availability Page:
o	Add/Delete slots
o	Weekly schedule management
•	Public booking page link
________________________________________
Tech Stack
Frontend
•	React (Vite)
•	React Router DOM
•	React Icons
•	Fetch API
Backend
•	Node.js
•	Express.js
•	Prisma ORM
•	SQLite (local dev)
•	CORS
Dev Tools
•	Nodemon
•	Postman / Thunder Client (for API testing)
•	GitHub
________________________________________
📂 Project Structure
📦 EduSched
 ┣ 📁 client
 │  ┣ 📁 src
 │  │  ┣ 📁 pages
 │  │  │  ┣ Dashboard.jsx
 │  │  │  ┣ BookingsPage.jsx
 │  │  │  ┣ AvailabilityPage.jsx
 │  │  │  ┣ PublicBooking.jsx
 │  │  │  ┗ HomePage.jsx
 │  │  ┣ App.jsx
 │  │  ┗ main.jsx
 │  ┗ package.json
 ┣ 📁 server
 │  ┣ index.js
 │  ┣ prisma
 │  │  ┗ schema.prisma
 │  ┗ package.json
 ┣ README.md
 ┗ THINKING.md
________________________________________
 Setup Instructions
1️) Clone the Repository
git clone <your-repo-url>
cd EduSched
________________________________________
2️) Server Setup (Backend)
cd server
npm install
Set up database
Create a .env file inside /server:
DATABASE_URL="file:./dev.db"
Run migrations
npx prisma migrate dev --name init
Start backend server
npm run dev
Server will run at:
 http://localhost:3000
________________________________________
3️) Client Setup (Frontend)
cd ../client
npm install
npm run dev
Frontend will run at:
 http://localhost:5173
________________________________________
API Testing Instructions
Use Thunder Client / Postman:
Availability
•	POST /availability
•	GET /availability
•	DELETE /availability/:id
Bookings
•	POST /book
•	GET /bookings
•	PUT /bookings/:id/status
•	GET /bookings/future
•	GET /bookings/past
Double-booking is prevented automatically.
________________________________________
Automated Tests
Test categories to include:
•	Create availability
•	Booking flow
•	Conflict (double booking)
•	Status update
________________________________________
Key Features Demo
Tutor Dashboard
•	Sidebar navigation
•	Home metrics (total bookings, upcoming, completed, cancelled)
•	Bookings list with status updates
•	Availability management page
Public Booking Page
•	Available slots (with real date + day + notes)
•	Booked slots separated visually
•	Booking form
•	Slot instantly moves to “Booked” section
________________________________________
 Design Highlights
•	Clean API separation (REST)
•	Prisma used for predictable schema + migrations
•	React Router for nested dashboard navigation
•	Auto-update UI after every operation
•	Clear separation of concerns:
o	Dashboard (tutor view)
o	Public Bookings (student view)
•	Future-proof structure for adding login/admin features
________________________________________
Limitations
•	No authentication (anyone can access dashboard)
•	No calendar view (weekly view only)
•	No recurring exception handling
•	No email notifications
•	No pagination for large bookings
________________________________________
Possible Future Improvements
•	Tutor login system (JWT)
•	Student account creation
•	Calendar UI (monthly view)
•	Notifications (email/SMS)
•	Payment integration
•	Multi-tutor support
