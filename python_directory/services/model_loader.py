import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from config.config import CACHE_DIR, logger, device

def load_model(model_path):
    """
    Load the model and tokenizer with caching.
    """
    # Ensure the cache directory exists
    os.makedirs(CACHE_DIR, exist_ok=True)
    tokenizer_cache_path = os.path.join(CACHE_DIR, "tokenizer.pt")
    model_cache_path = os.path.join(CACHE_DIR, "model.pt")

    # Check if cached tokenizer exists
    if os.path.exists(tokenizer_cache_path) and os.path.exists(model_cache_path):
        logger.info("Loading cached tokenizer and model...")
        tokenizer = torch.load(tokenizer_cache_path, weights_only=False)
        model = torch.load(model_cache_path, weights_only=False)
    else:
        logger.info("Loading tokenizer and model with quantization...")
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        model = AutoModelForCausalLM.from_pretrained(
            model_path,
            device_map=None,  # Do not auto-map devices, we are running this on macbook
            cache_dir=CACHE_DIR,
        )

        # Save them to cache
        logger.info("Caching tokenizer and model...")
        torch.save(tokenizer, tokenizer_cache_path)
        torch.save(model, model_cache_path)

    # Move model to the detected device
    model = model.to(device)
    return tokenizer, model
