import { mypage, resume } from "../controllers/userController";

const express = require("express");

const userRouter = express.Router();

userRouter.get("/mypage", mypage);
userRouter.get("/resume", resume);

export default userRouter; //index.js로 익스포트
