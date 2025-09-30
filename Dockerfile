# ---- Build Stage ----
FROM node:18 AS build

WORKDIR /app

# Copier uniquement package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances avec legacy-peer-deps pour éviter les conflits
RUN npm ci --legacy-peer-deps

# Copier tout le code source
COPY . .

# Construire l'application Angular en production
RUN npm run build -- --configuration production

# ---- Production Stage ----
FROM nginx:alpine

# Supprimer la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/

# Copier le build Angular vers Nginx
COPY --from=build /app/dist/projet /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
