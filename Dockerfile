# Use an official node runtime as a parent image
FROM node:12

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && apt-get install -yq google-chrome-stable

WORKDIR /foodcare-web

ENV PATH /foodcare-web/node_modules/.bin:$PATH

# Install dependencies
COPY package.json /foodcare-web/
RUN npm install -g npm
RUN npm install

EXPOSE 4200
