from flask import Blueprint, request, jsonify, Response, stream_with_context
from services.llama_model import generate_response_stream
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)  # Adjust level as needed (e.g., DEBUG, WARNING)


# Create a Blueprint for "create-exercise" route
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
    system_prompt = data.get("systemPrompt", "")  # Extract the system prompt from the request
    
    # logging system prompt
    logging.info(f"Received system prompt: {system_prompt}")

    max_context_length = data.get("max_context_length", 8192)  # Optional max context length
    max_response_length = data.get("max_response_length", 150)  # Optional max response length

    if not system_prompt:
        return jsonify({"error": "No message provided"}), 400
    
    if len(system_prompt) > max_context_length:
        system_prompt = system_prompt[-max_context_length:]  # Keep the most recent tokens

    # Log the system prompt before tokenizing
    logging.info(f"System Prompt before sending to tokenizer:\n{system_prompt}")

    # Pre-tokenize the context
    pre_tokenized_input = tokenizer(system_prompt, return_tensors="pt")
    
    # Streaming function to generate the response
    def stream():
        response_tokens = []
        for token in generate_response_stream(None, tokenizer, model, max_length=max_response_length, pre_tokenized_input=pre_tokenized_input):
            response_tokens.append(token)
            yield token

    # Stream the response
    return Response(stream_with_context(stream()), content_type="text/plain")