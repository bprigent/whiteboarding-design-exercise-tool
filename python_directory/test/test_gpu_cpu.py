import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import os

# Model path for testing
MODEL_PATH = "/Users/prige/Desktop/llama_project/python_directory/llm_model"  # Replace with your model path
CACHE_DIR = "./.cache"

def check_device(model):
    """
    Check and display whether the model is using a GPU or CPU.
    """
    device = next(model.parameters()).device
    print(f"The model is currently loaded on: {device}")
    if device.type == "cuda":
        print(f"GPU detected: {torch.cuda.get_device_name(device.index)}")
    elif device.type == "cpu":
        print("The model is running on the CPU.")

def main():
    """
    Load the model and check its device.
    """
    # Check if GPU is available
    if torch.cuda.is_available():
        print(f"GPU is available: {torch.cuda.get_device_name(0)}")
    else:
        print("No GPU available. Using CPU.")

    # Quantization configuration for 8-bit
    quantization_config = BitsAndBytesConfig(
        load_in_8bit=True  # Specify 8-bit quantization
    )

    # Load model and tokenizer
    print("Loading model...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH, cache_dir=CACHE_DIR)
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_PATH,
        device_map="auto" if torch.cuda.is_available() else "cpu",  # Updated fallback
        quantization_config=quantization_config,  # Use new quantization argument
        cache_dir=CACHE_DIR,
    )

    # Check the device of the model
    check_device(model)

if __name__ == "__main__":
    main()
