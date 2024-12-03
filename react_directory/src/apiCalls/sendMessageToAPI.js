import { addMessage, updateMessageContent } from "../store/slices/chatSlice";

const API_BASE_URL = "http://127.0.0.1:5000";

export const sendMessageToAPI = async (dispatch, userMessage, context) => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage, context }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch AI response: ${response.statusText}`);
        }

        // Read the response stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let result = "";
        const messageId = Date.now(); // Generate a unique ID for this AI message

        // Dispatch a placeholder AI message
        dispatch(
            addMessage({
                id: messageId,
                role: "ai",
                text: "",
                status: "Responding",
            })
        );

        // Process the response stream
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const token = decoder.decode(value, { stream: true });
            result += token;

            // Dispatch incremental token updates
            dispatch(updateMessageContent({ messageId, token }));
        }

        return result.trim();
    } catch (error) {
        console.error("Error in sendMessage:", error);
        throw error;
    }
};