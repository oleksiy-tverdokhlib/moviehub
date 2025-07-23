FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
ARG API_URL
ENV VITE_MOVIES_BASE_API_URL=$API_URL
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
