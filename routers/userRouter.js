import express from "express";
import multer from "multer";
import conn from "../db.js";
import mysql from "mysql2/promise";

const userRouter = express.Router();

const app = express();

//마이페이지
userRouter.get("/mypage", async (req, res) => {
    if (req.session.user) {
        // 세션에 로그인 정보가 있으면 프로필 페이지 표시
        const userId = req.session.user.id; // 사용자 아이디
        try {
          // DB 연결
          const dbConfig = {
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: 'wnsdud5948!@',
            database: 'CVC',
          };

          // DB 연결
          const connection = await mysql.createConnection(dbConfig);

          // DB 자소서 목록 조회
          const sql = "SELECT idx, user_id, text_1, text_2, text_3, text_4 FROM cvc.mypage WHERE user_id = ?";
          const [result] = await connection.execute(sql);

          // 연결 종료
          await connection.end();

          // 조회 결과를 클라이언트에 전달
          res.render("mypage(login)", {userId, posts: result});
        }
        catch (error) {
          console.error("자기소개서 목록 조회 오류:", error);
          res.status(500).send("자기소개서 목록 조회 중 오류 발생");
        }
      } else {
        // 로그인 X
        res.redirect('/login');
      }
});

userRouter.post("/", (req, res) => {
  
})


// 마이페이지 자기소개서 상세 라우트





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