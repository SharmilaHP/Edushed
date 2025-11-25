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

  const upcoming = bookings.filter(
    (b) => b.status === "booked" && new Date(b.startTime) > now
  );

  const past = bookings.filter(
    (b) =>
      new Date(b.startTime) <= now ||
      ["conducted", "cancelled", "absent"].includes(b.status)
  );

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div>
      <h1 style={pageTitle}>Bookings</h1>
      <p style={{ color: "green" }}>{message}</p>

      {/* UPCOMING */}
      <h2 style={sectionTitle}>Upcoming Classes</h2>

      {upcoming.length === 0 ? (
        <p>No upcoming classes.</p>
      ) : (
        upcoming.map((b) => (
          <div key={b.id} style={card}>
            <div style={cardTitle}>
              <strong>{b.subject}</strong> — {b.mode} ({formatDate(b.startTime)})
            </div>

            <div style={buttonRow}>
              <button onClick={() => updateStatus(b.id, "conducted")} style={btnGreen}>
                Mark Conducted
              </button>
              <button onClick={() => updateStatus(b.id, "cancelled")} style={btnOrange}>
                Cancel
              </button>
              <button onClick={() => updateStatus(b.id, "absent")} style={btnRed}>
                Mark Absent
              </button>
            </div>
          </div>
        ))
      )}

      {/* PAST */}
      <h2 style={sectionTitle}>Past & Completed Classes</h2>

      {past.length === 0 ? (
        <p>No past classes.</p>
      ) : (
        past.map((b) => (
          <div key={b.id} style={card}>
            <div style={cardTitle}>
              <strong>{b.subject}</strong> — {b.mode} ({formatDate(b.startTime)})
            </div>

            <div style={{ fontSize: 14, marginTop: 6 }}>
              <strong>Status:</strong>{" "}
              <span style={statusLabel(b.status)}>{b.status}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const pageTitle = {
  fontSize: "42px",
  marginBottom: "25px",
  fontWeight: 700,
  color: "#1e2a3b",
};

const sectionTitle = {
  fontSize: "22px",
  margin: "25px 0 10px",
  fontWeight: 600,
  color: "#1e2a3b",
};

const card = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  marginBottom: 18,
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

const cardTitle = {
  fontSize: "17px",
  fontWeight: 600,
  marginBottom: 12,
};

const buttonRow = {
  display: "flex",
  gap: 10,
};

const baseBtn = {
  padding: "8px 14px",
  borderRadius: 6,
  border: "none",
  color: "white",
  cursor: "pointer",
  fontWeight: 600,
};

const btnGreen = { ...baseBtn, background: "#1e8e3e" };
const btnOrange = { ...baseBtn, background: "#ff8c2b" };
const btnRed = { ...baseBtn, background: "#d43f3f" };

const statusLabel = (status) => {
  const colors = {
    conducted: "#16a34a",
    cancelled: "#dc2626",
    absent: "#ca8a04",
    booked: "#4b5563",
  };
  return {
    padding: "3px 10px",
    borderRadius: 6,
    background: colors[status] + "33",
    color: colors[status],
    fontWeight: 600,
    fontSize: 13,
  };
};
