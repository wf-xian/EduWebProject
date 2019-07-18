		$(function(){
			$("#myInformation").on("click",function(){
				ChattingTargetID = $(this).text();
				ChattingTargetTable = "user";
				ChattingTargetState = 'friend';
				$("#myChattingTarget").html(ChattingTargetID);
				LoadFriendsChattingLogs(Uid,Uid);
			});
			
//			$("#AddGroupButton").on("click",function(){
//				var gname = prompt("请输入群名称");
//				AddNewGroup(gname,Uid);
//				LoadGroups(Uid);
//				LoadGroupsChatting(Uid);
//			});


			var AllChatlogsDialog = $( "#AllChatlogsDialog" ).dialog({
		      autoOpen: false,
		      modal: true,
		      width:650,
		      height:680,
		      buttons: {
//		      	"关闭": function() {
//					$(this).dialog("close")
//		        },
		      },
		      close: function() {
		        $("#ACLPageNumberSelect").empty();//清空
		      }
		    });
		    
		    var nowpage=1;
		    var maxpage=0;
		    var num = 10;
		    $("#myAllChatlogs").on("click",function(){
		    	$("#AllChatlogsTitle").html("<span>"+ChattingTargetID+"</span>");
		    	if (ChattingTargetTable=="user") {
		    		var logsnum = FriendsChattingLogsNumber(Uid,ChattingTargetID);
		    		//alert(logsnum);
		    		maxpage = Math.ceil(logsnum/num);
		    		for(var i=1;i<=maxpage;i++){
		    			$("#ACLPageNumberSelect").append("<option value='"+i+"'>"+i+"</option>");
		    		}
		    		nowpage = maxpage;
		    		LoadFriendsChattingLogsAll(Uid,ChattingTargetID,nowpage,num);
		    	}
		    	if (ChattingTargetTable=="group"){
		    		var logsnum = GroupsChattingLogsNumber(ChattingTargetID);
		    		//alert(logsnum);
		    		maxpage = Math.ceil(logsnum/num);
		    		for(var i=1;i<=maxpage;i++){
		    			$("#ACLPageNumberSelect").append("<option value='"+i+"'>"+i+"</option>");
		    		}
		    		nowpage = maxpage;
		    		LoadGroupsChattingLogsAll(ChattingTargetID,nowpage,num);
		    	}
		    	AllChatlogsDialog.dialog("open");
		    });
		    $("#ACLPagePageFirst").on("click",function(){
		    	nowpage = 1;
		    	if (ChattingTargetTable=="user") {
		    		LoadFriendsChattingLogsAll(Uid,ChattingTargetID,nowpage,num);
		    	}
		    	if (ChattingTargetTable=="group"){
		    		LoadGroupsChattingLogsAll(ChattingTargetID,nowpage,num);
		    	}
		    	//$("#ACLPageNumberSelect").find("option[value='"+nowpage+"']").attr("selected",true);
		    });
			$("#ACLPagePagePre").on("click",function(){
				nowpage--;
				if(nowpage<=0){
					nowpage = 1;
				}
		    	if (ChattingTargetTable=="user") {
		    		LoadFriendsChattingLogsAll(Uid,ChattingTargetID,nowpage,num);
		    	}
		    	if (ChattingTargetTable=="group"){
		    		LoadGroupsChattingLogsAll(ChattingTargetID,nowpage,num);
		    	}
		    	//$("#ACLPageNumberSelect").find("option[value='"+nowpage+"']").attr("selected",true);
		    });
			$("#ACLPagePageTurn").on("click",function(){
				nowpage = $("#ACLPageNumberSelect").val();
		    	if (ChattingTargetTable=="user") {
		    		LoadFriendsChattingLogsAll(Uid,ChattingTargetID,nowpage,num);
		    	}
		    	if (ChattingTargetTable=="group"){
		    		LoadGroupsChattingLogsAll(ChattingTargetID,nowpage,num);
		    	}
		    	//$("#ACLPageNumberSelect").find("option[value='"+nowpage+"']").attr("selected",true);
		    });
			$("#ACLPagePageNext").on("click",function(){
				nowpage++;
				if(nowpage>maxpage){
					nowpage = maxpage;
				}
		    	if (ChattingTargetTable=="user") {
		    		LoadFriendsChattingLogsAll(Uid,ChattingTargetID,nowpage,num);
		    	}
		    	if (ChattingTargetTable=="group"){
		    		LoadGroupsChattingLogsAll(ChattingTargetID,nowpage,num);
		    	}
		    	//$("#ACLPageNumberSelect").find("option[value='"+nowpage+"']").attr("selected",true);
		    });
			$("#ACLPagePageLast").on("click",function(){
				nowpage = maxpage;
		    	if (ChattingTargetTable=="user") {
		    		LoadFriendsChattingLogsAll(Uid,ChattingTargetID,nowpage,num);
		    	}
		    	if (ChattingTargetTable=="group"){
		    		LoadGroupsChattingLogsAll(ChattingTargetID,nowpage,num);
		    	}
		    	//$("#ACLPageNumberSelect").find("option[value='"+nowpage+"']").attr("selected",true);
		    });
			
//			$("#ACLPageDownload").on("click",function(){
//				
//			});
			
			$( "#dialog-NoThisNo" ).dialog({
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
		    
		    var dialog2 = $( "#dialog2" ).dialog({
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
		    var dialog = $( "#dialog" ).dialog({
		      autoOpen: false,
		      modal: true,
		      buttons: {
		           "创建": function() {
						AddNewGroup($("#groupname").val(),Uid);
						LoadGroups(Uid);
						LoadGroupsChatting(Uid);
						dialog2.dialog( "open" );
						$( this ).dialog( "close" );
		        },
		           "取消": function() {
		          $( this ).dialog( "close" );
		        }
		      },
		      close: function() {
		        //form[ 0 ].reset();
		      }
		    });
		     $( "#AddGroupButton" )
		      .button()
		      .on( "click", function() {
		        dialog.dialog( "open" );
		      });
		      

			$("#SearchButton").on("click",function(){
				var st = $("#SearchSelect").val();
				var sid = $("#SearchText").val();
				SearchNo(Uid,sid,st);
			});
			
			
		    $( "#dialog-confirm" ).dialog({
		      autoOpen: false,
		      modal: true,
		      close: function() {
		      		$("#db").hide();
					$('#db2').hide();
		      }
		    });
			$("#db").on("click",function(){
				var val = $(this).val();
				if(val=="添加好友"){
					SetState(Uid,"user",$("#SearchText").val(),'friend','unRead',0);
					SetState($("#SearchText").val(),"user",Uid,'friend','unRead',0);
					$( "#dialog-confirm" ).dialog("close");
				}
				if(val=="删除好友"){
					SetState(Uid,"user",$("#SearchText").val(),'nofriend','no',0);
					SetState($("#SearchText").val(),"user",Uid,'nofriend','no',0);
					$( "#dialog-confirm" ).dialog("close");
				}
				if(val=="加入该群"){
					SetState($("#SearchText").val(),"group",Uid,'group','unRead',0);
					$( "#dialog-confirm" ).dialog("close");
				}
				if(val=="退出该群"){
					SetState($("#SearchText").val(),"group",Uid,'nogroup','no',0);
					$( "#dialog-confirm" ).dialog("close");
				}
			});
			$('#db2').on("click",function(){
				$( "#dialog-confirm" ).dialog("close");
			});
			
			
			$("#l1").on("click",function(){

			});
			$("#l2").on("click",function(){

			});
			$("#l3").on("click",function(){

			});
			$("#l4").on("click",function(){

			});
		
			$("#list1").on("click","li",function(){      //点击好友聊天列表中的对象
				ChattingTargetID = $(this).text();
				ChattingTargetTable = "user";
				ChattingTargetState = 'friend';
				$("#myChattingTarget").html(ChattingTargetID);
				LoadFriendsChattingLogs(Uid,ChattingTargetID);
			});
			$("#list2").on("click","li",function(){      //点击好友列表中的对象
				ChattingTargetID = $(this).text();	//打开聊天
				ChattingTargetTable = "user";
				ChattingTargetState = 'friend';
				SetState(Uid,ChattingTargetTable,ChattingTargetID,ChattingTargetState,'yes',0)//添加到“正在聊天”列表
			    $("#myChattingTarget").html(ChattingTargetID);	//加载聊天窗口
			    LoadFriendsChattingLogs(Uid,ChattingTargetID);	//加载聊天记录
			});
			
			$("#list3").on("click","li",function(){      //点击群聊天列表中的对象
				ChattingTargetID = $(this).text();
				ChattingTargetTable = "group";
				ChattingTargetState = 'group';
				$("#myChattingTarget").html(ChattingTargetID);
				LoadGroupsChattingLogs(ChattingTargetID);
			});
			$("#list4").on("click","li",function(){      //点击群列表中的对象
				ChattingTargetID = $(this).text();	//打开聊天
				ChattingTargetTable = "group";
				ChattingTargetState = 'group';
				SetState(Uid,ChattingTargetTable,ChattingTargetID,ChattingTargetState,'yes',0)//添加到“正在聊天”列表
			    $("#myChattingTarget").html(ChattingTargetID);	//加载聊天窗口
			    LoadGroupsChattingLogs(ChattingTargetID);	//加载聊天记录
			});
			
			
			
			$("#myCloseChat").on("click",function(){//关闭聊天
				if ( ChattingTargetTable=="user" ) {
					SetState(Uid,ChattingTargetTable,ChattingTargetID,ChattingTargetState,'no',0)	//从聊天列表中移除
//				    $("#myChattingTarget").html(Uid);	//加载聊天窗口
//				    ChattingTargetTable = 'friend';
//				    LoadFriendsChattingLogs(Uid,Uid);	//加载聊天记录
				} 
				if ( ChattingTargetTable=="group" ) {
					SetState(ChattingTargetID,ChattingTargetTable,Uid,ChattingTargetState,'no',0)	//从聊天列表中移除
//				    $("#myChattingTarget").html(Uid);	//加载聊天窗口
//				    ChattingTargetTable = 'friend';
//				    LoadFriendsChattingLogs(Uid,Uid);	//加载聊天记录
				}
				$("#myInformation").click();
			});
			$("#myMoreInformation").on("click",function(){
				var st = ChattingTargetTable;
				if (st=="user") {
					st = "user";
				} else{
					st = "group";
				}
				var sid = ChattingTargetID;
				SearchNo(Uid,sid,st);
			});
			$("#myAllChatlogs").on("click",function(){
				
			});
			
			$("#myInsertting").keydown(function(e){
					var e = e || window.event, ec = e.keyCode || e.which;
			        if (e.ctrlKey && e.keyCode == 13) {	//ctrl + enter  发送
			        	//alert("BBBBBBBB");
			        	$("#mySending").click();
			        }
			        if (!e.ctrlKey && e.keyCode == 13){	// enter 回车
			            //alert("AAAAAAAAA");
			        }
			})
			
			$("#myImg").on("click",function(){
				$("#UploadIMG").click();
				$("#UploadIMG").on("change",function(){
					if($("#UploadIMG").val()!=""){
						$("#myImg").text("上传中");
						var href = UploadIMG();
						$("#myImg").text("图片");
						var html = "<a href='"+href+"' target=\"_blank\"><img src='"+href+"'/></a>";
						$("#myInsertting").val($("#myInsertting").val()+html);
						$("#UploadIMG").val("");
					}
				})
			});

			$("#mySending").on("click",function(){//关闭聊天
				var myMessage = $("#myInsertting").val();
				myMessage=myMessage.replace(/\n/g,'<br />');
				if (myMessage!="") {
					if (ChattingTargetTable=="user") {
						SendMessage(Uid,ChattingTargetID,myMessage);
						LoadFriendsChattingLogs(Uid,ChattingTargetID);
						$("#myInsertting").val("");
					}
					if(ChattingTargetTable=="group"){
						SendGroupsMessage(Uid,ChattingTargetID,myMessage);
						LoadGroupsChattingLogs(ChattingTargetID);
						$("#myInsertting").val("");
					}
				}
			});
			
		})