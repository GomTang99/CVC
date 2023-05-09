// import userRouter from "./routers/userRouter";
// import boardRouter from "./routers/boardRouter";

const express = require("express"); //express
const morgan = require("morgan"); //http메소드, url, status code등을 확인 할 수 있는 미들웨어
const logger = morgan("dev");
const PORT = 5948; //로컬호스트 포트번호
const app = express(); //express 어플리케이션
import globalRouter from "./routers/globalRouter";
//express application 이 만들어진 이후로 코드를 작성-------------------------------------------------

//controller
const handleServer = () => {
  console.log(`✅ 서버 가동 http://localhost:${PORT}`);
};

app.use(logger); //모든 route에 미들웨어를 삽입 맨위에 올라와있어야 적용됨
app.listen(PORT, handleServer); //서버 가동

app.use("/", globalRouter);
// app.use("/users", userRouter);
// app.use("/board", boardRouter);
