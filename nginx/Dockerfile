FROM node:22-alpine AS frontend-build
WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend/ .
RUN npm run build


FROM nginx:stable-alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/build /usr/share/nginx/html