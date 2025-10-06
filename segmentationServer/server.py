"""
Single Flask API for Audio Source Separation
Runs on your server with the model loaded directly
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import tempfile
import uuid
from werkzeug.utils import secure_filename
import logging
from datetime import datetime
import json
from dotenv import load_dotenv
from torchaudio.pipelines import HDEMUCS_HIGH_MUSDB_PLUS
import torch
import torchaudio

# Load environment variables from .env file
load_dotenv()


# Load your custom HDEMUCS model
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model = None

# =============================================================================
# CONFIGURATION - CHANGE THESE BASED ON YOUR SETUP
# =============================================================================

# For SERVER deployment:
# - Set MODEL_PATH to your actual model file path
# - Set UPLOAD_FOLDER to a persistent directory
# - Set MAX_FILE_SIZE based on your server's capabilities
# - Uncomment and configure your actual model loading code

# For LOCAL development:
# - Use smaller file sizes for testing
# - Use temporary directories
# - Enable debug mode

# Model Configuration
MODEL_PATH = os.getenv('MODEL_PATH', '/hdemucs_model.pt')  # CHANGE: Path to your model file
DEVICE = 'cuda' if os.getenv('USE_GPU', 'true').lower() == 'true' else 'cpu'  # CHANGE: Set to 'cpu' if no GPU

# File Configuration
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB - CHANGE: Adjust based on your server capacity
ALLOWED_EXTENSIONS = {'wav', 'mp3'}

# For SERVER: Use persistent directory like '/var/uploads' or '/app/uploads'
# For LOCAL: Use temporary directory
#UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')  # CHANGE: Set to persistent path on server
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# =============================================================================
# MODEL LOADING - REPLACE WITH YOUR ACTUAL MODEL
# =============================================================================

# TODO: Replace this section with your actual model loading code
# Example for PyTorch models:
"""
import torch
import torchaudio
import your_model_module  # Import your actual model

def load_model():
    global model
    try:
        # Load your actual source separation model
        model = bundle.get_model()
        model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
        model.to(DEVICE)
        model.eval()
        logger.info(f"Model loaded successfully on {DEVICE}")
        return True
    except Exception as e:
        logger.error(f"Failed to load model: {str(e)}")
        return False
