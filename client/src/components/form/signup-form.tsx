import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Logo } from "../icons/Logo";
import { InputGroup, InputGroupInput, InputGroupLabel } from "../ui/InputGroup";
import { useState } from "react";
import api from "../../services/api";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-110")}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="transition-transform duration-300 hover:rotate-6">
            <Logo size="40" className="text-primary" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-app-text">
              Bienvenue sur MyDriveLog
            </h1>
            <p className="text-sm text-app-muted">
              Déjà un compte ?{" "}
              <a
                href="/login"
                className="font-semibold text-primary hover:underline decoration-1.5 underline-offset-4"
              >
                Se connecter
              </a>
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-4">
          <InputGroup>
            <InputGroupLabel htmlFor="username">
              Nom d'utilisateur
            </InputGroupLabel>
            <InputGroupInput
              id="username"
              type="text"
              placeholder="Votre nom d'utilisateur"
              required={true}
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupLabel htmlFor="email">Email</InputGroupLabel>
            <InputGroupInput
              id="email"
              type="email"
              placeholder="nom@exemple.com"
              required={true}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupLabel htmlFor="password">Mot de passe</InputGroupLabel>
            <InputGroupInput
              id="password"
              type="password"
              placeholder="••••••••"
              required={true}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-card hover:bg-primary-hover active:scale-[0.97] transition-all duration-200 cursor-pointer"
        >
          S'inscrire
        </button>
      </form>

      {/* Footer Legal */}
      <footer className="px-4 text-center text-xs leading-relaxed text-app-subtle/80">
        En continuant, vous acceptez nos{" "}
        <a
          href="/terms"
          className="text-app-muted hover:text-primary hover:underline underline-offset-2"
        >
          Conditions
        </a>{" "}
        et notre{" "}
        <a
          href="/privacy"
          className="text-app-muted hover:text-primary hover:underline underline-offset-2"
        >
          Politique de confidentialité
        </a>
        .
      </footer>
    </div>
  );
}
