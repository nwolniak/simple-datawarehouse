#!/bin/bash

SCRIPT_PATH="$(cd "$(dirname "$0")" && pwd)"

source "$SCRIPT_PATH"/check-commands.sh
source "$SCRIPT_PATH"/check-version.sh

checkCommands docker docker-compose
checkVersion docker 27.0.0
checkVersion docker-compose 2.28.1

DOCKER_COMPOSE="$SCRIPT_PATH/../docker-compose.yaml"

if [[ ! -f "$DOCKER_COMPOSE" ]]; then
  echo "No $DOCKER_COMPOSE file found!"
  exit 1
fi

docker-compose -f "$DOCKER_COMPOSE" up -d --build

echo "SimpleDatawarehouse is available at http://localhost:80"