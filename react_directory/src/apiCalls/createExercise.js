import { setPrompt } from '../store/slices/exerciseSlice';


export async function createExercise(dispatch, experience, product, maturity, time) {
    
    const API_BASE_URL = "http://127.0.0.1:5000";
    const prompt = `
        You are a design interviewer. 
        Your goal is to generate a UX design whiteboarding exercise prompt for a designer. They will have ${time} to complete the task, so create a prompt according to their time.
        The designer that will do this exercise has provided 3 information about the type of witeboarding exercise they would like to work on. Do your best to accomodate their request.
        1/ The designer has the following years of experience: ${experience}. Make it harder if they have more experience. 
        2/ When ask if they wanted to design a physiscal or digital tool, they answered: ${product}.
        3/ When ask which product maturity they wanted to work on (0 to 1 product or incremental improvement of an existing product), they answered: ${maturity}.
        Here is a great format you can follow to create a UX design whiteboarding exercise prompt: "Build a {1} that helps {2} achieve {3}."
        {1} is the type of tool. This can be an app or website, a part of it or the whole thing. It could also be a chrome extension, or anything else.
        {2} is the user, it is a persona, a type of person, with specific characteristics. 
        {3} is the goal, what we want this tool to help people do.
        You don't have to follow this format exactly, but it is a good inspiration. It is more important that the combined sentence be: Coherent, Realistic, Clear, Creative, Precise, and Understandable.
        The prompt will be one single sentence only, maximum 20 words, tt can be less if you want.
        Your answer should contain the prompt sentence once, only once. 
        Do not include any part of this message above in your answer. Never ever mention in the prompt: the ${time}, their years of experience, "${product}" or "${maturity}" if they specified it. 
        Your answer should only contain the prompt, nothing else, ever. Do not add anything else than the prompt in your answer.
        Before answering, make sure you are only respondoing with the design whiteboarding exercise prompt and nothing else.
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


