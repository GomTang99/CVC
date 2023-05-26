import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

//연결정보 .env파일에서 불러옴
const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

const db = mysql.createConnection(connection); // DB 커넥션 생성
db.connect(); // mysql과 연결

db.connect((err) => {
  if (err) {
    console.log("❌ DB 연결실패!");
  } else {
    console.log("✅ DB 연결!");
  }
});

db.query("SELECT * FROM cvc.user", function (err, results, fields) {
  if (!err) {
    console.log(results);
  } else {
    console.log(err);
  }
});

db.end(); // 연결 해제
