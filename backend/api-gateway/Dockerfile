FROM node:22.18.0-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY tsconfig.json ./

COPY src ./src

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]
