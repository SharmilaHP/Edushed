import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TutorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "tutor@2025") {
      localStorage.setItem("isTutor", "true");
      navigate("/dashboard/home", { replace: true });
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: 420,
          background: "white",
          padding: "40px 32px",
          borderRadius: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            textAlign: "left",
            color: "#1e2a3b",
            marginBottom: 25,
          }}
        >
          EduSched
        </div>

        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 25,
            color: "#1e2a3b",
          }}
        >
          Tutor Login
        </h2>

        <input
          type="text"
          placeholder="Email or Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid #d0d7e6",
            marginBottom: 12,
            fontSize: 15,
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid #d0d7e6",
            marginBottom: 12,
            fontSize: 15,
          }}
        />

        {error && (
          <div style={{ color: "red", marginBottom: 10, fontSize: 14 }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            background: "#163a8a",
            color: "white",
            padding: "12px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            marginTop: 10,
          }}
        >
          Login
        </button>

        <div
          style={{
            marginTop: 15,
            fontSize: 14,
            color: "#1e3a8a",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </div>
      </div>
    </div>
  );
}










