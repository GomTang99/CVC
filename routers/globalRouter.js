import nodemailer from "nodemailer"
import express from "express";
import conn from "../db.js";
import dotenv from "dotenv";

import { callChatGPT } from '../public/js/chatgpt.js';


// .env 파일 로드
dotenv.config();


const globalRouter = express.Router();

const app = express();

//main홈페이지에서 넘어가는 페이지
//globalRouter(index, login, register, find_pw)

globalRouter.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/html/index.html");
});


// 자기소개서 저장
globalRouter.post("/saveText", (req, res) => {
  const userId = req.session.user.id; // 현재 로그인한 사용자의 이름
  const requestData = req.body;

  console.log("세션 내용:", req.session);
  const sql = `INSERT INTO cvc.mypage (user_id, text_1, text_2, text_3, text_4) VALUES (?, ?, ?, ?, ?)`;
  
  const values = [userId, requestData.txt1, requestData.txt2, requestData.txt3, requestData.txt4];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error('데이터 삽입 오류:', err);
      res.status(500).json({ success: false, message: '데이터 삽입 실패' });
    } else {
      console.log('데이터가 성공적으로 삽입되었습니다.');
      res.json({ success: true, message: '데이터 전송 및 저장 성공!' });
      res.redirect("/login");
    }
  });
});


globalRouter.get("/login",(req, res) => {
    res.sendFile(process.cwd() + "/html/login.html");
});


//로그인 구현(관리자 / 사용자 통합)
globalRouter.post("/login", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;

  const sql = `
    SELECT 'user' AS user_type, users_name AS name, users_id AS id
    FROM cvc.users
    WHERE users_id = ? AND users_pw = ?
    
    UNION

    SELECT 'admin' AS user_type, admin_name AS name, admin_id AS id
    FROM cvc.admin
    WHERE admin_id = ? AND admin_pw = ?
  `;
  const values = [id, pw, id, pw];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log("로그인 실패 : ", err);
      res.sendFile(process.cwd() + '/html/login.html');
    } else if (result.length === 0) {
      console.log("로그인 실패 : 아이디 또는 비밀번호가 올바르지 않습니다.");
      res.sendFile(process.cwd() + '/html/login.html');
    } else {
      // 세션 설정
      const user = result[0];
      req.session.user = {
        name: user.users_name,
        id: user.users_id,
        type: user.user_type
      };

      console.log("로그인 성공!!");
      if (user.user_type === 'admin') {
        res.sendFile(process.cwd() + '/html/index(login).html');
      } else {
        res.sendFile(process.cwd() + '/html/index(login).html');
      }
    }
  });
});


//회원가입 선택

globalRouter.get("/select_register", (req, res) => {
  res.sendFile(process.cwd() + "/html/select_register.html");
});


// 관리자 회원가입
globalRouter.get("/admin_register", (req, res) => {
  res.sendFile(process.cwd() + "/html/admin_register.html");
});

// 관리자 회원가입(아이디 중복 확인)
globalRouter.get("/checkId_admin", (req, res) => {
  const id = req.query.id;
  const checkIdsql = "SELECT admin_id FROM cvc.admin WHERE admin_id = ?";
  const checkIdValue = [id];

  conn.query(checkIdsql, checkIdValue, (err, result) => {
    if(err) {
      console.log("아이디 중복 체크 오류 : " ,err);
      res.status(500).json({error: '아이디 중복 체크 오류'});
    } else {
      const isDuplicate = result.length > 0;
      res.status(200).json({isDuplicate});
    }
  })
});

// 관리자 회원가입 기능
globalRouter.post("/admin_register", (req, res) => {
  const id = req.body.admin_id;
  const pw = req.body.admin_pw;
  const name = req.body.admin_name;
  const phone = req.body.admin_phone;
  const email = req.body.admin_email;
  const uniqueNumber = req.body.admin_num;

  // 필수 데이터 누락 여부 확인
  if (!id || !pw || !name || !email || !phone || !uniqueNumber) {
    res.status(400).json({ error: "필수 데이터가 누락되었습니다." });
    return;
  }

  const sql = "INSERT INTO cvc.admin (admin_id, admin_pw, admin_name, admin_email, admin_phone, admin_un) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [id, pw, name, email, phone, uniqueNumber];

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
    const email = req.body.user_email;
  
    // 필수 데이터 누락 여부 확인
    if (!id || !pw || !name || !email || !phone) {
      res.status(400).json({ error: "필수 데이터가 누락되었습니다." });
      return;
    }
  
    const sql = "INSERT INTO cvc.users (users_id, users_pw, users_name, users_email, users_phone) VALUES (?, ?, ?, ?, ?)";
    const values = [id, pw, name, email, phone];
  
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


// 비밀번호 찾기
globalRouter.get("/find_pw", (req, res) => {
    res.sendFile(process.cwd() + "/html/find_pw.html");
});


// 이메일 인증번호 발송
globalRouter.post("/find_pw"), async (req, res) => {
    // 환경 변수에서 SMTP 설정 정보 로드
  const smtpEmail = process.env.SMTP_EMAIL;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const subject = "비밀번호 재설정 인증 코드";
  const text = `인증코드: ${verificationCode}`;

  // 이메일 전송을 위한 Nodemailer 설정
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: smtpEmail,
      pass: smtpPassword,
    },
  });

  // 이메일 옵션 구성
  const mailOptions = {
    from: smtpEmail,
    to: req.body.user_email, // 수신자 이메일 주소
    subject: subject,
    text: text,
  };

  // 이메일 전송
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('이메일 전송 중 오류 발생:', error);
      res.status(500).send('이메일 전송 오류');
    } else {
      console.log('이메일이 성공적으로 전송되었습니다.');
      res.status(200).send('이메일 전송 완료');
    }
  });
};


// 인증번호 확인
globalRouter.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/html/");
});


// 비밀번호 재설정
globalRouter.get("/pw_reset", (req, res) => {
  res.sendFile(process.cwd() + "/html/pw_reset.html");
});



export default globalRouter;


