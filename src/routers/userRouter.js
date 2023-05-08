const express = require("express");

const userRouter = express.Router();

const handleMypage = (req, res) => {
  res.send("main");
};

userRouter.get("/", handleMypage);

export default userRouter; //index.js로 익스포트
