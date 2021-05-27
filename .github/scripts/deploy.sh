#!/bin/bash
 
echo 'Starting to Deploy...'
ssh ec2-user@18.221.73.93 "docker image prune -f 
        cd web3hub 
        docker-compose down
        docker container rm $(docker container ls -a)
        git fetch origin
        git reset --hard origin/main  &&  echo 'So fresh so far'
        docker-compose build && docker-compose up -d
        "
echo 'Deployment completed successfully'
