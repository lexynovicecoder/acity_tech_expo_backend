# Use the official Python image
FROM python:3.12.7
RUN apt-get update && apt-get install -y libgl1-mesa-glx

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Expose necessary ports
EXPOSE 10133 5000

# Start both FastAPI and Flask using supervisord
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port 5000 & python app.py"]
