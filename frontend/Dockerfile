FROM node:14.15.1 as test

########BUILD########
FROM node:14.15.1 as build
RUN mkdir -p /var/src/app/frontend
WORKDIR /var/src/app/frontend
COPY . /var/src/app/frontend
RUN npm ci
RUN node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --configuration=production --localize 
RUN node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng run frontend:server:production --localize 

########PRODUCTION########
FROM node:14.15.1 as prod
COPY --from=build /var/src/app/frontend/dist /var/src/app/frontend/dist
WORKDIR /var/src/app/frontend
EXPOSE 4200
CMD ["node", "dist/frontend/server/en/main.js"]