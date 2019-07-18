 <?php  
	header( "Content-type:text/html;Charset=utf-8" ); 
	$ch = curl_init();
	        $url ="https://movie.douban.com/top250";
	        curl_setopt ( $ch , CURLOPT_USERAGENT ,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.113 Safari/537.36" );
	        curl_setopt($ch,CURLOPT_URL,$url);
	        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	        $content=curl_exec($ch);
	        $pattern = "/<span class=\"title\">(.*?)<\/span>/";
	        preg_match_all("/<span class=\"title\">(.*?)<\/span>/",$content,$matchs,PREG_SET_ORDER);//匹配该表所用的正则
	        preg_match_all("/<td rowspan=\"\d\">(.*?)<\/td>\n<td rowspan=\"\d\">(.*?)<\/td><td rowspan=\"\d\" align=\"\w+\">(.*?)<\/td><td rowspan=\"\d\" align=\"\w+\">(.*?)<\/td><td>(.*?)<\/td>\n<td>(.*?)<\/td><td>(.*?)<\/td>/",$content,$matchs,PREG_SET_ORDER);//匹配该表所用的正则
	        var_dump($matchs);

?>