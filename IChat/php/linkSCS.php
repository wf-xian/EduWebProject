<?php
	require_once( "SCS.php");
	function newSCS(){
		$scs_ak= 'xxxxxxxxxxx'; //填写自己的新浪云ak和sk
		$scs_sk = 'xxxxxxxxxxxxxxxx';
		$scs = new SCS($scs_ak, $scs_sk);
		return $scs;
	}
?>