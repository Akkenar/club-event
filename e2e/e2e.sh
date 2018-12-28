#!/usr/bin/env bash

# Install the composer dependencies before starting the tests
docker-compose \
  -f docker-compose.composer.yml \
  up composer

# Starts the e2e container with just the logs for this container.
# The php and db container are implicitly launched and killed when
# the e2e container starts respectively stops.
docker-compose \
  -f docker-compose.yml \
  up \
  --exit-code-from e2e \
  --abort-on-container-exit
