<?php
	//include 'SCS.php';
	//include 'linkSCS.php';
	require_once( "linkSCS.php");

	foreach($_FILES as $file){
		SCS::setExceptions(true);
		try{
			$scs = newSCS();//linkSCS.php中的函数，返回SCS  同 $scs = new SCS('xxx','yyy');
	        $bucketName = 'huli2huli/IChat/ChatlogsIMG';//SCS的bucket
			$object = $file['tmp_name'];//临时文件
			$uploadName = $file['name'];//文件名,带扩展名
			//把文件上传到SCS的bucket中
			$response = SCS::putObject(SCS::inputFile($object, false), $bucketName, $uploadName, SCS::ACL_PUBLIC_READ);
							
			//构建文件链接
			$filePath = 'http://sinacloud.net/'.$bucketName.'/'.$uploadName;
			echo $filePath;
		}
		catch(SCSException $e){
			echo $e->getMessage();
		}
	   	//echo "<a href='{$filePath}' target='_blank' title='点击下载原图'><img src='{$filePath}'/></a>";
	}
?>