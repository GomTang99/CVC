import { main } from "../controllers/boardController";
import { join, login, findpw } from "../controllers/userController";
const express = require("express");

const globalRouter = express.Router();

globalRouter.get("/", main); //boardController
globalRouter.get("/join", join); //userController
globalRouter.get("/login", login); //userController
globalRouter.get("/find-pw", findpw); //userController

export default globalRouter; //index.js로 익스포트
