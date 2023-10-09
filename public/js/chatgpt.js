import openai from "openai";

async function callChatGPT(prompt) {
    openai.configure({
        apiKey: process.env.OPEN_AI_KEY,
    });

    try {
        const response = await openai.ChatCompletion.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        return null;
    }
}

export { callChatGPT };
