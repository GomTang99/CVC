import express from "express";
import multer from "multer";

const userRouter = express.Router();

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

//마이페이지
userRouter.get("/mypage", (req, res) => {
    // res.sendFile(process.cwd() + "/html/mypage.html");
    if (req.session.user) {
        // 세션에 로그인 정보가 있으면 프로필 페이지 표시
        res.sendFile(process.cwd() + '/html/mypage(login).html');
      } else {
        // 로그인되지 않았으면 로그인 페이지로 리디렉션
        res.redirect('/login');
      }
    
});


// 마이페이지 자기소개서 상세 라우트



export default userRouter;