import "./db.js";
import app from "./server.js";

//server.js에는 server관련된것만, db.js에는 db에관련된것만 init.js는 필요한모든것을 import하는 파일이될것이다.

//로컬호스트 포트번호
const PORT = 5948;

//controller
const handleServer = () => {
  console.log(`✅ 서버 가동 http://localhost:${PORT}`);
};

app.listen(PORT, handleServer); //서버 가동
