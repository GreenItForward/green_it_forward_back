# green_it_forward_back
[![wakatime](https://wakatime.com/badge/user/e52bef9d-e298-4ffd-b606-f63f36526478/project/0ece423f-e1fc-4923-94f2-cb5da87697a5.svg)](https://wakatime.com/badge/user/e52bef9d-e298-4ffd-b606-f63f36526478/project/0ece423f-e1fc-4923-94f2-cb5da87697a5)

## Description

Ce projet est le backend de l'application Green It Forward. 

Il fournit une API pour gérer les fonctionnalités de l'application.

## Installation

Assurez-vous d'avoir [Node.js](https://nodejs.org) installé.

Installez les dépendances en exécutant la commande suivante :

```sh
npm install
```

## Configuration
Avant de lancer l'application, vous devez configurer les variables d'environnement.

Créez un fichier .env à la racine du projet et définissez les valeurs suivantes :

```sh
PGDATABASE=postgres
PGUSER=postgres
PGPASSWORD=postgres
PGHOST=localhost
PGPORT=5432
STRIPE_SECRET_KEY=sk_*your_secret_key*

EMAIL_ADDRESS=*your_email_address*
EMAIL_PASSWORD=*your_email_password*
EMAIL_FROM=*your_email_address*
EMAIL_HOST=smtp.*your_email_provider*.com 
EMAIL_SECURE=true
EMAIL_FROM=*your_email_address*

JWT_KEY=*your_jwt_key*
JWT_EXPIRES=1d

LOGO_URL=https://cdn.discordapp.com/attachments/1029381239246954548/1128644644650110976/logo.png
FRONT_URL=*your_website_url*
```

## Scripts
Les scripts suivants sont disponibles :

- `npm run build` : Compile les fichiers TypeScript en JavaScript dans le dossier dist.

- `npm run format` : Formate le code à l'aide de Prettier.
- `npm start` : Lance l'application en utilisant Node.js.
- `npm run start:dev` : Lance l'application en mode développement avec rechargement à chaud.
- `npm run start:debug` : Lance l'application en mode débogage avec rechargement à chaud.
- `npm run start:prod` : Lance l'application en mode production.
- `npm run start:docker` : Lance l'application dans un conteneur Docker en utilisant Docker Compose.
- `npm run start:docker:dev` : Lance l'application dans un conteneur Docker en mode développement avec rechargement à chaud.
`npm run start:docker:debug` : Lance l'application dans un conteneur Docker en mode débogage avec rechargement à chaud.
- `npm run docker:compose` : Démarre les conteneurs Docker nécessaires à l'application.
- `npm run lint` : Vérifie le code à l'aide d'ESLint et apporte des corrections automatiques si possible.
- `npm test` : Exécute les tests à l'aide de Jest.
- `npm run test:watch` : Exécute les tests en mode surveillance.
- `npm run test:cov` : Exécute les tests avec une couverture de code.
- `npm run test:debug` : Exécute les tests en mode débogage.
- `npm run test:e2e` : Exécute les tests d'end-to-end.

## Auteurs

- James ABIB
- Ronan KIELT
- Charles CRETOIS
