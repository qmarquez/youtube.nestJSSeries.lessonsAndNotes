# Startup dev project

## Project dependecies

- docker and docker-compose
- node and npm

## Install global dependecies

```sh
$ npm -g install ts-node @nestjs/cli
```

## Config the environment and up

run:
```sh
$ cp ./.env.dist ./.env && cp ./orm.config.json.dist ./orm.config.json
```

Fill newest created .env and orm.config.json files and run

```sh 
$ docker-compose up -d
$ npm run migrations:run
```