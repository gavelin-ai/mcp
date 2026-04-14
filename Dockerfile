FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY proxy.js ./

ENV GAVELIN_API_KEY=""
ENV HOME=/tmp

CMD ["node", "proxy.js"]
