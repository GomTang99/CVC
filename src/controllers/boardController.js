import db from "../db.js";

export const main = (req, res) => {
  res.render("index.ejs", { pageTitle: "index" });
};

export const getUpload = (req, res) => {
  res.render("upload_board.ejs", { pageTitle: "Posting" });
};
export const postUpload = (req, res) => {
  return res.render("/");
};

export const recruit = (req, res) => {
  res.render("recruit.ejs", { pageTitle: "recruit" });
};
export const recruitDetail = (req, res) => {
  res.render("recruit.ejs", { pageTitle: "recruit:detail" });
};

export const expert = (req, res) => {
  res.render("expert.ejs", { pageTitle: "expert" });
};
export const expertDetail = (req, res) => {
  res.render("expert.ejs", { pageTitle: "expert:detail" });
};
export const getFreeboard = (req, res) => {
  const queryString = "SELECT * FROM freeboards";

  db.query(queryString, (err, rows, fields) => {
    if (err) {
      throw err;
    }
    console.log(rows);
    const freeboards = rows;
    res.render("freeboard.ejs", {
      pageTitle: "freeboard",
      freeboards,
    });
  });
};
export const postFreeboard = (req, res) => {
  return res.redirect("/");
};
export const freeboardDetail = (req, res) => {
  res.render("index.ejs", { pageTitle: "freeboard:detail" });
};
export const notice = (req, res) => {
  res.render("notice.ejs", { pageTitle: "notice" });
};
export const noticeDetail = (req, res) => {
  res.render("notice.ejs", { pageTitle: "notice:detail" });
};
export const service = (req, res) => res.send("service");
export const serviceDetail = (req, res) => res.send("service detail");
