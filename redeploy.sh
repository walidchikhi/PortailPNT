#!/bin/bash

# Define variables
IMAGE_NAME="dem"
CONTAINER_NAME="dem" # Keeping the container name consistent with what was running, or we can use 'dem'
# The user mentioned "it is not pnt-hub but dem", likely referring to the image or the desired name. 
# Let's use 'dem' for the container name to be safe and consistent with the image.
CONTAINER_NAME="dem"
PORT="80"

echo "Starting redeployment process..."

# 1. Build the Docker image
echo "Building Docker image: $IMAGE_NAME..."
docker build -t $IMAGE_NAME .

if [ $? -ne 0 ]; then
    echo "Error: Docker build failed."
    exit 1
fi

# 2. Stop and remove existing containers (check for both possible names)
echo "Checking for existing containers..."

if [ "$(docker ps -aq -f name=^/${CONTAINER_NAME}$)" ]; then
    echo "Stopping and removing container: $CONTAINER_NAME"
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Also check for the old name just in case
OLD_CONTAINER_NAME="pnt-hub"
if [ "$(docker ps -aq -f name=^/${OLD_CONTAINER_NAME}$)" ]; then
    echo "Stopping and removing container: $OLD_CONTAINER_NAME"
    docker stop $OLD_CONTAINER_NAME
    docker rm $OLD_CONTAINER_NAME
fi

# 3. Run the new container
echo "Starting new container: $CONTAINER_NAME on port $PORT..."
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p $PORT:4173 \
  $IMAGE_NAME

if [ $? -eq 0 ]; then
    echo "Deployment successful!"
    docker ps | grep $CONTAINER_NAME
else
    echo "Error: Failed to start container."
    exit 1
fi
