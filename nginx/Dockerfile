
# Stage 1: Build React
FROM node:18 AS react-builder
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# Stage 2: Final Nginx with React files
FROM nginx:alpine
COPY --from=react-builder /app/frontend/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf