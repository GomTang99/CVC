import db from "../db.js";

export const getJoin = (req, res) => {
  res.render("join.ejs", { pageTitle: "join" });
};
export const postJoin = (req, res) => {
  const { id, password, name, nickname } = req.body;
  const queryString =
    "INSERT INTO users (id,password,name,nickname) VALUES(?,?,?,?)";
  const params = [id, password, name, nickname];

  db.query(queryString, params, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.render("login.ejs", { pageTitle: "login" });
    }
  });
};

export const getLogin = (req, res) => {
  res.render("login.ejs", { pageTitle: "login" });
};
export const postLogin = (req, res) => {
  return res.redirect("/");
};

export const edit = (req, res) => res.send("editprofile");

export const mypage = (req, res) => {
  res.render("mypage.ejs", { pageTitle: "mypage" });
};
export const resume = (req, res) => res.send("resume");
export const findpw = (req, res) => {
  res.render("find_pw.ejs", { pageTitle: "findpw" });
};
