FROM navikt/node-express:14-alpine
USER root
USER apprunner

ADD ./ /var/server/

CMD ["yarn", "start"]