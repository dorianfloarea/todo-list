FROM node:14 as base

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Bundle app source
COPY . .

FROM base as dev

RUN npm install

CMD [ "npm", "start" ]

FROM base as prod

RUN npm ci --only=production

CMD [ "npm", "start" ]

FROM base as test

RUN npm ci