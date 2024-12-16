FROM node:18 as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

ARG VITE_HOST="localhost:3000"
ENV VITE_HOST=$VITE_HOST

RUN npm run build

FROM scratch
COPY --from=build /app/dist /dist
