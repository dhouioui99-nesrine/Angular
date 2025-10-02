# ---- Build Stage ----
FROM node:18 AS build

WORKDIR /app

# Copier uniquement package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances sans erreurs
RUN npm ci --legacy-peer-deps

# Copier tout le code source
COPY . .

# Construire l’application Angular
RUN npm run build -- --configuration production
