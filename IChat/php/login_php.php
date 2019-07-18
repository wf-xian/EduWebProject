<?php
	$db = new mysqli('localhost','root','','mywebproject');
	if ($db->connect_error){
		die('链接错误: '. $db->connect_error);
	};
	$account = $db->escape_string($_POST['account']);	//防止注入式攻击
	$password = $db->escape_string($_POST['password']);
	$sql = "select * from UserTable where UNo = '$account' and UPsw = '$password'";
	//echo $sql;
	$result = $db->query($sql);
	if ( $result->num_rows > 0 ){	//验证成功
		echo "1";	//验证成功
	}else{
		echo "0";	//验证失败
	}
	$db = null;
?>