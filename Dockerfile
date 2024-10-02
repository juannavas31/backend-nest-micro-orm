FROM node:20-alpine3.19 AS builder

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install app dependencies in 'clean install' (ci) mode
RUN npm ci && npm cache clean --force

# Bundle app source
COPY . .

# Run the build command which creates the production bundle
RUN npm run build

# Start the server using the production build
CMD [ "npm", "start" ]

EXPOSE 3000

