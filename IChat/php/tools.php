<?php
  class Tools {
 		private $db = null;
  	public function getConn(){
  		if ($this->db === null) {
				$this->db = new mysqli('localhost','root','123456','mywebproject');
				if ($this->db->connect_error){
					return false;
				};
			}
			return $this->db;
  	}
		public function SelectTool($sql){	//按照$sql查询数据，把查询结果以json_encode()返回
			if( $this->getConn() ){
				$db = $this->db;
			}else{
				return "数据库连接失败";
			}
			$result = $db->query($sql);
			
			$jarr = array();
			while ( $rows = $result->fetch_assoc() ){
			    $count=count($rows);//不能在循环语句中，由于每次删除 row数组长度都减小  
			    array_push($jarr,$rows);
			}
			//print_r($jarr);//查看数组
		
			$jobj=new stdclass();//实例化stdclass，这是php内置的空类，可以用来传递数据，由于json_encode后的数据是以对象数组的形式存放的，
			//所以我们生成的时候也要把数据存储在对象中
			foreach($jarr as $key=>$value){
				$jobj->$key=$value;
			}
		
			//print_r($jobj);//打印传递属性后的对象
			return json_encode($jobj);
		}
		
		public function UpdataTool($sql){
			if( $this->getConn() ){
				$db = $this->db;
			}else{
				return "数据库连接失败";
			}
			$result = $db->query($sql);
			//return 
		}
		
		public function RowsNumber($sql){
			if( $this->getConn() ){
				$db = $this->db;
			}else{
				return "数据库连接失败";
			}
			$result = $db->query($sql);
			return $result->num_rows;
		}
		
		public function isExist($sql){
			if( $this->getConn() ){
				$db = $this->db;
			}else{
				return "数据库连接失败";
			}
			$result = $db->query($sql);
			if( $result->num_rows > 0 ){
				return true;
			}else{
				return false;
			}
		}
		public function InsertTool($sql){
			if( $this->getConn() ){
				$db = $this->db;
			}else{
				return "数据库连接失败";
			}
			$result = $db->query($sql);
		}
		
		public function InsertIDTool($thedb){
			return mysql_insert_id($thedb); 
		}
		
		public function CloseTool(){
			$this->db->close();
		}
  }
?>