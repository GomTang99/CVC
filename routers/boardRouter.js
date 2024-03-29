import express from "express";
import conn from "../db.js";
import mysql from "mysql2/promise";


const boardRouter = express.Router();
const app = express();

// 게시판 라우터
// 게시판 목록 조회
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
      const sql = "SELECT idx, writedate, subject, name, views FROM cvc.board";
      const [result] = await connection.execute(sql);

      // 연결 종료
      await connection.end();

      // 조회 결과를 클라이언트에 전달
      res.render("community_list(login)", { userId, posts: result });
    } catch (error) {
      console.error("게시글 목록 조회 오류:", error);
      res.status(500).send("게시글 목록 조회 중 오류 발생");
    }
  } else {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    res.redirect('/login');
  }
});



boardRouter.get("/write_community", (req, res) => {
  res.sendFile(process.cwd() + "/html/write_community.html");
})

// 게시글 작성페이지
boardRouter.post("/write_community", (req, res) => {
  if (req.session.user && req.session.user.type === 'user') {
    const name = req.session.user.name;
    const subject = req.body.subject;
    const content = req.body.content;

    console.log(name);
    
    // 현재 시간 구하기
    const writedate = new Date().toISOString().slice(0, 10);

    // 데이터베이스 글 저장
    const sql = "INSERT INTO cvc.board (writedate, subject, name, content) VALUES (?, ?, ?, ?)";
    const values = [writedate, subject, name, content];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error saving post:", err);
        return;
      }

      console.log("Post saved successfully:", result);
      res.redirect("/board/community"); // 글 작성이 완료되면 게시글 목록 페이지로 이동
    });
  } else {
    // 사용자가 로그인하지 않았거나, 권한이 없는 경우에 대한 처리를 추가할 수 있습니다.
    res.redirect("/login"); // 또는 다른 적절한 처리
  }
  
});


// 게시글 상세 페이지 라우트
boardRouter.get('/community/:postIdx', (req, res) => {
  const postIdx = req.params.postIdx;

  // 게시글 정보를 데이터베이스에서 조회
  const sql = 'SELECT * FROM board WHERE idx = ?';
  conn.query(sql, [postIdx], (err, result) => {
    if (err) {
      console.error('게시글 조회 오류:', err);
      res.status(500).send('게시글 조회 중 오류 발생');
      return;
    }

    const post = result[0]; // 조회한 게시글 정보

    // 댓글 정보를 데이터베이스에서 조회
    const commentSql = 'SELECT * FROM comments WHERE post_id = ?';
    conn.query(commentSql, [postIdx], (err, comments) => {
      if (err) {
        console.error('댓글 조회 오류:', err);
        res.status(500).send('댓글 조회 중 오류 발생');
        return;
      }

      res.render('postDetail(login)', { post, comments });
    });
  });
});


// 조회수 증가 라우트
boardRouter.post('/community/:postIdx/increaseView', (req, res) => {
  const postIdx = req.params.postIdx;

  // 해당 게시글의 조회수 1 증가
  const increaseSql = `UPDATE cvc.board SET views = views + 1 WHERE idx = ${postIdx}`;
  conn.query(increaseSql, (err, result) => {
    if (err) {
      console.error('조회수 증가 오류', err);
      res.status(500).send('조회수 증가 중 오류 발생');
      return;
    }
    
    // 조회수 증가에 성공하면 응답
    res.send('조회수가 증가되었습니다.');
  });
});



// 댓글 추가 라우트
boardRouter.post('/community/:postIdx/comment', (req, res) => {
  const postIdx = req.params.postIdx;
  const author = req.session.user.name; // 현재 로그인한 사용자 이름
  const content = req.body.content;

  // 현재 시간 구하기
  const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // 댓글 데이터베이스에 저장
  const sql = 'INSERT INTO comments (post_id, author, content, created_at) VALUES (?, ?, ?, ?)';
  conn.query(sql, [postIdx, author, content, created_at], (err, result) => {
    if (err) {
      console.error('댓글 작성 오류:', err);
      res.status(500).send('댓글 작성 중 오류 발생');
      return;
    }

    // 댓글을 작성한 게시글로 리다이렉트
    res.redirect(`/board/community/${postIdx}`);
    console.log('댓글이 성공적으로 작성되었습니다.');
  });
});


