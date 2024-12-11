from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    Trainer,
    TrainingArguments,
)
from datasets import load_from_disk

MODEL_PATH  = "/Users/prige/Desktop/llama_project/python_directory/llm_model" # Replace with another model name if needed

# Parameters
DATASET_PATH = "/Users/prige/Desktop/llama_project/python_directory/services/fine_tuning/tokenized_dataset"
OUTPUT_DIR = "/Users/prige/Desktop/llama_project/python_directory/llm_output_finetuned_model"

def load_model_and_tokenizer(model_name):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
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
        num_train_epochs=5,
        per_device_train_batch_size=4,
        save_steps=500,
        save_total_limit=2,
        logging_dir="./logs",
        logging_steps=100,
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
    trainer.save_model(f"{OUTPUT_DIR}/final_model")

if __name__ == "__main__":
    main()
