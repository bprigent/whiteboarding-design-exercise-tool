from transformers import AutoTokenizer, AutoModelForCausalLM

def load_model(model_path):
    print("Loading model...")
    tokenizer = AutoTokenizer.from_pretrained(model_path)  # Should load from tokenizer.json and tokenizer_config.json
    model = AutoModelForCausalLM.from_pretrained(model_path)
    return tokenizer, model

def generate_response(prompt, tokenizer, model):
    inputs = tokenizer(prompt, return_tensors="pt")
    output = model.generate(**inputs)
    return tokenizer.decode(output[0], skip_special_tokens=True)

model_path = "/Users/prige/Desktop/llama_project/llama_directory/llama_model"  # Update this path if needed
tokenizer, model = load_model(model_path)

prompt = "Explain the basics of UX design."
print("Prompt:", prompt)
response = generate_response(prompt, tokenizer, model)
print("Response:", response)
