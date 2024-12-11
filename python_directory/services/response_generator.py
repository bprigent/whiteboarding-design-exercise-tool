# generate/generate_response.py
import torch
from config.config import device, logger


def generate_response_stream(prompt, tokenizer, model, max_length, temperature, input_context_window, pre_tokenized_input=None):
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
            max_length=input_context_window,
        )

    # Move inputs to the detected device
    input_ids = inputs["input_ids"].to(device)
    attention_mask = inputs["attention_mask"].to(device)

    for _ in range(max_length):
        try:
            outputs = model.generate(
                input_ids=input_ids,
                attention_mask=attention_mask,
                max_new_tokens=1,
                return_dict_in_generate=True,
                output_scores=True,
                eos_token_id=tokenizer.eos_token_id,
                use_cache=True,  # Enable KV caching, to go faster
                temperature=temperature,  # temperature of the model
            )

            # Extract the new token
            next_token_id = outputs.sequences[0, -1].unsqueeze(0)

            # Update input_ids and attention_mask
            input_ids = torch.cat([input_ids, next_token_id.unsqueeze(0)], dim=-1).to(device)
            attention_mask = torch.cat(
                [attention_mask, torch.ones((1, 1), dtype=torch.long).to(device)], dim=-1
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