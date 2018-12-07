FROM node:10.9.0-alpine

RUN apk add --no-cache php curl

WORKDIR /app

COPY ./files /app
RUN mkdir dist && npm install

CMD ["npx", "gulp"]

EXPOSE 3000
EXPOSE 3001
