# Use the official Node.js image as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the default Angular development server port
EXPOSE 4200

# Expose port for debugging (optional, for example, if you want to use Chrome DevTools)
EXPOSE 9229

# Start the Angular application in development mode
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
