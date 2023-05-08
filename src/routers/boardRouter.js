const express = require("express");

const boardRouter = express.Router();

const handleFreeboard = (req, res) => {
  res.send("main");
};

boardRouter.get("/", handleFreeboard);

export default boardRouter; //index.js로 익스포트
