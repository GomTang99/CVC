import { freeboard, faq } from "../controllers/boardController";

const express = require("express");

const boardRouter = express.Router();

boardRouter.get("/freeboard", freeboard);
boardRouter.get("/community/faq", faq);

export default boardRouter; //index.js로 익스포트
