<?php
	include('tools.php');
	$tools = new Tools();
	$db=$tools->getConn();
	
	$MainID = $db->escape_string($_POST['MainID']);	
	$SID = $db->escape_string($_POST['SID']);	
	$ty = $db->escape_string($_POST['ty']);	
	if($ty=='user'){
		$sql = "select * from usertable where UNo = '$SID' ";
		if( $tools->isExist($sql) ){
			$sql = "select * from friends where UNo = '$MainID' and FNo = '$SID' and State = 'friend' ";
			if( $tools->isExist($sql) ){
				echo "Friend";
			}else{
				echo "NoFriend";
			}
		}else{
			echo "NotExistUser";
		}
	}elseif($ty=='group'){
		$sql = "select * from grouptable where GNo = '$SID' ";
		if( $tools->isExist($sql) ){
			$sql = "select * from groupmembers where GNo = '$SID' and UNo = '$MainID' and State = 'group' ";
			if( $tools->isExist($sql) ){
				echo "Group";
			}else{
				echo "NoGroup";
			}
		}else{
			echo "NotExistGroup";
		}
	}
	
	$tools->CloseTool();
?>