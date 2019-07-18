<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$GName = $db->escape_string($_POST['GName']);
	$UNo = $db->escape_string($_POST['UNo']);
	$DateTime = date("Y-m-d H:i:s");

	$sql = " INSERT INTO grouptable VALUES(NULL,'$GName','$DateTime') ";
	$json_encode  = $tools->InsertTool($sql);

	$sql = " select GNo from grouptable order by GNo DESC limit 1 ";
	$json_encode = $tools->SelectTool($sql);
	$result =  json_decode($json_encode);
	$GNo;
	foreach($result as $key=>$value){
		foreach($value as $a=>$b){
			$GNo = $b;
		}
	}
	$sql = " INSERT INTO groupmembers VALUES(NULL,'$GNo','$UNo','group','unRead',0) ";
	$json_encode  = $tools->InsertTool($sql);
	$tools->CloseTool();
?>