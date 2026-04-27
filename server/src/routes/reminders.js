const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/recent", async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT r.*, v.nickname as vehicle_name 
      FROM reminders r
      JOIN vehicles v ON r.vehicle_id = v.id
      WHERE v.user_id = $1 AND r.is_done = false
      ORDER BY r.due_date ASC NULLS LAST
      LIMIT 5`,
      [userId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/:vehicleId", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.vehicleId;
    const remindersResult = await db.query(
      `SELECT i.* FROM reminders i
      JOIN vehicles v ON i.vehicle_id = v.id
      WHERE i.vehicle_id = $1 AND v.user_id = $2`,
      [vehicleId, userId],
    );
    res.json(remindersResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/:vehicleId", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.vehicleId;
    const { title, description, mileage_threshold, due_date } = req.body;
    if (!title || (!mileage_threshold && !due_date)) {
      return res.status(400).json({
        message: "Title and either mileage threshold or due date are required",
      });
    }

    const vehicleResult = await db.query(
      "SELECT * FROM vehicles WHERE id = $1 AND user_id = $2",
      [vehicleId, userId],
    );
    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const newReminder = await db.query(
      `INSERT INTO reminders (vehicle_id, title, description, mileage_threshold, due_date)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [vehicleId, title, description, mileage_threshold, due_date],
    );
    res.status(201).json(newReminder.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const reminderId = req.params.id;
    const { title, description, mileage_threshold, due_date } = req.body;

    const reminderResult = await db.query(
      `SELECT i.* FROM reminders i
      JOIN vehicles v ON i.vehicle_id = v.id
      WHERE i.id = $1 AND v.user_id = $2`,
      [reminderId, userId],
    );
    if (reminderResult.rows.length === 0) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    const updatedReminder = await db.query(
      `UPDATE reminders SET title = $1, description = $2, mileage_threshold = $3, due_date = $4 WHERE id = $5 RETURNING *`,
      [title, description, mileage_threshold, due_date, reminderId],
    );
    res.json(updatedReminder.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const reminderId = req.params.id;

    const reminderResult = await db.query(
      `SELECT i.* FROM reminders i
      JOIN vehicles v ON i.vehicle_id = v.id
      WHERE i.id = $1 AND v.user_id = $2`,
      [reminderId, userId],
    );
    if (reminderResult.rows.length === 0) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    await db.query("DELETE FROM reminders WHERE id = $1", [reminderId]);
    res.json({ message: "Reminder deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
