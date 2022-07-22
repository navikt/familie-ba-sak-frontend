FROM navikt/node-express:16
USER root
RUN apk --no-cache add curl
USER apprunner

ADD ./ /var/server/

CMD ["yarn", "start"]