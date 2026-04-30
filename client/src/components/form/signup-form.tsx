import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Logo } from "../icons/logo";
import { InputGroup, InputGroupInput, InputGroupLabel } from "../ui/InputGroup";
import { useState } from "react";
import api from "../../services/api";
import { useTranslation, Trans } from "react-i18next";

export default function SignupForm() {
  const { t } = useTranslation("register");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError("Une erreur est survenue");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-110")}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="transition-transform duration-300 hover:rotate-6">
            <Logo size={40} className="text-primary" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-app-text">
              {t("welcome")}
            </h1>
            <p className="text-sm text-app-muted">
              {t("already_have_account")}{" "}
              <a
                href="/login"
                className="font-semibold text-primary hover:underline decoration-1.5 underline-offset-4"
              >
                {t("login")}
              </a>
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-4">
          <InputGroup>
            <InputGroupLabel htmlFor="username">
              {t("input.username")}
            </InputGroupLabel>
            <InputGroupInput
              id="username"
              type="text"
              placeholder={t("input.username_placeholder")}
              required={true}
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupLabel htmlFor="email">
              {t("input.email")}
            </InputGroupLabel>
            <InputGroupInput
              id="email"
              type="email"
              placeholder={t("input.email_placeholder")}
              required={true}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupLabel htmlFor="password">
              {t("input.password")}
            </InputGroupLabel>
            <InputGroupInput
              id="password"
              type="password"
              placeholder={t("input.password_placeholder")}
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
          {t("submit")}
        </button>
      </form>

      {loginError && (
        <div className="text-sm text-red-500 text-center">{loginError}</div>
      )}

      {/* Footer Legal */}
      <footer className="px-4 text-center text-xs leading-relaxed text-app-subtle/80">
        <Trans
          i18nKey="auth.accept_terms"
          components={{
            terms: (
              <a
                href="/terms"
                className="text-app-muted hover:text-primary hover:underline underline-offset-2"
              />
            ),
            privacy: (
              <a
                href="/privacy"
                className="text-app-muted hover:text-primary hover:underline underline-offset-2"
              />
            ),
          }}
        />
      </footer>
    </div>
  );
}
