import { useEffect, useState } from "react";

function getNextDateForDay(dayOfWeek) {
  const today = new Date();
  const result = new Date();
  const currentDay = today.getDay();
  let diff = dayOfWeek - currentDay;
  if (diff <= 0) diff += 7;
  result.setDate(today.getDate() + diff);
  return result.toISOString().split("T")[0];
}

export default function PublicBooking() {
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const resA = await fetch("http://localhost:3000/availability");
    const av = await resA.json();
    const resB = await fetch("http://localhost:3000/bookings");
    const bk = await resB.json();
    setAvailability(av);
    setBookings(bk);
  };

  useEffect(() => {
    loadData();
  }, []);

  const isSlotBooked = (slot) => {
    return bookings.some(
      (b) =>
        ["booked", "conducted", "cancelled"].includes(b.status) &&
        b.subject.toLowerCase() === slot.subject.toLowerCase() &&
        b.startTime.includes(slot.startTime)
    );
  };

  const availableSlots = availability.filter((slot) => !isSlotBooked(slot));
  const unavailableSlots = availability.filter((slot) => isSlotBooked(slot));

  const submitBooking = async () => {
    if (!selected) return;
    const actualDate = getNextDateForDay(selected.dayOfWeek);

    const res = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName: name,
        studentEmail: email,
        studentNotes: notes,
        subject: selected.subject,
        mode: selected.mode,
        startTime: `${actualDate}T${selected.startTime}:00.000Z`,
        endTime: `${actualDate}T${selected.endTime}:00.000Z`,
      }),
    });

    const data = await res.json();
    if (data.error) setMessage("❌ " + data.error);
    else {
      setMessage("Booking Successful! Check your email.");
      setSelected(null);
      setName("");
      setEmail("");
      setNotes("");
      loadData();
    }
  };

  return (
    <div style={{ padding: 40, background: "#f6f9ff", color: "#1e2a3b", minHeight: "100vh" }}>
      
      <button 
        onClick={() => (window.location.href = "/")} 
        style={{ 
          padding: "8px 20px", 
          background: "#2563eb", 
          color: "white", 
          borderRadius: 8,
          border: "none",
          marginBottom: 20
        }}
      >
        Back to Tutor Dashboard
      </button>

      <h1 style={{ color: "#1e2a3b" }}>Book a Class</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <h2>Available Slots</h2>

      {availableSlots.length === 0 ? (
        <p>No slots available.</p>
      ) : (
        <ol>
          {availableSlots.map((slot) => (
            <li key={slot.id} style={{ marginBottom: 12 }}>
              <strong>{slot.subject}</strong> — {slot.startTime} to {slot.endTime} ({slot.mode})
              <br />
              <small style={{ color: "#4b5563" }}>
                <strong>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.dayOfWeek]}</strong> · {getNextDateForDay(slot.dayOfWeek)}
                {slot.notes && <> | Notes: <strong>{slot.notes}</strong></>}
              </small>
              <button 
                onClick={() => setSelected(slot)} 
                style={{ 
                  marginLeft: 10, 
                  background: "#1e8e3e", 
                  color: "white", 
                  padding: "6px 12px", 
                  borderRadius: 6, 
                  border: "none" 
                }}
              >
                Book
              </button>
            </li>
          ))}
        </ol>
      )}

      <hr style={{ margin: "30px 0", opacity: 0.3 }} />

      {unavailableSlots.length > 0 && (
        <>
          <h2>Booked Slots</h2>
          <ol>
            {unavailableSlots.map((slot) => (
              <li key={slot.id} style={{ marginBottom: 12 }}>
                <strong>{slot.subject}</strong> — {slot.startTime} to {slot.endTime} ({slot.mode})
                <br />
                <small style={{ color: "#4b5563" }}>
                  <strong>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.dayOfWeek]}</strong> · {getNextDateForDay(slot.dayOfWeek)}
                  {slot.notes && <> | Notes: <strong>{slot.notes}</strong></>}
                </small>
                <span 
                  style={{ 
                    marginLeft: 10, 
                    padding: "4px 8px", 
                    background: "#d1d5db", 
                    color: "#374151", 
                    borderRadius: 6 
                  }}
                >
                  Booked
                </span>
              </li>
            ))}
          </ol>
        </>
      )}

      {selected && (
        <div 
          style={{ 
            marginTop: 30, 
            padding: 18, 
            border: "1px solid #d0d7e6", 
            background: "white",
            borderRadius: 8 
          }}
        >
          <h2>Confirm Booking</h2>

          <p><strong>Subject:</strong> {selected.subject}</p>
          <p><strong>Time:</strong> {selected.startTime} — {selected.endTime}</p>

          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={input} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
          <input placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} style={input} />

          <button 
            onClick={submitBooking} 
            style={{ 
              background: "#2563eb", 
              color: "white", 
              padding: "10px 18px",
              border: "none",
              borderRadius: 6,
              marginTop: 10
            }}
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}

const input = {
  display: "block",
  padding: "10px 12px",
  width: 320,
  margin: "8px 0",
  borderRadius: 8,
  border: "1px solid #d0d7e6",
  background: "white",
  color: "#1e2a3b",
  fontSize: "15px"
};


 