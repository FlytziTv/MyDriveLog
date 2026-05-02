const express = require("express");
const router = express.Router();
const db = require("../utils/db");

// Récupérer les véhicules de l'utilisateur connecté
router.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT * FROM vehicles WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur GET /vehicles:", err.message);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des véhicules" });
  }
});

// Ajouter un véhicule pour l'utilisateur connecté
router.post("/", async (req, res) => {
  try {
    const userId = req.userId;
    const {
      name,
      license_plate,
      brand,
      model,
      year,
      vin,
      fuel_type,
      purchase_mileage,
      current_mileage,
    } = req.body;

    // Validation basique
    if (!license_plate || !name) {
      return res
        .status(400)
        .json({
          message: "Le nom et la plaque d'immatriculation sont obligatoires",
        });
    }

    const licensePlateExist = await db.query(
      "SELECT * FROM vehicles WHERE license_plate = $1",
      [license_plate],
    );

    if (licensePlateExist.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Cette plaque d'immatriculation existe déjà" });
    }

    const newVehicle = await db.query(
      `INSERT INTO vehicles 
      (user_id, name, license_plate, brand, model, year, vin, fuel_type, purchase_mileage, current_mileage) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *`,
      [
        userId,
        name,
        license_plate,
        brand,
        model,
        year,
        vin || null,
        fuel_type || null,
        purchase_mileage || 0,
        current_mileage || 0,
      ],
    );

    res.status(201).json(newVehicle.rows[0]);
  } catch (err) {
    console.error("Erreur POST /vehicles:", err.message);
    res.status(500).json({ message: "Erreur lors de l'ajout du véhicule" });
  }
});

// Récupérer un véhicule spécifique de l'utilisateur connecté
router.get("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.id;

    const vehicleResult = await db.query(
      "SELECT * FROM vehicles WHERE id = $1 AND user_id = $2",
      [vehicleId, userId],
    );

    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ message: "Véhicule introuvable" });
    }

    res.json(vehicleResult.rows[0]);
  } catch (err) {
    console.error("Erreur GET /vehicles/:id:", err.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Modifier un véhicule de l'utilisateur connecté
router.put("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.id;
    const {
      name,
      license_plate,
      brand,
      model,
      year,
      vin,
      fuel_type,
      current_mileage,
    } = req.body;

    const vehicleResult = await db.query(
      "SELECT id FROM vehicles WHERE id = $1 AND user_id = $2",
      [vehicleId, userId],
    );

    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ message: "Véhicule introuvable" });
    }

    const updatedVehicle = await db.query(
      `UPDATE vehicles SET 
        name = COALESCE($1, name), 
        license_plate = COALESCE($2, license_plate), 
        brand = COALESCE($3, brand), 
        model = COALESCE($4, model), 
        year = COALESCE($5, year), 
        vin = COALESCE($6, vin),
        fuel_type = COALESCE($7, fuel_type),
        current_mileage = COALESCE($8, current_mileage),
        updated_at = NOW()
      WHERE id = $9 AND user_id = $10 
      RETURNING *`,
      [
        name,
        license_plate,
        brand,
        model,
        year,
        vin,
        fuel_type,
        current_mileage,
        vehicleId,
        userId,
      ],
    );
    res.json(updatedVehicle.rows[0]);
  } catch (err) {
    console.error("Erreur PUT /vehicles/:id:", err.message);
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
});

// Supprimer un véhicule de l'utilisateur connecté
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.id;

    const vehicleResult = await db.query(
      "SELECT id FROM vehicles WHERE id = $1 AND user_id = $2",
      [vehicleId, userId],
    );

    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ message: "Véhicule introuvable" });
    }

    await db.query("DELETE FROM vehicles WHERE id = $1 AND user_id = $2", [
      vehicleId,
      userId,
    ]);

    res.json({ message: "Véhicule supprimé avec succès" });
  } catch (err) {
    console.error("Erreur DELETE /vehicles/:id:", err.message);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

module.exports = router;
