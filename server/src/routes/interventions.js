const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/recent", async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT i.*, v.nickname as vehicle_name 
      FROM interventions i
      JOIN vehicles v ON i.vehicle_id = v.id
      WHERE v.user_id = $1
      ORDER BY i.intervention_date DESC
      LIMIT 5`,
      [userId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/cost", async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT 
        SUM(i.cost) as total,
        SUM(CASE WHEN DATE_TRUNC('month', i.intervention_date) = DATE_TRUNC('month', NOW()) THEN i.cost ELSE 0 END) as this_month,
        SUM(CASE WHEN DATE_TRUNC('month', i.intervention_date) = DATE_TRUNC('month', NOW() - INTERVAL '1 month') THEN i.cost ELSE 0 END) as last_month
      FROM interventions i
      JOIN vehicles v ON i.vehicle_id = v.id
      WHERE v.user_id = $1`,
      [userId],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT 
        COUNT(*) as total_interventions,
        COUNT(CASE WHEN DATE_TRUNC('month', i.intervention_date) = DATE_TRUNC('month', NOW()) THEN 1 END) as this_month_interventions,
        COUNT(CASE WHEN DATE_TRUNC('month', i.intervention_date) = DATE_TRUNC('month', NOW() - INTERVAL '1 month') THEN 1 END) as last_month_interventions,
        SUM(i.cost) as total_cost,
        SUM(CASE WHEN DATE_TRUNC('month', i.intervention_date) = DATE_TRUNC('month', NOW()) THEN i.cost ELSE 0 END) as this_month_cost,
        SUM(CASE WHEN DATE_TRUNC('month', i.intervention_date) = DATE_TRUNC('month', NOW() - INTERVAL '1 month') THEN i.cost ELSE 0 END) as last_month_cost
      FROM interventions i
      JOIN vehicles v ON i.vehicle_id = v.id
      WHERE v.user_id = $1`,
      [userId],
    );

    const reminders = await db.query(
      `SELECT COUNT(*) as upcoming_reminders
      FROM reminders r
      JOIN vehicles v ON r.vehicle_id = v.id
      WHERE v.user_id = $1 AND r.is_done = false`,
      [userId],
    );

    res.json({
      ...result.rows[0],
      upcoming_reminders: reminders.rows[0].upcoming_reminders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/:vehicleId", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.vehicleId;

    const interventionsResult = await db.query(
      `SELECT i.* FROM interventions i
      JOIN vehicles v ON i.vehicle_id = v.id
      WHERE i.vehicle_id = $1 AND v.user_id = $2`,
      [vehicleId, userId],
    );
    res.json(interventionsResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/:vehicleId", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.vehicleId;
    const {
      title,
      description,
      category,
      done_by,
      garage_name,
      mileage_at_intervention,
      intervention_date,
      cost,
      parts_used,
    } = req.body;
    if (!title || !done_by || !intervention_date) {
      return res.status(400).json({
        message: "Title, category and intervention date are required",
      });
    }

    const vehicleResult = await db.query(
      "SELECT * FROM vehicles WHERE id = $1 AND user_id = $2",
      [vehicleId, userId],
    );
    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const newIntervention = await db.query(
      `INSERT INTO interventions (vehicle_id, title, description, category, done_by, garage_name, mileage_at_intervention, intervention_date, cost, parts_used)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        vehicleId,
        title,
        description,
        category,
        done_by,
        garage_name,
        mileage_at_intervention,
        intervention_date,
        cost,
        parts_used,
      ],
    );
    res.status(201).json(newIntervention.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const interventionId = req.params.id;
    const {
      title,
      description,
      category,
      done_by,
      garage_name,
      mileage_at_intervention,
      intervention_date,
      cost,
      parts_used,
    } = req.body;
    if (!title || !done_by || !intervention_date) {
      return res.status(400).json({
        message: "Title, category and intervention date are required",
      });
    }

    const interventionResult = await db.query(
      `SELECT i.* FROM interventions i
      JOIN vehicles v ON i.vehicle_id = v.id
      WHERE i.id = $1 AND v.user_id = $2`,
      [interventionId, userId],
    );

    if (interventionResult.rows.length === 0) {
      return res.status(404).json({ message: "Intervention not found" });
    }

    const updatedIntervention = await db.query(
      `UPDATE interventions SET title = COALESCE($1, title), description = COALESCE($2, description), category = COALESCE($3, category), done_by = COALESCE($4, done_by), garage_name = COALESCE($5, garage_name), mileage_at_intervention = COALESCE($6, mileage_at_intervention), intervention_date = COALESCE($7, intervention_date), cost = COALESCE($8, cost), parts_used = COALESCE($9, parts_used)
      WHERE id = $10 RETURNING *`,
      [
        title,
        description,
        category,
        done_by,
        garage_name,
        mileage_at_intervention,
        intervention_date,
        cost,
        parts_used,
        interventionId,
      ],
    );
    res.json(updatedIntervention.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const interventionId = req.params.id;
    const interventionResult = await db.query(
      `SELECT i.* FROM interventions i
      JOIN vehicles v ON i.vehicle_id = v.id
      WHERE i.id = $1 AND v.user_id = $2`,
      [interventionId, userId],
    );

    if (interventionResult.rows.length === 0) {
      return res.status(404).json({ message: "Intervention not found" });
    }

    await db.query("DELETE FROM interventions WHERE id = $1", [interventionId]);
    res.json({ message: "Intervention deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
