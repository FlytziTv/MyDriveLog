const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../utils/db");

router.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    const tripId = req.params.tripId;

    const stepsResult = await db.query(
      `SELECT s.* FROM trip_steps s
      JOIN trips t ON s.trip_id = t.id
      WHERE s.trip_id = $1 AND t.owner_id = $2`,
      [tripId, userId],
    );

    res.json(stepsResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = req.userId;
    const tripId = req.params.tripId;

    const {
      title,
      description,
      category,
      location_name,
      step_order,
      happened_at,
    } = req.body;

    if (!title || step_order === undefined) {
      return res
        .status(400)
        .json({ message: "Title and step order are required" });
    }

    const tripResult = await db.query(
      "SELECT * FROM trips WHERE id = $1 AND owner_id = $2",
      [tripId, userId],
    );

    if (tripResult.rows.length === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const newStep = await db.query(
      `INSERT INTO trip_steps (trip_id, title, description, category, location_name, step_order, happened_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        tripId,
        title,
        description,
        category,
        location_name,
        step_order,
        happened_at,
      ],
    );

    res.status(201).json(newStep.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const stepId = req.params.id;

    const {
      title,
      description,
      category,
      location_name,
      step_order,
      happened_at,
    } = req.body;

    const stepResult = await db.query(
      `SELECT s.* FROM trip_steps s
      JOIN trips t ON s.trip_id = t.id
      WHERE s.id = $1 AND t.owner_id = $2`,
      [stepId, userId],
    );

    if (stepResult.rows.length === 0) {
      return res.status(404).json({ message: "Step not found" });
    }

    const updatedStep = await db.query(
      `UPDATE trip_steps SET title = COALESCE($1, title), description = COALESCE($2, description), category = COALESCE($3, category), location_name = COALESCE($4, location_name), step_order = COALESCE($5, step_order), happened_at = COALESCE($6, happened_at)
      WHERE id = $7 RETURNING *`,
      [
        title,
        description,
        category,
        location_name,
        step_order,
        happened_at,
        stepId,
      ],
    );

    res.json(updatedStep.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const stepId = req.params.id;

    const stepResult = await db.query(
      `SELECT s.* FROM trip_steps s
      JOIN trips t ON s.trip_id = t.id
      WHERE s.id = $1 AND t.owner_id = $2`,
      [stepId, userId],
    );

    if (stepResult.rows.length === 0) {
      return res.status(404).json({ message: "Step not found" });
    }

    await db.query("DELETE FROM trip_steps WHERE id = $1", [stepId]);

    res.json({ message: "Step deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
