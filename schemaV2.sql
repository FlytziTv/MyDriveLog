CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_currency AS ENUM ('USD', 'EUR');
CREATE TYPE user_distance_unit AS ENUM ('km', 'miles');

CREATE TYPE fuel_type AS ENUM ('gasoline', 'diesel', 'electric', 'hybrid', 'plug-in-hybrid');
CREATE TYPE transmission_type AS ENUM ('manual', 'automatic', 'cvt', 'semi-automatic');
CREATE TYPE traction_type AS ENUM ('fwd', 'rwd', 'awd', '4wd');
CREATE TYPE vehicle_type AS ENUM ('sedan', 'suv', 'truck', 'motorcycle', 'van', 'coupe', 'convertible', 'wagon', 'hatchback');
CREATE TYPE vehicle_status AS ENUM ('active', 'sold', 'in_repair', 'inactive');

CREATE TYPE expense_category AS ENUM ('fuel', 'maintenance', 'insurance', 'parking', 'tolls', 'washing', 'accessories', 'registration', 'financing', 'other');
CREATE TYPE payment_method AS ENUM ('cash', 'credit_card', 'debit_card', 'bank_transfer');

CREATE TYPE fuel_unit AS ENUM ('liters', 'gallons', 'kwh');
CREATE TYPE fuel_grade AS ENUM ('regular', 'premium', 'diesel', 'e85', 'other');

CREATE TYPE maintenance_type AS ENUM ('oil_change', 'tire_rotation', 'brake_service', 'battery_replacement', 'engine_tune_up', 'transmission_service', 'coolant_flush', 'other');
CREATE TYPE maintenance_status AS ENUM ('completed', 'scheduled', 'in_progress');

CREATE TYPE insurance_coverage_type AS ENUM ('comprehensive', 'third_party', 'collision', 'liability');
CREATE TYPE insurance_premium_frequency AS ENUM ('monthly', 'quarterly', 'semi-annual', 'annual');
CREATE TYPE insurance_status AS ENUM ('active', 'expired', 'cancelled');

CREATE TYPE document_type AS ENUM ('insurance', 'maintenance', 'fuel', 'registration', 'purchase', 'manual', 'warranty', 'inspection', 'other'); 
CREATE TYPE document_file_type AS ENUM ('pdf', 'jpg', 'png', 'doc', 'other');

CREATE TYPE mileage_trip_purpose AS ENUM ('business', 'personal', 'commute');
CREATE TYPE mileage_trip_source AS ENUM ('manual', 'fuel_entry', 'expense', 'gps');

CREATE TYPE reminder_type AS ENUM ('maintenance', 'insurance_renewal', 'inspection', 'registration', 'other');
CREATE TYPE reminder_status AS ENUM ('active', 'completed', 'dismissed', 'snoozed');
CREATE TYPE reminder_priority AS ENUM ('low', 'normal', 'high');

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url TEXT,

  currency user_currency DEFAULT 'EUR',
  distance_unit user_distance_unit DEFAULT 'km',
  language VARCHAR(10) DEFAULT 'en',

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);


