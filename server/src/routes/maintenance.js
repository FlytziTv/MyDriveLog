const express = require("express");
const router = express.Router();
const db = require("../utils/db");

// Récupérer les entretiens récents (Pour le Dashboard)
router.get("/recent", async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT m.*, v.name as vehicle_name 
      FROM maintenance m
      JOIN vehicles v ON m.vehicle_id = v.id
      WHERE v.user_id = $1
      ORDER BY m.date DESC
      LIMIT 5`,
      [userId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer les coûts (Pour le Dashboard)
router.get("/cost", async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT 
        SUM(m.cost) as total,
        SUM(CASE WHEN DATE_TRUNC('month', m.date) = DATE_TRUNC('month', NOW()) THEN m.cost ELSE 0 END) as this_month,
        SUM(CASE WHEN DATE_TRUNC('month', m.date) = DATE_TRUNC('month', NOW() - INTERVAL '1 month') THEN m.cost ELSE 0 END) as last_month
      FROM maintenance m
      JOIN vehicles v ON m.vehicle_id = v.id
      WHERE v.user_id = $1`,
      [userId],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer les statistiques globales
router.get("/stats", async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT 
        COUNT(*) as total_maintenance,
        COUNT(CASE WHEN DATE_TRUNC('month', m.date) = DATE_TRUNC('month', NOW()) THEN 1 END) as this_month_maintenance,
        COUNT(CASE WHEN DATE_TRUNC('month', m.date) = DATE_TRUNC('month', NOW() - INTERVAL '1 month') THEN 1 END) as last_month_maintenance,
        SUM(m.cost) as total_cost,
        SUM(CASE WHEN DATE_TRUNC('month', m.date) = DATE_TRUNC('month', NOW()) THEN m.cost ELSE 0 END) as this_month_cost,
        SUM(CASE WHEN DATE_TRUNC('month', m.date) = DATE_TRUNC('month', NOW() - INTERVAL '1 month') THEN m.cost ELSE 0 END) as last_month_cost
      FROM maintenance m
      JOIN vehicles v ON m.vehicle_id = v.id
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

// Récupérer l'entretien d'un véhicule spécifique
router.get("/:vehicleId", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.vehicleId;

    const maintenanceResult = await db.query(
      `SELECT m.* FROM maintenance m
      JOIN vehicles v ON m.vehicle_id = v.id
      WHERE m.vehicle_id = $1 AND v.user_id = $2
      ORDER BY m.date DESC`,
      [vehicleId, userId],
    );
    res.json(maintenanceResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Ajouter un entretien
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
      mileage,
      date,
      cost,
      parts_used,
    } = req.body;

    if (!title || !done_by || !date) {
      return res
        .status(400)
        .json({ message: "Title, category and date are required" });
    }

    const vehicleResult = await db.query(
      "SELECT * FROM vehicles WHERE id = $1 AND user_id = $2",
      [vehicleId, userId],
    );

    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const newMaintenance = await db.query(
      `INSERT INTO maintenance (vehicle_id, title, description, category, done_by, garage_name, mileage, date, cost, parts_used)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        vehicleId,
        title,
        description,
        category,
        done_by,
        garage_name,
        mileage,
        date,
        cost,
        parts_used,
      ],
    );

    res.status(201).json(newMaintenance.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Modifier un entretien
router.put("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const maintenanceId = req.params.id;
    const {
      title,
      description,
      category,
      done_by,
      garage_name,
      mileage,
      date,
      cost,
      parts_used,
    } = req.body;

    const maintenanceResult = await db.query(
      `SELECT m.* FROM maintenance m
      JOIN vehicles v ON m.vehicle_id = v.id
      WHERE m.id = $1 AND v.user_id = $2`,
      [maintenanceId, userId],
    );

    if (maintenanceResult.rows.length === 0) {
      return res.status(404).json({ message: "Maintenance not found" });
    }

    const updatedMaintenance = await db.query(
      `UPDATE maintenance SET 
        title = COALESCE($1, title), 
        description = COALESCE($2, description), 
        category = COALESCE($3, category), 
        done_by = COALESCE($4, done_by), 
        garage_name = COALESCE($5, garage_name), 
        mileage = COALESCE($6, mileage), 
        date = COALESCE($7, date), 
        cost = COALESCE($8, cost), 
        parts_used = COALESCE($9, parts_used)
      WHERE id = $10 RETURNING *`,
      [
        title,
        description,
        category,
        done_by,
        garage_name,
        mileage,
        date,
        cost,
        parts_used,
        maintenanceId,
      ],
    );
    res.json(updatedMaintenance.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Supprimer un entretien
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const maintenanceId = req.params.id;

    const maintenanceResult = await db.query(
      `SELECT m.* FROM maintenance m
      JOIN vehicles v ON m.vehicle_id = v.id
      WHERE m.id = $1 AND v.user_id = $2`,
      [maintenanceId, userId],
    );

    if (maintenanceResult.rows.length === 0) {
      return res.status(404).json({ message: "Maintenance not found" });
    }

    await db.query("DELETE FROM maintenance WHERE id = $1", [maintenanceId]);
    res.json({ message: "Maintenance deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
