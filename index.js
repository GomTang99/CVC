import express from "express";
import path from "path";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";

import "./db.js";

import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import boardRouter from "./routers/boardRouter.js";

const __dirname = path.resolve();

const port = process.env.PORT || 5948;

const app = express();

app.use(express.static(__dirname + "/C.V.C"));
app.use('/public', express.static('public'));
app.use('/img', express.static('img'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");
app.use(cors());

// 세션 미들웨어
app.use(session({
    secret: 'cvc',
    resave: false,
    saveUninitialized: true
}));

// Body-parser 설정
app.use(bodyParser.urlencoded({ extended : true}));

// JSON 파싱 미들웨어 추가
app.use(express.json());


app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);


app.listen(port, function() {
    console.log('서버 가동');
});




