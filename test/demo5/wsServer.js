var ws = require("nodejs-websocket")
var port=8800;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
		console.log("Received "+str)
		conn.sendText(str.toUpperCase()+"!!!")
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
	conn.on("error", function (err) {
		console.log("handdle error");
		console.log(err);
	})
}).listen(port);
console.log("websocket server listening on port "+port);