import { request, response } from "express";
import express from "express";
import mysql from "mysql2";
const app = express();
import bodyParser from 'body-parser';

// JSON 데이터 파싱을 위한 body-parser 미들웨어 등록
app.use(bodyParser.json());

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


export default conn;