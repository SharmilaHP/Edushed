import { useEffect, useState } from "react";

export default function HomePage() {
  const [bookings, setBookings] = useState([]);

  const loadData = async () => {
    const res = await fetch("http://localhost:3000/bookings");
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ---- TODAY ----
  const now = new Date();

  // ---- COUNTS ----
  const total = bookings.length;

  const upcoming = bookings.filter(
    (b) =>
      b.status === "booked" &&
      new Date(b.startTime) > now
  ).length;

  const completed = bookings.filter(
    (b) => b.status === "conducted"
  ).length;

  const cancelled = bookings.filter(
    (b) => b.status === "cancelled"
  ).length;

  // ---- CARD UI ----
  const card = {
    width: "180px",
    background: "#111",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    border: "1px solid #333",
  };

  const numberBox = {
    fontSize: "40px",
    fontWeight: "bold",
    background: "#222",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "10px",
    border: "1px solid #444",
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Welcome!</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* Total Bookings */}
        <div style={card}>
          <div style={numberBox}>{total}</div>
          <p>Total Bookings</p>
        </div>

        {/* Upcoming */}
        <div style={card}>
          <div style={numberBox}>{upcoming}</div>
          <p>Upcoming</p>
        </div>

        {/* Completed */}
        <div style={card}>
          <div style={numberBox}>{completed}</div>
          <p>Completed</p>
        </div>

        {/* Cancelled */}
        <div style={card}>
          <div style={numberBox}>{cancelled}</div>
          <p>Cancelled</p>
        </div>
      </div>
    </div>
  );
}

