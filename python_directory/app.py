from flask import Flask
from flask_cors import CORS

from routes.create_exercise import create_exercise_bp
from routes.answer_chat import chat_bp
from services.llama_model import load_model
from config.config import MODEL_PATH

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the model and tokenizer before the app starts handling requests
print("Initializing model...")
tokenizer, model = load_model(MODEL_PATH)
print("Model initialized successfully.")

# Pass the model and tokenizer to the blueprints
create_exercise_bp.tokenizer = tokenizer 
create_exercise_bp.model = model         
#
chat_bp.tokenizer = tokenizer 
chat_bp.model = model         

# Register blueprints for routes
app.register_blueprint(create_exercise_bp)
app.register_blueprint(chat_bp)

if __name__ == "__main__":
    app.run(debug=True)
