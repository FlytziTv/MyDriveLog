# MyDriveLog

> Application mobile de gestion de véhicules — carnet d'entretien, suivi des dépenses, tableau de bord.

Produit **SZ Dev** · Mobile-only (PWA) · Light mode

---

## Stack technique

| Couche          | Technologie                    |
| --------------- | ------------------------------ |
| Frontend        | Next.js 15 (App Router)        |
| Langage         | TypeScript                     |
| Styling         | Tailwind CSS v4                |
| Auth            | Better Auth                    |
| ORM             | Prisma                         |
| Base de données | PostgreSQL (NeonDB)            |
| Storage         | Uploadthing (photos véhicules) |
| Deploy          | Vercel                         |
| PWA             | next-pwa                       |

---

## Fonctionnalités V1

- **Gestion de véhicules** — ajout, édition, suppression avec photo
- **Carnet d'entretien** — vidange, révision, pneus, freins, contrôle technique...
- **Historique des interventions** — liste complète par véhicule
- **Suivi des dépenses** — carburant, assurance, parking, péage, amende...
- **Tableau de bord** — dernière intervention, total dépensé, km actuel

### Roadmap V2+

- Rappels & notifications
- Export PDF du carnet
- Mode multi-véhicules illimité (freemium)
- Modèle Free / Premium

---

## Structure du projet

```
mydrivelog/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (app)/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   └── vehicles/
│   │       ├── page.tsx
│   │       ├── new/
│   │       └── [id]/
│   │           ├── page.tsx
│   │           ├── maintenance/
│   │           └── expenses/
│   └── api/
│       └── auth/
├── components/
│   ├── ui/
│   ├── vehicles/
│   ├── maintenance/
│   └── expenses/
├── server/
│   ├── actions/
│   │   ├── vehicles.ts
│   │   ├── maintenance.ts
│   │   └── expenses.ts
│   └── queries/
│       ├── vehicles.ts
│       └── dashboard.ts
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
└── types/
    └── index.ts
```

---

## Schéma base de données

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  image     String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  vehicles  Vehicle[]
  sessions  Session[]
  accounts  Account[]
}

model Vehicle {
  id           String        @id @default(cuid())
  userId       String
  user         User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  brand        String
  model        String
  year         Int
  plate        String?
  mileage      Int
  photo        String?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  maintenances Maintenance[]
  expenses     Expense[]
}

model Maintenance {
  id        String          @id @default(cuid())
  vehicleId String
  vehicle   Vehicle         @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  type      MaintenanceType
  date      DateTime
  mileage   Int
  cost      Float?
  garage    String?
  notes     String?
  createdAt DateTime        @default(now())
  updatedAt DateTime        @updatedAt
}

model Expense {
  id        String          @id @default(cuid())
  vehicleId String
  vehicle   Vehicle         @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  category  ExpenseCategory
  amount    Float
  date      DateTime
  notes     String?
  createdAt DateTime        @default(now())
  updatedAt DateTime        @updatedAt
}

enum MaintenanceType {
  OIL_CHANGE
  TIRE_CHANGE
  REVISION
  BRAKE
  BATTERY
  BELT
  FILTER
  CONTROL
  OTHER
}

enum ExpenseCategory {
  FUEL
  INSURANCE
  PARKING
  TOLL
  FINE
  WASH
  OTHER
}
```

---

## Charte graphique

| Token          | Valeur    |
| -------------- | --------- |
| Primary        | `#2563EB` |
| Primary hover  | `#1D4ED8` |
| Background     | `#FFFFFF` |
| Surface        | `#F8FAFC` |
| Border         | `#E2E8F0` |
| Text primary   | `#0F172A` |
| Text secondary | `#64748B` |
| Success        | `#22C55E` |
| Warning        | `#F59E0B` |
| Danger         | `#EF4444` |

- **Typographie** — Inter
- **Border radius** — `rounded-xl` (cards), `rounded-lg` (inputs/boutons)
- **Ombres** — `shadow-sm` uniquement
- **Layout** — `max-w-[430px] mx-auto` (mobile-only)

---

## Stratégie Git

```
main      → production stable
dev       → branche de travail principale
feature/* → nouvelles features
fix/*     → corrections
```

### Conventions de commits

```
feat(vehicles): add photo upload
fix(auth): redirect after login
chore(db): update prisma schema
feat(maintenance): add oil change form
```

---

## Installation

```bash
# Cloner le repo
git clone https://github.com/SZ-Developpement/mydrivelog.git
cd mydrivelog

# Installer les dépendances
npm install

# Variables d'environnement
cp .env.example .env
# Remplir DATABASE_URL, BETTER_AUTH_SECRET, UPLOADTHING_SECRET...

# Générer le client Prisma
npx prisma generate

# Lancer les migrations
npx prisma migrate dev

# Démarrer en dev
npm run dev
```

---

## Variables d'environnement

```env
# Base de données
DATABASE_URL=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# Uploadthing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# App
NEXT_PUBLIC_APP_URL=
```

---

## User Stories

| #   | En tant qu'utilisateur...                                                  |
| --- | -------------------------------------------------------------------------- |
| 1   | Je peux créer un compte et me connecter                                    |
| 2   | Je peux ajouter un véhicule avec photo, marque, modèle, année, immat, km   |
| 3   | Je peux ajouter une intervention d'entretien (type, date, km, coût, notes) |
| 4   | Je peux ajouter une dépense avec catégorie, montant et date                |
| 5   | Je peux voir un tableau de bord par véhicule                               |
| 6   | Je peux consulter l'historique complet des interventions et dépenses       |

---

_MyDriveLog est un produit SZ Dev — [sz-dev.fr](https://sz-dev.fr)_
