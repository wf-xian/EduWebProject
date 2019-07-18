<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$FromNo = $db->escape_string($_POST['FromNo']);	
	$ToNo = $db->escape_string($_POST['ToNo']);	
	$sql = "select * from fmessage where (FromNo = '$FromNo' and ToNo = '$ToNo') or (FromNo = '$ToNo' and ToNo = '$FromNo') ORDER BY FMNo";

	$json_encode  = $tools->RowsNumber($sql);
	$tools->CloseTool();
	echo $json_encode;//打印编码后的json字符串
	
?>