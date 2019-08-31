FROM node:10.16.0-alpine 

# Set the working directory to /client
WORKDIR /client

# copy package.json into the container at /client
COPY package*.json /client/

RUN npm install

# Copy the current directory contents into the container at /client
COPY . /client/

EXPOSE 3000

CMD ["npm","start"]