const express = require('express');

const PORT = 5948;

const app = express();

// const handlelistening = () =>
// console.log('Server listening on port http://localhost:5948');

// app.listen(PORT, handlelistening);

app.use(express.static(__dirname + "/C.V.C"));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/html/index.html");
});

app.listen(PORT, () => {
    console.log('Listen : ${PORT}');
});