from transformers import LlamaTokenizer

# Path to the tokenizer
tokenizer_path = "/Users/prige/.llama/checkpoints/Llama3.1-8B"

# Load tokenizer
try:
    tokenizer = LlamaTokenizer.from_pretrained(tokenizer_path)
    print("Tokenizer loaded successfully!")
except Exception as e:
    print("Error loading tokenizer:", e)