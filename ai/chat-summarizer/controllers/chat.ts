import { OpenAIClient } from "../apis";
// @ts-ignore
import type { ChatCompletionMessageParam } from 'openai/resources';

export const summarizeChat = async (messages: ChatCompletionMessageParam[]) => {
    const client = new OpenAIClient();
    const summary = await client.getChatSummary(messages);

    if (!summary) {
        console.log("No response from OpenAI API");
        return;
    }

    return summary;
}