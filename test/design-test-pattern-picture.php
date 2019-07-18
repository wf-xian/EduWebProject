<?php  
	header( "Content-type:text/html;Charset=utf-8" );  


    $ch = curl_init();
    $url="http://image.baidu.com/";
    curl_setopt ( $ch , CURLOPT_USERAGENT ,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.113 Safari/537.36" );
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $content=curl_exec($ch);
    $string=file_get_contents($url); 
    preg_match_all("/<img([^>]*)\s*src=('|\")([^'\"]+)('|\")/", 
                    $string,$matches);
    $new_arr=array_unique($matches[3]);
    foreach($new_arr as $key){ 
    	echo "<img src=$key>";
    }
?>