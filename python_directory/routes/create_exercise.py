from flask import Blueprint, request, jsonify, Response, stream_with_context
from services.response_generator import generate_response_stream
from config.config import logger, device  # Import logger and device from config

# Create a Blueprint for the "create-exercise" route
create_exercise_bp = Blueprint("create_exercise", __name__)

# Pre-tokenized prompt cache (initialize during app startup)
pre_tokenized_prompt = None
cached_prompt = None  # Track the original prompt

# Define a route for handling POST requests to "/create-exercise"
@create_exercise_bp.route("/create-exercise", methods=["POST"])
def create_exercise():
    """Handle the POST request to create an exercise."""
    
    # Access the tokenizer and model from the blueprint's attributes
    tokenizer = create_exercise_bp.tokenizer
    model = create_exercise_bp.model

    # Extract JSON data from the incoming request
    data = request.json
    max_output_token_length = data.get("maxOutputTokenLength", 50)  # Default to 50 if not provided
    temperature = data.get("temperature", 0.7)  # Default to 0.7 if not provided
    system_prompt = data.get("systemPrompt", "")
    input_context_window = data.get("inputContextWindow", 1024)  # Default context window

    # Validate if the system prompt is provided
    if not system_prompt:
        logger.error("No prompt provided in the request.")
        return jsonify({"error": "No prompt provided"}), 400
    
    # Log the received parameters
    logger.info(f"Received system prompt: {system_prompt}")
    logger.info(f"Max output token length: {max_output_token_length}")
    logger.info(f"Temperature: {temperature}")
    logger.info(f"Input context window: {input_context_window}")
    
    # Check if the new prompt is different from the cached one
    global cached_prompt, pre_tokenized_prompt
    if cached_prompt != system_prompt:
        logger.info("New system prompt detected. Tokenizing and caching the prompt.")
        cached_prompt = system_prompt

        # Tokenize the prompt and move it to the appropriate device
        pre_tokenized_prompt = tokenizer(system_prompt, return_tensors="pt").to(device)
        logger.info("Prompt tokenized and moved to device.")

    # Streaming function for generating tokens
    def stream():
        logger.info("Starting token generation stream...")
        try:
            for token in generate_response_stream(
                None,
                tokenizer,
                model,
                max_length=max_output_token_length,
                temperature=temperature,
                input_context_window=input_context_window,
                pre_tokenized_input=pre_tokenized_prompt
            ):
                yield token
        except Exception as e:
            logger.error(f"Error during token generation stream: {e}")
            yield f"\nError: {e}"
    
    # Stream the response
    logger.info("Returning streaming response to the client.")
    return Response(stream_with_context(stream()), content_type="text/plain")

