from flask import Blueprint, request, jsonify
from services.llama_model import generate_response

# Create a Blueprint for the "create-exercise" route.
create_exercise_bp = Blueprint("create_exercise", __name__)

# Define a route for handling POST requests to "/create-exercise".
@create_exercise_bp.route("/create-exercise", methods=["POST"])
def create_exercise():
    """Handle the POST request to create an exercise."""
    # Access the tokenizer and model from the blueprint's attributes.
    tokenizer = create_exercise_bp.tokenizer
    model = create_exercise_bp.model

    # Extract JSON data from the incoming request.
    data = request.json 
    # Get the "prompt" field from the request data.
    prompt = data.get("prompt", "")
    # Check if the prompt is missing.
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400
    
    # Log the incoming request for debugging (optional).
    print(f"Received prompt: {prompt}")
    
    # Generate a response using the provided prompt.
    max_length=200
    response = generate_response(prompt, tokenizer, model, max_length)

    print(f"Returning exercise: {response}")
    
    # Return exercise as JSON
    exercise = {"prompt": prompt, "response": response}
    return jsonify(exercise)

