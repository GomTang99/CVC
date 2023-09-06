import express from "express";
import path from "path";
import session from "express-session";
import bodyParser from "body-parser";

//이메일 인증을 위한 import
import nodemailer from "nodemailer";

import "./db.js";

import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import boardRouter from "./routers/boardRouter.js";

const __dirname = path.resolve();

const PORT = 5948;

const app = express();

app.use(express.static(__dirname + "/C.V.C"));
app.use('/public', express.static('public'));
app.use('/img', express.static('img'));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Gmail SMTP 설정
const verificationCode = nodemailer.createTransport({
    servic: "Gmail", // 이메일 서비스 제공자 선택
    auth: {
        user: "parkjuneyoung194786@gmail.com", // 이메일 발신자 계정
        psss: "wnsdud5948", // 발신자 계정 비번
    },
});


// 세션 미들웨어
app.use(session({
    secret: 'cvc',
    resave: false,
    saveUninitialized: true
}));

// Body-parser 설정
app.use(bodyParser.urlencoded({ extended : true}));


app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);


app.listen(5948, function() {
    console.log('서버 가동');
});




