# Author: Vishal B
# pull official base image
FROM node:16.14.0-alpine3.14 as build

#working directory of containerized app

WORKDIR /app

#copy the react app to the container

COPY . /app/

#prepare the container for building react

RUN npm install

# RUN npm install react-search-field --save

RUN npm run build

#prepare nginx

FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html 

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

#fire for nginx

EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]
