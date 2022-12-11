# Choose base image
FROM python:3.10

# Set the working directory to /app
WORKDIR /app

# Update the package list and install dependencies for apt-get
RUN apt-get update

# These Packages are required for OpenCV
RUN apt-get install ffmpeg libsm6 libxext6  -y 

# Install Python Dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt 

COPY ./ /app/

# Run the application
CMD ["gunicorn", "-c", "python:config", "wsgi:app"]