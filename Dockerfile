FROM node:20.3 AS builder

WORKDIR /app
COPY package.json package.json
RUN npm install

COPY . .
RUN npm run build

# Host the build folder with nginx

FROM nginx:1.25.1
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
USER nginx
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]