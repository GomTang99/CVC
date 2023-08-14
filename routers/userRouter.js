import express from "express";

const userRouter = express.Router();

userRouter.get("/mypage", (req, res) => {
    // res.sendFile(process.cwd() + "/html/mypage.html");
    if (req.session.user) {
        // 세션에 로그인 정보가 있으면 프로필 페이지 표시
        res.sendFile(process.cwd() + '/html/mypage.html');
      } else {
        // 로그인되지 않았으면 로그인 페이지로 리디렉션
        res.redirect('/login');
      }
    
});

export default userRouter;