FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENV PORT=5173

CMD ["npm", "run", "dev"]
