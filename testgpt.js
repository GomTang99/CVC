process.env.OPENAI_API_KEY = "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";

function chat(question) {
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    }),
  })
    .then((res) => res.json())
    .then((data) => data.choices[0].message.content);
}

chat("야!").then((answer) => console.log(answer));

import { createInterface } from "readline";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("💬 ChatGPT 터미널 챗앱 💬\n");
rl.prompt();

rl.on("line", (question) => {
  chat(question).then((answer) => {
    console.log(`🤖 ${answer}\n`);
    rl.prompt();
  });
});
