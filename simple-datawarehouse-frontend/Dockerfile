FROM node:20-alpine AS build

WORKDIR /simple-datawarehouse-frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /simple-datawarehouse-frontend/dist/simple-datawarehouse-frontend/browser /simple-datawarehouse-frontend
