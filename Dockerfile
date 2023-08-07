FROM node:18.17.0
WORKDIR  /app
# Update
RUN npm install -g npm@9.8.1
# Angular CLI
RUN npm install -g @angular/cli
# Install dependencies
COPY package.json package-lock.json ./
# Run
RUN npm ci --quiet
# CMD exec /bin/bash -c "trap : TERM INT; sleep infinity & wait"