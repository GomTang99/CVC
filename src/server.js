import express from "express"; //express
import morgan from "morgan"; //http메소드, url, status code등을 확인 할 수 있는 미들웨어
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import boardRouter from "./routers/boardRouter.js";
import path from "path";
const __dirname = path.resolve();

const logger = morgan("dev");
const PORT = 5948; //로컬호스트 포트번호
const app = express(); //express 어플리케이션
//express application 이 만들어진 이후로 코드를 작성-------------------------------------------------

//controller
const handleServer = () => {
  console.log(`✅ 서버 가동 http://localhost:${PORT}`);
};

app.use(express.static("src/css"));
app.use(logger); //모든 route에 미들웨어를 삽입 맨위에 올라와있어야 적용됨
app.listen(PORT, handleServer); //서버 가동

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/board", boardRouter);