// 공지게시판 라우터


// 공지게시판 작성 페이지
boardRouter.get("/write_notice(admin)", (req, res) => {
  res.sendFile(process.cwd() + "/html/write_notice(admin).html");
})

boardRouter.post("/write_notice(admin)", (req, res) => {
  if (req.session.user) {
    const category = "공지사항";
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
      res.redirect("/board/notice(admin)"); // 글작성이 완료되면 게시글목록 페이지로 이동
    });
  }
  
});


// 관리자 끝


// 공지사항 게시판 목록 조회(유저)
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

      // 데이터베이스에서 모든 공지사항 게시글 목록 조회
      const sql = "SELECT idx, category, title, writedate, name FROM cvc.notice";
      const [result] = await connection.execute(sql);

      // 연결 종료
      await connection.end();

      // 조회 결과를 클라이언트에 전달
      res.render("noticeList(login)", { userId, posts: result });
    } catch (error) {
      console.error("공지사항 목록 조회 오류:", error);
      res.status(500).send("공지사항 목록 조회 중 오류 발생");
    }
  } else {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    res.redirect('/login');
  }
});

// 공지사항 상세 페이지 라우트(유저)
boardRouter.get('/notice/:postIdx', (req, res) => {
  const postIdx = req.params.postIdx;

  // 공지사항 정보를 데이터베이스에서 조회
  const sql = 'SELECT * FROM notice WHERE idx = ?';
  conn.query(sql, [postIdx], (err, result) => {
    if (err) {
      console.error('게시글 조회 오류:', err);
      res.status(500).send('게시글 조회 중 오류 발생');
      return;
    }

    const post = result[0]; // 조회한 게시글 정보

    // 댓글 정보를 데이터베이스에서 조회
    const commentSql = 'SELECT * FROM noticecomments WHERE post_id = ?';
    conn.query(commentSql, [postIdx], (err, comments) => {
      if (err) {
        console.error('댓글 조회 오류:', err);
        res.status(500).send('댓글 조회 중 오류 발생');
        return;
      }

      res.render('postDetailNotice(login)', { post, comments });
    });
  });
});

// 댓글 추가 라우트
boardRouter.post('/notice/:postIdx/noticecomment', (req, res) => {
  const postIdx = req.params.postIdx;
  const author = req.session.user.name; // 현재 로그인한 사용자 이름
  const content = req.body.content;

  // 현재 시간 구하기
  const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // 댓글 데이터베이스에 저장
  const sql = 'INSERT INTO noticecomments (post_id, author, content, created_at) VALUES (?, ?, ?, ?)';
  conn.query(sql, [postIdx, author, content, created_at], (err, result) => {
    if (err) {
      console.error('댓글 작성 오류:', err);
      res.status(500).send('댓글 작성 중 오류 발생');
      return;
    }

    // 댓글을 작성한 게시글로 리다이렉트
    res.redirect(`/board/notice/${postIdx}`);
    console.log('댓글이 성공적으로 작성되었습니다.');
  });
});

// 유저 끝


// AI컨설팅

boardRouter.get("/AI_consult", async (req, res) => {
  res.sendFile(process.cwd() + "/html/AI_consult.html");
});


//AI컨설팅 테스트(ejs)
boardRouter.get("/AI_consult1", async (req, res) => {
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

    // 세션에서 사용자 ID 가져오기
    const userName = req.session.user.name;

    // 데이터베이스에서 마이페이지 정보 가져오기
    const sql = 'SELECT * FROM mypage WHERE user_id = ?';
    const [rows] = await connection.execute(sql, [userName]);

    if (rows.length === 0) {
      res.status(404).send('사용자 정보를 찾을 수 없음');
      return;
    }

    const userMypageData = rows;

    res.render('aiconsult', {
      userId: userName,
      posts: userMypageData,
    });

    // 연결 종료
    connection.end();
  } catch (error) {
    console.error('DB 오류:', error);
    res.status(500).send('서버 오류');
  }

});

// 참고문헌
boardRouter.get("/works_cited", (req, res) => {
  res.sendFile(process.cwd() + "/html/works_cited.html");
});




export default boardRouter;