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
      const res = await fetch(
        `http://localhost:3000/bookings/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      setMessage(data.message);
      fetchBookings(); // refresh list
    } catch (err) {
      console.error(err);
      setMessage("Error updating status");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Split into upcoming / past
    // ---- FIXED SPLITTING LOGIC ----
  const now = new Date();

  // UPCOMING = future + still booked
  const upcoming = bookings.filter(
    (b) =>
      b.status === "booked" &&
      new Date(b.startTime) > now
  );

  // PAST = already happened OR status updated
  const past = bookings.filter(
    (b) =>
      new Date(b.startTime) <= now ||
      b.status === "conducted" ||
      b.status === "cancelled" ||
      b.status === "absent"
  );


  return (
    <div>
      <h1>Bookings</h1>

      <p style={{ color: "lightgreen" }}>{message}</p>

      {/* UPCOMING */}
      <h2>Upcoming Classes</h2>
      {upcoming.length === 0 ? (
        <p>No upcoming classes.</p>
      ) : (
        <ul>
          {upcoming.map((b) => (
            <li key={b.id} style={{ marginBottom: 12 }}>
              <strong>{b.subject}</strong> —
              {" "}
              {new Date(b.startTime).toLocaleString()}
              {" "}({b.mode})
              <div style={{ marginTop: 5 }}>
                <button
                  onClick={() => updateStatus(b.id, "conducted")}
                  style={btn.green}
                >
                  Mark Conducted
                </button>
                <button
                  onClick={() => updateStatus(b.id, "cancelled")}
                  style={btn.orange}
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateStatus(b.id, "absent")}
                  style={btn.red}
                >
                  Mark Absent
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
        <ul>
          {past.map((b) => (
            <li key={b.id} style={{ marginBottom: 12 }}>
              <strong>{b.subject}</strong> —
              {" "}
              {new Date(b.startTime).toLocaleString()}
              {" "}
              | <strong>Status:</strong> {b.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const btn = {
  green: {
    background: "green",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: 4,
    marginRight: 6,
    cursor: "pointer",
  },
  orange: {
    background: "orange",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: 4,
    marginRight: 6,
    cursor: "pointer",
  },
  red: {
    background: "red",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};

