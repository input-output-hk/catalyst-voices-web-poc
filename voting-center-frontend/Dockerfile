# FROM node:alpine as builder
# WORKDIR /frontend
# COPY ./package.json /frontend
# RUN npm install
# COPY . .
# CMD [ "npm", "run", "start" ]


FROM node:14-alpine AS builder
ENV NODE_ENV production

# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN npm install --production
# Copy app files
COPY . .
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]


# FROM node:13 as build
# WORKDIR /app
# COPY . ./
# RUN npm install --production
# RUN npm run build

# FROM nginx:1.19.0
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]