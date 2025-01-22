# Use official Node.js image as base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your application will run on (for example, 3000)
EXPOSE 3000

# Command to run your application
CMD ["npm", "run", "dev"]
