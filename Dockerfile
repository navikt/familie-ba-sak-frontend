FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

WORKDIR /app

COPY dist_backend ./dist_backend
COPY dist_frontend ./dist_frontend
COPY assets ./assets

# Må kopiere package.json og node_modules for at backend skal fungere. Backend henter avhengigheter runtime fra node_modules, og package.json trengs for at 'import' statements skal fungere.
COPY node_modules ./node_modules
COPY package.json .
COPY .env .
COPY .env.preprod .
COPY .env.prod .

ENV NODE_ENV=production

CMD ["dist_backend/server.js"]