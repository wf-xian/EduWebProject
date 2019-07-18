<?php
	$db = new mysqli('localhost','root','','mywebproject');
	if ($db->connect_error){
		die('链接错误: '. $db->connect_error);
	};
	$account = $db->escape_string($_POST['account2']);
	$name = $db->escape_string($_POST['name2']);
	$password = $db->escape_string($_POST['password2']);
	$email = $db->escape_string($_POST['email2']);
	if ($account==""||$name==""||$password==""||$email==""){
		echo "信息不能为空！";
	}else{
		$sql = "insert into UserTable values('$account','$email','$name','$password',null)";
	//	echo $sql;
		if( $db->query($sql) ){
			echo "注册成功";
		}else{
			echo "注册失败，账号已存在或数据不合法！";
		}
	}
	$db = null;
?>