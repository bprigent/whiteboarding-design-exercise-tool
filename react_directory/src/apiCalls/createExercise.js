import { setPrompt } from '../store/slices/exerciseSlice';


export async function createExercise(dispatch) {
    
    const API_BASE_URL = "http://127.0.0.1:5000";
    const prompt = `
        Generate a UX design whiteboarding exercise prompt for beginner designers. 
        Here is the format to create a UX design whiteboarding exercise prompt: Build a {1} that helps {2} achieve {3}.
        {1} is the type of tool. This can be an app, a website, a screen, a chrome extension, anything
        {2} is the user, it is a persona, a type of person, with special characteristics. 
        {3} is the goal, what we want this tool to help people do.
        This prompt will be one sentence, and maximum 20 words. It can be less 
        Your answer should only contain the prompt, nothing else, ever.
        Do not add anything else than the prompt in your answer, do not help, provide guidance, etc.
        Before answering, make sure you are only respondoing with the design whiteboarding exercise prompt and nothing else.
        Write the prompt only once in your answer. 
        Do not include any part of this message above in your answer.
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


