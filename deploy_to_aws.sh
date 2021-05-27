#!/bin/bash
 
echo 'Starting to Deploy...'
ssh ec2-user@18.221.73.93 " sudo docker image prune -f 
        cd web3hub 
        sudo docker-compose down
        git fetch origin
        git reset --hard origin/dockerization  &&  echo 'You are doing well'
        sudo docker-compose build && sudo docker-compose up -d
        "
echo 'Deployment completed successfully'
