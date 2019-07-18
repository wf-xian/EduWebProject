<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$GNo = $db->escape_string($_POST['GNo']);

	
	$sql = "select * from gmessage where GNo = '$GNo' ORDER BY GMSNo ";

	$json_encode  = $tools->RowsNumber($sql);
	$tools->CloseTool();
	echo $json_encode;//打印编码后的json字符串

?>