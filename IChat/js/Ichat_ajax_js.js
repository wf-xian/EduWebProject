		function LoadFriends(uid){	//加载好友列表
			$.ajax({ 
				url:"../php/LoadFriends.php",
				type:"POST", //'POST'
			    data:{"UNo":uid},
				success:function(result){
					var result = JSON.parse(result);
					$('#list2 li').remove();
					for(var i in result){
						var industry = result[i];
						var obj = "<li title='"+industry.UName+"'><div>"+industry.FNo+"</div></li>";
						$("#list2").append(obj);
					}
					//$("#list2").menu();
				},
				error:function(){alert('请求发送错误')}        
			});
		}
		function LoadFriendsChatting(uid){	//加载好友聊天列表
			$.ajax({ 
				url:"../php/LoadFriendsChatting.php",
				type:"POST", //'POST'
			    data:{"UNo":uid},
				success:function(result){
					var result = JSON.parse(result);
					$('#list1 li').remove();
					for(var i in result){
						var industry = result[i];
						var obj;
						if (industry.isChatting == "unRead") {
							obj = "<li title='"+industry.UName+"  未读:"+industry.unRead+"'><div  style='color: red; font-weight: bolder;' >"+industry.FNo+"</div></li>";
						} else{
							obj = "<li title='"+industry.UName+"'><div>"+industry.FNo+"</div></li>";
						}
						
						$("#list1").append(obj);
					}
					//$("#list1").menu();
				},
				error:function(){alert('请求发送错误')}        
			});
		}
		
		function LoadFriendsChattingLogs(FromNo, ToNo){	//加载聊天窗口的聊天记录内容
			$.ajax({ 
				url:"../php/LoadFriendsChattingLogs.php",
				type:"POST", //'POST'
			    data:{"FromNo":FromNo,"ToNo":ToNo},
				success:function(result){
					var result = JSON.parse(result);
					$('#myChattingLogsList li').remove();
					for(var i in result){
						var industry = result[i];
						var obj;
						if ( industry.FromNo == Uid ) {
							obj = "<li style='float: right; text-align:right; margin-bottom: 10px;'><div><div>"+industry.DateTime+"</div><div style='word-wrap: break-word;word-break: break-all;overflow: hidden; width: 570px; text-align:left; border: groove; '>"+industry.Message+"</div></div></li>";
						} else{
							obj = "<li style='float: left;  text-align:left; margin-bottom: 10px; '><div><div>"+industry.DateTime+"</div><div style='word-wrap: break-word;word-break: break-all;overflow: hidden; width: 570px; text-align:left; border: groove; '>"+industry.Message+"</div></li>";
						}
						$("#myChattingLogsList").append(obj);
					}
				    var scrollHeight = $('#myChatting').prop("scrollHeight"); 
      				//$('#myChatting').scrollTop(scrollHeight,200);	//滑动条自动滑动到最底部
				    $('#myChatting').animate({scrollTop:scrollHeight}, 300);	//滑动动画,过程400ms
				    SetState(FromNo,ChattingTargetTable,ToNo,ChattingTargetState,'yes',0);
				},
				error:function(){alert('请求发送错误')}        
			});
		}
		
		
		function FriendsChattingLogsNumber(FromNo, ToNo){	//加载聊天窗口的聊天记录内容
			//alert(FromNo+","+ToNo);
			var num=0;
			$.ajax({ 
				url:"../php/FriendsChattingLogsNumber.php",
				type:"POST", //'POST'
			    data:{"FromNo":FromNo,"ToNo":ToNo},
			    async:false,
				success:function(result){
					//alert(result)
					num = result;
				},
				error:function(){alert('请求发送错误')}        
			});
			return num;
		}
		
		function LoadFriendsChattingLogsAll(FromNo, ToNo, page, num){	//加载聊天窗口的聊天记录内容
			//alert(FromNo+","+ToNo);
			//alert(page);
			$.ajax({ 
				url:"../php/LoadFriendsChattingLogsAll.php",
				type:"POST", //'POST'
			    data:{"FromNo":FromNo,"ToNo":ToNo,"page":page,"num":num},
				success:function(result){
					var result = JSON.parse(result);
					$('#AllChatlogsUl li').remove();
					for(var i in result){
						var industry = result[i];
						var obj = "<li style='margin:5px;'><div><div>"+industry.FromNo+": "+industry.DateTime+"</div><div style='word-wrap: break-word;word-break: break-all;width:550px;border-bottom: groove;'>"+industry.Message+"</div></li>";
						$("#AllChatlogsUl").append(obj);
					}
					$("#ACLPageNumberSelect").find("option").attr("selected",false);//清除原有所有选中
					$("#ACLPageNumberSelect").find("option[value='"+page+"']").attr("selected",true);//选中为当前页
				},
				error:function(){alert('请求发送错误')}        
			});
		}
		
		
		function LoadGroups(uid){	//加载群组列表
			$.ajax({ 
				url:"../php/LoadGroups.php",
				type:"POST", //'POST'
			    data:{"UNo":uid},
				success:function(result){
					var result = JSON.parse(result);
					$('#list4 li').remove();
					for(var i in result){
						var industry = result[i];
						var obj = "<li title='"+industry.GName+"'><div>"+industry.GNo+"</div></li>";
						$("#list4").append(obj);
					}
					//$("#list4").menu();
				},
				error:function(){alert('请求发送错误')}        
			});
		}
		
		
		function LoadGroupsChatting(uid){	//加载群组聊天列表
			$.ajax({ 
				url:"../php/LoadGroupsChatting.php",
				type:"POST", //'POST'
			    data:{"UNo":uid},
				success:function(result){
					var result = JSON.parse(result);
					$('#list3 li').remove();
					for(var i in result){
						var industry = result[i];
						var obj;
						if (industry.isChatting == "unRead") {
							obj = "<li title='"+industry.GName+"  未读:"+industry.unRead+"'><div style='color: red; font-weight: bolder;' >"+industry.GNo+"</div></li>";
						} else{
							obj = "<li title='"+industry.GName+"'><div>"+industry.GNo+"</div></li>";
						}
						
						$("#list3").append(obj);
					}
					//$("#list1").menu();
				},
				error:function(){alert('请求发送错误')}        
			});
		}
		
		function LoadGroupsChattingLogs(GNo){	//加载聊天窗口的聊天记录内容
			$.ajax({ 
				url:"../php/LoadGroupsChattingLogs.php",
				type:"POST", //'POST'
			    data:{"GNo":GNo},
				success:function(result){
					var result = JSON.parse(result);
					$('#myChattingLogsList li').remove();
					for(var i in result){
						var industry = result[i];
						var obj;
						if ( industry.FromNo == Uid ) {
							obj = "<li style='float: right; text-align:right; margin-bottom: 10px;'><div><div>"+industry.DateTime+"</div><div style='word-wrap: break-word;word-break: break-all;overflow: hidden; width: 570px; text-align:left; border: groove; '>"+industry.Message+"</div></div></li>";
						} else{
							obj = "<li style='float: left;  text-align:left; margin-bottom: 10px; '><div><div>"+industry.FromNo+": "+industry.DateTime+"</div><div style='word-wrap: break-word;word-break: break-all;overflow: hidden; width: 570px; text-align:left; border: groove; '>"+industry.Message+"</div></li>";
						}
						$("#myChattingLogsList").append(obj);
					}
				    var scrollHeight = $('#myChatting').prop("scrollHeight"); 
      				//$('#myChatting').scrollTop(scrollHeight,200);	//滑动条自动滑动到最底部
				    $('#myChatting').animate({scrollTop:scrollHeight}, 300);	//滑动动画,过程400ms
				    //alert(Uid+","+ChattingTargetTable+","+GNo+","+ChattingTargetState+","+'yes');
				    SetState(GNo,"group",Uid,'group','yes',0);
				},
				error:function(){alert('请求发送错误')}        
			});
		}
		
		
		function GroupsChattingLogsNumber(GNo){	//加载聊天窗口的聊天记录内容
			//alert(FromNo+","+ToNo);
			var num=0;
			$.ajax({ 
				url:"../php/GroupsChattingLogsNumber.php",
				type:"POST", //'POST'
			    data:{"GNo":GNo},
			    async:false,
				success:function(result){
					//alert(result)
					num = result;
				},
				error:function(){alert('请求发送错误')}        
			});
			return num;
		}
		
		function LoadGroupsChattingLogsAll(GNo, page, num){	//加载聊天窗口的聊天记录内容
			//alert(page);
			$.ajax({ 
				url:"../php/LoadGroupsChattingLogsAll.php",
				type:"POST", //'POST'
			    data:{"GNo":GNo,"page":page,"num":num},
				success:function(result){
					//alert(result)
					var result = JSON.parse(result);
					$('#AllChatlogsUl li').remove();
					for(var i in result){
						var industry = result[i];
						var obj = "<li style='margin:5px;'><div><div>"+industry.FromNo+": "+industry.DateTime+"</div><div style='word-wrap: break-word;word-break: break-all;width:550px;border-bottom: groove;'>"+industry.Message+"</div></li>";
						$("#AllChatlogsUl").append(obj);
					}
					$("#ACLPageNumberSelect").find("option").attr("selected",false);//清除原有所有选中
					$("#ACLPageNumberSelect").find("option[value='"+page+"']").attr("selected",true);//选中为当前页
				},
				error:function(){alert('请求发送错误')}        
			});
		}
		
		
		function LoadGroupsMembers(GNo){
			var members;
			$.ajax({	//查找群成员
				url:"../php/LoadGroupsMembers.php",
				type:"POST",
				data:{"GNo":GNo},
				async:false,		//！！！！
				success:function(result){
					members = result;
				},
				//error:function(){}
			});
			return members;
		}
		
		function UploadIMG(){
			var href;
			var formdata = new FormData($("#myform")[0]);
		    $.ajax({
		        url:"../php/UploadIMG.php",
		        type:"post",
		        data:formdata,
		        processData:false,
		        contentType:false,
		    	async:false,
		        success:function(result){href = result;},
			    error:function(e){alert("上传错误")},
			});
			return href;
       }
		
		
		function SendMessage(uid,chattingid,message){
			//alert(uid+","+chattingid+","+message);
			$.ajax({ 
				url:"../php/SendMessage.php",
				type:"POST", //'POST'
			    data:{"FromNo":uid,"ToNo":chattingid,"Message":message},
				success:function(result){
					//请求服务器转发提醒
					var jsonmessage = { "flag":"user","fromID":Uid,"toID":ChattingTargetID,"msg":'newmsg' };
					WS.send(JSON.stringify(jsonmessage));

				},
				error:function(){alert('请求发送错误')}        
			});
		}
		
		function SendGroupsMessage(uid,gno,message){
			//alert(uid+","+gon+","+message);
			$.ajax({ 
				url:"../php/SendGroupsMessage.php",
				type:"POST", //'POST'
			    data:{"GNo":gno,"FromNo":uid,"Message":message},
				success:function(result){
					var members = JSON.parse(LoadGroupsMembers(gno));
					//请求服务器转发提醒
					for( var i in members ){
						if( members[i].UNo != uid ){
							var jsonmessage = { "flag":"group","gno":gno,"fromID":uid,"toID":members[i].UNo,"msg":'newmsg' };
							WS.send(JSON.stringify(jsonmessage));
						}
					}
				},
				error:function(){alert('请求发送错误')}        
			});
		}
		
		function LoadInformation(id,ty){
			//alert(id+","+ty);
			var info;
			$.ajax({ 
				url:"../php/LoadInformation.php",
				type:"POST", //'POST'
				async:false,
			    data:{"id":id,"ty":ty},
				success:function(result){
					info = result;
				},
				error:function(){alert('请求发送错误')}        
			});
			return info;
		}
		
		
		function SetState(mainid,table,targetid,state,ischatting,unRead){
			//alert(uid+","+table+","+chattingid+","+state+","+ischatting);
			$.ajax({ 
				url:"../php/SetState.php",
				type:"POST", //'POST'
			    data:{"MainID":mainid,
			    	  "Table":table,
			    	  "TargetID":targetid,
			    	  "State":state,
			    	  "isChatting":ischatting,
			    	  "unRead":unRead
			    },
			    success:function(result){
					LoadFriends(Uid);
					LoadFriendsChatting(Uid);
					LoadGroups(Uid);
					LoadGroupsChatting(Uid);
				},
				error:function(){alert('请求发送错误')}        
			});
		}
		
		function AddNewGroup(gname,uid){
			//alert(gname+","+uid);
			$.ajax({ 
				url:"../php/AddNewGroup.php",
				type:"POST", //'POST'
			    data:{"GName":gname,"UNo":uid},
				success:function(result){
				},
				error:function(){alert('请求发送错误')}        
			});
		}
  
		function SearchNo(uid,sid,ty){
			//alert(uid+","+sid+","+ty);
			$.ajax({ 
				url:"../php/SearchNo.php",
				type:"POST", //'POST'
				async:false,
			    data:{"MainID":uid,"SID":sid,"ty":ty},
				success:function(result){
					if(uid==sid && ty=="user"){
					    var dialog4 = $( "#dialog4" ).dialog({
					      autoOpen: false,
					      modal: true,
					      buttons: {
					          "确认": function() {
								$( this ).dialog( "close" );
					         }
					      },
					      close: function() {
					        //form[ 0 ].reset();
					      }
					    });
					    var dialog3 = $( "#dialog3" ).dialog({
					      autoOpen: false,
					      modal: true,
					      buttons: {
					           "确认": function() {
					           		if(ResultInformation($("#newaccount").val(),$("#newname").val(),$("#newemail").val(),$("#newpsw").val())){
					           			dialog4.dialog("open");
					           			$( this ).dialog( "close" );
					           		}
					        	},
					           "取消": function() {
					          		$( this ).dialog( "close" );
					        	}
					      },
					      close: function() {
					      	$("#dialog3 table").hide();
					        //form[ 0 ].reset();
					      }
					    });
						var info = JSON.parse(LoadInformation(sid,'user'));
						info = info[0];
						$("#newaccount").val(info.UNo);
						$("#newname").val(info.UName);
						$("#newpsw").val(info.UPsw);
						$("#newemail").val(info.UEmail);
						dialog3.dialog( "open" );
						$("#dialog3 table").show();
					}
					if(result=="NotExistUser"){
						//用户不存在
						$( "#dialog-NoThisNo" ).dialog("open");
					}
					if (result=="Friend") {
						//已是好友
						//打开信息界面
						var info = JSON.parse(LoadInformation(sid,'user'));
						info = info[0];
						var id = "<p>ID: "+info.UNo+"</p>";
						var name = "<p>Name: "+info.UName+"</p>";
						var email = "<p>E-mail: "+info.UEmail+"</p>";
						$( "#dialogtext" ).html(id+name+email);
						$("#dialog-confirm").attr("title","好友信息");
						$('#db').val("删除好友");
						$('#db').html("删除好友");
						$('#db').show();
						$('#db2').show();
						$( "#dialog-confirm" ).dialog("open");
					} 
					if(result=="NoFriend" && sid != uid){
						//非好友
						$("#dialog-confirm").attr("title","添加好友");
						var info = JSON.parse(LoadInformation(sid,'user'));
						info = info[0];
						var id = "<p>ID: "+info.UNo+"</p>";
						var name = "<p>Name: "+info.UName+"</p>";
						var email = "<p>E-mail: "+info.UEmail+"</p>";
						$( "#dialogtext" ).html(id+name+email);
						$('#db').val("添加好友");
						$('#db').html("添加好友");
						$('#db').show();
						$('#db2').show();
						$( "#dialog-confirm" ).dialog("open");
					}
					if(result=="NotExistGroup"){
						//群组不存在
						$( "#dialog-NoThisNo" ).dialog("open");
					}
					if (result=="Group") {
						//已加入群
						//打开信息界面
						$("#dialog-confirm").attr("title","群组信息");
						var info = JSON.parse(LoadInformation(sid,'group'));
						ginfo = info[0];
						var id = "<p>ID: "+ginfo.GNo+"</p>";
						var name = "<p>Name: "+ginfo.GName+"</p>";
						var build = "<p>Build: "+ginfo.BuildDate+"</p>";

			            var html = "<div style='overflow-y:scroll; max-height:200px;'>成员列表:<table style='text-align:center;'><tr><td>ID</td><td>Name</td><td>E-mail</td></tr>";
			            for( var i in info ) {
			                html += "<tr>";
			                html +=     "<td style='border-bottom: groove;'>" + info[i].UNo + "</td>"
			                html +=     "<td style='border-bottom: groove;'>" + info[i].UName + "</td>"
			                html +=     "<td style='border-bottom: groove;'>" + info[i].UEmail + "</td>"
			                html += "</tr>";
			            }
			            html += "</table><div>";
			               
						$( "#dialogtext" ).html(id+name+build+html);
						$('#db').val("退出该群");
						$('#db').html("退出该群");
						$('#db').show();
						$('#db2').show();
						$( "#dialog-confirm" ).dialog("open");
					} 
					if (result=="NoGroup") {
						//未加入群
						$("#dialog-confirm").attr("title","添加群组");
						var info = JSON.parse(LoadInformation(sid,'group'));
						info = info[0];
						var id = "<p>ID: "+info.GNo+"</p>";
						var name = "<p>Name: "+info.GName+"</p>";
						var build = "<p>Build: "+info.BuildDate+"</p>";
						$( "#dialogtext" ).html(id+name+build);
						$('#db').val("加入该群");
						$('#db').html("加入该群");
						$('#db').show();
						$('#db2').show();
						$( "#dialog-confirm" ).dialog("open");
					}

				},
				error:function(){alert('请求发送错误')}        
			});
		}
		
		function ResultInformation(uno,uname,uemail,upsw){
			var is;
			$.ajax({
				url:"../php/ResetInformation.php",
				type:"POST",
				async:false,
				data:{"UNo":uno,"UName":uname,"UEmail":uemail,"UPsw":upsw},
				success:function(result){is=true;},
				error:function(){is=false;}
			});
			return is;
		}
