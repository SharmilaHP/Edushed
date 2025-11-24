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

  return (
    <div style={{ color: "black" }}>
      <h1>Manage Availability</h1>
      <p style={{ color: "lightgreen" }}>{message}</p>

      <h2>{editingId ? "Edit Slot" : "Add New Slot"}</h2>

      <div style={{ marginBottom: 20 }}>
        <input placeholder="Day of Week (0=Sun)" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} style={input} />
        <br />
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={input} />
        <br />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={input} />
        <br />
        <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} style={input} />
        <br />
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={input}>
          <option>Online</option>
          <option>Offline</option>
        </select>
        <br />
        <input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} style={input} />
        <br />
        <button onClick={handleSubmit} style={btnBlue}>{editingId ? "Update Availability" : "Add Availability"}</button>
        {editingId && <button onClick={resetForm} style={btnGray}>Cancel Edit</button>}
      </div>

      <h2>All Availability</h2>
      {availability.length === 0 ? (
        <p>No availability added.</p>
      ) : (
        <ul>
          {availability.map((slot) => (
            <li key={slot.id} style={{ marginBottom: 12 }}>
              <strong>Day:</strong> {slot.dayOfWeek} | <strong>Time:</strong> {slot.startTime}–{slot.endTime} | <strong>Subject:</strong> {slot.subject} | <strong>Mode:</strong> {slot.mode} | <strong>Notes:</strong> {slot.notes || "None"}
              <div style={{ marginTop: 6 }}>
                <button style={btnYellow} onClick={() => startEdit(slot)}>Edit</button>
                <button style={btnRed} onClick={() => deleteAvailability(slot.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* styles */
const input = {
  padding: "12px 14px",
  width: "280px",
  margin: "8px 0",
  borderRadius: "8px",
  border: "1px solid #d0d7e6",
  background: "#ffffff",
  color: "#1e2a3b",
  fontSize: "15px",
  outline: "none",
  boxshadow:"0 1px 2px rgba(0,0,0,0.05)",
};
const selectInput = {
  ...input,
  width: "300px",
};

const textAreaInput = {
  ...input,
  height: "45px",
};
const btnBlue = { padding: "10px 18px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", marginRight: 8,boxshadow:"0 2px 4px  rgba(37,99,235,0.2)" };
const btnYellow = { padding: "8px 14px", background: "#199111ff", color: "#fff", border: "none", borderRadius: "8px", marginRight: "8px" };
const btnRed = { padding: "8px 12px", background: "#cb1111ff", color: "white", border: "none", borderRadius: "" };
const btnGray = { padding: "8px 12px", background: "#666", color: "white", border: "none", borderRadius: 6, marginLeft: 8 };

