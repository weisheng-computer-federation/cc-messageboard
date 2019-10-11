var c_socket = io();
c_socket.on('receive_message', (message) => {
    receive_message(message);
});
function receive_message(message){
    if (message.type == 'history_post' || message.type == 'post'){
        add_post(message.content);
    }
    if (message.type == 'history_chat' || message.type == 'chat'){
        add_chat(message.content);
    }

}
function add_post(message){
    let inner = '\
        <div class="post_entry">\
            <div class="post_user">' + message.user + '</div>\
            <div class="divider"></div>\
            <div class="post_content">' + message.content + '</div>\
        </div>\
    ';
    $('#posts').prepend(inner);
}
function add_chat(message){
    let inner = '\
        <div class="chat_entry">\
            <div class="chat_user">' + message.user + ':</div>\
            <div class="chat_content">' + message.content + '</div>\
        </div>\
    ';
    $(inner).insertAfter("#chats>.divider");
}
function send_message(message_type, message) {
    c_socket.emit('message', {
        type: message_type,
        content: message
    });
}
function send_chat() {
    send_message('chat', {
        user: $('#chat_input_user').val(), 
        content: $('#chat_input_content').val()
    });
    $('#chat_input_content').val('');
}
function send_post() {
    send_message('post', {
        user: $('#post_input_user').val(), 
        content: $('#post_input_content').val()
    });
    $('#post_input_user').val('');
    $('#post_input_content').val('');
}
function keypress(e){
    let keynum;
    if (window.event) // IE
        keynum = e.keyCode;
    else if (e.which) // Netscape/Firefox/Opera
        keynum = e.which;
    if (keynum == 13){
        send_chat();
    }
}