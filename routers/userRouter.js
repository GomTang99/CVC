import express from "express";

const userRouter = express.Router();

userRouter.get("/mypage", (req, res) => {
    res.sendFile(process.cwd() + "/html/mypage.html");
});

export default userRouter;