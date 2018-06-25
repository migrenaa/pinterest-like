FROM node:8.9.4

EXPOSE 4000
# EXPOSE 7054
COPY . /app
WORKDIR /app

RUN cd /app; npm install
CMD ["npm", "run", "start"]


