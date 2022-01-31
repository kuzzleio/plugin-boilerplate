#!/bin/bash

npm run test:functional

ret=$?

if [ "$ret" -ne "0" ]; then
  docker-compose logs
fi

exit $ret
