export const getJoin = (req, res) => {
  res.render("join.ejs", { pageTitle: "join" });
};
export const postJoin = (req, res) => {
  return res.redirect("/");
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
