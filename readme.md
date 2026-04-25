# MyDriveLog

> **Ton compagnon automobile.** Gère l'entretien de ton véhicule, suis tes dépenses et organise tes trajets entre amis.

---

## Description

MyDriveLog est une application web personnelle destinée aux propriétaires de véhicules, passionnés ou non. Elle centralise tout ce qui concerne ta voiture en un seul endroit : la fiche technique du véhicule, l'historique complet des interventions mécaniques, et l'organisation de tes trajets et road trips entre amis avec partage des dépenses.

Pas de réseau social, pas de chat, pas de partage public. MyDriveLog est une app **100% personnelle ou entre amis proches**.

---

## Fonctionnalités

### Fiche du véhicule

- Récupération automatique des informations via la plaque d'immatriculation
- Ajout de photos du véhicule
- Informations techniques complètes : motorisation, puissance, nombre de places, volume du coffre, année, kilométrage actuel...
- Gestion de plusieurs véhicules

### Historique des modifications

- Log de chaque intervention (réalisée en garage ou soi-même)
- Informations par entrée : date, kilométrage, coût, description de l'intervention
- Compteur du coût total du véhicule depuis son acquisition
- Rappels intelligents basés sur le kilométrage ou la date (vidange, contrôle technique, révision...)
- Export de l'historique complet (PDF) — pour une revente ou un suivi personnel

### Road Trip & Covoiturage

- Création d'un trajet en mode **un seul véhicule** (covoiturage classique) ou **convoi multi-véhicules**
- Invitation des participants sans compte requis
- **Journal de bord** — ajout de points d'étape chronologiques pendant le trajet (départ, pause, plein d'essence, repas, arrivée...) avec texte libre et dépense associée
- Partage des dépenses liées au trajet : essence, péages...
- Partage des dépenses hors véhicule : restaurant, hébergement, activités...
- Solde net final automatique — qui doit combien à qui
- **Récap final** — timeline complète des étapes + carte Google Maps statique affichant tous les points du trajet dans l'ordre
- Historique de tous les trips passés avec le détail des dépenses

---

## Stack technique

| Côté            | Technologie                  |
| --------------- | ---------------------------- |
| Frontend        | React + Tailwind CSS         |
| Backend         | Node.js + Express            |
| Base de données | PostgreSQL                   |
| Auth            | JWT                          |
| Export PDF      | Puppeteer                    |
| API plaque      | API SIV / immatriculation.fr |
| Carte récap     | Google Maps Static API       |
| Notifications   | Web Push API                 |

---

## Installation

### Prérequis

- Node.js v18+
- PostgreSQL
- npm ou yarn

### Cloner le projet

```bash
git clone https://github.com/tonpseudo/mydrivelog.git
cd mydrivelog
```

### Installer les dépendances

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### Variables d'environnement

Crée un fichier `.env` dans le dossier `server/` :

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/mydrivelog
JWT_SECRET=ton_secret_jwt
IMMAT_API_KEY=ta_clé_api
GOOGLE_MAPS_API_KEY=ta_clé_google_maps_static
```

### Lancer l'application

```bash
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
```

L'application est accessible sur `http://localhost:5173`

---

## Structure du projet

```
mydrivelog/
├── client/                  # Frontend React
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/           # Pages de l'application
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # Appels API
│   │   └── utils/           # Fonctions utilitaires
├── server/                  # Backend Node.js
│   ├── src/
│   │   ├── controllers/     # Logique métier
│   │   ├── routes/          # Routes API
│   │   ├── models/          # Modèles de données
│   │   ├── middlewares/     # Middlewares (auth, errors...)
│   │   └── utils/           # Fonctions utilitaires
└── README.md
```

---

## Roadmap

- [x] Conception et architecture
- [ ] Authentification (inscription / connexion)
- [ ] Fiche véhicule + récupération par plaque
- [ ] Historique des interventions
- [ ] Rappels intelligents
- [ ] Export PDF de l'historique
- [ ] Module road trip / covoiturage
- [ ] Journal de bord des étapes
- [ ] Partage des dépenses + solde net
- [ ] Récap final avec carte statique Google Maps
- [ ] Support multi-véhicules
- [ ] Application mobile (React Native)

---

## Licence

Ce projet est sous licence MIT — libre d'utilisation personnelle.
