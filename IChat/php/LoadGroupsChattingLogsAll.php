<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$GNo = $db->escape_string($_POST['GNo']);	
	$page = $db->escape_string($_POST['page']);
	$num = $db->escape_string($_POST['num']);
	$limit = ($page-1)*$num;
	$sql = "select * from gmessage where GNo = '$GNo' ORDER BY GMSNo LIMIT {$limit},{$num} ";

	$json_encode  = $tools->SelectTool($sql);
	$tools->CloseTool();
	echo $json_encode;//打印编码后的json字符串
	
?>
