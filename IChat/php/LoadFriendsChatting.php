<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$UNo = $db->escape_string($_POST['UNo']);	//防止注入式攻击
	
	$sql = "select * from friends,usertable where friends.UNo = '$UNo' and State='friend' and friends.FNo = usertable.UNo and (isChatting = 'yes' or isChatting = 'unRead' ) order by friends.FNo ";

	$json_encode  = $tools->SelectTool($sql);
	$tools->CloseTool();
	
	echo $json_encode;//打印编码后的json字符串
	
?>