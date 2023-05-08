const express = require("express");
const PORT = 5948;

const app = express();

const handleServer = () => {
  console.log(`✅ 서버 가동 http://localhost:${PORT}`);
};

app.listen(PORT, handleServer);
