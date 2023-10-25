import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();

async function callChatGPT(prompt) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return response.data.choices[0].message;

  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    return null;
  }
}

export { callChatGPT };

/*

import * as openai from 'openai';

// .env 파일에서 환경 변수를 로드합니다.
require('dotenv').config();

const prompt = "번역: 사과를 영어로 뭐라고 하나요?";

// API 키 설정
const apiKey = process.env.OPENAI_API_KEY;

// ChatGPT 호출
openai.configure({
  apiKey,
});

(async () => {
  try {
    const response = await openai.Completion.create({
      engine: 'davinci-codex', // 사용할 엔진 선택
      prompt, // 사용할 프롬프트
      max_tokens: 50, // 반환할 최대 토큰 수
      n: 1, // 반환할 예측 수
    });

    console.log(response.choices[0].text); // 결과 출력
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
})();
*/