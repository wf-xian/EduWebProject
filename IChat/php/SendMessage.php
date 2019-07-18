<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$FromNo = $db->escape_string($_POST['FromNo']);	//防止注入式攻击
	$ToNo = $db->escape_string($_POST['ToNo']);	//防止注入式攻击
	$DateTime = date("Y-m-d H:i:s");
	$Message = $db->escape_string($_POST['Message']);	//防止注入式攻击
	$Table = $db->escape_string($_POST['Table']);	//防止注入式攻击
	
	$sql = " INSERT INTO fmessage VALUES(NULL,'$FromNo','$ToNo','$DateTime','$Message') ";
	$json_encode  = $tools->InsertTool($sql);
	if ($FromNo != $ToNo){
		$sql = "UPDATE friends SET isChatting = 'unRead', unRead = unRead+1 WHERE UNo = '$ToNo' and FNo = '$FromNo'";
		$json_encode  = $tools->UpdataTool($sql);
	}
	$tools->CloseTool();
?>