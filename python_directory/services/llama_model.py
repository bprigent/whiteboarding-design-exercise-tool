from transformers import AutoTokenizer, AutoModelForCausalLM



# Load the tokenizer and model from the specified path.
def load_model(model_path):
    # Load the tokenizer from the specified model path.
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    # Load the language model (causal LM) from the specified model path.
    model = AutoModelForCausalLM.from_pretrained(model_path)
    
    # Return both the tokenizer and the model.
    return tokenizer, model



# Generate a response based on the given prompt.
def generate_response(prompt, tokenizer, model, max_length=50):
    # Tokenize the input prompt and convert it into tensors for the model.
    inputs = tokenizer(prompt, return_tensors="pt")
    # Generate a response using the model. Specify the maximum output length.
    output = model.generate(**inputs, max_length=max_length)
    
    # Decode the generated output tensor into a human-readable string,
    # skipping any special tokens (e.g., padding or end-of-sequence markers).
    return tokenizer.decode(output[0], skip_special_tokens=True)
