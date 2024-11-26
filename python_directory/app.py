from flask import Flask
from flask_cors import CORS
from routes.generate import generate_bp
from routes.create_exercise import create_exercise_bp
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
generate_bp.tokenizer = tokenizer
generate_bp.model = model

create_exercise_bp.tokenizer = tokenizer  # Pass the tokenizer to the new blueprint
create_exercise_bp.model = model          # Pass the model to the new blueprint

# Register blueprints for routes
app.register_blueprint(generate_bp)
app.register_blueprint(create_exercise_bp)  # Register the new blueprint

if __name__ == "__main__":
    app.run(debug=True)
