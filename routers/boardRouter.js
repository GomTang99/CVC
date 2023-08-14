import express from "express";
// import conn from "../db.js";
const boardRouter = express.Router();

// boardRouter.get("/community", (req, res) => {
//     res.sendFile(process.cwd() + '/html/community.html');
// });

boardRouter.get("/community", (req, res) => {
  if (req.session.user) {
    // 세션에 로그인 정보가 있는 경우
    const user = req.session.user;
    // 로그인된 사용자의 정보를 활용하여 원하는 작업 수행

    res.sendFile(process.cwd() + '/html/community(login).html', { user: user });
  } else {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    //res.redirect('/html/community');
    res.sendFile(process.cwd() + '/html/community.html');
  }
});


boardRouter.get("/employ_infor", (req, res) => {
    if (req.session.user) {
        // 세션에 로그인 정보가 있는 경우
        const user = req.session.user;
        // 로그인된 사용자의 정보를 활용하여 원하는 작업 수행
    
        res.sendFile(process.cwd() + '/html/employ_infor.html', { user: user });
      } else {
        // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
        res.sendFile(process.cwd() + '/html/login.html');
      }
    // res.sendFile(process.cwd() + "/html/employ_infor.html");
});

boardRouter.get("/write_community", (req, res) => {
  res.sendFile(process.cwd() + "/html/write_community.html");
});

boardRouter.get("/expertprofile", (req, res) => {
    if (req.session.user) {
        // 세션에 로그인 정보가 있는 경우
        const user = req.session.user;
        // 로그인된 사용자의 정보를 활용하여 원하는 작업 수행
    
        res.sendFile(process.cwd() + '/html/expertprofile.html', { user: user });
      } else {
        // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
        res.redirect(process.cwd() + '/html/login.html');
      }
    // res.sendFile(process.cwd() + "/html/expertprofile.html");
});

boardRouter.get("/notice", (req, res) => {
    if (req.session.user) {
        // 세션에 로그인 정보가 있는 경우
        const user = req.session.user;
        // 로그인된 사용자의 정보를 활용하여 원하는 작업 수행
    
        res.sendFile(process.cwd() + '/html/notice.html', { user: user });
      } else {
        // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
        res.sendFile(process.cwd() + '/html/login.html');
      }
    // res.sendFile(process.cwd() + "/html/notice.html");
});

export default boardRouter;