import express from "express";
import conn from "../db.js";


const globalRouter = express.Router();

const app = express();

//main홈페이지에서 넘어가는 페이지
//globalRouter(index, login, register, find_pw)
globalRouter.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/html/index.html");
});

/*
globalRouter.get("/index(login)", (req, res) => {
    const {id, pw} = req.session.user;
    console.log(id);
    console.log(pw);
    res.sendFile(process.cwd() + "/html/index(login).html");
});
*/

globalRouter.get("/login",(req, res) => {
    res.sendFile(process.cwd() + "/html/login.html");
});

//로그인 구현
globalRouter.post("/login", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    
    console.log(req.body);
    console.log(id, pw);

    const sql = "SELECT * FROM cvc.users WHERE users_id = ? AND users_pw = ?";
    const value = [id, pw];
    conn.query(sql, value, (err, result) => {
        if (err) {  
            console.log("로그인 실패 : ", err);
            res.sendFile(process.cwd() + '/html/login.html');
        }else if(result.length === 0){
            console.log("로그인 실패 : ", err);
            res.sendFile(process.cwd() + '/html/login.html');
        } 
        else {
            // 세션 설정
            const user = result[0];
            req.session.user = {name : user.users_name};
            console.log(user);

            console.log("로그인 성공!!");
            //res.redirect("/index(login)");
            res.sendFile(process.cwd() + '/html/index(login).html');
        }
    });
});

globalRouter.get("/register",(req, res) => {
    res.sendFile(process.cwd() + "/html/register.html");
});

// 서버 측 Node.js 코드(아이디 중복확인)
globalRouter.get("/checkId", (req, res) => {
    const id = req.query.id;
    const checkIdsql = "SELECT users_id FROM cvc.users WHERE users_id = ?";
    const checkIdvalue = [id];
    
    conn.query(checkIdsql, checkIdvalue, (err, result) => {
        if (err) {
            console.error('아이디 중복 체크 오류 : ', err);
            res.status(500).json({ error: '아이디 중복 체크 오류' });
        } else {
            const isDuplicate = result.length > 0;
            res.status(200).json({ isDuplicate });
        }
    });
});

// 회원가입 구현 (데이터베이스 저장)
globalRouter.post("/register", (req, res) => {
    const id = req.body.user_id;
    const pw = req.body.user_pw;
    const name = req.body.user_name;
    const phone = req.body.user_phone;
  
    // 필수 데이터 누락 여부 확인
    if (!id || !pw || !name || !phone) {
      res.status(400).json({ error: "필수 데이터가 누락되었습니다." });
      return;
    }
  
    const sql = "INSERT INTO cvc.users (users_id, users_pw, users_name, users_phone) VALUES (?, ?, ?, ?)";
    const values = [id, pw, name, phone];
  
    conn.query(sql, values, (err, result) => {
      if (err) {
        console.log("데이터 삽입 오류 : ", err);
        res.status(500).json({ error: "회원 가입 오류" });
      } else {
        console.log("데이터 삽입 성공");
        res.redirect("/login");
        // res.status(200).json({ success: true }); // 클라이언트에게 성공 메시지를 반환
      }
    });
  });

  

globalRouter.get("/find_pw", (req, res) => {
    res.sendFile(process.cwd() + "/html/find_pw.html");
});


export default globalRouter;


