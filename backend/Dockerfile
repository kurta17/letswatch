# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Verify that requests is installed
RUN python -c "import requests; print('requests version:', requests.__version__)"

# Copy the rest of the application code into the container
COPY . .

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=app.py

# Print installed packages for debugging
RUN pip list

# Run the application
CMD ["flask", "run", "--host=0.0.0.0"]