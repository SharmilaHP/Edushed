import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import PublicBooking from "./pages/PublicBooking.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import AvailabilityPage from "./pages/AvailabilityPage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import TutorLogin from "./pages/TutorLogin.jsx";

export default function App() {
  const isTutor = localStorage.getItem("isTutor") === "true";

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/public-booking" element={<PublicBooking />} />
      <Route path="/tutor-login" element={<TutorLogin />} />

      <Route
        path="/dashboard"
        element={isTutor ? <Dashboard /> : <Navigate to="/tutor-login" />}
      >
        <Route path="home" element={<HomePage />} />
        <Route path="availability" element={<AvailabilityPage />} />
        <Route path="bookings" element={<BookingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}








