const API_BASE_URL = "http://127.0.0.1:5000"; // Update this to match your backend's URL if different

export async function generateResponse(prompt) {
    try {
        const response = await fetch(`${API_BASE_URL}/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response; // Return the generated response
    } catch (error) {
        console.error("Error fetching response:", error);
        throw error;
    }
}
