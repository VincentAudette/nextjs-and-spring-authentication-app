#!/bin/sh

if [ "$#" -ne 4 ]; then
  echo "Usage: must specify the id as an argument"
  exit 1
fi
curl http://localhost:8080/api/user/$1
