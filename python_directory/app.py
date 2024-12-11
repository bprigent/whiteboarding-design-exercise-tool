# Import necessary libraries
from flask import Flask  # Import Flask to create the web application
from flask_cors import CORS  # Import CORS to handle Cross-Origin Resource Sharing

# Import route blueprints for handling different functionalities
from routes.create_exercise import create_exercise_bp  # Blueprint for creating exercises
from routes.answer_chat import chat_bp  # Blueprint for handling chat responses

# Import the function to load the model and tokenizer
# from services.llama_model import load_model  # Function to load the language model and tokenizer
from services.model_loader import load_model  # Function to load the language model and tokenizer

# Import model paths configuration
from config.config import logger, MODEL_PATH, MODEL_PATH_2, MODEL_PATH_3, MODEL_PATH_4

########################################
# Initialize Flask app
app = Flask(__name__)  # Create an instance of the Flask application

# Enable CORS (Cross-Origin Resource Sharing) for the app
CORS(app)  # Allow requests from different domains (e.g., frontend hosted on a different domain)

# Log the initialization of the Flask app
logger.info("Flask app initialized and CORS enabled.")

########################################
# Load the model and tokenizer before the app starts handling requests
logger.info("Initializing model...")
try:
    tokenizer, model = load_model(MODEL_PATH_4)
    logger.info("Model initialized successfully.")
except Exception as e:
    logger.error(f"Error initializing model: {e}")
    raise e  # Re-raise the exception to halt the application if model loading fails

########################################
# Pass the model and tokenizer to the blueprints
logger.info("Attaching model and tokenizer to blueprints...")
create_exercise_bp.tokenizer = tokenizer
create_exercise_bp.model = model
chat_bp.tokenizer = tokenizer
chat_bp.model = model
logger.info("Model and tokenizer attached to blueprints successfully.")

########################################
# Register blueprints for routes
logger.info("Registering blueprints...")
app.register_blueprint(create_exercise_bp)
logger.info("create_exercise_bp blueprint registered.")
app.register_blueprint(chat_bp)
logger.info("chat_bp blueprint registered.")

########################################
# Start the Flask development server
if __name__ == "__main__":
    logger.info("Starting Flask application in debug mode...")
    app.run(debug=True)