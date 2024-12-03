import { addMessage, updateMessageContent, updateMessageStatus } from "../store/slices/chatSlice";


// API url
const API_BASE_URL = "http://127.0.0.1:5000";


const optimizeMessageHistory = (messageHistory, userMessage) => {
    const cleanup = messageHistory
    .map(({ author, content }) => `${author}: ${content}`) // Format each message
    .join("\n"); // Use newline for better readability

    const fullHistory = cleanup + "\nLatest user message: " + userMessage + "."

    return fullHistory
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
        - You are a UX interviewer overseeing and conversing with a user during their design whiteboarding exercise interview. The exercise given to the user: "${exercise}"
        - Be concise, keep all answers below 25 words. Always.
        - Guide, chat, but do not give answers.
        - Use the context of the conversation history but never repeat parts of the conversation history in your responses.
        - Do not include phrases like "AI:", "my answer is:", or unnecessary formatting like **bold**, /n, or other Markdown characters. Do not create paragraphs or jump lines.
        - Write your answers as if you are directly speaking to the user, without meta-commentary.

        Your task:
        Respond thoughtfully to the user's latest message.
    `;
};

export const sendMessageToAPI = async ({ dispatch, userMessage, messageHistory, exercise }) => {
    
    try {

        // Optimize the message history
        const optimizedHistory = optimizeMessageHistory(messageHistory, userMessage);

        // Build the system prompt
        const systemPrompt = buildSystemPrompt(optimizedHistory, exercise);

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