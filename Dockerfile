# Dockerfile
FROM node:20.11.0

# Create app directory
WORKDIR /app/

# Copy package.json package-lock.json
COPY ./package*.json .

RUN ["npm", "install"]