-- ============================================
-- VEHICLES TABLE
-- ============================================
CREATE TABLE vehicles (
  -- 1. Identifiants & Système
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Basic Information
  name VARCHAR(100) NOT NULL,                   -- Ex: "Tesla Model 3", "Honda Civic"
  brand VARCHAR(100) NOT NULL,                  -- Ex: "Tesla", "Honda", "Toyota"
  model VARCHAR(100) NOT NULL,                  -- Ex: "Model 3", "Civic", "Corolla"
  year INTEGER NOT NULL,                        -- Année de fabrication
  trim VARCHAR(100),                            -- Ex: "Long Range", "Sport", "LX"
  vin VARCHAR(17) UNIQUE,                        -- Vehicle Identification Number
  license_plate VARCHAR(20) NOT NULL,           -- Plaque d'immatriculation
  color VARCHAR(100),                           -- Couleur

  -- Purchase Information
  purchase_date DATE,                           -- Date d'achat/acquisition
  purchase_price DECIMAL(10, 2),                -- Prix d'achat
  purchase_mileage INT DEFAULT 0,               -- Kilométrage à l'achat

  -- Vehicle Type
  vehicle_type vehicle_type,                    -- Type de véhicule (Berline, SUV, Camion, Moto...)

  -- Engine & Fuel
  fuel_type fuel_type,                          -- Type de carburant (Essence, Diesel, Électrique, Hybride, Hybride Rechargeable)
  engine_size DECIMAL(5, 2),                    -- Taille du moteur (ex: 2.0L, 75 kWh)
  engine_type VARCHAR(100),                     -- Motorisation
  power DECIMAL(10, 2),                         -- Puissance (chevaux/kW)
  transmission_type transmission_type,          -- Type de transmission (Manuelle, Automatique, CVT...)
  traction traction_type,                       -- Traction (FWD, RWD, AWD, 4WD)
  number_of_gears INTEGER,                      -- Nombre de vitesses

  -- Fuel/Energy Capacity
  tank_capacity DECIMAL(6, 2), -- Liters or kWh

  -- Current Status
  current_mileage INT NOT NULL DEFAULT 0,
  status vehicle_status DEFAULT 'active',

  -- Metadata
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),           -- Date de création de la fiche véhicule
  updated_at TIMESTAMP DEFAULT NOW(),           -- Date de dernière mise à jour de la fiche véhicule

  CHECK (purchase_mileage >= 0),
  CHECK (current_mileage >= 0)
);


-- ============================================
-- VEHICLE PHOTOS TABLE
-- ============================================

CREATE TABLE vehicle_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);


-- ============================================
-- EXPENSES TABLE
-- ============================================
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Expense Details
  amount DECIMAL(10, 2) NOT NULL,                      -- Montant de la dépense
  category expense_category NOT NULL,                  -- Catégorie de dépense (Carburant, Entretien, Assurance...)
  subcategory VARCHAR(100),                            -- Ex: "Fuel", "Oil Change", "Tire Replacement"

  -- Transaction Details
  expense_date DATE NOT NULL,
  mileage INT,
  location VARCHAR(255),
  vendor VARCHAR(255),
  payment_method payment_method, -- 'cash', 'credit_card', 'debit_card', 'bank_transfer'

  -- Additional Info
  description TEXT,
  notes TEXT,
  receipt_url TEXT,

  -- Tax & Accounting
  is_business_expense BOOLEAN DEFAULT false,
  is_tax_deductible BOOLEAN DEFAULT false,
  tax_amount DECIMAL(10, 2),

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- FUEL/ENERGY ENTRIES TABLE
-- ============================================
-- ============================================
CREATE TABLE fuel_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  expense_id UUID REFERENCES expenses(id) ON DELETE SET NULL,

  -- Fuel Details
  date DATE NOT NULL,
  mileage INT NOT NULL,
  quantity DECIMAL(8, 2) NOT NULL, -- Liters or kWh
  unit fuel_unit NOT NULL, -- 'liters', 'gallons', 'kwh'
  cost_per_unit DECIMAL(6, 3),
  total_cost DECIMAL(10, 2) NOT NULL,

  -- Location
  station_name VARCHAR(255),
  location VARCHAR(255),
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),

  -- Fill Details
  is_full_tank BOOLEAN DEFAULT true,
  fuel_grade fuel_grade, -- 'regular', 'premium', 'diesel', 'e85'

  -- Calculated
  distance_since_last DECIMAL(8, 2), -- km or miles
  consumption DECIMAL(6, 2), -- L/100km or kWh/100km or MPG
  cost_per_distance DECIMAL(6, 3), -- cost per km or mile

  -- Metadata
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- MAINTENANCE TABLE
-- ============================================
CREATE TABLE maintenance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  expense_id UUID REFERENCES expenses(id) ON DELETE SET NULL,

  -- Maintenance Details
  date DATE NOT NULL,
  mileage INT NOT NULL,
  type maintenance_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- Service Provider
  service_provider VARCHAR(255),
  location VARCHAR(255),
  technician_name VARCHAR(255),

  -- Cost
  labor_cost DECIMAL(10, 2),
  parts_cost DECIMAL(10, 2),
  total_cost DECIMAL(10, 2) NOT NULL,

  -- Parts Replaced
  parts_replaced TEXT[], -- Array of part names

  -- Status
  status maintenance_status DEFAULT 'completed', -- 'completed', 'scheduled', 'in_progress'

  -- Warranty
  warranty_until DATE,
  warranty_mileage INT,

  -- Metadata
  notes TEXT,
  receipt_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- MAINTENANCE SCHEDULE TABLE
