#!/usr/bin/env bash

docker-compose \
  -f docker-compose.yml \
  up \
  --exit-code-from e2e \
  --abort-on-container-exit
