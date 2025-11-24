import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import AvailabilityPage from "./pages/AvailabilityPage.jsx";
import HomePage from "./pages/HomePage.jsx";

import PublicBooking from "./pages/PublicBooking.jsx";
import BookingPage from "./pages/BookingPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/book" element={<PublicBooking />} />
      <Route path="/book/:id" element={<BookingPage />} />

      {/* Dashboard with nested routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<HomePage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="availability" element={<AvailabilityPage />} />
        <Route index element={<HomePage />} />
      </Route>

      {/* default route -> dashboard home */}
      <Route path="/" element={<Dashboard />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}


