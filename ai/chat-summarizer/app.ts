import { summarizeChat } from "./controllers";
import { messages } from "./mocks";

const app = async () => {
    const summary = await summarizeChat(messages);
    console.log(summary);
}

await app();
