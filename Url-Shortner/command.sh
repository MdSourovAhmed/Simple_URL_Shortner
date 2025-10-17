#!/bin/bash

#build the image
docker build -t url-shortner .

#run the container
docker run -d -p 3000:3000 -it url-shortner

