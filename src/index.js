const express = require("express");
const PORT = 5948;

const app = express();
//express application 이 만들어진 이후로 코드를 작성

const handleServer = () => {
  console.log(`✅ 서버 가동 http://localhost:${PORT}`);
};

const handleMain = (req, res) => {
  return res.send("메인화면");
};

app.listen(PORT, handleServer);
app.get("/", handleMain);
