<html>
<head>
<script class='gtm'>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-W59SWTR');</script>

<script type="text/javascript" src='jquery.js'></script>
<script type="text/javascript">

function bigramTable(bigrams, order, file){
var b=bigrams.split(",");
var c=order.split(",");
$('#table').load('experiment9-1.php', {bigrams:bigrams, order:order, file:file});
}
</script>
</head>
<body>
<?php

$f=$_GET['fileno'];
$file=$f.'.txt';
$full_path='Exp9/'.$file;
$f1 =  fopen($full_path, "r");
$buffer=fread($f1, filesize($full_path));
$parts=split("&", $buffer); 
$corpus=$parts[0];      
$bigrams=$parts[1];
$order=$parts[2]; 
?>
<br/> <br/>
<?php 
echo "<p align='center'>".$corpus."<br/>";
echo "<br/><button onclick=\"bigramTable('".$bigrams."', '".$order."', '".$f."');\"> Find Bigram Probabilities</button></p>";
echo "<div id='table'></div>";
echo "<br/><div align='center' id='corpus'></div>";

?>
</body>
</html>
