# Use an official node runtime as a parent image
FROM node:12

WORKDIR /app/foodcare-web

# Install dependencies
RUN npm install -g @angular/cli

COPY . /app/foodcare-web
RUN npm install

EXPOSE 4200

CMD ng serve --host 0.0.0.0 --port 4200
