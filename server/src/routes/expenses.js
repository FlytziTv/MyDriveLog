const express = require("express");
const router = express.Router();
const db = require("../utils/db");

// Récupérer les dépenses d'un véhicule spécifique
router.get("/:vehicleId", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.vehicleId;

    const expResult = await db.query(
      `SELECT e.* FROM expenses e
      JOIN vehicles v ON e.vehicle_id = v.id
      WHERE e.vehicle_id = $1 AND v.user_id = $2
      ORDER BY e.date DESC`,
      [vehicleId, userId],
    );
    res.json(expResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Ajouter une dépense
router.post("/:vehicleId", async (req, res) => {
  try {
    const userId = req.userId;
    const vehicleId = req.params.vehicleId;
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Title, amount, and date are required" });
    }

    const vehicleResult = await db.query(
      "SELECT * FROM vehicles WHERE id = $1 AND user_id = $2",
      [vehicleId, userId],
    );

    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const newExpense = await db.query(
      `INSERT INTO expenses (vehicle_id, title, amount, category, date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [vehicleId, title, amount, category, date],
    );

    res.status(201).json(newExpense.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Modifier une dépense
router.put("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const expenseId = req.params.id;
    const { title, amount, category, date } = req.body;

    const expenseResult = await db.query(
      `SELECT e.* FROM expenses e
      JOIN vehicles v ON e.vehicle_id = v.id
      WHERE e.id = $1 AND v.user_id = $2`,
      [expenseId, userId],
    );

    if (expenseResult.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const updatedExpense = await db.query(
      `UPDATE expenses SET 
        title = COALESCE($1, title), 
        amount = COALESCE($2, amount), 
        category = COALESCE($3, category), 
        date = COALESCE($4, date)
       WHERE id = $5 RETURNING *`,
      [title, amount, category, date, expenseId],
    );

    res.json(updatedExpense.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Supprimer une dépense
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const expenseId = req.params.id;

    const expenseResult = await db.query(
      `SELECT e.* FROM expenses e
      JOIN vehicles v ON e.vehicle_id = v.id
      WHERE e.id = $1 AND v.user_id = $2`,
      [expenseId, userId],
    );

    if (expenseResult.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await db.query("DELETE FROM expenses WHERE id = $1", [expenseId]);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
