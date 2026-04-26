const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../utils/db");

router.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    const tripId = req.params.tripId;
    const expResult = await db.query(
      `SELECT * FROM expenses WHERE trip_id = $1 AND trip_id IN (SELECT id FROM trips WHERE owner_id = $2)`,
      [tripId, userId],
    );
    res.json(expResult.rows);
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
      amount,
      category,
      paid_by_guest_name,
      step_id,
      split_between,
    } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const tripResult = await db.query(
      "SELECT * FROM trips WHERE id = $1 AND owner_id = $2",
      [tripId, userId],
    );
    if (tripResult.rows.length === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const newExpense = await db.query(
      `INSERT INTO expenses (trip_id, title, amount, category, paid_by_guest_name, step_id, split_between)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        tripId,
        title,
        amount,
        category,
        paid_by_guest_name,
        step_id,
        split_between,
      ],
    );

    res.status(201).json(newExpense.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const expenseId = req.params.id;

    const { title, amount, category, paid_by_guest_name, split_between } =
      req.body;

    const expenseResult = await db.query(
      `SELECT e.* FROM expenses e
      JOIN trips t ON e.trip_id = t.id
      WHERE e.id = $1 AND t.owner_id = $2`,
      [expenseId, userId],
    );

    if (expenseResult.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const updatedExpense = await db.query(
      `UPDATE expenses SET title = COALESCE($1, title), amount = COALESCE($2, amount), category = COALESCE($3, category), paid_by_guest_name = COALESCE($4, paid_by_guest_name), split_between = COALESCE($5, split_between)
      WHERE id = $6 RETURNING *`,
      [title, amount, category, paid_by_guest_name, split_between, expenseId],
    );

    res.json(updatedExpense.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const expenseId = req.params.id;
    const expenseResult = await db.query(
      `SELECT e.* FROM expenses e
      JOIN trips t ON e.trip_id = t.id
      WHERE e.id = $1 AND t.owner_id = $2`,
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
