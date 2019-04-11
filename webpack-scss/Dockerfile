FROM node:11.13.0-alpine

WORKDIR /app

COPY ./files /app

RUN apk update --no-cache && mkdir src && mkdir dist && npm install

CMD ["./cmd.sh"]
