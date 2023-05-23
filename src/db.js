import mysql from "mysql2"; //보안문제로 mysql2사용권장

//연결정보 .env파일에서 불러옴
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

connection.query("SELECT * FROM CVC", function (err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

connection.end();
