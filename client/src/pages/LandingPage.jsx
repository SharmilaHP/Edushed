// client/src/pages/LandingPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, GraduationCap, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f4f7fb",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 50,
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          width: "94%",
          maxWidth: 1300,
          background: "white",
          borderRadius: 16,
          padding: "14px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          EduSched
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {/* SUBJECT DROPDOWN */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              style={navBtn}
            >
              Subjects ▼
            </button>

            {openDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: 35,
                  right: 0,
                  background: "white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderRadius: 10,
                  padding: "10px 0",
                  width: 150,
                }}
              >
                {["Tamil", "English", "Maths", "Science", "Social"].map(
                  (sub) => (
                    <div
                      key={sub}
                      onClick={() => {
                        setOpenDropdown(false);
                        navigate(`/subjects/${sub.toLowerCase()}`);
                      }}
                      style={{
                        padding: "10px 16px",
                        cursor: "pointer",
                        fontSize: 14,
                      }}
                    >
                      {sub}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <button style={navBtn} onClick={() => navigate("/tutor-login")}>
            Tutor Login
          </button>
        </div>
      </nav>

      {/* MAIN SINGLE BOX */}
      <div
        style={{
          width: "94%",
          maxWidth: 1300,
          background: "white",
          borderRadius: 20,
          marginTop: 22,
          padding: "40px 50px",
          boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
        }}
      >
        {/* HEADLINE + DESCRIPTION */}
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 42,
            color: "#163a8a",
            margin: 0,
          }}
        >
          Achieve More. Personalized Learning Awaits
        </h1>

        <p
          style={{
            marginTop: 12,
            color: "#475569",
            fontSize: 16,
            maxWidth: 900,
          }}
        >
          Connect with certified expert tutors anytime, anywhere, and unlock your academic potential.
        </p>

        {/* FEATURES */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <FeatureItem
            icon={<Calendar size={28} color="#2047aa" />}
            title="Flexible Scheduling"
            text="Book lessons at a time that fits your busy life."
          />
          <FeatureItem
            icon={<GraduationCap size={28} color="#2047aa" />}
            title="Expert Tutors"
            text="Learn from qualified professionals in any subject."
          />
          <FeatureItem
            icon={<ShieldCheck size={28} color="#2047aa" />}
            title="Secure Platform"
            text="Encrypted data & guaranteed support."
          />
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 45,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f8faff",
            padding: "20px 120px",  // ← shifted button inward
            borderRadius: 16,
          }}
        >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              margin: 0,
            }}
          >
            Ready to Elevate Your Learning Journey?
          </h3>

          <button
            onClick={() => navigate("/public-booking")}
            style={{
              background: "#163a8a",
              color: "white",
              padding: "12px 26px",
              borderRadius: 50,
              border: "none",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Book a Class
          </button>
        </div>
      </div>
    </div>
  );
}

/* FEATURE ITEM COMPONENT */
function FeatureItem({ icon, title, text }) {
  return (
    <div
      style={{
        width: "31%",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: 10 }}>{icon}</div>
      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: 17,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 14, color: "#556170" }}>{text}</div>
    </div>
  );
}

/* NAV BUTTON STYLE */
const navBtn = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: "Inter, sans-serif",
  color: "#1e3a8a",
  fontWeight: 600,
  fontSize: 15,
};