-- ============================================
-- Soon


-- ============================================
-- INSURANCE TABLE
-- ============================================
CREATE TABLE insurance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,

  -- Insurance Company
  company_name VARCHAR(255) NOT NULL,
  policy_number VARCHAR(100) NOT NULL,
  agent_name VARCHAR(255),
  agent_phone VARCHAR(50),
  agent_email VARCHAR(255),

  -- Coverage
  coverage_type insurance_coverage_type NOT NULL,
  coverage_details TEXT,
  deductible DECIMAL(10, 2),
  liability_limit DECIMAL(10, 2),

  -- Costs
  premium_amount DECIMAL(10, 2) NOT NULL,
  premium_frequency insurance_premium_frequency NOT NULL,

  -- Dates
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  renewal_date DATE,

  -- Status
  status insurance_status DEFAULT 'active',
  auto_renew BOOLEAN DEFAULT true,

  -- Additional Drivers
  additional_drivers TEXT[], -- Array of driver names

  -- Claims
  claims_history JSONB, -- Store claim details as JSON
  bonus_malus_level INT, -- Bonus/Malus coefficient

  -- Documents
  policy_document_url TEXT,

  -- Metadata
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  CHECK (end_date >= start_date)
);

-- ============================================
-- DOCUMENTS TABLE
-- ============================================
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Document Details
  name VARCHAR(255) NOT NULL,
  type document_type NOT NULL,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size BIGINT, -- bytes
  file_type document_file_type, -- 'pdf', 'jpg', 'png', 'doc'

  -- Associations
  expense_id UUID REFERENCES expenses(id) ON DELETE SET NULL,
  maintenance_id UUID REFERENCES maintenance(id) ON DELETE SET NULL,

  -- Date
  document_date DATE,

  -- Metadata
  description TEXT,
  tags TEXT[], -- Array of tags
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- MILEAGE LOGS TABLE
-- ============================================
CREATE TABLE mileage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,

  -- Mileage Details
  date DATE NOT NULL,
  mileage INT NOT NULL,
  change_since_last INT,

  -- Trip Details (optional)
  trip_purpose mileage_trip_purpose, -- 'business', 'personal', 'commute'
  trip_from VARCHAR(255),
  trip_to VARCHAR(255),
  trip_distance DECIMAL(8, 2),

  -- Source
  source mileage_trip_source DEFAULT 'manual', -- 'manual', 'fuel_entry', 'expense', 'gps'

  -- Metadata
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  CHECK (mileage >= 0)
);


-- ============================================
-- REMINDERS TABLE
-- ============================================
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Reminder Details
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type reminder_type NOT NULL,

  -- Trigger
  remind_on_date DATE,
  remind_on_mileage INT,

  -- Status
  status reminder_status DEFAULT 'active',
  priority reminder_priority DEFAULT 'normal',

  -- Notifications
  notification_sent BOOLEAN DEFAULT false,
  notification_sent_at TIMESTAMP,

  -- Snooze
  snoozed_until TIMESTAMP,

  -- Related
  -- maintenance_schedule_id UUID REFERENCES maintenance_schedule(id) ON DELETE CASCADE,

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);