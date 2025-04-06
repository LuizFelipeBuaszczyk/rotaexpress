FROM node:latest

WORKDIR /app

COPY . . 

RUN rm -rf node_modules
RUN npm install

# Expor porta 3000
EXPOSE 3000

CMD ["node", "index.js"]