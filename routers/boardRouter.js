import express from "express";
import conn from "../db.js";

const boardRouter = express.Router();
const app = express();


boardRouter.get("/community", (req, res) => {
  if (req.session.user) {
    // 세션에 로그인 정보가 있는 경우
    const userId = req.session.user; // 사용자 아이디 가져오기

    // 데이터베이스에서 모든 게시글 목록 조회
    const sql = "SELECT idx, writedate, subject, name FROM cvc.board";

      // 게시글 목록 조회
      res.sendFile(process.cwd() + '/html/community(login).html');
      console.log(userId);
  }
    else {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    // res.redirect('/html/community');
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
})

// 게시글 작성페이지
boardRouter.post("/write_community", (req, res) => {
  if (req.session.user) {
    const name = req.session.user.name;
    const subject = req.body.subject;
    const content = req.body.content;

    // console.log(name, subject, content);

    // 현재 시간 구하기
    const writedate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // 데이터베이스 글 저장
    const sql = "INSERT INTO cvc.board (writedate, subject, name, content) VALUES (?, ?, ?, ?)";
    const values = [writedate, subject, name, content];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error saving post:", err);
        return;
      }

      console.log("Post saved sucessfully:", result);
      res.redirect("/board/community"); // 글작성이 완료되면 게시글목록 페이지로 이동
    });
  }
  
});

// 게시글 상세페이지
boardRouter.get("/community/:id", (req, res) => {
  const postId = req.params.id; // 상세 페이지로 이동할 게시글의 ID

  // 데이터베이스에서 해당 이름에 해당하는 게시글 정보 가져오기
  const sql = "SELECT writedate, subject, CONCAT(SUBSTRING_INDEX(name, ' ', 1), ' ', REPEAT('*', LENGTH(SUBSTRING_INDEX(name, ' ', -1)))) AS name, content FROM cvc.board WHERE id = ?";
  const values = [postName];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error fetching post :", err);
      return;
    }

    if (result.length === 0) {
      // 해당이름에 해당하는게시글이 없을경우
      console.log("게시글을 찾을수 없습니다.");
      return;
    }

    const post = result[0];  // 가져온 게시글 정보

    //게시글 상세 페이지 
    res.render("postDetail", { post: post }); // postDetail은 상세 페이지의 템플릿 이름입니다.
  })

})


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