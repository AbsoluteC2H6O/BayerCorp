FROM node:carbon-alpine
RUN mkdir /
COPY app.js /
COPY package.json /
WORKDIR /
RUN npm install
EXPOSE 3000
CMD node app.js