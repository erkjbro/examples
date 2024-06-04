import OpenAI from 'openai';
// @ts-ignore
import type { ChatCompletionMessageParam } from 'openai/resources';

interface IOpenAIClient {
    getChatSummary(messages: ChatCompletionMessageParam[]): Promise<string | null>;
}

export class OpenAIClient implements IOpenAIClient {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI();
    }

    private getApiConfig() {
        return {
            model: 'gpt-3.5-turbo',
            max_tokens: 64,
            temperature: 0.7,
            top_p: 1
        }
    }

    public async getChatSummary(messages: ChatCompletionMessageParam[]) {
        const apiConfig = this.getApiConfig();
        const response = await this.client.chat.completions.create({
            messages: messages,
            ...apiConfig
        });
        return response.choices[0].message.content;
    }
}