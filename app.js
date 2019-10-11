var io = require('socket.io-client');
var notifier = require('node-notifier');
var args = require('minimist')(process.argv);
var host = args.h == undefined ? '192.168.6.233' : args.h;
var socket = io('http://' + host + ':2333');
socket.on('receive_message', (message) => {
    if (message.type == 'post'){
        notifier.notify({
            title: '新公告:' + message.content.user,
            message: message.content.content
        });
    }
});