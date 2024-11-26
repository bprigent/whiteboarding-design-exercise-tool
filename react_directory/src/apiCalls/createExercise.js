import { setPrompt } from '../store/slices/exerciseSlice';


export async function createExercise(dispatch) {
    
    const API_BASE_URL = "http://127.0.0.1:5000";
    const prompt = `
        Generate a UX design whiteboarding exercise for beginner designers. 
        This will me a sentence of maximum 20 words. 
        Example: Build a tool that helps {type of people} achieve {goal}. You can format it any way you want
        Only response with one single sentence, nothing else. 
        Do not guide the designer with additional help.
        Before answering, make sure you are only respondoing with the design whiteboarding exercise sentence and nothing else.
        Only answer one sentence, not more.
    `;
    
    try {
        const response = await fetch(`${API_BASE_URL}/create-exercise`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ prompt }),
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
        }

        return result.trim(); // Final output

    } catch (error) {
        console.error("Error fetching response:", error);
        throw error;
    }
}


