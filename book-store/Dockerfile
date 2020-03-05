FROM node

WORKDIR /book_store/server

COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json
RUN npm install

EXPOSE 80

COPY . .