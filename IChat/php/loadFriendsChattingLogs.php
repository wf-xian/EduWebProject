<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$FromNo = $db->escape_string($_POST['FromNo']);	//防止注入式攻击
	$ToNo = $db->escape_string($_POST['ToNo']);	//防止注入式攻击
	
	$sql = "select * from (select * from fmessage where (FromNo = '$FromNo' and ToNo = '$ToNo') or (FromNo = '$ToNo' and ToNo = '$FromNo') ORDER BY FMNo DESC LIMIT 100) ta order by FMNo ";

	//$UNo = "huli1";
	//$sql = "select * from FMessage where FromNo = '$UNo' or ToNo = '$UNo'";
	//echo $sql;
	$json_encode  = $tools->SelectTool($sql);
	$tools->CloseTool();
	echo $json_encode;//打印编码后的json字符串
	
?>