FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

# CMD ["pm2","start", "index.js", "--watch"]
CMD [ "npm","start" ]
