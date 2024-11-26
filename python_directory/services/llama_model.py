import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, StoppingCriteriaList, StoppingCriteria
import logging

CACHE_DIR = "./.cache"  # Directory to store cached models and tokenizers

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")
logger = logging.getLogger(__name__)




############################################################
# load model
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






############################################################
class TokenStoppingCriteria(StoppingCriteria):
    """
    Custom stopping criteria to simulate streaming-like behavior by limiting to one token at a time.
    """
    def __init__(self):
        super().__init__()

    def __call__(self, input_ids, scores, **kwargs):
        return True  # Stop after each token
    





############################################################
# Generate a response based on the given prompt or pre-tokenized input.
def generate_response_stream(prompt, tokenizer, model, max_length=100, pre_tokenized_input=None):
    """
    Stream token-by-token responses for a given prompt.
    """
    # Use pre-tokenized input if available
    if pre_tokenized_input is not None:
        inputs = pre_tokenized_input
    else:
        inputs = tokenizer(
            prompt,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=model.config.max_position_embeddings,
        )
    
    logger.info(f"Input IDs shape: {inputs['input_ids'].shape}")
    logger.info(f"Attention mask shape: {inputs['attention_mask'].shape}")

    # Initial input state for incremental generation
    input_ids = inputs["input_ids"]
    attention_mask = inputs["attention_mask"]

    for _ in range(max_length):
        try:
            outputs = model.generate(
                input_ids=input_ids,
                attention_mask=attention_mask,
                max_new_tokens=1,
                return_dict_in_generate=True,
                output_scores=True,
                eos_token_id=tokenizer.eos_token_id,
            )

            # Extract the new token
            next_token_id = outputs.sequences[0, -1].unsqueeze(0)

            # Update input_ids and attention_mask
            input_ids = torch.cat([input_ids, next_token_id.unsqueeze(0)], dim=-1)
            attention_mask = torch.cat(
                [attention_mask, torch.ones((1, 1), dtype=torch.long)], dim=-1
            )

            # Decode the token and log it
            token = tokenizer.decode(next_token_id, skip_special_tokens=True)
            logger.info(f"Generated token: {token}")

            yield token

            # Stop if the end of the sequence is reached
            if next_token_id.item() == tokenizer.eos_token_id:
                break

        except RuntimeError as e:
            logger.error(f"Runtime error during generation: {e}")
            break
