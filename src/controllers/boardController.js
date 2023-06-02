import db from "../db.js";

export const main = (req, res) => {
  res.render("index.ejs", { pageTitle: "index" });
};

export const getUpload = (req, res) => {
  res.render("upload_board.ejs", { pageTitle: "Posting" });
};
export const postUpload = (req, res) => {
  const { title, content } = req.body;
  const queryString = "INSERT INTO freeboards (title, content) VALUES( ?,?)";
  const params = [title, content];

  db.query(queryString, params, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      const gotoFreeboard = "SELECT * FROM freeboards";

      db.query(gotoFreeboard, (err, rows, fields) => {
        if (err) {
          console.log(err);
          res.redirect("/");
        } else {
          console.log(rows);
          const freeboards = rows;
          res.render("freeboard.ejs", {
            pageTitle: "freeboard",
            freeboards,
          });
        }
      });
    }
  });
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
      console.log(err);
      res.redirect("/");
    } else {
      console.log(rows);
      const freeboards = rows;
      res.render("freeboard.ejs", {
        pageTitle: "freeboard",
        freeboards,
      });
    }
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
