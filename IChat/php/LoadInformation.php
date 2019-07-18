<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$ID = $db->escape_string($_POST['id']);
	$ty = $db->escape_string($_POST['ty']);

//	$ID = 'huli2';
//	$ty = 'user';
	if($ty=="user"){
		$sql = "select * from usertable where UNo = '$ID' ";
	}elseif($ty=="group"){
		$sql = "select * from grouptable left join (groupmembers,usertable) on groupmembers.GNo = grouptable.GNo and groupmembers.UNo = usertable.UNo where grouptable.GNo = '$ID' ";
	}

	$json_encode  = $tools->SelectTool($sql);
	
	$tools->CloseTool();
	
	echo $json_encode;
	
?>