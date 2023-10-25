import express from "express";
import multer from "multer";
import conn from "../db.js";
import mysql from "mysql2/promise";

const userRouter = express.Router();

const app = express();

//마이페이지
userRouter.get("/mypage_login", async (req, res) => {
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

    res.render('mypage(login)', {
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

// 마이페이지 자기소개서 내용 불러오기
userRouter.get("/getCVContent", async (req, res) => {
    try {
      // 데이터베이스 연결 설정
      const dbConfig = {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'wnsdud5948!@',
        database: 'CVC',
      };

      const idx = req.query.idx;

      const sql = "SELECT text_1, text_2, text_3, text_4 FROM mypage WHERE idx = ?";
      const [rows] = await connection.execute(sql, [idx]);

      if (rows.length === 0) {
        res.status(404).send('자기소개서 찾을수 없음');
        return;
      }

      res.json(rows[0]);
      connection.end();
    } catch (error) {
      console.error('DB 오류:', error);
      res.status(500).send('서버 오류');
    }
});


// 마이페이지 자기소개서 상세 라우트




// 마이페이지 자기소개서 수정 / 저장
userRouter.post('/updateCVText', (req, res) => {

});



// 파일 업로드를 저장할 디렉토리 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 업로드된 파일을 저장할 폴더 설정
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + extname); // 파일 이름 설정 (고유한 이름으로 저장)
  },
});

const upload = multer({ storage: storage });

// 이미지 업로드 라우트
userRouter.post('/user/uploadImage', upload.single('avatar'), (req, res) => {
  if (req.file) {
    // 업로드된 이미지가 있는 경우
    console.log('파일 업로드 성공:', req.file);

    // 이미지 파일 경로를 클라이언트로 보내기
    res.json({ success: true, avatarPath: req.file.path });
  } else {
    // 업로드된 이미지가 없는 경우
    res.status(400).json({ success: false, message: '이미지 업로드 실패' });
  }
});


export default userRouter;