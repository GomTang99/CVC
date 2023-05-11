import path from "path";
const __dirname = path.resolve();

export const main = (req, res) => {
  res.sendFile(__dirname + "/src/html/index.html");
};
export const recruit = (req, res) => {
  res.sendFile(__dirname + "/src/html/employ_info.html");
};
export const recruitDetail = (req, res) => res.send("recruitDetail");

export const expert = (req, res) => res.send("expert");
export const expertDetail = (req, res) => res.send("expertDetail");
export const freeboard = (req, res) => {
  res.sendFile(__dirname + "/src/html/community.html");
};
export const freeboardDetail = (req, res) => res.send("freeboardDetail");
export const notice = (req, res) => {
  res.sendFile(__dirname + "/src/html/notice.html");
};
export const noticeDetail = (req, res) => res.send("noticeDetail");
export const service = (req, res) => res.send("service");
export const serviceDetail = (req, res) => res.send("service detail");
