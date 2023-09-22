FROM gcr.io/distroless/nodejs:18
USER root
USER apprunner

WORKDIR /var/server

COPY assets ./assets
COPY node_dist ./node_dist
COPY frontend_production ./frontend_production
COPY node_modules ./node_modules
COPY package.json .

CMD ["--es-module-specifier-resolution=node", "node_dist/backend/server.js"]