FROM gcr.io/distroless/nodejs20-debian12:nonroot

WORKDIR /app

COPY assets ./assets
COPY backend ./backend
COPY frontend_production ./frontend_production

# Må kopiere package.json og node_modules for at backend skal fungere. Backend henter avhengigheter runtime fra node_modules, og package.json trengs for at 'import' statements skal fungere.
COPY node_modules ./node_modules
COPY package.json .

CMD ["--import=./backend/backend/register.js", "--es-module-specifier-resolution=node", "backend/backend/server.js"]