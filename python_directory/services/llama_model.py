import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
import time

CACHE_DIR = "./.cache"  # Directory to store cached models and tokenizers


def load_model(model_path):
    # Ensure the cache directory exists
    os.makedirs(CACHE_DIR, exist_ok=True)
    tokenizer_cache_path = os.path.join(CACHE_DIR, "tokenizer.pt")
    model_cache_path = os.path.join(CACHE_DIR, "model.pt")

    # Check if cached tokenizer exists
    if os.path.exists(tokenizer_cache_path) and os.path.exists(model_cache_path):
        print("Loading cached tokenizer and model...")
        tokenizer = torch.load(tokenizer_cache_path)
        model = torch.load(model_cache_path)
    else:
        print("Loading tokenizer and model from the original path...")
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        model = AutoModelForCausalLM.from_pretrained(model_path)

        # Save them to cache
        print("Caching tokenizer and model...")
        torch.save(tokenizer, tokenizer_cache_path)
        torch.save(model, model_cache_path)

    return tokenizer, model





# Generate a response based on the given prompt or pre-tokenized input.
def generate_response(prompt, tokenizer, model, max_length=100, pre_tokenized_input=None):
    # Use pre-tokenized input if provided; otherwise, tokenize the prompt
    if pre_tokenized_input is not None:
        inputs = pre_tokenized_input
    else:
        inputs = tokenizer(prompt, return_tensors="pt")
    
    start_time = time.time()

    # Generate a response
    output = model.generate(**inputs, max_length=max_length)

    end_time = time.time()
    print(f"Model inference took {end_time - start_time:.2f} seconds.")

    # Decode the generated output tensor into a human-readable string
    return tokenizer.decode(output[0], skip_special_tokens=True)
