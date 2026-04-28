const express = require("express");
const router = express.Router();
const db = require("../utils/db");

// Recuperer les véhicules de l'utilisateur connecté
router.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT v.*, 
        COUNT(DISTINCT i.id) as interventions_count,
        COUNT(DISTINCT r.id) FILTER (WHERE r.is_done = false) as reminders_count,
        COALESCE(SUM(i.cost), 0) as total_cost
      FROM vehicles v
      LEFT JOIN interventions i ON i.vehicle_id = v.id
      LEFT JOIN reminders r ON r.vehicle_id = v.id
      WHERE v.user_id = $1
      GROUP BY v.id`,
      [userId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Ajouter un véhicule pour l'utilisateur connecté
router.post("/", async (req, res) => {
  try {
    const userId = req.userId;
    const { nickname, license_plate, brand, model, year, fuel_type } = req.body;

    if (!license_plate) {
      return res.status(400).json({ message: "License plate is required" });
    }

    const licensePlateExist = await db.query(
      "SELECT * FROM vehicles WHERE license_plate = $1",
      [license_plate],
    );

    if (licensePlateExist.rows.length > 0) {
      return res.status(400).json({ message: "License plate already exists" });
    }

    const newVehicle = await db.query(
      "INSERT INTO vehicles (user_id, nickname, license_plate, brand, model, year, fuel_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [userId, nickname, license_plate, brand, model, year, fuel_type],
    );
    res.status(201).json(newVehicle.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Recuperer un véhicule spécifique de l'utilisateur connecté
router.get("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.id;

    const vehicleResult = await db.query(
      "SELECT * FROM vehicles WHERE id = $1 AND user_id = $2",
      [vehicleId, userId],
    );

    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicleResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Modifier un véhicule de l'utilisateur connecté
router.put("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.id;
    const { nickname, license_plate, brand, model, year, fuel_type } = req.body;

    const vehicleResult = await db.query(
      "SELECT * FROM vehicles WHERE id = $1 AND user_id = $2",
      [vehicleId, userId],
    );

    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const updatedVehicle = await db.query(
      "UPDATE vehicles SET nickname = COALESCE($1, nickname), license_plate = COALESCE($2, license_plate), brand = COALESCE($3, brand), model = COALESCE($4, model), year = COALESCE($5, year), fuel_type = COALESCE($6, fuel_type) WHERE id = $7 AND user_id = $8 RETURNING *",
      [
        nickname,
        license_plate,
        brand,
        model,
        year,
        fuel_type,
        vehicleId,
        userId,
      ],
    );
    res.json(updatedVehicle.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Supprimer un véhicule de l'utilisateur connecté
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.id;

    const vehicleResult = await db.query(
      "SELECT * FROM vehicles WHERE id = $1 AND user_id = $2",
      [vehicleId, userId],
    );
    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    await db.query("DELETE FROM vehicles WHERE id = $1 AND user_id = $2", [
      vehicleId,
      userId,
    ]);
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
