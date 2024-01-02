FROM busybox:1.36.1-uclibc as busybox

FROM gcr.io/distroless/nodejs:18
USER root
USER apprunner

WORKDIR /var/server

COPY assets ./assets
COPY node_dist ./node_dist
COPY frontend_production ./frontend_production

# Må kopiere package.json og node_modules for at backend skal fungere. Backend henter avhengigheter runtime fra node_modules, og package.json trengs for at 'import' statements skal fungere.
COPY node_modules ./node_modules
COPY package.json .

CMD ["--es-module-specifier-resolution=node", "node_dist/backend/server.js"]

COPY --from=busybox /bin/sh /bin/sh
COPY --from=busybox /bin/printenv /bin/printenv