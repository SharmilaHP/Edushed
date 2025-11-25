import { useEffect, useState } from "react";

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState([]);
  const [message, setMessage] = useState("");

  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState("Online");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadAvailability = async () => {
    const res = await fetch("http://localhost:3000/availability");
    const data = await res.json();
    setAvailability(data);
  };

  useEffect(() => {
    loadAvailability();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      dayOfWeek: Number(dayOfWeek),
      startTime,
      endTime,
      subject,
      mode,
      notes,
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`http://localhost:3000/availability/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("http://localhost:3000/availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (data.error) setMessage("Error: " + data.error);
      else {
        setMessage(editingId ? "Updated successfully" : "Added successfully");
        resetForm();
        loadAvailability();
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const deleteAvailability = async (id) => {
    if (!confirm("Are you sure you want to delete this slot?")) return;
    try {
      await fetch(`http://localhost:3000/availability/${id}`, { method: "DELETE" });
      setMessage("Deleted successfully");
      loadAvailability();
    } catch (err) {
      setMessage("Error deleting slot");
    }
  };

  const startEdit = (slot) => {
    setEditingId(slot.id);
    setDayOfWeek(slot.dayOfWeek);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
    setSubject(slot.subject);
    setMode(slot.mode);
    setNotes(slot.notes || "");
  };

  const resetForm = () => {
    setEditingId(null);
    setDayOfWeek("");
    setStartTime("");
    setEndTime("");
    setSubject("");
    setMode("Online");
    setNotes("");
  };

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div style={{ padding: "40px 50px", color: "#1e2a3b" }}>
      <h1 style={{ fontSize: 42, fontWeight: 700, marginBottom: 30 }}>Manage Availability</h1>

      {/* Add New Slot Section */}
      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
          maxWidth: 520,
          marginBottom: 40,
        }}
      >
        <h2 style={{ fontSize: 22, marginBottom: 20 }}>Add New Slot</h2>

        <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} style={input}>
          <option value="">Select Day</option>
          {dayNames.map((d, i) => (
            <option key={i} value={i}>
              {d}
            </option>
          ))}
        </select>

        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={input} />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={input} />

        <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} style={input} />

        <select value={mode} onChange={(e) => setMode(e.target.value)} style={input}>
          <option>Online</option>
          <option>Offline</option>
        </select>

        <input placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} style={input} />

        <button onClick={handleSubmit} style={btnBlue}>
          {editingId ? "Update Availability" : "Add Availability"}
        </button>
      </div>

      {/* All Availability List */}
      <h2 style={{ fontSize: 26, marginBottom: 20 }}>Your Current Availability</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {availability.map((slot) => (
          <div
            key={slot.id}
            style={{
              background: "white",
              padding: 22,
              borderRadius: 14,
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              {dayNames[slot.dayOfWeek]} ({slot.startTime} – {slot.endTime}) (Online)
            </div>

            <div style={{ marginTop: 8, color: "#374151" }}>
              <strong>Subject:</strong> {slot.subject} &nbsp; | &nbsp;
              <strong>Mode:</strong> {slot.mode} &nbsp; | &nbsp;
              <strong>Notes:</strong> {slot.notes || "None"}
            </div>

            {/* Buttons */}
            <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
              <button style={btnGreen} onClick={() => startEdit(slot)}>
                Edit
              </button>
              <button style={btnRed} onClick={() => deleteAvailability(slot.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------ Styles ------------------ */

const input = {
  display: "block",
  width: "100%",
  padding: "10px 14px",
  marginBottom: 14,
  borderRadius: 10,
  border: "1px solid #d0d7e6",
  background: "#f9fbff",
  fontSize: 15,
};

const btnBlue = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  marginTop: 10,
};

const btnGreen = {
  padding: "8px 16px",
  background: "#1e8e3e",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const btnRed = {
  padding: "8px 16px",
  background: "#d43f3f",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};


