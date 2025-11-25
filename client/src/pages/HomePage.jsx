// client/src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0,
  });

  // Fetch booking stats
  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("http://localhost:3000/bookings");
        const data = await res.json();

        const now = new Date();

        const upcoming = data.filter(
          (b) => b.status === "booked" && new Date(b.startTime) > now
        );

        const completed = data.filter((b) => b.status === "conducted");

        const cancelled = data.filter((b) => b.status === "cancelled");

        setStats({
          total: data.length,
          upcoming: upcoming.length,
          completed: completed.length,
          cancelled: cancelled.length,
        });
      } catch (err) {
        console.error(err);
      }
    }

    loadStats();
  }, []);

  return (
    <div style={{ padding: "20px 40px" }}>

      {/* ---------------- BACK TO MAIN PAGE ---------------- */}
      <div style={{ marginBottom: 20, cursor: "pointer" }}>
        <span
          onClick={() => navigate("/")}
          style={{
            color: "#2563eb",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          ← Back to Main Page
        </span>
      </div>

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "35px",
          fontWeight: "700",
          color: "#1e2a3b",
        }}
      >
        Welcome!
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
        }}
      >
        {/* TOTAL */}
        <Card value={stats.total} title="Total Bookings" />

        {/* UPCOMING */}
        <Card value={stats.upcoming} title="Upcoming" />

        {/* COMPLETED */}
        <Card value={stats.completed} title="Completed" />

        {/* CANCELLED */}
        <Card value={stats.cancelled} title="Cancelled" />
      </div>
    </div>
  );
}

/* ---------------- CARD COMPONENT ---------------- */

function Card({ value, title }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "40px 20px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        transition: "0.2s",
      }}
    >
      <div
        style={{
          fontSize: "40px",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "10px",
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: "18px",
          color: "#374151",
          marginTop: "8px",
        }}
      >
        {title}
      </div>
    </div>
  );
}



