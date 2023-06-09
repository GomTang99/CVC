import express from "express";
import path from "path";

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

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);

app.listen(5948, function() {
    console.log('서버 가동');
});




