# First stage: Build the application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project to the container
COPY . .

# Build the TypeScript project
RUN npm run build

# Second stage: Create a lightweight runtime image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json /app/

# Expose the application's port
EXPOSE 3002

# Command to run the application
CMD ["node", "src/index.js"]
