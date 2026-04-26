const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/", async (req, res) => {
  try {
    const userId = req.userId;

    const TripResult = await db.query(
      "SELECT * FROM trips WHERE owner_id = $1",
      [userId],
    );
    res.json(TripResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, mode, start_date, end_date } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTrip = await db.query(
      "INSERT INTO trips (owner_id, title, description, mode, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [userId, title, description, mode, start_date, end_date],
    );

    res.status(201).json(newTrip.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const tripId = req.params.id;

    const tripResult = await db.query(
      "SELECT * FROM trips WHERE id = $1 AND owner_id = $2",
      [tripId, userId],
    );

    if (tripResult.rows.length === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.json(tripResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const tripId = req.params.id;

    const { title, description, mode, start_date, end_date } = req.body;

    const tripResult = await db.query(
      "SELECT * FROM trips WHERE id = $1 AND owner_id = $2",
      [tripId, userId],
    );

    if (tripResult.rows.length === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const updatedTrip = await db.query(
      `UPDATE trips SET 
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      mode = COALESCE($3, mode),
      start_date = COALESCE($4, start_date),
      end_date = COALESCE($5, end_date)
      WHERE id = $6 RETURNING *`,
      [title, description, mode, start_date, end_date, tripId],
    );

    res.json(updatedTrip.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const tripId = req.params.id;
    const tripResult = await db.query(
      "SELECT * FROM trips WHERE id = $1 AND owner_id = $2",
      [tripId, userId],
    );
    if (tripResult.rows.length === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }
    await db.query("DELETE FROM trips WHERE id = $1 AND owner_id = $2", [
      tripId,
      userId,
    ]);
    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
