#!/usr/bin/env bash
docker image build -t club-event .
docker run -p 3000:443 --rm club-event