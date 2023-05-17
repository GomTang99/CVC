import express from "express";
import { main } from "../controllers/boardController.js";
import {
  getJoin,
  postJoin,
  getLogin,
  postLoin,
  findpw,
} from "../controllers/userController.js";

const globalRouter = express.Router();

globalRouter.get("/", main); //boardController
globalRouter.route("/join").get(getJoin).post(postJoin); //userController
globalRouter.route("/login").get(getLogin).post(postLogin); //userController
globalRouter.get("/find-pw", findpw); //userController

export default globalRouter; //index.js로 익스포트
