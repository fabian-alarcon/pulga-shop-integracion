# ===============================
# Build stage
# ===============================
FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_API_URL
ARG VITE_SKIP_AUTH

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SKIP_AUTH=$VITE_SKIP_AUTH

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ===============================
# Runtime stage (NGINX)
# ===============================
FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
