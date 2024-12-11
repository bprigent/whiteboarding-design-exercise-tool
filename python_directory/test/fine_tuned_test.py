from transformers import AutoTokenizer, AutoModelForCausalLM

model_path = "/Users/prige/Desktop/llama_project/python_directory/models/llm_finetuned_model"

tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(model_path)

prompt = "Design a dashboard for teachers to manage student grades."
inputs = tokenizer(prompt, return_tensors="pt")

outputs = model.generate(**inputs, max_new_tokens=30, temperature=1.0)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
