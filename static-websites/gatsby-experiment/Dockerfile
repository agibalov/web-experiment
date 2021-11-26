FROM node:14.18.1 as builder
COPY . /website
WORKDIR /website
RUN npm install && npm run-script build
RUN ls

FROM nginx:1.20.2
COPY --from=builder /website/public /usr/share/nginx/html
