# Build stage
FROM node:20 AS build
WORKDIR /app

# Install dependencies and build
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

# Expose port and run Nginx
EXPOSE 5173
CMD ["yarn", "dev"]
