const express = require('express');

const PORT = 5948;

const app = express();

app.use(express.static(__dirname + "/C.V.C"));
app.use('/public', express.static('public'));
app.use('/img', express.static('img'));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/html/index.html");
});

app.listen(5948, function() {
    console.log('서버 가동');
});

// 로그인창 이동
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/html/login.html");
});


