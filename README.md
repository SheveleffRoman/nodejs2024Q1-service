# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install](https://docs.docker.com/engine/install/)

## Downloading

```
git clone https://github.com/SheveleffRoman/nodejs2024Q1-service
```

## Switch branch

```
git checkout develop_sprint_2
```

## ENV

```
rename .env.example to .env
```

## Docker

You can start docker containers in 3 ways:
- **from Docker Hub (Main option according to assignment)**
- local prod mode (minimal app size)
- local dev mode (images equal to hub)

### Docker Hub

run command in terminal

```
docker compose --env-file .env -f docker-compose.hub.yml up -d
```
or download Docker extension for VS CODE and right click on **docker-compose.hub.yml** file and `Compose Up`

You can open localhost:${PORT} and change app.service.ts file to see how dev mode works.

Also you can run `npx prisma studio` to see GUI DB

If you want to change ports - change .env file variables and re-compose container

Prisma migrate already done, but if something went wrong, you can do this manually by command `npx prisma migrate dev`

### Prod mode

run command in terminal

```
docker compose --env-file .env -f docker-compose.prod.yml up -d
```
or download Docker extension for VS CODE and right click on docker-compose.prod.yml file and `Compose Up`

### Dev mode

run command in terminal

```
docker compose --env-file .env -f docker-compose.dev.yml up -d
```
or download Docker extension for VS CODE and right click on docker-compose.dev.yml file and `Compose Up`

You can open localhost:${PORT} and change app.service.ts file to see how dev mode works

### Start/stop docker containers

```
docker compose -f docker-compose.${hub/prod/dev}.yml start
```

```
docker compose -f docker-compose.${hub/prod/dev}.yml stop
```

or manage all processes in Docker desktop


## Testing

After containers running  enter:

```
npm run test
```