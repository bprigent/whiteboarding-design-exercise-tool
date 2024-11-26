from transformers import AutoTokenizer, AutoModelForCausalLM

# Load the tokenizer and model from the specified path.
def load_model(model_path):
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForCausalLM.from_pretrained(model_path)
    # Return both the tokenizer and the model.
    return tokenizer, model

# Generate a response based on the given prompt.
def generate_response(prompt, tokenizer, model, max_length=100):
    # Tokenize the prompt and convert it into tensors
    inputs = tokenizer(prompt, return_tensors="pt")
    # Generate a response
    output = model.generate(**inputs, max_length=max_length)
    # Decode the generated output tensor into a human-readable string  skipping special tokens
    return tokenizer.decode(output[0], skip_special_tokens=True)
