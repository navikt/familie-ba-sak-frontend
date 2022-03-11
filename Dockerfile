FROM navikt/node-express:14-alpine
USER root
RUN apk --no-cache add curl
USER apprunner

ADD ./ /var/server/

CMD ["yarn", "start"]