// client/src/pages/Home.jsx

export default function Home() {
  const cards = [
    { title: "Total Bookings", value: 2 },
    { title: "Upcoming", value: 1 },
    { title: "Completed", value: 0 },
    { title: "Cancelled", value: 1 },
  ];

  return (
    <div style={{ padding: "20px 40px" }}>
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "35px",
          fontWeight: "700",
          color: "#1e2a3b",
        }}
      >
        Welcome!
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
        }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              padding: "40px 20px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "0.2s",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "10px",
              }}
            >
              {c.value}
            </div>

            <div
              style={{
                fontSize: "18px",
                color: "#374151",
                marginTop: "8px",
              }}
            >
              {c.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



