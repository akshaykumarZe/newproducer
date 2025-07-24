

#

# Copy package.json and package-lock.json to leverage caching


# Install Node.js dependencies


# Copy the rest of the application code
COPY . .

# Expose the application port (if required)
# EXPOSE 3000 # Uncomment if the app uses a specific port

# Set environment variables (optional, prefer .env for secrets)
# ENV NODE_ENV=production

# Specify the command to run the application

