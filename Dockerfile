# ---- Base ----
FROM node:12 as node

COPY . .

RUN yarn
RUN yarn build

# ---- Web server ----
FROM nginx:1.20 as nginx

COPY --from=node ./build /usr/share/nginx/html
COPY --from=node ./.docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]