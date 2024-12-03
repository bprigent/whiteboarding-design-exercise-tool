import { addMessage, updateMessageContent, updateMessageStatus } from "../store/slices/chatSlice";


// API url
const API_BASE_URL = "http://127.0.0.1:5000";


const optimizeMessageHistory = (messageHistory) => {
    const cleanup = messageHistory
    .map(({ author, content }) => `${author}: ${content}`) // Format each message
    .join("\n"); // Use newline for better readability
    return cleanup
};

// Build the system prompt with better structure and dynamic handling
const buildSystemPrompt = (optimizedHistory, exercise) => {
    
    const formattedHistory = optimizedHistory.length > 0 
        ? optimizedHistory
        : "No prior messages.";

    return `
        Conversation history:
        ${formattedHistory}

        Instructions:
        - You are a UX mentor guiding the user through a design exercise.
        - Keep the entire answer below 50 words. Always.
        - Guide, but do not give answers. Encourage self-discovery.
        - Be concise, encouraging, and ask thought-provoking questions.
        - Avoid repeating parts of the conversation history in your responses.
        - Do not include phrases like "AI:", "my answer is:", or unnecessary formatting like **bold**, /n, or other Markdown characters.
        - Write your answers as if you are directly speaking to the user, without meta-commentary.

        Design exercise: "${exercise}"

        Your task:
        Respond thoughtfully to continue the discussion based on the user's latest message.
    `;
};

export const sendMessageToAPI = async ({ dispatch, userMessage, messageHistory, exercise }) => {
    
    try {

        // Optimize the message history
        console.log(messageHistory)
        const optimizedHistory = optimizeMessageHistory(messageHistory);

        // Build the system prompt
        const systemPrompt = buildSystemPrompt(optimizedHistory, exercise, userMessage);

        // log the prompt
        console.log("Sending payload:", { systemPrompt });

        // send API request
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ systemPrompt: systemPrompt}),
        });

        // if there is an issue, send error
        if (!response.ok) {
            throw new Error(`Failed to fetch AI response: ${response.statusText}`);
        }

        // Read the response stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let result = "";
        
        // Dispatch a placeholder AI message
        const newMessageId = Date.now() + "-ai"; // Generate a unique ID for this AI message
        const newEmptyMessageFromAI = {id: newMessageId, author: "ai", content: "", status: "Responding"}
        dispatch(addMessage(newEmptyMessageFromAI));

        // Process the response stream
        while (true) {
            
            const { done, value } = await reader.read();
            if (done) break;
            
            // get the token
            const token = decoder.decode(value, { stream: true });
            console.log("Dispatching token with ID:", newMessageId, "Token:", token);
            
            // add token to results
            result += token;

            // Dispatch incremental token updates
            dispatch(updateMessageContent({ messageId: newMessageId, token: token }));
        }

        // Update the message status.
        dispatch(updateMessageStatus({ messageId: newMessageId, newStatus:'Sent' }));

        // return the final message without spaces before and after.
        return result.trim();

    } catch (error) {
        console.error("Error in sendMessage:", error);
        throw error;
    }
};