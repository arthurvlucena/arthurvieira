<!DOCTYPE >
<html>
<head>
	<title>Dir/File Creator</title>
</head>

<body>
	<form method="post" action="?save=true">
		Dir: <input id="dir" name="dir" type="text"></input><br />
		File Name: <input id="nameFile" name="nameFile" type="text"></input><br />
		Content: <textArea id="content" name="content"></textArea><br />
		
		<span>
			<input type="submit" value="create" ></input>
			<input type="reset" value="reset"></input>
		</span>
	</form>
</body>
</html>

<?php
$create = @$_GET["save"];

if ($create) {
	$pathname = "temp/".$_POST["dir"]."/";
	mkdir($pathname, 0755, true);
	
	$my_file = $pathname.$_POST["nameFile"];
	
	echo $my_file;
	
	$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
	$data = $_POST["content"];
	fwrite($handle, $data);
	
	echo "created!";
} 
?>