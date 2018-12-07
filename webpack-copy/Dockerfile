FROM node:10.9.0-alpine

WORKDIR /app

COPY ./files /app
RUN mkdir src && mkdir dist && npm install

CMD ["npx", "webpack"]
