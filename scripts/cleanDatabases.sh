#!/bin/bash

source check-commands.sh

checkCommands docker docker-compose

DOCKER_COMPOSE="../docker-compose.yaml"

if [[ ! -f "$DOCKER_COMPOSE" ]]; then
  echo "No $DOCKER_COMPOSE file found!"
  exit 1
fi

docker-compose -f "$DOCKER_COMPOSE" down -v postgres_ds
docker-compose -f "$DOCKER_COMPOSE" down -v postgres_dw
docker-compose -f "$DOCKER_COMPOSE" down -v mysql_ds
docker-compose -f "$DOCKER_COMPOSE" down -v mysql_dw

docker-compose -f "$DOCKER_COMPOSE" up -d --build postgres_ds
docker-compose -f "$DOCKER_COMPOSE" up -d --build postgres_dw
docker-compose -f "$DOCKER_COMPOSE" up -d --build mysql_ds
docker-compose -f "$DOCKER_COMPOSE" up -d --build mysql_dw

echo "Databases in clean state are up."