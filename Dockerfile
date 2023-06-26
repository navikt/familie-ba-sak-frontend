FROM ghcr.io/navikt/baseimages/node-express:16-alpine
USER root
USER apprunner

ADD ./ /var/server/

CMD ["yarn", "start"]