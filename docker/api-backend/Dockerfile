FROM node:alpine

WORKDIR /home/node
USER node
COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node build/dist ./dist
EXPOSE 80
CMD [ "node", "dist/index.js" ]
