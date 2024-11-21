from flask import Blueprint, request, jsonify
from services.llama_model import generate_response

# Create a Blueprint for the "generate" route.
# A Blueprint is a modular way to define routes and handlers, making the code more organized.
generate_bp = Blueprint("generate", __name__)


# Define a route for handling POST requests to "/generate".
@generate_bp.route("/generate", methods=["POST"])
def generate():
    """Handle the POST request to generate a response."""
    # Access the tokenizer and model from the blueprint's attributes
    tokenizer = generate_bp.tokenizer
    model = generate_bp.model

    # Extract JSON data from the incoming request.
    data = request.json 
    # Get the "prompt" field from the request data. If it doesn't exist, use nothing.
    prompt = data.get("prompt", "")
    # Check if the prompt is missing.
    if not prompt:
        # Return a 400 Bad Request response with an error message if no prompt is provided.
        return jsonify({"error": "No prompt provided"}), 400
    
    # Generate a response using the provided prompt, tokenizer, and model.
    response = generate_response(prompt, tokenizer, model)
    # Return the generated response as a JSON object.
    return jsonify({"response": response})