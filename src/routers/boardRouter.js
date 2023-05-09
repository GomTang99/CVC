import {
  recruit,
  recruitDetail,
  expert,
  expertDetail,
  freeboard,
  freeboardDetail,
  notice,
  noticeDetail,
  qa,
  qaDetail,
} from "../controllers/boardController";

const express = require("express");

const boardRouter = express.Router();

boardRouter.get("/recruit", recruit); //채용정보
boardRouter.get("/recruit/:id", recruitDetail); //채용정보 상세페이지
boardRouter.get("/expert", expert); //전문가정보
boardRouter.get("/expert/:id", expertDetail); //전문가정보 상세페이지
boardRouter.get("/freeboard", freeboard); //자유게시판
boardRouter.get("/freeboard/:id", freeboardDetail); //자유게시판 상세페이지
boardRouter.get("/notice", notice); //공지사항
boardRouter.get("/notice/:id", noticeDetail); //공지사항 상세페이지
boardRouter.get("/QA", qa); //Q&A
boardRouter.get("/QA/:id", qaDetail); //Q&A 상세페이지

export default boardRouter; //index.js로 익스포트