var express = require('express');
var app = express();
var http = require('http').createServer(app);
var s_socket = require('socket.io')(http);
var history_chat = [], history_post = [];
app.use('/', express.static('front'));
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/front/index.html');
});
s_socket.on('connection', (c_socket)=>{
    c_socket.on('message', (msg)=>{
        s_socket.emit('receive_message', msg);
        if (msg.type == 'chat'){
            history_chat.push(msg);
            if (history_chat.length > 99)
                history_chat.shift();
        }
        if (msg.type == 'post'){
            history_post.push(msg);
            if (history_post.length > 8)
                history_post.shift();
        }
    });
    for (let i in history_chat) {
        history_chat[i].type = 'history_chat';
        c_socket.emit('receive_message', history_chat[i]);
    }
    for (let i in history_post) {
        history_post[i].type = 'history_post';
        c_socket.emit('receive_message', history_post[i]);
    }
});
http.listen(2333, ()=>{
    console.log('server start on 2333');
});