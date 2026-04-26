import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg">
      <div className="bg-white rounded-2xl shadow-card p-8 w-full max-w-md">
        {/* Logo / Titre */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-app-text">MyDriveLog</h1>
          <p className="text-muted text-sm mt-1">Connecte-toi à ton espace</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="ton@email.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="label">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="btn-primary">
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Pas encore de compte ?{" "}
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            S'inscrire
          </span>
        </p>
      </div>
    </div>
  );
}
