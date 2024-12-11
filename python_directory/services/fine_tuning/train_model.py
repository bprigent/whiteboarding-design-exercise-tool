from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    Trainer,
    TrainingArguments,
)
import torch
from datasets import load_from_disk

# params
MODEL_PATH  = "/Users/prige/Desktop/llama_project/python_directory/models/Llama-3.2-1B-Instruct"
DATASET_PATH = "/Users/prige/Desktop/llama_project/python_directory/services/fine_tuning/tokenized_dataset"
OUTPUT_DIR = "/Users/prige/Desktop/llama_project/python_directory/models"

# Force PyTorch to use CPU
device = torch.device("cpu")
torch.set_num_threads(2)  # Limit CPU threads

# Force PyTorch to use CPU
device = torch.device("cpu")

def load_model_and_tokenizer(model_name):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
    model.to(device)  # Move model to CPU
    return tokenizer, model




def main():
    # Load tokenizer and model
    tokenizer, model = load_model_and_tokenizer(MODEL_PATH)

    # Load tokenized dataset
    tokenized_dataset = load_from_disk(DATASET_PATH)

    # Define training arguments
    training_args = TrainingArguments(
        output_dir=OUTPUT_DIR,
        overwrite_output_dir=True,
        num_train_epochs=1,         # Reduced number of epochs
        per_device_train_batch_size=1,
        save_steps=0,             # Save less frequently
        save_strategy="no",         # Skip saving checkpoints
        logging_steps=10,           # Log more frequently to monitor progress
        max_steps=50,              # Limit to 100 steps
        logging_dir="./logs",
    )

    # Initialize the Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_dataset,
    )

    # Train the model
    trainer.train()

    # Save the model
    trainer.save_model(f"{OUTPUT_DIR}/llm_finetuned_model")

if __name__ == "__main__":
    main()
