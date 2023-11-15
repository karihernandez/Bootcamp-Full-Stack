FROM node:21-alpine

WORKDIR /app

COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
RUN npm install --production-only

COPY ./ /app

CMD ["npm", "start"]