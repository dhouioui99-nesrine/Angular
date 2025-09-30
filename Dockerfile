# Étape 1 : Build Angular
FROM node:18 AS build

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Build Angular en mode production
RUN npm run build -- --configuration production

# Étape 2 : Nginx pour servir l’app Angular
FROM nginx:alpine

# Supprimer la config par défaut et mettre la nôtre
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Copier les fichiers buildés dans nginx
COPY --from=build /app/dist/<Projet> /usr/share/nginx/html

# Exposer le port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
