<?php
	require_once( "SCS.php");
	function newSCS(){
		$scs_ak= 'xxxxxxxxxxx'; //��д�Լ���������ak��sk
		$scs_sk = 'xxxxxxxxxxxxxxxx';
		$scs = new SCS($scs_ak, $scs_sk);
		return $scs;
	}
?>