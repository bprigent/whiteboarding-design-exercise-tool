import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from config.config import CACHE_DIR, logger, device  # Import constants and logger from config



################################
def load_model(model_path):
    """
    Load the model and tokenizer with caching.
    
    Parameters:
        model_path (str): The path or name of the pre-trained model from HuggingFace.
        
    Returns:
        tuple: A tuple containing the tokenizer and the model.
    """

    # Ensure the cache directory exists
    logger.info(f"Ensuring cache directory exists at: {CACHE_DIR}")
    os.makedirs(CACHE_DIR, exist_ok=True)

    # Define paths for cached tokenizer and model
    tokenizer_cache_path = os.path.join(CACHE_DIR, "tokenizer.pt")
    model_cache_path = os.path.join(CACHE_DIR, "model.pt")

    # Check if cached tokenizer and model already exist
    if os.path.exists(tokenizer_cache_path) and os.path.exists(model_cache_path):
        logger.info("Cached tokenizer and model found. Loading from cache...")

        # Load the cached tokenizer
        try:
            logger.info(f"Loading tokenizer from cache")
            tokenizer = torch.load(tokenizer_cache_path, weights_only=False)

            logger.info(f"Loading model from cache")
            model = torch.load(model_cache_path, weights_only=False)

            logger.info("Tokenizer and model loaded successfully from cache.")
        except Exception as e:
            logger.error(f"Error loading cached tokenizer or model: {e}")
            raise e
    else:
        # If no cache, load the tokenizer and model from HuggingFace
        logger.info("Cached tokenizer and model not found. Downloading from HuggingFace...")

        try:
            logger.info(f"Loading tokenizer from HuggingFace model path: {model_path}")
            tokenizer = AutoTokenizer.from_pretrained(model_path)

            logger.info(f"Loading model from HuggingFace model path: {model_path}")
            model = AutoModelForCausalLM.from_pretrained(
                model_path,
                device_map=None,  # No automatic device mapping; we control the device
                cache_dir=CACHE_DIR,  # Save the model in the specified cache directory
            )

            logger.info("Tokenizer and model loaded successfully from HuggingFace.")

            # Save the tokenizer and model to the cache for future use
            logger.info("Caching tokenizer and model...")
            torch.save(tokenizer, tokenizer_cache_path)
            torch.save(model, model_cache_path)
            logger.info("Tokenizer and model cached successfully.")
        except Exception as e:
            logger.error(f"Error downloading or caching tokenizer and model: {e}")
            raise e

    # Move the model to the detected device (CPU, GPU, or MPS)
    logger.info(f"Moving model to device: {device}")
    model = model.to(device)
    logger.info("Model moved to device successfully.")

    # Return the tokenizer and model
    return tokenizer, model
