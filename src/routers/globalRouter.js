import { main } from "../controllers/boardController";
import { join, login } from "../controllers/userController";
const express = require("express");

const globalRouter = express.Router();

globalRouter.get("/", main); //boardController
globalRouter.get("/join", join); //userController
globalRouter.get("/login", login); //userController

export default globalRouter; //index.js로 익스포트
