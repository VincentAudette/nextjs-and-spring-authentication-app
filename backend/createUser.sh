#!/bin/sh

if [ "$#" -ne 4 ]; then
  echo "Usage: must specify username, password, salt and role"
  exit 1
fi
curl --location --request POST 'http://localhost:8080/api/user/v2' \
--form "username=$1" \
--form "password=$2" \
--form "salt=$3" \
--form "role=$4" \
