const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require("path");

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve('./public/')));

app.get('/', (req, res) => {
    res.sendFile('index');
});

io.on('connection', socket => {
    console.log('A new user joined', socket.id);
    socket.on('user-con-msg', (username)=>{
        socket.broadcast.emit('new-user-con-msg-show', username)
    })

    socket.on('user-send-msg', (gotMsgObj)=>{
        socket.broadcast.emit('got-user-msg', gotMsgObj)  
    })
});

server.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server started`)
});