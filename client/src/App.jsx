import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import AvailabilityPage from "./pages/AvailabilityPage.jsx";

import PublicBooking from "./pages/PublicBooking.jsx";
import BookingPage from "./pages/BookingPage.jsx";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/book" element={<PublicBooking />} />
      <Route path="/book/:id" element={<BookingPage />} />

      {/* DASHBOARD ROUTES */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<HomePage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="availability" element={<AvailabilityPage />} />

        {/* Default inside dashboard */}
        <Route index element={<HomePage />} />
      </Route>

      {/* ROOT ROUTE = HOME */}
      <Route path="/" element={<Dashboard />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;


