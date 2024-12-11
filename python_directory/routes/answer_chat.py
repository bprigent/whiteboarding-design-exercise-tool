from flask import Blueprint, request, jsonify, Response, stream_with_context
from services.response_generator import generate_response_stream
from config.config import logger, device  # Import logger and device from config



# Create a Blueprint for the "chat" route
chat_bp = Blueprint("chat", __name__)




# Define a route for handling POST requests to "/chat"
@chat_bp.route("/chat", methods=["POST"])
def chat():
    """Handle the POST request for the chat endpoint."""

    # Access the tokenizer and model from the blueprint's attributes
    tokenizer = chat_bp.tokenizer
    model = chat_bp.model

    # Extract JSON data from the incoming request
    data = request.json
    system_prompt = data.get("systemPrompt", "")         # System prompt provided by the user
    temperature = data.get("temperature", 0.7)           # Default temperature to 0.7 if not provided
    input_context_window = data.get("inputContextWindow", 1024)  # Default context window size
    max_output_token_length = data.get("maxOutputTokenLength", 50)  # Default max token length to 50

    # Validate if the system prompt is provided
    if not system_prompt:
        logger.error("No system prompt provided in the request.")
        return jsonify({"error": "No message provided"}), 400

    # Log the received parameters
    logger.info(f"Received system prompt: {system_prompt}")
    logger.info(f"Temperature: {temperature}")
    logger.info(f"Input context window: {input_context_window}")
    logger.info(f"Max output token length: {max_output_token_length}")

    # Tokenize the system prompt and move it to the appropriate device
    try:
        logger.info("Tokenizing the system prompt...")
        pre_tokenized_input = tokenizer(system_prompt, return_tensors="pt").to(device)
        logger.info("System prompt tokenized and moved to device successfully.")
    except Exception as e:
        logger.error(f"Error during tokenization: {e}")
        return jsonify({"error": f"Tokenization error: {e}"}), 500

    # Streaming function to generate the response token-by-token
    def stream():
        logger.info("Starting token generation stream...")
        try:
            response_tokens = []
            for token in generate_response_stream(
                None,
                tokenizer,
                model,
                max_length=max_output_token_length,
                temperature=temperature,
                input_context_window=input_context_window,
                pre_tokenized_input=pre_tokenized_input
            ):
                response_tokens.append(token)
                yield token

            logger.info("Token generation stream completed.")
        except Exception as e:
            logger.error(f"Error during token generation stream: {e}")
            yield f"\nError: {e}"

    # Return the streaming response to the client
    logger.info("Returning streaming response to the client.")
    return Response(stream_with_context(stream()), content_type="text/plain")