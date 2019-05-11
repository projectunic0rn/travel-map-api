FROM node:8

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]