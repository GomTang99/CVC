import { response } from "express";
import express from "express";
import mysql from "mysql2";
const app = express();

//Database connection pool
const conn = mysql.createConnection({  // mysql 접속 설정
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'wnsdud5948!@',
    database: 'CVC'
});

conn.connect();

conn.connect((err) => {
    if (err) {
        console.log('DB 연결 실패');
    }else {
    console.log('DB 연결');
    }
});



app.get('/register', function (req, res) {
    conn.query('SELECT * FROM cvc.users',function (err, result, field) {
        if (err) {
            console.log(err);
        }else {
            console.log(result);
        }
    })
    res.sendFile(path.join(__dirname + '/html/register.html'));
});

app.post('/register', function (req, res) {
    /*
    var user_id = request.body.user_id;
    console.log(user_id);
    if (user_id) {
        conn.query('SELECT * FROM cvc.users WHERE user_id = ?',[user_id], function (err, result, field) {
            if (err) throw err;
            if (result.length <= 0) {
                conn.query('INSERT INTO cvc.users(user_id) VALUES(?)', [user_id], function (err, data) {
                    if (err) {
                        console.log(err);
                    }else {
                        console.log(data);
                    }
                });
                res.send('아이디 입력성공');
            }
        })
    }
    */
   console.log("zzzzzzzzzzzzzzzz");
    return res.redirect("/");
});




conn.end();