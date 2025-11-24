import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    fetchBookings();
  }, []);

  const now = new Date();
  const upcoming = bookings.filter((b) => b.status === "booked" && new Date(b.startTime) > now);
  const past = bookings.filter((b) => new Date(b.startTime) <= now || ["conducted", "cancelled", "absent"].includes(b.status));

  return (
    <div>
      <h1 style={{ marginBottom: 10 }}>Bookings</h1>
      <p style={{ color: "lightgreen" }}>{message}</p>

      <h2>Upcoming Classes</h2>
      {upcoming.length === 0 ? (
        <p>No upcoming classes.</p>
      ) : (
        <ul style={{ lineHeight: "1.9" }}>
          {upcoming.map((b) => (
            <li key={b.id}>
              <strong>{b.subject}</strong> — {new Date(b.startTime).toLocaleString()} ({b.mode})
              <div style={{ marginTop: 8 }}>
                <button onClick={() => updateStatus(b.id, "conducted")} style={btn.green}>
                  Mark Conducted
                </button>
                <button onClick={() => updateStatus(b.id, "cancelled")} style={btn.orange}>
                  Cancel
                </button>
                <button onClick={() => updateStatus(b.id, "absent")} style={btn.red}>
                  Mark Absent
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr style={{ margin: "20px 0", opacity: 0.2 }} />

      <h2>Past & Completed Classes</h2>
      {past.length === 0 ? (
        <p>No past classes.</p>
      ) : (
        <ul style={{ lineHeight: "1.9" }}>
          {past.map((b) => (
            <li key={b.id}>
              <strong>{b.subject}</strong> — {new Date(b.startTime).toLocaleString()} | <strong>Status:</strong> {b.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const baseBtn = {
  padding: "8px 12px",
  border: "none",
  borderRadius: 6,
  color: "white",
  marginRight: 8,
  cursor: "pointer",
};

const btn = {
  green: { ...baseBtn, background: "#1e8e3e" },
  orange: { ...baseBtn, background: "#ff8c2b" },
  red: { ...baseBtn, background: "#d43f3f" },
};


