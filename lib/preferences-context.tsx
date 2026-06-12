"use client";

import { createContext, useContext } from "react";
import { Preferences } from "@prisma/client";

const PreferencesContext = createContext<Preferences | null>(null);

export function PreferencesProvider({
  preferences,
  children,
}: {
  preferences: Preferences | null;
  children: React.ReactNode;
}) {
  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    // Valeurs par défaut si pas chargé
    return {
      distanceUnit: "KM",
      currency: "EUR",
      language: "FR",
      theme: "SYSTEM",
    } as Preferences;
  }
  return context;
}
