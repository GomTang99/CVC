const express = require("express");

const PORT = 5948;

const app = express();

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
