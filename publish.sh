#! /bin/bash

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 879735756347.dkr.ecr.us-west-2.amazonaws.com
docker build -t bbd-server .
docker tag bbd-server:latest 879735756347.dkr.ecr.us-west-2.amazonaws.com/bbd-server:latest
docker push 879735756347.dkr.ecr.us-west-2.amazonaws.com/bbd-server:latest
aws ecs update-service --cluster bbd-cluster --service bbd-server --force-new-deployment > /dev/null