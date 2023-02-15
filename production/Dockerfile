# Production image
FROM node:18.13.0 AS builder

COPY ../package*.json ./
RUN npm install

COPY ./../tsconfig.json ./
COPY ./../tsconfig.node.json ./
COPY ./../vite.config.ts ./
COPY ./../src ./src
COPY ./../index.html ./
COPY ./.env ./.env

RUN npm run build
# ./dist is the output folder

FROM node:18.13.0-bullseye-slim

COPY ../package.json ./
RUN npm install

COPY ./../vite.config.ts ./
COPY --from=builder ./dist/ ./dist/

CMD ["npm", "run" , "preview"]