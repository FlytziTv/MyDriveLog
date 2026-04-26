-- ============================================
-- MyDriveLog — Schéma de base de données
-- PostgreSQL
-- ============================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS — Comptes utilisateurs
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- VEHICLES — Fiches véhicules
-- ============================================
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    -- Infos générales
    nickname VARCHAR(100),                        -- Ex: "Ma Clio"
    license_plate VARCHAR(20) NOT NULL,           -- Plaque d'immatriculation
    vin VARCHAR(17),                              -- Numéro de châssis
    -- Infos techniques (récupérées via API plaque)
    brand VARCHAR(50),                            -- Ex: Renault
    model VARCHAR(50),                            -- Ex: Clio
    version VARCHAR(100),                         -- Ex: 1.5 dCi 90ch
    year INTEGER,                                 -- Année de mise en circulation
    fuel_type VARCHAR(20),                        -- Essence / Diesel / Électrique / Hybride
    horsepower INTEGER,                           -- Puissance en chevaux
    seats INTEGER,                                -- Nombre de places
    trunk_volume INTEGER,                         -- Volume du coffre en litres
    color VARCHAR(50),                            -- Couleur
    -- Kilométrage
    current_mileage INTEGER DEFAULT 0,            -- Kilométrage actuel
    mileage_updated_at TIMESTAMP DEFAULT NOW(),
    -- Photos
    cover_photo_url TEXT,                         -- Photo principale
    -- Dates
    purchase_date DATE,                           -- Date d'achat
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Photos supplémentaires du véhicule
CREATE TABLE vehicle_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    caption VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INTERVENTIONS — Historique des modifications
-- ============================================
CREATE TABLE interventions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    -- Infos de l'intervention
    title VARCHAR(255) NOT NULL,                  -- Ex: "Vidange moteur"
    description TEXT,                             -- Détails de l'intervention
    category VARCHAR(50),                         -- Moteur / Freins / Pneus / Carrosserie / Autre
    done_by VARCHAR(20) DEFAULT 'self',           -- self / garage
    garage_name VARCHAR(100),                     -- Nom du garage si applicable
    -- Kilométrage & date
    mileage_at_intervention INTEGER,              -- Km au moment de l'intervention
    intervention_date DATE NOT NULL,
    -- Coût
    cost DECIMAL(10, 2) DEFAULT 0,               -- Coût en euros
    -- Pièces utilisées
    parts_used TEXT,                              -- Description libre des pièces
    -- Justificatif
    receipt_url TEXT,                             -- Photo de la facture
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- REMINDERS — Rappels d'entretien
-- ============================================
CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,                  -- Ex: "Vidange"
    description TEXT,
    -- Rappel par kilométrage
    mileage_threshold INTEGER,                    -- Ex: rappeler à 150 000 km
    -- Rappel par date
    due_date DATE,                                -- Ex: rappeler le 01/06/2025
    -- Statut
    is_done BOOLEAN DEFAULT FALSE,
    done_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TRIPS — Road trips
-- ============================================
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    -- Infos générales
    title VARCHAR(255) NOT NULL,                  -- Ex: "Road trip Alpes"
    description TEXT,
    -- Mode du trip
    mode VARCHAR(20) DEFAULT 'single',            -- single (1 véhicule) / convoy (multi-véhicules)
    -- Dates
    start_date DATE,
    end_date DATE,
    -- Statut
    status VARCHAR(20) DEFAULT 'planned',         -- planned / ongoing / completed
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TRIP_PARTICIPANTS — Participants à un trip
-- ============================================
CREATE TABLE trip_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    -- Participant (peut être un user ou juste un nom)
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    guest_name VARCHAR(100),                      -- Si pas de compte
    -- Véhicule utilisé pour ce trip
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
    -- Rôle
    role VARCHAR(20) DEFAULT 'participant',       -- owner / participant
    -- Solde
    balance DECIMAL(10, 2) DEFAULT 0,            -- Solde net (positif = on lui doit, négatif = il doit)
    joined_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TRIP_STEPS — Points d'étape du journal de bord
-- ============================================
CREATE TABLE trip_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    -- Infos de l'étape
    title VARCHAR(255) NOT NULL,                  -- Ex: "Départ", "Premier plein", "Pause déjeuner"
    description TEXT,                             -- Notes libres
    category VARCHAR(50),                         -- depart / fuel / food / rest / arrival / other
    -- Localisation (texte libre, pas de GPS temps réel)
    location_name VARCHAR(255),                   -- Ex: "Station Total A6 - Auxerre"
    -- Ordre chronologique
    step_order INTEGER NOT NULL,
    -- Horodatage
    happened_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- EXPENSES — Dépenses liées à un trip
-- ============================================
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    step_id UUID REFERENCES trip_steps(id) ON DELETE SET NULL,  -- Étape associée (optionnel)
    -- Qui a payé
    paid_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    paid_by_guest_name VARCHAR(100),              -- Si pas de compte
    -- Infos de la dépense
    title VARCHAR(255) NOT NULL,                  -- Ex: "Plein d'essence"
    amount DECIMAL(10, 2) NOT NULL,              -- Montant en euros
    category VARCHAR(50),                         -- fuel / toll / food / accommodation / activity / other
    -- Partage
    split_between JSONB,                          -- Liste des participants concernés par la dépense
    -- Justificatif
    receipt_url TEXT,
    expense_date TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INDEX — Pour optimiser les requêtes
-- ============================================
CREATE INDEX idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX idx_interventions_vehicle_id ON interventions(vehicle_id);
CREATE INDEX idx_interventions_date ON interventions(intervention_date);
CREATE INDEX idx_reminders_vehicle_id ON reminders(vehicle_id);
CREATE INDEX idx_trips_owner_id ON trips(owner_id);
CREATE INDEX idx_trip_participants_trip_id ON trip_participants(trip_id);
CREATE INDEX idx_trip_steps_trip_id ON trip_steps(trip_id);
CREATE INDEX idx_expenses_trip_id ON expenses(trip_id);
