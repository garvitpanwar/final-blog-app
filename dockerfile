# Base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the project files to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port on which the application runs
EXPOSE 3000

# Command to run the application in development mode
CMD ["npm", "run", "dev"]
