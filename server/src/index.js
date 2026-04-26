// Importer express, cors et dotenv
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./utils/db");

// Initialiser l'app express
// Utiliser les middlewares cors et express.json()

const app = express();
dotenv.config();

db.query("SELECT NOW()")
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("DB Error:", err));

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const authMiddleware = require("./middlewares/auth");
const vehicleRoutes = require("./routes/vehicles");
app.use("/api/vehicles", authMiddleware, vehicleRoutes);

const interventionRoutes = require("./routes/interventions");
app.use("/api/interventions", authMiddleware, interventionRoutes);

// Créer une route GET / qui retourne { message: "MyDriveLog API is running" }
app.get("/", (req, res) => {
  res.json({ message: "MyDriveLog API is running" });
});

//Lancer le serveur sur le port défini dans .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
