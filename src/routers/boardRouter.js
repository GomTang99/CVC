import express from "express";
import {
  recruit,
  recruitDetail,
  expert,
  expertDetail,
  getUpload,
  postUpload,
  getFreeboard,
  postFreeboard,
  freeboardDetail,
  notice,
  noticeDetail,
  service,
  serviceDetail,
} from "../controllers/boardController.js";

const boardRouter = express.Router();

boardRouter.get("/recruit", recruit); //채용정보
boardRouter.get("/recruit/:id([0-9,a-f]{12})", recruitDetail); //채용정보 상세페이지
boardRouter.get("/expert", expert); //전문가정보
boardRouter.get("/expert/:id([0-9,a-f]{12})", expertDetail); //전문가정보 상세페이지
boardRouter.route("/upload").get(getUpload).post(postUpload); // 게시판 글작성
boardRouter.route("/freeboard").get(getFreeboard).post(postFreeboard); //자유게시판
boardRouter.get("/freeboard/:id([0-9,a-f]{12})", freeboardDetail); //자유게시판 상세페이지
boardRouter.get("/notice", notice); //공지사항
boardRouter.get("/notice/:id([0-9,a-f]{12})", noticeDetail); //공지사항 상세페이지
boardRouter.get("/service", service); //Q&A
boardRouter.get("/service/:id([0-9,a-f]{12})", serviceDetail); //Q&A 상세페이지

export default boardRouter; //index.js로 익스포트
