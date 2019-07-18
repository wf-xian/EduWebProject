<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$GNo = $db->escape_string($_POST['GNo']);	//防止注入式攻击
	$FromNo = $db->escape_string($_POST['FromNo']);	//防止注入式攻击
	$DateTime = date("Y-m-d H:i:s");
	$Message = $db->escape_string($_POST['Message']);	//防止注入式攻击
	
	$sql = "UPDATE groupmembers SET isChatting = 'unRead' WHERE GNo = '$GNo' and UNo != '$FromNo' and State = 'group' ";
	$json_encode  = $tools->UpdataTool($sql);
	$sql = "INSERT INTO gmessage VALUES(NULL,'$GNo','$FromNo','$DateTime','$Message')";
	$json_encode  = $tools->InsertTool($sql);
	
	$tools->CloseTool();
?>