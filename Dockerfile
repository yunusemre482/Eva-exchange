FROM  node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

RUN npm install pm2 -g
RUN pm2 install pm2-logrotate
# max log size is 1GB
RUN pm2 set pm2-logrotate:max_size 1G

# compress logs when rotated (optional)
RUN pm2 set pm2-logrotate:compress true

# force rotate every hours
RUN pm2 set pm2-logrotate:rotateInterval '0 * * * *'

CMD ["pm2-runtime", "start", "ecosystem.config.js"]