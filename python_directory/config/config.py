import os
import logging
import torch

# Define the path to your model directory
MODEL_PATH = os.getenv("MODEL_PATH", "/Users/prige/Desktop/llama_project/python_directory/models/llm_model")
MODEL_PATH_2 = os.getenv("MODEL_PATH_2", "/Users/prige/Desktop/llama_project/python_directory/models/Llama-3.2-1B-Instruct-QLORA_INT4_EO8")
MODEL_PATH_3 = os.getenv("MODEL_PATH_3", "/Users/prige/Desktop/llama_project/python_directory/models/Llama-3.2-1B-Instruct")
MODEL_PATH_4 = os.getenv("MODEL_PATH_4", "/Users/prige/Desktop/llama_project/python_directory/models/llm_finetuned_model")

FINE_TUNED_MODEL_PATH = os.path.join("models", "fine_tuned_models")

# Directory to store cached models and tokenizers
CACHE_DIR = "./.cache"

# Logging configuration
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")
logger = logging.getLogger(__name__)

# Device detection
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
logger.info(f"Using device: {device}")