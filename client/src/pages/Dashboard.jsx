// client/src/pages/Dashboard.jsx
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaCalendarCheck, FaListAlt, FaGlobe } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#1f1f1f", color: "white" }}>
      
      {/* ---------------- SIDEBAR ---------------- */}
      <aside
        style={{
          width: 240,
          padding: 20,
          background: "#111",
          borderRight: "1px solid #333",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Tutor Panel</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 25 }}>

          {/* UPDATED: Home goes to /dashboard/home */}
          <button onClick={() => navigate("/dashboard/home")} style={btn}>
            <FaHome style={icon} /> Home
          </button>

          <button onClick={() => navigate("/dashboard/bookings")} style={btn}>
            <FaCalendarCheck style={icon} /> Bookings
          </button>

          <button onClick={() => navigate("/dashboard/availability")} style={btn}>
            <FaListAlt style={icon} /> Availability
          </button>

          <a href="/book" style={linkStyle}>
            <FaGlobe style={icon} /> Public Booking
          </a>
        </nav>

        <hr style={{ borderColor: "#333", margin: "20px 0" }} />

        <small style={{ color: "#888" }}>Edusched — Tutor Dashboard</small>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main style={{ flex: 1, padding: 30 }}>
        <Outlet />
      </main>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const btn = {
  padding: "10px 14px",
  borderRadius: 6,
  background: "#222",
  color: "white",
  border: "1px solid #444",
  cursor: "pointer",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  fontSize: "15px",
};

const icon = {
  marginRight: 10,
  fontSize: "18px",
};

const linkStyle = {
  padding: "10px 14px",
  color: "#66b2ff",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  fontSize: "15px",
};
