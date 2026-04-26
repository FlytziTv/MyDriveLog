const express = require("express");
const router = express.Router();
const db = require("../utils/db");

// Recuperer les véhicules de l'utilisateur connecté
router.get("/", async (req, res) => {
  try {
    const userId = req.userId;

    const vehiclesResult = await db.query(
      "SELECT * FROM vehicles WHERE user_id = $1",
      [userId],
    );
    res.json(vehiclesResult.rows);
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

module.exports = router;
