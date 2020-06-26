FROM node:12.18.1-alpine3.11 AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

#RUN ng build
RUN npm run build

FROM nginx:1.19.0-alpine AS server
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/ejemplo-angular /usr/share/nginx/html