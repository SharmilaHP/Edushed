import { useEffect, useState, useRef } from "react";

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

  const formRef = useRef(null);

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

  const handleSelectSlot = (slot) => {
    setSelected(slot);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

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
    if (data.error) {
      setMessage("❌ " + data.error);
      return;
    }

    setMessage("Booking Successful! Check your email.");
    setSelected(null);
    setName("");
    setEmail("");
    setNotes("");
    loadData();
  };

  return (
    <div
      style={{
        padding: 40,
        background: "#f6f9ff",
        color: "#1e2a3b",
        minHeight: "100vh",
      }}
    >
      {/* 🔵 BACK TO HOME BUTTON */}
      <button
        onClick={() => (window.location.href = "/")}
        style={{
          padding: "8px 20px",
          background: "#2563eb",
          color: "white",
          borderRadius: 8,
          border: "none",
          marginBottom: 20,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Back to Homepage
      </button>

      <h1>Book a Class</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* AVAILABLE SLOTS */}
      <h2 style={{ marginTop: 20 }}>Available Slots</h2>

      {availableSlots.length === 0 ? (
        <p>No available slots.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 16,
          }}
        >
          {availableSlots.map((slot) => (
            <div
              key={slot.id}
              style={{
                background: "white",
                padding: 16,
                borderRadius: 10,
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <strong>{slot.subject}</strong>
              <div style={{ fontSize: 14, margin: "6px 0" }}>
                {slot.startTime} - {slot.endTime} ({slot.mode})
              </div>
              <div style={{ fontSize: 12, color: "#4b5563" }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.dayOfWeek]} •{" "}
                {getNextDateForDay(slot.dayOfWeek)}
              </div>

              {slot.notes && (
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  Notes: <strong>{slot.notes}</strong>
                </div>
              )}

              <button
                onClick={() => handleSelectSlot(slot)}
                style={{
                  marginTop: 10,
                  background: "#1e8e3e",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Book
              </button>
            </div>
          ))}
        </div>
      )}

      {/* BOOKED SLOTS */}
      <h2 style={{ marginTop: 40 }}>Booked Slots</h2>

      {unavailableSlots.length === 0 ? (
        <p>No booked slots.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 16,
          }}
        >
          {unavailableSlots.map((slot) => (
            <div
              key={slot.id}
              style={{
                background: "#e5e7eb",
                padding: 16,
                borderRadius: 10,
              }}
            >
              <strong>{slot.subject}</strong>
              <div style={{ fontSize: 14 }}>
                {slot.startTime} - {slot.endTime} ({slot.mode})
              </div>
              <div style={{ fontSize: 12, color: "#4b5563" }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.dayOfWeek]} •{" "}
                {getNextDateForDay(slot.dayOfWeek)}
              </div>
              <span
                style={{
                  marginTop: 6,
                  display: "inline-block",
                  background: "#9ca3af",
                  padding: "4px 10px",
                  borderRadius: 6,
                  color: "white",
                  fontSize: 12,
                }}
              >
                Booked
              </span>
            </div>
          ))}
        </div>
      )}

      {/* CONFIRM BOOKING SECTION */}
      {selected && (
        <div
          ref={formRef}
          style={{
            marginTop: 50,
            padding: 20,
            background: "white",
            borderRadius: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Confirm Booking</h2>

          <p>
            <strong>Subject:</strong> {selected.subject}
          </p>
          <p>
            <strong>Time:</strong> {selected.startTime} - {selected.endTime}
          </p>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={input}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />
          <input
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={input}
          />

          <button
            onClick={submitBooking}
            style={{
              background: "#2563eb",
              color: "white",
              padding: "10px 18px",
              border: "none",
              borderRadius: 6,
              marginTop: 10,
              cursor: "pointer",
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
  fontSize: "15px",
};



 