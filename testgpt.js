import axios from "axios";

const apikey = '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';
const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// ChatGPT에 전달할 메시지
const message = '번역: 사과를 영어로 뭐라고 하나요?';

// API 요청을 보낼 데이터
const requestData = {
  prompt: message,
  max_token: 50, // 반환되는 텍스트의 최대 길이
  n: 1,  // 반환할 결과 수
};

// API 요청 보내기
try {
  const response = await axios.post(endpoint, requestData, {
    headers: {
      'Authorization': `Bearer ${apikey}`,
      'Content-Type': 'application/json',
    },
  });

  const completion = response.data.choices[0].text;
  console.log(completion);
} catch (error) {
  console.error('API 요청 중 오류 발생:', error);
}