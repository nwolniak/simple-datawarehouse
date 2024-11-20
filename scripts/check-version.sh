#!/bin/bash

function checkVersion() {
  COMMAND=$1
  MIN_VERSION=$2

  CURRENT_VERSION=$("$COMMAND" --version | grep -oE "[0-9]+\.[0-9]+\.[0-9]+" | head -n 1)

  if [ -z "$CURRENT_VERSION" ]; then
    echo "🙁 version of $COMMAND can not be determined"
  fi

  LOWER_VERSION=$(printf "%s\n%s" "$MIN_VERSION" "$CURRENT_VERSION" | sort -V | head -n 1)

  if [ "$LOWER_VERSION" == "$MIN_VERSION" ]; then
    echo "🙂 $COMMAND version $CURRENT_VERSION is compatible with minimum required version $MIN_VERSION"
  else
    echo "🙁 $COMMAND version $CURRENT_VERSION is below minimum required version $MIN_VERSION"
    echo "Please update $COMMAND to minimum required version $MIN_VERSION"
    exit 1
  fi
}