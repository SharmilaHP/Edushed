import { useEffect, useState } from "react";

function getNextDateForDay(dayOfWeek) {
  const today = new Date();
  const result = new Date();

  const currentDay = today.getDay();
  let diff = dayOfWeek - currentDay;

  if (diff <= 0) diff += 7; // go to next week

  result.setDate(today.getDate() + diff);
  return result.toISOString().split("T")[0];
}

export default function PublicBooking() {
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // restored email input
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  // Load availability + bookings
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

  // Correct booking logic (booked, conducted, cancelled → all unavailable)
  const isSlotBooked = (slot) => {
    return bookings.some(
      (b) =>
        ["booked", "conducted", "cancelled"].includes(b.status) &&
        b.subject.toLowerCase() === slot.subject.toLowerCase() &&
        b.startTime.includes(slot.startTime)
    );
  };

  // Split availability
  const availableSlots = availability.filter((slot) => !isSlotBooked(slot));
  const unavailableSlots = availability.filter((slot) => isSlotBooked(slot));

  // Submit booking
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
    } else {
      setMessage("Booking Successful! Check your email.");
      setSelected(null);
      setName("");
      setEmail("");
      setNotes("");
      loadData();
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <button
        onClick={() => (window.location.href = "/")}
        style={{
          padding: "8px 20px",
          background: "black",
          color: "white",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        Back to Tutor Dashboard
      </button>

      <h1>Book a Class</h1>

      {message && (
        <p style={{ color: "lightgreen", fontSize: "18px" }}>{message}</p>
      )}

      {/* AVAILABLE SLOTS */}
      <h2>Available Slots</h2>

      {availableSlots.length === 0 ? (
        <p>No slots available.</p>
      ) : (
        <ol>
          {availableSlots.map((slot) => (
            <li key={slot.id} style={{ marginBottom: "12px" }}>
              <strong>{slot.subject}</strong> — {slot.startTime} to {slot.endTime} ({slot.mode})
              <br />

              <small style={{ opacity: 0.8 }}>
                <strong>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.dayOfWeek]}
                </strong>{" "}
                · {getNextDateForDay(slot.dayOfWeek)}
                {slot.notes && <> | Notes: <strong>{slot.notes}</strong></>}
              </small>

              <button
                style={{
                  marginLeft: "10px",
                  background: "green",
                  color: "white",
                  padding: "6px 14px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => setSelected(slot)}
              >
                Book
              </button>
            </li>
          ))}
        </ol>
      )}

      <hr style={{ margin: "30px 0", opacity: 0.2 }} />

      {/* BOOKED SLOTS */}
      {unavailableSlots.length > 0 && (
        <>
          <h2>Booked Slots</h2>
          <ol>
            {unavailableSlots.map((slot) => (
              <li key={slot.id} style={{ marginBottom: "12px" }}>
                <strong>{slot.subject}</strong> — {slot.startTime} to {slot.endTime} ({slot.mode})
                <br />

                <small style={{ opacity: 0.8 }}>
                  <strong>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.dayOfWeek]}
                  </strong>{" "}
                  · {getNextDateForDay(slot.dayOfWeek)}
                  {slot.notes && <> | Notes: <strong>{slot.notes}</strong></>}
                </small>

                <span
                  style={{
                    marginLeft: "10px",
                    padding: "4px 10px",
                    background: "gray",
                    color: "white",
                    borderRadius: "6px",
                  }}
                >
                  Booked
                </span>
              </li>
            ))}
          </ol>
        </>
      )}

      {/* BOOKING FORM */}
      {selected && (
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            border: "1px solid white",
            borderRadius: "10px",
          }}
        >
          <h2>Confirm Booking</h2>

          <p>
            <strong>Subject:</strong> {selected.subject}
          </p>
          <p>
            <strong>Time:</strong> {selected.startTime} — {selected.endTime}
          </p>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: "6px", padding: "8px", width: "200px" }}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: "6px", padding: "8px", width: "200px" }}
          />

          <input
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ margin: "6px", padding: "8px", width: "200px" }}
          />

          <button
            onClick={submitBooking}
            style={{
              marginLeft: "10px",
              background: "blue",
              color: "white",
              padding: "8px 20px",
              borderRadius: "6px",
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
