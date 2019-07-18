<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$UNo = $db->escape_string($_POST['UNo']);	//防止注入式攻击

	$sql = "select * from groupmembers,grouptable where UNo = '$UNo' and State='group' and groupmembers.GNo = grouptable.GNo order by grouptable.GNo ";

	$json_encode  = $tools->SelectTool($sql);
	$tools->CloseTool();
	echo $json_encode;//打印编码后的json字符串
	
?>