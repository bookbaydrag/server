FROM node:lts-alpine
EXPOSE 8000
COPY .npmrc /root/
WORKDIR /app
ADD package.json /app/
RUN npm --quiet install
COPY . /app
RUN npm run build
CMD [ "node", "./build/server.js" ]