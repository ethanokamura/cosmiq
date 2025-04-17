# Use node version 22
FROM node:23.11.0-slim

# Set the working directory to /server/node
WORKDIR /server/node

# Copy the package.json and package-lock.json from the context (the root folder)
COPY ./node/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the app files from the root 'server' directory into the container
COPY ./node /server/node

# Set environment variables (e.g., for the Node server)
ENV PORT=8080

# Expose the port so that the app can be accessed
EXPOSE 8080

# Command to run the app
CMD ["npm", "start"]
