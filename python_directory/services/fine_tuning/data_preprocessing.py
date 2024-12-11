import json
from datasets import load_dataset, Dataset
from transformers import AutoTokenizer, AutoModelForCausalLM
import os


# Parameters
DATA_FILE = os.path.join(os.path.dirname(__file__), 'training_data.jsonl')
MODEL_PATH  = "/Users/prige/Desktop/llama_project/python_directory/llm_model" # Replace with another model name if needed

def load_and_prepare_data(data_file):
    # Load JSONL data into a list of dictionaries
    with open(data_file, 'r', encoding='utf-8') as f:
        data = [json.loads(line) for line in f]

    # Convert to HuggingFace Dataset
    dataset = Dataset.from_list(data)
    return dataset





def tokenize_data(dataset, tokenizer_name):
    tokenizer = AutoTokenizer.from_pretrained(tokenizer_name)

    # Set pad_token to eos_token if necessary
    tokenizer.pad_token = tokenizer.eos_token

    def tokenize_function(example):
        prompt = f"Input: {example['input']}\nOutput: {example['output']}"
        tokens = tokenizer(prompt, padding='max_length', truncation=True, max_length=128)
        
        # Set labels to be the same as input_ids
        tokens["labels"] = tokens["input_ids"].copy()
        return tokens

    tokenized_dataset = dataset.map(tokenize_function)
    return tokenized_dataset





def main():
    dataset = load_and_prepare_data(DATA_FILE)
    tokenized_dataset = tokenize_data(dataset, MODEL_PATH)
    # Load the model and resize embeddings if new tokens are added
    model = AutoModelForCausalLM.from_pretrained(MODEL_PATH)
    model.resize_token_embeddings(len(AutoTokenizer.from_pretrained(MODEL_PATH)))

    SAVE_DIR = os.path.join(os.path.dirname(__file__), "tokenized_dataset")
    tokenized_dataset.save_to_disk(SAVE_DIR)

if __name__ == "__main__":
    main()
