#!/bin/bash

source check-commands.sh

checkCommands docker docker-compose

DOCKER_COMPOSE="../docker-compose.yaml"

if [[ ! -f "$DOCKER_COMPOSE" ]]; then
  echo "No $DOCKER_COMPOSE file found!"
  exit 1
fi

docker-compose -f "$DOCKER_COMPOSE" down -v nifi

echo "Apache NiFi instance stopped."