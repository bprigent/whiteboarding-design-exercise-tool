import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments
import os
import argparse
from datasets import load_dataset



def fine_tune_model(base_model_path, dataset_path, output_dir, num_epochs=3, learning_rate=5e-5):
    # Load the base model and tokenizer
    tokenizer = AutoTokenizer.from_pretrained(base_model_path)
    model = AutoModelForCausalLM.from_pretrained(base_model_path)

    # Load the dataset (assuming a JSONL format for simplicity)
    dataset = load_dataset('json', data_files=dataset_path)['train']

    # Define training arguments
    training_args = TrainingArguments(
        output_dir=output_dir,
        num_train_epochs=num_epochs,
        per_device_train_batch_size=4,
        learning_rate=learning_rate,
        save_total_limit=2,
        save_steps=500,
        evaluation_strategy="epoch",
        logging_dir=os.path.join(output_dir, 'logs'),
    )

    # Use Hugging Face Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=dataset,
        tokenizer=tokenizer,
    )

    trainer.train()

    # Save the fine-tuned model
    os.makedirs(output_dir, exist_ok=True)
    model.save_pretrained(output_dir)
    tokenizer.save_pretrained(output_dir)
    print(f"Fine-tuned model saved to {output_dir}")








# launch the function to fine tune
if __name__ == "__main__":
    
    # Set default variables here
    BASE_MODEL_PATH = "../llm_model"
    DATASET_PATH = "../data/train_data.jsonl"
    OUTPUT_DIR = "../fine_tuned_models/version_1"
    NUM_EPOCHS = 3
    LEARNING_RATE = 5e-5

    

    fine_tune_model(
        base_model_path=BASE_MODEL_PATH,
        dataset_path=DATASET_PATH,
        output_dir=OUTPUT_DIR,
        num_epochs=NUM_EPOCHS,
        learning_rate=LEARNING_RATE
    )
