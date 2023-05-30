import express from "express";

const boardRouter = express.Router();

boardRouter.get("/community", (req, res) => {
    res.sendFile(process.cwd() + "/html/community.html");
});

boardRouter.get("/employ_infor", (req, res) => {
    res.sendFile(process.cwd() + "/html/employ_infor.html");
});

boardRouter.get("/expertprofile", (req, res) => {
    res.sendFile(process.cwd() + "/html/expertprofile.html");
});

boardRouter.get("/notice", (req, res) => {
    res.sendFile(process.cwd() + "/html/notice.html");
});

export default boardRouter;