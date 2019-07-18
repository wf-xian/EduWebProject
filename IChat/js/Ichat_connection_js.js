		
		var Uid;
		var ChattingTargetID;
		var ChattingTargetTable;
		var ChattingTargetState;
		var WS;
		function newConn(){//判断是否存在本地登录记录，不存在则跳到登录页面，否则直接登录
			var storage = window.localStorage;//从localStorage中获取ID
			if ( storage.Uid == null ){
				window.location = "../html/login_html.html";
			}else{
				Uid = storage.Uid;
				Connection(Uid);
			}

//			if ( window.opener == null ) {
//				window.location = "../html/login_html.html";
//			} else{
//				Uid = window.opener.document.getElementById("account").value;	//获得父窗口中 登录账号文本框 的值
//				Connection(Uid);
//			}
		}
		
		function Connection(uid){//连接服务器
			WS = new WebSocket("ws://localhost:3000");
			
			WS.onopen=function(){
				console.log("WS open");
				document.title = "Welcome To IChat: "+uid;
				var jsonmessage = {"flag":"system",
					"fromID":uid,
					"msg":"login"
				};
				WS.send(JSON.stringify(jsonmessage));	//打开连接时立即发送登录信息
				$("#myInformation").html(uid);
				LoadFriends(uid);	//加载好友列表
				LoadFriendsChatting(uid);	//加载聊天列表
				LoadGroups(uid);	//加载群列表
				LoadGroupsChatting(uid);	//加载群聊天列表
				$("#l1").click();
				$("#myInformation").click();
			}
			WS.onerror=function(){
				console.log("WS error close");
				alert("连接发生错误");
			}
			WS.onclose=function(){
				console.log("WS close");
				alert("已断开连接");
				//window.localStorage.clear();	//清除localStorage记录
				//window.location = "../html/login_html.html";//返回登录窗口
			}
			WS.onmessage=function(e){
				//alert(e.data);
				var jsonmassage = JSON.parse(e.data);
				if(jsonmassage.flag=="system"){
					if(jsonmassage.msg=="relogin"){
						alert("账号在其他地方登录");
						//window.localStorage.clear();
					}
				}
				if(jsonmassage.flag=="user"){
					if (jsonmassage.msg=="newmsg") {//收到好友新消息
						if (jsonmassage.fromID==ChattingTargetID&&ChattingTargetTable=="friends") {//已打开窗口，刷新聊天记录
							LoadFriendsChattingLogs(Uid,ChattingTargetID);
						} else{	//未打开窗口,刷新聊天列表
							LoadFriendsChatting(Uid);
						}
					}
				}
				if(jsonmassage.flag=="group"){
					if (jsonmassage.msg=="newmsg") {//收到群消息
						if (jsonmassage.gno==ChattingTargetID&&ChattingTargetTable=="groups") {//已打开窗口，刷新聊天记录
							LoadGroupsChattingLogs(ChattingTargetID);
						} else{	//未打开窗口,刷新聊天列表
							LoadGroupsChatting(Uid);
						}
					}
				}
			}
			window.onbeforeunload = function () {
				WS.close();
			}
		}

