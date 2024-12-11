import torch
from config.config import device, logger



#################################
def generate_response_stream(prompt, tokenizer, model, max_length, temperature, input_context_window, pre_tokenized_input=None):
    """
    Stream token-by-token responses for a given prompt.

    Parameters:
        prompt (str): The input prompt for generating the response.
        tokenizer: The tokenizer used for encoding the prompt and decoding the output.
        model: The language model used for generating the response.
        max_length (int): The maximum number of tokens to generate.
        temperature (float): The sampling temperature to control randomness.
        input_context_window (int): The maximum length of the input context window.
        pre_tokenized_input (dict, optional): Pre-tokenized input to use instead of the prompt.
        
    Yields:
        str: The generated tokens one by one.
    """

    # Log the beginning of the response generation process
    logger.info("Starting response generation...")

    # Use pre-tokenized input if available; otherwise, tokenize the prompt
    if pre_tokenized_input is not None:
        logger.info("Using pre-tokenized input.")
        inputs = pre_tokenized_input
    else:
        logger.info(f"Tokenizing the prompt with a context window of {input_context_window} tokens.")
        inputs = tokenizer(
            prompt,
            return_tensors="pt",  # Return tensors for PyTorch
            padding=True,         # Apply padding if necessary
            truncation=True,      # Truncate input if it exceeds `input_context_window`
            max_length=input_context_window,
        )

    # Move inputs to the detected device (CPU, GPU, or MPS)
    input_ids = inputs["input_ids"].to(device)
    attention_mask = inputs["attention_mask"].to(device)
    logger.info("Inputs moved to the device.")

    # Generate tokens one by one up to the specified `max_length`
    for _ in range(max_length):
        try:
            logger.info("Generating the next token...")
            outputs = model.generate(
                input_ids=input_ids,
                attention_mask=attention_mask,
                max_new_tokens=1,                  # Generate only one token at a time
                return_dict_in_generate=True,      # Return output as a dictionary for easier access
                output_scores=True,                # Include scores for generated tokens
                eos_token_id=tokenizer.eos_token_id,  # Stop generation when the EOS token is generated
                use_cache=True,                    # Enable KV (key-value) caching for faster generation
                temperature=temperature,           # Control randomness of the output
            )

            # Extract the newly generated token
            next_token_id = outputs.sequences[0, -1].unsqueeze(0)  # Get the last token and add a batch dimension

            # Update input_ids and attention_mask with the new token
            input_ids = torch.cat([input_ids, next_token_id.unsqueeze(0)], dim=-1).to(device)
            attention_mask = torch.cat(
                [attention_mask, torch.ones((1, 1), dtype=torch.long).to(device)], dim=-1
            )

            # Decode the token to a string
            token = tokenizer.decode(next_token_id, skip_special_tokens=True)
            logger.info(f"Generated token: {token}")

            # Yield the generated token for streaming output
            yield token

            # Stop generation if the end-of-sequence (EOS) token is generated
            if next_token_id.item() == tokenizer.eos_token_id:
                logger.info("End-of-sequence token detected. Stopping generation.")
                break

        except RuntimeError as e:
            # Log any runtime errors that occur during generation
            logger.error(f"Runtime error during generation: {e}")
            break

    # Log the end of the response generation process
    logger.info("Response generation completed.")
