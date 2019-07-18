<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$MainID = $db->escape_string($_POST['MainID']);
	$TargetID = $db->escape_string($_POST['TargetID']);
	$Table = $db->escape_string($_POST['Table']);
	$State = $db->escape_string($_POST['State']);
	$isChatting = $db->escape_string($_POST['isChatting']);
	$unRead = $db->escape_string($_POST['unRead']);
	if($MainID!=$TargetID){
		if( $Table=='user' ){
			$sql = "select * from friends where UNo = '$MainID' and FNo = '$TargetID' ";
			if( $tools->isExist($sql) ){
				$sql = "UPDATE friends SET State = '$State',isChatting = '$isChatting',unRead = $unRead WHERE UNo = '$MainID' and FNo = '$TargetID' ";
				$json_encode  = $tools->UpdataTool($sql);
			}else{
				$sql = " INSERT INTO friends VALUES(NULL,'$MainID','$TargetID','$State','$isChatting',$unRead) ";
				$json_encode  = $tools->UpdataTool($sql);
	//			$sql = " INSERT INTO friends VALUES(NULL,'$TargetID','$MainID','$State','$isChatting',$unRead) ";
	//			$json_encode  = $tools->UpdataTool($sql);
			}
			
			
		}elseif( $Table=='group' ){
			
			$sql = "select * from groupmembers where GNo = '$MainID' and UNo = '$TargetID' ";
			if( $tools->isExist($sql) ){
				$sql = "UPDATE groupmembers SET State = '$State',isChatting = '$isChatting',unRead = $unRead WHERE GNo = '$MainID' and UNo = '$TargetID' ";
				$json_encode  = $tools->UpdataTool($sql);
			}else{
				$sql = " INSERT INTO groupmembers VALUES(NULL,'$MainID','$TargetID','$State','$isChatting',$unRead) ";
				$json_encode  = $tools->UpdataTool($sql);
			}
		}
	}
	$tools->CloseTool();
?>