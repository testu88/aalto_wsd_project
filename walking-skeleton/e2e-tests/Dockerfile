FROM mcr.microsoft.com/playwright:v1.54.2-jammy

WORKDIR /app

COPY package*.json .
COPY *config.js .

RUN npm install


COPY . .

CMD ["npx", "playwright", "test"]
