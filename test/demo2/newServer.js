var app = require('express')(); //引入express库
var http = require('http').Server(app); //将express注册到http中
var io = require('socket.io')(http);
//当访问根目录时，返回html页面
//app.get('/', function(req, res){
// 	 res.sendFile(__dirname + '/webSocketDemo2.html');
//});

//连接成功时
var usocket = []; //全局变量
io.on('connection', function(socket){
 	console.log('a user connected');
 	socket.on("join", function (name) {
 		usocket[name] = socket
 		io.emit("join", name) //服务器通过广播将新用户发送给全体群聊成员
  	})
 	
 	socket.on("message", function (msg) {
    	io.emit("message", msg) //将新消息广播出去
  	})
});


//启动监听，监听3000端口
http.listen(3000, function(){
	console.log('listening on port:3000');
});