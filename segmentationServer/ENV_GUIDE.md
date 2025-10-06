# Environment Variables Guide for Python Flask API

## How to Use .env Files in Python

### 1. **Install python-dotenv**
```bash
pip install python-dotenv
```

### 2. **Create .env File**
Create a `.env` file in your project root with your configuration:

```bash
# .env file
MODEL_PATH=/path/to/your/model.pth
USE_GPU=true
HOST=0.0.0.0
PORT=5000
DEBUG=false
UPLOAD_FOLDER=/var/uploads
MAX_FILE_SIZE=52428800
```

### 3. **Load Environment Variables in Python**
```python
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Now you can access them with os.getenv()
model_path = os.getenv('MODEL_PATH', 'default_value')
use_gpu = os.getenv('USE_GPU', 'false').lower() == 'true'
```

## Environment File Examples

### **For SERVER Deployment (.env)**
```bash
# Production settings
MODEL_PATH=/app/models/source_separation.pth
USE_GPU=true
HOST=0.0.0.0
PORT=5000
DEBUG=false
UPLOAD_FOLDER=/var/uploads
MAX_FILE_SIZE=104857600  # 100MB
```

### **For LOCAL Development (.env.local)**
```bash
# Development settings
MODEL_PATH=./models/test_model.pth
USE_GPU=false
HOST=127.0.0.1
PORT=5000
DEBUG=true
UPLOAD_FOLDER=uploads
MAX_FILE_SIZE=10485760  # 10MB
```

## Using Different Environment Files

### **Load Specific .env File**
```python
from dotenv import load_dotenv
import os

# Load specific environment file
if os.path.exists('.env.local'):
    load_dotenv('.env.local')
else:
    load_dotenv('.env')
```

### **Environment-Specific Loading**
```python
import os
from dotenv import load_dotenv

# Determine environment
env = os.getenv('ENVIRONMENT', 'development')

# Load appropriate .env file
if env == 'production':
    load_dotenv('.env.production')
elif env == 'staging':
    load_dotenv('.env.staging')
else:
    load_dotenv('.env.development')
```

## Best Practices

### **1. Never Commit .env Files**
Add to `.gitignore`:
```gitignore
.env
.env.local
.env.production
.env.staging
```

### **2. Create .env.example**
Create a template file for other developers:
```bash
# .env.example
MODEL_PATH=/path/to/your/model.pth
USE_GPU=true
HOST=0.0.0.0
PORT=5000
DEBUG=false
UPLOAD_FOLDER=/var/uploads
MAX_FILE_SIZE=52428800
```

### **3. Use Default Values**
```python
# Always provide default values
model_path = os.getenv('MODEL_PATH', './models/default.pth')
port = int(os.getenv('PORT', 5000))
debug = os.getenv('DEBUG', 'false').lower() == 'true'
```

### **4. Type Conversion**
```python
# Convert string environment variables to appropriate types
port = int(os.getenv('PORT', 5000))
max_file_size = int(os.getenv('MAX_FILE_SIZE', 52428800))
use_gpu = os.getenv('USE_GPU', 'false').lower() == 'true'
debug = os.getenv('DEBUG', 'false').lower() == 'true'
```

## Environment Variables in Your Flask API

Your `server.py` now automatically loads from `.env`:

```python
# These will be loaded from .env file
MODEL_PATH = os.getenv('MODEL_PATH', '/path/to/your/model.pth')
DEVICE = 'cuda' if os.getenv('USE_GPU', 'true').lower() == 'true' else 'cpu'
HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('PORT', 5000))
DEBUG = os.getenv('DEBUG', 'false').lower() == 'true'
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
```

## Running with Environment Variables

### **Method 1: Using .env file (automatic)**
```bash
python server.py  # Automatically loads .env
```

### **Method 2: Set environment variables directly**
```bash
export MODEL_PATH="/path/to/model.pth"
export USE_GPU="true"
export DEBUG="false"
python server.py
```

### **Method 3: Set variables inline**
```bash
MODEL_PATH="/path/to/model.pth" USE_GPU="true" python server.py
```

## Docker with Environment Files

### **Dockerfile**
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "server.py"]
```

### **docker-compose.yml**
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "5000:5000"
    env_file:
      - .env
    volumes:
      - ./models:/app/models
      - ./uploads:/app/uploads
```

## Security Notes

- **Never commit sensitive data** to .env files
- **Use different .env files** for different environments
- **Set proper file permissions** on .env files (600)
- **Use environment-specific secrets** for production

## Troubleshooting

### **Environment variables not loading?**
1. Check if `.env` file exists in the right location
2. Verify `python-dotenv` is installed
3. Make sure `load_dotenv()` is called before using `os.getenv()`

### **Default values not working?**
1. Check spelling of environment variable names
2. Verify the variable is set in your .env file
3. Make sure there are no spaces around the `=` sign

### **Type conversion errors?**
1. Use `int()` for numbers: `int(os.getenv('PORT', 5000))`
2. Use `.lower() == 'true'` for booleans
3. Handle missing values with default parameters
