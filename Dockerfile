# Use an official node runtime as a parent image
FROM node:12

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list
RUN apt-get update && apt-get install --no-install-recommends -y google-chrome-stable

WORKDIR /app/foodcare-web

# Install dependencies
RUN npm install -g @angular/cli

COPY . /app/foodcare-web
RUN npm install

EXPOSE 4200

CMD ng serve --host 0.0.0.0 --port 4200
