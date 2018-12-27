#!/usr/bin/env bash

# Install the composer dependencies before starting the tests
docker-compose \
  -f docker-compose.composer.yml \
  up composer

# Starts everything
docker-compose \
  -f docker-compose.yml \
  up \
  --exit-code-from e2e \
  --abort-on-container-exit
