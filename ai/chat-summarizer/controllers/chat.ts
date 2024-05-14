import { OpenAIClient } from "../apis";

export const summarizeChat = async (messages) => {
    const client = new OpenAIClient();
    const summary = await client.getChatSummary(messages);

    if (!summary) {
        console.log("No response from OpenAI API");
        return;
    }

    return summary;
}