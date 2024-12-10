import { addMessage, updateMessageContent, updateMessageStatus } from "../store/slices/chatSlice";
import modelList from '../store/modelList';

// API url
const API_BASE_URL = "http://127.0.0.1:5000";

// message history cleanup
const optimizeMessageHistory = ({messageHistory, userMessage}) => {
    const cleanup = messageHistory
    .map(({ author, content }) => `Author Name: ${author}, Author Message: ${content} --- `) // Format each message
    .join("\n"); // Use newline for better readability

    const fullHistory = "[" + cleanup + `Author Name: user, Author Last Message: ${userMessage}]`

    return fullHistory
};







// Main function
export const sendMessageToAPI = async ({ dispatch, userMessage, messageHistory, exercise }) => {

        
    try {
        
        const exo = exercise

        // Optimize the message history
        const optimizedHistory = optimizeMessageHistory({messageHistory: messageHistory , userMessage: userMessage});

        // get the model
        const modelSelected = modelList.find((model) => model.name === "Dieter 2.0");
        const temperature = modelSelected.message.temperature
        const maxOutputTokenLength = modelSelected.message.maxOutputTokenLength
        const inputContextWindow = modelSelected.message.inputContextWindow
        const systemPrompt = modelSelected.message.prompt({optimizedHistory: optimizedHistory, exercise: exo})

        // send API request
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ systemPrompt: systemPrompt, temperature: temperature, maxOutputTokenLength: maxOutputTokenLength, inputContextWindow: inputContextWindow}),
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