import path from "path";
const __dirname = path.resolve();

export const join = (req, res) => {
  res.sendFile(__dirname + "/src/html/register.html");
};
export const login = (req, res) => {
  res.sendFile(__dirname + "/src/html/register.html");
};

export const edit = (req, res) => res.send("editprofile");

export const mypage = (req, res) => {
  res.sendFile(__dirname + "/src/html/mypage.html");
};
export const resume = (req, res) => res.send("resume");
export const findpw = (req, res) => res.send("findpw");
