import { setPrompt, setStatus } from '../store/slices/exerciseSlice';
import modelList from '../store/modelList';


export async function createExercise(dispatch, experience, product, maturity, time) {

    // get the model
    const modelSelected = modelList.find((model) => model.name === "Dieter 3.0");
    const temperature = modelSelected.exercise.temperature
    const maxOutputTokenLength = modelSelected.exercise.maxOutputTokenLength
    const inputContextWindow = modelSelected.exercise.inputContextWindow
    const systemPrompt = modelSelected.exercise.prompt({ time, experience, product, maturity })
    
    const API_BASE_URL = "http://127.0.0.1:5000";
    
    try {
        const response = await fetch(`${API_BASE_URL}/create-exercise`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ systemPrompt: systemPrompt, maxOutputTokenLength: maxOutputTokenLength, temperature: temperature, inputContextWindow: inputContextWindow }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        // Read the response stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let result = "";

        // Process the response stream
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            result += chunk;
            console.log(result); // Incrementally log each chunk of the response
            dispatch(setPrompt(result)); // Dispatch partial result to Redux store
            dispatch(setStatus('working')); 
        }

        return result.trim(); // Final output

    } catch (error) {
        console.error("Error fetching response:", error);
        throw error;
    }
}


