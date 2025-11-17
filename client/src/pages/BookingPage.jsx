// client/src/pages/BookingsPage.jsx
import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:3000/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
      setMessage("Error loading bookings");
    }
  };

  // Update booking status
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:3000/bookings/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      setMessage(data.message);
      fetchBookings();
    } catch (err) {
      console.error(err);
      setMessage("Error updating status");
    }
  };

  // Load bookings on page load
  useEffect(() => {
    fetchBookings();
  }, []);

  // Separate upcoming & past
  const upcoming = bookings.filter((b) => new Date(b.startTime) > new Date());
  const past = bookings.filter((b) => new Date(b.startTime) <= new Date());

  return (
    <div>
      <h1 style={{ marginBottom: 10 }}>Bookings</h1>

      <p style={{ color: "lightgreen" }}>{message}</p>

      <hr />

      {/* UPCOMING CLASSES */}
      <h2>Upcoming Classes</h2>

      {upcoming.length === 0 ? (
        <p>No upcoming classes.</p>
      ) : (
        <ul style={{ lineHeight: "1.9" }}>
          {upcoming.map((b) => (
            <li key={b.id}>
              <strong>{b.subject}</strong> —{" "}
              {new Date(b.startTime).toLocaleString()} ({b.mode})
              <div style={{ marginTop: 6 }}>
                <button
                  onClick={() => updateStatus(b.id, "conducted")}
                  style={btnGreen}
                >
                  Mark Conducted
                </button>

                <button
                  onClick={() => updateStatus(b.id, "cancelled")}
                  style={btnOrange}
                >
                  Cancel
                </button>

                <button
                  onClick={() => updateStatus(b.id, "absent")}
                  style={btnRed}
                >
                  Student Absent
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr />

      {/* PAST CLASSES */}
      <h2>Past & Completed Classes</h2>

      {past.length === 0 ? (
        <p>No past classes.</p>
      ) : (
        <ul style={{ lineHeight: "1.9" }}>
          {past.map((b) => (
            <li key={b.id}>
              <strong>{b.subject}</strong> —{" "}
              {new Date(b.startTime).toLocaleString()}
              <strong> | Status:</strong> {b.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const baseBtn = {
  padding: "6px 10px",
  border: "none",
  borderRadius: 5,
  color: "white",
  marginRight: 8,
  cursor: "pointer",
};

const btnGreen = { ...baseBtn, background: "green" };
const btnOrange = { ...baseBtn, background: "orange" };
const btnRed = { ...baseBtn, background: "red" };
