const express = require("express");

const globalRouter = express.Router();

const handleMain = (req, res) => {
  res.send("main");
};

globalRouter.get("/", handleMain);

export default globalRouter; //index.js로 익스포트
