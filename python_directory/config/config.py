import os

# Define the path to your model directory
MODEL_PATH = os.getenv("MODEL_PATH", "/Users/prige/Desktop/llama_project/python_directory/models/llm_model")
MODEL_PATH_2 = os.getenv("MODEL_PATH_2", "/Users/prige/Desktop/llama_project/python_directory/models/Llama-3.2-1B-Instruct-QLORA_INT4_EO8")
MODEL_PATH_3 = os.getenv("MODEL_PATH_3", "/Users/prige/Desktop/llama_project/python_directory/models/Llama-3.2-1B-Instruct")

FINE_TUNED_MODEL_PATH = os.path.join("models", "fine_tuned_models")
