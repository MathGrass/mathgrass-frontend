FROM node:18 as build
COPY . .
RUN yarn install
# yarn run build doesn't work for what ever reason, as it exceeds the memory limit
RUN yarn workspace @mathgrass/glsp-frontend run build && yarn workspace @mathgrass/frontend run build

FROM nginx
COPY --from=build mathgrass-frontend/dist /usr/share/nginx/html