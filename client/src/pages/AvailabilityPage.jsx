// client/src/pages/AvailabilityPage.jsx
import { useEffect, useState } from "react";

export default function AvailabilityPage() {
  const [availList, setAvailList] = useState([]);
  const [message, setMessage] = useState("");

  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState("online");
  const [notes, setNotes] = useState("");

  const [editId, setEditId] = useState(null);

  // ---------------- FETCH ALL AVAILABILITY ----------------
  const fetchAvail = async () => {
    try {
      const res = await fetch("http://localhost:3000/availability");
      const data = await res.json();
      setAvailList(data);
    } catch (err) {
      console.error(err);
      setMessage("Error loading availability");
    }
  };

  useEffect(() => {
    fetchAvail();
  }, []);

  // ---------------- ADD NEW SLOT ----------------
  const addAvailability = async () => {
    try {
      const res = await fetch("http://localhost:3000/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dayOfWeek: Number(dayOfWeek),
          startTime,
          endTime,
          subject,
          mode,
          notes,
        }),
      });

      const data = await res.json();
      setMessage(data.message || "Added");
      resetForm();
      fetchAvail();
    } catch (err) {
      console.error(err);
      setMessage("Error adding availability");
    }
  };

  // ---------------- DELETE SLOT ----------------
  const deleteSlot = async (id) => {
    if (!confirm("Delete this availability?")) return;

    try {
      const res = await fetch(`http://localhost:3000/availability/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setMessage(data.message);
      fetchAvail();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- LOAD SLOT INTO FORM FOR EDITING ----------------
  const startEdit = (slot) => {
    setEditId(slot.id);
    setDayOfWeek(slot.dayOfWeek);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
    setSubject(slot.subject);
    setMode(slot.mode);
    setNotes(slot.notes || "");
    setMessage("Editing Slot...");
  };

  // ---------------- UPDATE SLOT ----------------
  const updateAvailability = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/availability/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dayOfWeek: Number(dayOfWeek),
            startTime,
            endTime,
            subject,
            mode,
            notes,
          }),
        }
      );

      const data = await res.json();
      setMessage(data.message || "Updated");
      resetForm();
      fetchAvail();
    } catch (err) {
      console.error(err);
      setMessage("Error updating availability");
    }
  };

  // ---------------- RESET FORM ----------------
  const resetForm = () => {
    setDayOfWeek(1);
    setStartTime("");
    setEndTime("");
    setSubject("");
    setMode("online");
    setNotes("");
    setEditId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Manage Availability</h1>

      <p style={{ color: "lightgreen" }}>{message}</p>

      {/* ---------------- FORM ---------------- */}
      <h2>{editId ? "Edit Slot" : "Add New Slot"}</h2>

      <div style={{ display: "flex", flexDirection: "column", width: 300, gap: 10 }}>
        <label>Day of Week (0=Sun,1=Mon...)</label>
        <input value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} />

        <label>Start Time</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

        <label>End Time</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

        <label>Subject</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} />

        <label>Mode</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>

        <label>Notes</label>
        <input value={notes} onChange={(e) => setNotes(e.target.value)} />

        {/* ACTION BUTTONS */}
        {editId ? (
          <>
            <button
              onClick={updateAvailability}
              style={btnBlue}
            >
              Update Slot
            </button>

            <button
              onClick={resetForm}
              style={btnGrey}
            >
              Cancel Edit
            </button>
          </>
        ) : (
          <button
            onClick={addAvailability}
            style={btnBlue}
          >
            Add Availability
          </button>
        )}
      </div>

      <hr style={{ margin: "30px 0", opacity: 0.3 }} />

      {/* ---------------- LIST ---------------- */}
      <h2>All Availability</h2>

      {availList.length === 0 ? (
        <p>No availability added.</p>
      ) : (
        <ul>
          {availList.map((slot) => (
            <li key={slot.id} style={{ marginBottom: 10 }}>
              <strong>Day:</strong> {slot.dayOfWeek} |{" "}
              <strong>Time:</strong> {slot.startTime}–{slot.endTime} |{" "}
              <strong>Subject:</strong> {slot.subject} |{" "}
              <strong>Mode:</strong> {slot.mode}{" "}
              {slot.notes && <>| <strong>Notes:</strong> {slot.notes}</>}

              <button
                onClick={() => startEdit(slot)}
                style={btnYellow}
              >
                Edit
              </button>

              <button
                onClick={() => deleteSlot(slot.id)}
                style={btnRed}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------------- BUTTON STYLES ---------------- */
const btnBlue = {
  padding: "8px 14px",
  background: "blue",
  color: "white",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
};

const btnRed = {
  marginLeft: 10,
  padding: "4px 8px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

const btnYellow = {
  marginLeft: 10,
  padding: "4px 8px",
  background: "orange",
  color: "black",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

const btnGrey = {
  padding: "6px 10px",
  background: "#555",
  color: "white",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
  marginTop: 5,
};
