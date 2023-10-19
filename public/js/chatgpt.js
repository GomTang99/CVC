import { config } from 'dotenv';
config();

//const { Configuration, OpenAIApi } = require("openai");
import { Configuration, OpenAIApi } from "openai";

export async function callChatGPT(prompt) {
    
    const configuration = new Configuration({
        apiKey : process.env.OPENAI_API_KEY,
    });
    
    try {
        const openai = new OpenAIApi(configuration);

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            message: [{role: "user", content: prompt}],
        });
        return response.data.choices[0].message;

    } catch (error) {
        console.error("ChatGPT API 불러오기 중 오류:", error);
        return null;
    }
}   
