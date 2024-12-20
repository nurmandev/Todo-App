# Step 1: Use an official Node.js runtime as the base image
FROM node:16

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json 
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application code into the container
COPY . .

# Step 7: Compile TypeScript code into JavaScript
RUN npm run build

# Step 8: Expose the port that the app runs on
EXPOSE 8000

# Step 9: Command to run the app (use the compiled JavaScript entry point)
CMD ["node", "dist/index.js"]
