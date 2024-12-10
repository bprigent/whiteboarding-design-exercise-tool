from flask import Blueprint, request, jsonify, Response, stream_with_context
from services.llama_model import generate_response_stream
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)  # Adjust level as needed (e.g., DEBUG, WARNING)

# Create a Blueprint for "create-exercise" route
create_exercise_bp = Blueprint("create_exercise", __name__)

# Pre-tokenized prompt cache (initialize during app startup)
pre_tokenized_prompt = None
cached_prompt = None  # Track the original prompt



# Define a route for handling POST requests to "/create-exercise".
@create_exercise_bp.route("/create-exercise", methods=["POST"])
def create_exercise():
    """Handle the POST request to create an exercise."""
    # Access the tokenizer and model from the blueprint's attributes.
    tokenizer = create_exercise_bp.tokenizer
    model = create_exercise_bp.model

    # Extract JSON data from the incoming request.
    data = request.json 
    max_output_token_length = data.get("maxOutputTokenLength", "")
    temperature = data.get("temperature", "")
    system_prompt = data.get("systemPrompt", "")
    input_context_window = data.get("inputContextWindow", "")
    if not system_prompt:
        return jsonify({"error": "No prompt provided"}), 400
    
    # Log the system prompt before tokenizing
    logging.info(f"System Prompt before sending to tokenizer:\n{system_prompt}")
    
    global cached_prompt, pre_tokenized_prompt
    # Check if the new prompt is different from the cached one
    if cached_prompt != system_prompt:
        cached_prompt = system_prompt
        pre_tokenized_prompt = tokenizer(system_prompt, return_tensors="pt")

    # Streaming function
    def stream():
        for token in generate_response_stream(None, tokenizer, model, max_length=max_output_token_length, temperature=temperature, input_context_window=input_context_window, pre_tokenized_input=pre_tokenized_prompt):
            yield token
    
    # Stream the response
    return Response(stream_with_context(stream()), content_type="text/plain")