"""

# Placeholder model for demonstration
model = None

def load_model():
    """Load your custom HDEMUCS model from file"""
    global model
    try:
        # Load the custom HDEMUCS model
        model_path = os.path.join(os.path.dirname(__file__), MODEL_PATH)
        logger.info(f"Loading model from: {model_path}")
        
        # Load the model state dict
        model_state = torch.load(model_path, map_location=device)
        
        # Create the HDEMUCS model architecture
        from torchaudio.models import HDEMUCS
        model = HDEMUCS(sources=['drums', 'bass', 'other', 'vocals'])
        
        # Load the state dict
        model.load_state_dict(model_state)
        model.to(device)
        model.eval()
        
        logger.info(f"Model loaded successfully on {device}")
        return True
    except Exception as e:
        logger.error(f"Failed to load model: {str(e)}")
        return False

# =============================================================================
# FLASK APP SETUP
# =============================================================================

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# For SERVER: Set max content length
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_audio_file(file):
    """Validate uploaded audio file"""
    if not file or file.filename == '':
        return False, "No file selected"
    
    if not allowed_file(file.filename):
        return False, f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
    
    # Check file size
    file.seek(0, os.SEEK_END)
    file_size = file.tell()
    file.seek(0)  # Reset file pointer
    
    if file_size > MAX_FILE_SIZE:
        return False, f"File too large. Maximum size: {MAX_FILE_SIZE // (1024*1024)}MB"
    
    return True, "Valid file"

def separate_sources(audio_path, output_dir, request_id):
    """
    Run source separation on the audio file using the loaded HDEMUCS model
    """
    try:
        logger.info(f"Processing audio: {audio_path}")
        
        # Load audio file
        waveform, sample_rate = torchaudio.load(audio_path)
        
        # Ensure audio is in the right format for HDEMUCS
        if waveform.dim() == 1:
            waveform = waveform.unsqueeze(0)  # Add batch dimension
        if waveform.dim() == 2 and waveform.shape[0] > 1:
            waveform = waveform.mean(dim=0, keepdim=True)  # Convert to mono
        
        # Move to device
        waveform = waveform.to(device)
        
        # Run model inference
        with torch.no_grad():
            separated_sources = model(waveform)
        
        # Save each separated source
        segments = []
        source_names = ['drums', 'bass', 'other', 'vocals']  # HDEMUCS output order
        
        for i, source_name in enumerate(source_names):
            output_filename = f"{request_id}_{source_name}.wav"
            output_path = os.path.join(output_dir, output_filename)
            
            # Save separated audio
            torchaudio.save(output_path, separated_sources[i].cpu(), sample_rate)
            
            segments.append({
                'name': source_name,
                'filename': output_filename,
                'duration': len(separated_sources[i][0]) / sample_rate,
                'sample_rate': sample_rate
            })
        
        return {
            'success': True,
            'segments': segments,
            'processing_time': 0.0
        }
        
    except Exception as e:
        logger.error(f"Error in source separation: {str(e)}")
        return {
            'success': False,
            'error': str(e)
        }

# =============================================================================
# API ENDPOINTS
# =============================================================================

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'service': 'audio-segmentation-api',
        'device': DEVICE,
        'model_loaded': model is not None,
        'upload_folder': UPLOAD_FOLDER
    })

@app.route('/segment', methods=['POST'])
def segment_audio():
    """
    Main endpoint for audio source separation
    Accepts audio file and returns segmented sources
    """
    try:
        # Check if file is present in request
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400
        
        file = request.files['audio']
        
        # Validate file
        is_valid, message = validate_audio_file(file)
        if not is_valid:
            return jsonify({'error': message}), 400
        
        # Generate unique request ID
        request_id = str(uuid.uuid4())
        logger.info(f"Processing audio segmentation request: {request_id}")
        
        # Save uploaded file temporarily
        filename = secure_filename(file.filename)
        temp_filename = f"{request_id}_{filename}"
        temp_path = os.path.join(UPLOAD_FOLDER, temp_filename)
        file.save(temp_path)
        
        try:
            # Run source separation
            result = separate_sources(temp_path, UPLOAD_FOLDER, request_id)
            
            if result['success']:
                # Create download URLs
                download_urls = []
                for segment in result['segments']:
                    download_urls.append(f"/download/{request_id}/{segment['name']}")
                
                return jsonify({
                    'request_id': request_id,
                    'status': 'success',
                    'message': 'Audio successfully segmented',
                    'segments': result['segments'],
                    'download_urls': download_urls,
                    'processing_time': result.get('processing_time', 0.0)
                })
            else:
                return jsonify({
                    'request_id': request_id,
                    'status': 'error',
                    'message': result['error']
                }), 500
                
        finally:
            # Clean up temporary file
            if os.path.exists(temp_path):
                os.remove(temp_path)
    
    except Exception as e:
        logger.error(f"Error processing audio segmentation: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': f'Internal server error: {str(e)}'
        }), 500

@app.route('/download/<request_id>/<segment_name>', methods=['GET'])
def download_segment(request_id, segment_name):
    """Download a specific segmented audio file"""
    try:
        filename = f"{request_id}_{segment_name}.wav"
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        
        if os.path.exists(file_path):
            return send_file(file_path, as_attachment=True, download_name=filename)
        else:
            return jsonify({'error': 'File not found'}), 404
            
    except Exception as e:
        logger.error(f"Error downloading file: {str(e)}")
        return jsonify({'error': 'Download failed'}), 500


# =============================================================================
# ERROR HANDLERS
# =============================================================================

@app.errorhandler(413)
def too_large(e):
    return jsonify({'error': 'File too large'}), 413

@app.errorhandler(400)
def bad_request(e):
    return jsonify({'error': 'Bad request'}), 400

# =============================================================================
# MAIN EXECUTION
# =============================================================================

if __name__ == '__main__':
    # Load model on startup
    logger.info("Starting audio segmentation API...")
    
    if load_model():
        logger.info("Model loaded successfully")
        
        # For SERVER deployment:
        # - Use production WSGI server like Gunicorn
        # - Set host='0.0.0.0' to accept external connections
        # - Set debug=False for production
        
        # For LOCAL development:
        # - Use Flask's built-in server
        # - Set debug=True for development
        # - Use host='127.0.0.1' for local only
        
        # CHANGE: Set these based on your deployment
        HOST = os.getenv('HOST', '0.0.0.0')  # CHANGE: '127.0.0.1' for local, '0.0.0.0' for server
        PORT = int(os.getenv('PORT', 5000))  # CHANGE: Set your desired port
        DEBUG = os.getenv('DEBUG', 'false').lower() == 'true'  # CHANGE: 'true' for local, 'false' for server
        
        logger.info(f"Starting server on {HOST}:{PORT} (debug={DEBUG})")
        app.run(debug=DEBUG, host=HOST, port=PORT)
    else:
        logger.error("Failed to load model. Exiting.")
        exit(1)

# =============================================================================
# DEPLOYMENT NOTES
# =============================================================================

"""
FOR SERVER DEPLOYMENT:

1. Install dependencies:
   pip install flask flask-cors torch torchaudio

2. Set environment variables:
   export MODEL_PATH="/path/to/your/model.pth"
   export UPLOAD_FOLDER="/var/uploads"
   export USE_GPU="true"
   export HOST="0.0.0.0"
   export PORT="5000"
   export DEBUG="false"

3. Run with production server:
   gunicorn -w 4 -b 0.0.0.0:5000 server:app

FOR LOCAL DEVELOPMENT:

1. Install dependencies:
   pip install flask flask-cors

2. Set environment variables:
   export DEBUG="true"
   export HOST="127.0.0.1"

3. Run directly:
   python server.py

CHANGES NEEDED FOR YOUR MODEL:

1. Replace the load_model() function with your actual model loading
2. Replace the separate_sources() function with your actual model inference
3. Update source_names to match your model's outputs
4. Set the correct MODEL_PATH
5. Add any required imports for your model
"""