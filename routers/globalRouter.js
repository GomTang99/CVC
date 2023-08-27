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
            req.session.user = { id: id, pw: pw };

            console.log("로그인 성공!!");
            //res.redirect("/index(login)");
            res.sendFile(process.cwd() + '/html/index(login).html');
        }
    });
});

globalRouter.get("/register",(req, res) => {
    res.sendFile(process.cwd() + "/html/register.html");
});

// 서버 측 Node.js 코드
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

// 회원 가입
globalRouter.post("/register", (req, res) => {
    const id = req.body.user_id;
    const pw = req.body.user_pw;
    const name = req.body.user_name;
    const phone = req.body.user_phone;

    const sql = "INSERT INTO cvc.users (users_id, users_pw, users_name, users_phone) VALUES (?, ?, ?, ?)";
    const values = [id, pw, name, phone];

    // 아이디 중복 체크 수행
    const checkIdsql = "SELECT users_id FROM cvc.users WHERE users_id = ?";
    const checkIdvalue = [id];

    conn.query(checkIdsql, checkIdvalue, (err, result) => {
        if (err) {
            console.error('아이디 중복 체크 오류 : ', err);
            res.status(500).json({ error: '아이디 중복 체크 오류' });
        } else {
            const isDuplicate = result.length > 0;
            if (isDuplicate) {
                //res.status(400).json({ error: '이미 존재하는 아이디입니다.' });
            } else {
                if(id && pw && name && phone) {
                // 아이디 중복이 없는 경우 회원 가입 처리
                conn.query(sql, values, (err, result) => {
                    if (err) {
                        console.log('데이터 삽입 오류 : ', err);
                        res.status(500).json({ error: '회원 가입 오류' });
                    } else {
                        console.log('데이터 삽입 성공');
                        res.sendFile(process.cwd() + '/html/login.html');
                        //res.status(200).json({ success: true });
                    }
                });
              }
            }
        }
    });
});




globalRouter.get("/find_pw", (req, res) => {
    res.sendFile(process.cwd() + "/html/find_pw.html");
});


export default globalRouter;


