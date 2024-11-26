export async function createExercise() {
    
    const API_BASE_URL = "http://127.0.0.1:5000";
    const prompt = `
        Generate a UX design whiteboarding exercise for beginner designers. 
        This will me a sentence of maximum 20 words. 
        Example: Build a tool that helps {type of people} achieve {goal}. You can format it any way you want
        Only response with the sentence and nothing else. 
        Do not guide the designer with additional help.
        Before answer, make sure you are only respondoing with the design whiteboarding exercise sentence and nothing else.
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

        const data = await response.json();
        return data.response; 

    } catch (error) {
        console.error("Error fetching response:", error);
        throw error;
    }
}


