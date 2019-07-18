<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$GNo = $db->escape_string($_POST['GNo']);	//防止注入式攻击

	$sql = "select * from groupmembers where GNo = '$GNo' and State='group' ";

	$json_encode  = $tools->SelectTool($sql);
	$tools->CloseTool();
	echo $json_encode;//打印编码后的json字符串

?>