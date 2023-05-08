const express = require("express");
const morgan = require("morgan"); //http메소드, url, status code등을 확인 할 수 있는 미들웨어
const PORT = 5948;

const app = express();
const logger = morgan("dev");
//express application 이 만들어진 이후로 코드를 작성-------------------------------------------------

//controller
const handleServer = () => {
  console.log(`✅ 서버 가동 http://localhost:${PORT}`);
};

const handleMain = (req, res) => {
  return res.send("메인화면");
};

app.use(logger); //app.use() : 모든 route에 미들웨어를 삽입
app.listen(PORT, handleServer);
app.get("/", handleMain);
