// client/src/pages/Dashboard.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaCalendarCheck,
  FaListAlt,
  FaGlobe,
} from "react-icons/fa";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8faff",
        color: "#111",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ---------------- SIDEBAR ---------------- */}
      <aside
        style={{
          width: open ? 260 : 70,
          padding: 20,
          background: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          transition: "0.25s",
        }}
      >
        {/* Hamburger */}
        <div
          onClick={() => setOpen(!open)}
          style={{
            fontSize: 22,
            cursor: "pointer",
            marginBottom: 20,
            color: "#1e2a3b",
          }}
        >
          <FaBars />
        </div>

        {/* Logo */}
        <h2
          style={{
            opacity: open ? 1 : 0,
            transition: "0.25s",
            marginTop: 0,
            marginBottom: 25,
            color: "#1e2a3b",
          }}
        >
          Tutor Panel
        </h2>

        {/* Sidebar Buttons */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* HOME */}
          <button
            onClick={() => navigate("/dashboard/home")}
            style={
              location.pathname === "/dashboard/home"
                ? sidebarBtnActive
                : sidebarBtn
            }
          >
            <FaHome style={icon} /> {open && "Home"}
          </button>

          {/* BOOKINGS */}
          <button
            onClick={() => navigate("/dashboard/bookings")}
            style={
              location.pathname === "/dashboard/bookings"
                ? sidebarBtnActive
                : sidebarBtn
            }
          >
            <FaCalendarCheck style={icon} /> {open && "Bookings"}
          </button>

          {/* AVAILABILITY */}
          <button
            onClick={() => navigate("/dashboard/availability")}
            style={
              location.pathname === "/dashboard/availability"
                ? sidebarBtnActive
                : sidebarBtn
            }
          >
            <FaListAlt style={icon} /> {open && "Availability"}
          </button>

          {/* PUBLIC BOOKING */}
          <a
            href="/book"
            style={
              location.pathname === "/book"
                ? sidebarBtnActive
                : sidebarBtn
            }
          >
            <FaGlobe style={icon} /> {open && "Public Booking"}
          </a>
        </nav>

        <hr
          style={{
            borderColor: "#e5e7eb",
            margin: "25px 0",
          }}
        />

        {open && (
          <small style={{ color: "#6b7280" }}>
            Edusched — Tutor Dashboard
          </small>
        )}
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main style={{ flex: 1, padding: 40 }}>
        <Outlet />
      </main>
    </div>
  );
}

/* ---------------- SIDEBAR BUTTON STYLES ---------------- */

const sidebarBtnActive = {
  padding: "12px 14px",
  borderRadius: 10,
  background: "#e8f1ff", // light blue
  color: "#1e2a3b",
  border: "1px solid #c9dbff",
  cursor: "pointer",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  fontSize: "15px",
  fontWeight: 600,
  transition: "0.25s",
};

const sidebarBtn = {
  padding: "12px 14px",
  borderRadius: 10,
  background: "#ffffff",
  color: "#1e2a3b",
  border: "1px solid #e5e9f3",
  cursor: "pointer",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  fontSize: "15px",
  transition: "0.25s",
};

const icon = {
  marginRight: 10,
  fontSize: "18px",
  color: "#2563eb", // blue icons
};



