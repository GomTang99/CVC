import express from "express";
import { mypage, resume, edit } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/mypage", mypage); //마이페이지
userRouter.get("/resume", resume); //나의 자기소개서쓰기
userRouter.get("/edit", edit); //프로필 편집

export default userRouter; //index.js로 익스포트
