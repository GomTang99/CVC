import { request, response } from "express";
import express from "express";
import mysql from "mysql2";
const app = express();
import bodyParser from 'body-parser';
//const bodyParser = require('body-parser');

//Database connection pool
const conn = mysql.createConnection({  // mysql 접속 설정
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'wnsdud5948!@',
    database: 'CVC'
});

//conn.connect();

conn.connect((err) => {
    if (err) {
        console.log('DB 연결 실패');
    }else {
    console.log('DB 연결');
    }
});

// JSON 데이터 파싱을 위한 body-parser 미들웨어 등록
app.use(bodyParser.json());

// POST 요청을 처리하는 라우트핸들러
app.post('/register', (req, res) => {   
    // 클라이언트에서 전송된 데이터 추출
    const id = req.body.user_id;
    const pw = req.body.user_pw;
    const name = req.body.user_name;
    //const gender = req.body.user_gender;
    //const email = req.body.user_email;

    //conn.connect((err) => {
    //    if (err) {
    //        console.error('MySQL 연결오류 : ', err);
    //        res.status(500).json({error : 'MySQL 연결 오류'});
    //    } else {
    //        console.log('MySQL 연결 성공');
    //    }

        // 데이터 삽입 쿼리 실행
        console.log('데이터 삽입ffffff');
        const sql = 'INSERT INTO cvc.users (user_id, user_pw, user_name) VALUSE (?, ?, ?)';
        conn.query(sql, [id, pw, name], (err, result) => {
            if (err) {
                console.error('데이터 삽입 오류 : ', err);
                //res.status(500).json({error: '데이터 삽입 오류'});
                res.sendFile('/html/register');
            } else {
                console.log('데이터 삽입 성공1');
                //res.status(200).json({Message : '데이터 삽입 성공2'});
                res.sendFile('/html/index.html');
            }
        })
    })


conn.end();