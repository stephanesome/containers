FROM node:18-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . .
RUN npm run build --prod

FROM nginx:1.20-alpine AS image
COPY --from=build /app/dist/book-store /usr/share/nginx/html
EXPOSE 80
# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
