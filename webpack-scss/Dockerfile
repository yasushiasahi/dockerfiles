FROM node:10.14.1-alpine

WORKDIR /app

COPY ./files /app
RUN mkdir src && mkdir dist && npm install

CMD ["./cmd.sh"]
