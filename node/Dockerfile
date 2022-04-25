FROM node

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 3002

# CMD ["pm2","start", "index.js", "--watch"]
CMD [ "pm2-runtime","index.js" ]
