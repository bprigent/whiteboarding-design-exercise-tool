from flask import Blueprint, request, jsonify, Response, stream_with_context
from services.llama_model import generate_response_stream

# Create a Blueprint for "create-exercise" route
chat_bp = Blueprint("chat", __name__)

# Initialize conversation context
conversation_context = []

# Define a route for handling POST requests to "/chat"
@chat_bp.route("/chat", methods=["POST"])
def chat():
    """Handle the POST request for the chat endpoint."""
    # Access the tokenizer and model from the blueprint's attributes
    tokenizer = chat_bp.tokenizer
    model = chat_bp.model

    # Extract JSON data from the incoming request
    data = request.json
    user_message = data.get("message", "")
    max_context_length = data.get("max_context_length", 2048)  # Optional max context length
    max_response_length = data.get("max_response_length", 150)  # Optional max response length

    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    # Add the user's message to the conversation context
    conversation_context.append(f"User: {user_message}")

    # Trim context if it exceeds the maximum allowed length
    combined_context = " ".join(conversation_context)
    if len(combined_context) > max_context_length:
        combined_context = combined_context[-max_context_length:]  # Keep the most recent tokens

    # Pre-tokenize the context
    pre_tokenized_input = tokenizer(combined_context, return_tensors="pt")
    
    
    # Streaming function to generate the response
    def stream():
        global conversation_context
        response_tokens = []
        for token in generate_response_stream(None, tokenizer, model, max_length=max_response_length, pre_tokenized_input=pre_tokenized_input):
            response_tokens.append(token)
            yield token
        
        # Add AI response to the conversation context
        ai_response = "".join(response_tokens)
        conversation_context.append(f"AI: {ai_response}")

    # Stream the response
    return Response(stream_with_context(stream()), content_type="text/plain")