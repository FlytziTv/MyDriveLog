const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires" });
    }

    const userExist = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
      [username, email, hashedPassword],
    );

    const user = newUser.rows[0];

    // Génération du token directement à l'inscription pour connecter l'utilisateur immédiatement
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ message: "Utilisateur créé", user, token });
  } catch (err) {
    console.error("ERREUR SQL:", err.message); // Regarde bien ce message dans ton terminal
    res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    delete user.password_hash;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Recupérer les infos de l'utilisateur connecté
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        id, 
        username, 
        email, 
        avatar_url, 
        currency, 
        distance_unit, 
        language, 
        created_at 
      FROM users 
      WHERE id = $1`,
      [req.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erreur /me:", err.message);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération du profil" });
  }
});

module.exports = router;
