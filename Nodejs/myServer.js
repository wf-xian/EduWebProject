var ws = require("nodejs-websocket");
var port = 3000;	//服务器端口

var usersID = [];	//当前连接(登录)的ID
var connections = [];	//websocket连接
var clientCount = 0;	//当前连接人数


var server = ws.createServer(function (conn) {
	console.log("new connection~");
	var Uid;
	conn.on("text", function (JSONstring) {
		var json = JSON.parse(JSONstring);
		Uid = json.fromID;
		if(json .flag=="system"){	//来自系统的消息
			if (json.msg=="login") {	//登录操作
				var idx;
				if( (idx=usersID.indexOf(Uid)) >= 0 ){	//判断账号是否已登录
					console.log("relogin:" + Uid);
					var json = { "flag":"system","msg":"relogin" };
					connections[idx].sendText(JSON.stringify(json));
					connections[idx].close();	//断开原有的登录连接
					conn.sendText("重复登录,已断开原有连接");
				}
				usersID.push(Uid);
				connections.push(conn);
				clientCount++;
				console.log("login ID:" + Uid);	//有新连接
			} else if(json.msg=="logout"){	//注销登录
				console.log("logout ID:" + Uid);	//有新连接
				var idx = usersID.indexOf(Uid);
				connections[idx].sendText("正在注销登录");
				connections[idx].close();	//断开原有的登录连接
			}
		}
		if(json.flag=="user"){	//来自用户的消息
			console.log("Message from user: " + json.fromID + " to friend: " + json.toID + " by group: " + " msg: " + JSONstring);
			//conn.sendText(JSONstring);
			//broadcast(connections,JSONstring);	//广播消息
			var idx = usersID.indexOf(json.toID);	//把信息精确转播到接收用户的连接上
			if ( idx >= 0) {
				connections[idx].sendText(JSONstring);	//转发消息
			}
			
		}
		if(json.flag=="group"){	//来自群组的消息  //把消息转播给所有群成员
			var idx = usersID.indexOf(json.toID);	//把信息精确转播到接收用户的连接上
			if ( idx >= 0) {
				connections[idx].sendText(JSONstring);	//转发消息
				console.log("Message from user: " + json.fromID + " to user: " + json.toID + " by group: " + json.gno + " msg: " + JSONstring);
			}
		}
	});
	
	
	conn.on("close", function (code, reason) {
		console.log("Connection closed ID: " + Uid );
		usersID.remove(Uid);
		connections.remove(conn);
		clientCount--;
	});
	conn.on("error", function (err) {
		console.log("handdle error");
		console.log(err);
	});
}).listen(port);	//监听端口
console.log("websocket server started, listening on port "+port);

function broadcast(Allconnection,JSONstring) {	//在Allconnection中广播JSONstring消息
    // 取到server下面的所有连接
    Allconnection.forEach(function(connection) {
        connection.sendText(JSONstring);
    });
}

Array.prototype.contains = function(element) {//判断值是否已存在
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
}
Array.prototype.remove = function(val) {	//重写数组的remove()方法:按值删除数组元素
	for(var i=0; i<this.length;i++){
	    var index = this.indexOf(val);
	    if(index>-1){
	        this.splice(index,1);
	    }
	}
};