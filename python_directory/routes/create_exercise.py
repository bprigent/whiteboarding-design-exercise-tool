from flask import Blueprint, request, jsonify, Response, stream_with_context
from services.llama_model import generate_response_stream

# Create a Blueprint for "create-exercise" route
create_exercise_bp = Blueprint("create_exercise", __name__)

# Pre-tokenized prompt cache (initialize during app startup)
pre_tokenized_prompt = None

# Define a route for handling POST requests to "/create-exercise".
@create_exercise_bp.route("/create-exercise", methods=["POST"])
def create_exercise():
    """Handle the POST request to create an exercise."""
    # Access the tokenizer and model from the blueprint's attributes.
    tokenizer = create_exercise_bp.tokenizer
    model = create_exercise_bp.model

    # Extract JSON data from the incoming request.
    data = request.json 
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    # Use the pre-tokenized prompt if available
    global pre_tokenized_prompt
    if pre_tokenized_prompt is None:
        pre_tokenized_prompt = tokenizer(prompt, return_tensors="pt")

    # Generate a response using the pre-tokenized prompt
    max_length = 200
    # Streaming function
    def stream():
        for token in generate_response_stream(None, tokenizer, model, max_length=max_length, pre_tokenized_input=pre_tokenized_prompt):
            yield token
    
    # Stream the response
    return Response(stream_with_context(stream()), content_type="text/plain")

