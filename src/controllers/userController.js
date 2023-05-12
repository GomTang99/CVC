export const join = (req, res) => {
  res.render("register.ejs", { pageTitle: "register" });
};
export const login = (req, res) => {
  res.sendFile(process.cwd() + "/src/html/register.html");
};

export const edit = (req, res) => res.send("editprofile");

export const mypage = (req, res) => {
  res.sendFile(process.cwd() + "/src/html/mypage.html");
};
export const resume = (req, res) => res.send("resume");
export const findpw = (req, res) => res.send("findpw");
