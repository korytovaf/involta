FROM node:16.15
WORKDIR ./
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8000

CMD ["npm", "run", "server"]
