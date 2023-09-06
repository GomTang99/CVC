import express from "express";
import conn from "../db.js";
import mysql from "mysql2/promise";

const boardRouter = express.Router();
const app = express();


// 게시판 라우터

boardRouter.get("/community", async (req, res) => {
  if (req.session.user) {
    // 세션에 로그인 정보가 있는 경우
    const userId = req.session.user; // 사용자 아이디 가져오기

    try {
      // 데이터베이스 연결 설정
      const dbConfig = {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'wnsdud5948!@',
        database: 'CVC',
      };

      // 데이터베이스 연결
      const connection = await mysql.createConnection(dbConfig);

      // 데이터베이스에서 모든 게시글 목록 조회
      const sql = "SELECT idx, writedate, subject, name FROM cvc.board";
      const [result] = await connection.execute(sql);

      // 연결 종료
      await connection.end();

      // 조회 결과를 클라이언트에 전달
      res.render("community_list", { userId, posts: result });
    } catch (error) {
      console.error("게시글 목록 조회 오류:", error);
      res.status(500).send("게시글 목록 조회 중 오류 발생");
    }
  } else {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    res.redirect('/html/community');
  }
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


// 공지게시판 라우터

// 공지게시판 작성 페이지
boardRouter.get("/write_notice", (req, res) => {
  res.sendFile(process.cwd() + "/html/write_notice.html");
})

boardRouter.post("/write_notice", (req, res) => {
  if (req.session.user) {
    const category = req.body.category;
    const title = req.body.title;
    const name = req.session.user.name;
    const content = req.body.content;

    // console.log(name, subject, content);

    // 현재 시간 구하기
    const writedate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // 데이터베이스 글 저장
    const sql = "INSERT INTO cvc.notice (category, title, name, writedate, content) VALUES (?, ?, ?, ?, ?)";
    const values = [category, title, name, writedate, content];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error saving post:", err);
        return;
      }

      console.log("Post saved sucessfully:", result);
      res.redirect("/board/notice"); // 글작성이 완료되면 게시글목록 페이지로 이동
    });
  }
  
});



// 공지사항 게시판 목록 조회
boardRouter.get("/notice", async (req, res) => {
  if (req.session.user) {
    // 세션에 로그인 정보가 있는 경우
    const userId = req.session.user; // 사용자 아이디 가져오기

    try {
      // 데이터베이스 연결 설정
      const dbConfig = {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'wnsdud5948!@',
        database: 'CVC',
      };

      // 데이터베이스 연결
      const connection = await mysql.createConnection(dbConfig);

      // 데이터베이스에서 모든 공지 게시글 목록 조회
      const sql = "SELECT idx, category, title, writedate FROM cvc.notice";
      const [result] = await connection.execute(sql);

      // 연결 종료
      await connection.end();

      // 조회 결과를 클라이언트에 전달
      res.render("notice_list", { userId, posts: result });
    } catch (error) {
      console.error("공지글 목록 조회 오류:", error);
      res.status(500).send("공지글 목록 조회 중 오류 발생");
    }
  } else {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    res.redirect('/login');
  }
});

// 전문가 라우터

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


// 채용정보 라우터

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

export default boardRouter;