import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// -----------------------
// TEST ROUTE
// -----------------------
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// -----------------------
// TUTOR AVAILABILITY
// -----------------------

// Create availability
app.post("/availability", async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime, subject, mode, notes } = req.body;

    const availability = await prisma.availability.create({
      data: { dayOfWeek, startTime, endTime, subject, mode, notes },
    });

    res.json({ message: "Availability added successfully", availability });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding availability" });
  }
});

// Get all availability
app.get("/availability", async (req, res) => {
  try {
    const avail = await prisma.availability.findMany();
    res.json(avail);
  } catch (err) {
    res.status(500).json({ error: "Error fetching availability" });
  }
});

// Update availability  <---------------- FIXED
app.put("/availability/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { dayOfWeek, startTime, endTime, subject, mode, notes } = req.body;

    const updated = await prisma.availability.update({
      where: { id },
      data: {
        dayOfWeek: Number(dayOfWeek),
        startTime,
        endTime,
        subject,
        mode,
        notes,
      },
    });

    res.json({ message: "Availability updated successfully", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating availability" });
  }
});

// Delete availability <---------------- FIXED (was broken earlier)
app.delete("/availability/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.availability.delete({
      where: { id },
    });

    res.json({ message: "Availability deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting availability" });
  }
});

// -----------------------
// STUDENT BOOKING
// -----------------------

// Create booking
app.post("/book", async (req, res) => {
  try {
    const {
      studentName,
      studentEmail,
      studentNotes,
      subject,
      mode,
      startTime,
      endTime,
    } = req.body;

    // Double booking check
    const conflict = await prisma.booking.findFirst({
      where: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: "booked",
      },
    });

    if (conflict) {
      return res.status(400).json({
        error: "This slot is already booked",
      });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        studentName,
        studentEmail,
        studentNotes,
        subject,
        mode,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    res.json({ message: "Booking confirmed!", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error booking class" });
  }
});

// Get all bookings
app.get("/bookings", async (req, res) => {
  try {
    const data = await prisma.booking.findMany({
      orderBy: { startTime: "asc" },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching bookings" });
  }
});

// Update booking status
app.put("/bookings/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    res.json({ message: "Status updated", updated });
  } catch (err) {
    res.status(500).json({ error: "Error updating status" });
  }
});

// -----------------------
// FUTURE / PAST BOOKINGS
// -----------------------
app.get("/bookings/future", async (req, res) => {
  try {
    const now = new Date();

    const upcoming = await prisma.booking.findMany({
      where: { startTime: { gte: now } },
      orderBy: { startTime: "asc" },
    });

    res.json(upcoming);
  } catch (err) {
    res.status(500).json({ error: "Error fetching future bookings" });
  }
});

app.get("/bookings/past", async (req, res) => {
  try {
    const now = new Date();

    const past = await prisma.booking.findMany({
      where: { startTime: { lt: now } },
      orderBy: { startTime: "desc" },
    });

    res.json(past);
  } catch (err) {
    res.status(500).json({ error: "Error fetching past bookings" });
  }
});

// -----------------------
// START SERVER
// -----------------------
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
