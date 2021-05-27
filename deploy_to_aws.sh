#!/bin/bash
 
echo 'Starting to Deploy...'
ssh ec2-user@18.221.73.93 "docker image prune -f 
        cd web3hub 
        docker-compose down
        git fetch fork
        git reset --hard fork/dockerization  &&  echo 'You are doing well'
        docker-compose build && docker-compose up -d
        "
echo 'Deployment completed successfully'
