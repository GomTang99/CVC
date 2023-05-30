import express from "express";

const globalRouter = express.Router();

//main홈페이지에서 넘어가는 페이지
//globalRouter(index, login, register, find_pw)
globalRouter.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/html/index.html");
});

globalRouter.get("/login",(req, res) => {
    res.sendFile(process.cwd() + "/html/login.html");
});

globalRouter.get("/register",(req, res) => {
    res.sendFile(process.cwd() + "/html/register.html");
});

globalRouter.get("/find_pw", (req, res) => {
    res.sendFile(process.cwd() + "/html/find_pw.html");
});

export default globalRouter;
