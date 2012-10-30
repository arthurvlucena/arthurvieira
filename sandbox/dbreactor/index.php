<html>
	<head>
		<title>
			DbReactor - Benchmark tool
		</title>
		<script>
			function url(value) {
				var url = window.location.toString();
				var curl = url.split('?')[0];

				window.location = curl+'?action='+value;
			}
		</script>
	</head>
	
	<body>
	<input type="button" onclick="url('insert');" value="insert">
	<input type="button" onclick="url('insert100');" value="insert 100">
	<input type="button" onclick="url('update');" value="update">
	<input type="button" onclick="url('select');" value="select">
	<input type="button" onclick="url('delete');" value="delete">
	<br>
	<?php
		include 'Util.php';		
	
		$action = $_GET['action'];
		
		if (!empty($action)) {
			include 'source/ConnectionFactory.php';
		
			$connection = NULL;
			$session = NULL;
			
			if ($action == "insert") {
				getStatus(true);
				$connection = new ConnectionFactory();
				$connection->openConnection('UtilTron', 'TAB_BENCHMARK');
				$session = $connection->getSession();
				
				$c = 1;
				//while ($c > 0) {
					$array['ID_TAB_BENCHMARK'] = $c;
					$array['DES_TEXTO'] = 'texto aleatorio '.$c;
					
					$session->setKeysValues($array);	
					$session->insert();				
					//$c--;
				//}
				
				$connection->closeConnection();
				getStatus(false);
				echo ' teste de inserts <br/><br/>';
			}

			if ($action == "insert100") {
				getStatus(true);
				$connection = new ConnectionFactory();
				$connection->openConnection('UtilTron', 'TAB_BENCHMARK');
				$session = $connection->getSession();
			
				$c = 100;
				while ($c > 0) {
					$array['ID_TAB_BENCHMARK'] = $c+1;
					$array['DES_TEXTO'] = 'texto aleatorio '.$c;
					
					$session->setKeysValues($array);
					$session->insert();
					$c--;
				}
			
				$connection->closeConnection();
				getStatus(false);
				echo ' teste de inserts <br/><br/>';
			}
			
			if ($action == "update") {
				getStatus(true);
				$connection = new ConnectionFactory();
				$connection->openConnection('UtilTron', 'TAB_BENCHMARK');
				$session = $connection->getSession();
				
				$c = 1;
				//while ($c > 0) {
					$arrayW['ID_TAB_BENCHMARK'] = $c;
					$arrayE['DES_TEXTO'] = 'novo texto aleatorio '.$c;
					
					$session->setKeysValues($arrayE);
					$session->setWhere($arrayW);	
					$session->update();				
				//	$c--;
				//}
				
				$connection->closeConnection();
				getStatus(false);
				echo 'teste de edit <br/><br/>';
			}
			
			if ($action == "select") {
				getStatus(true);
				$connection = new ConnectionFactory();
				$connection->openConnection('UtilTron', 'TAB_BENCHMARK');
				$session = $connection->getSession();
				
				$coluns = array('DES_TEXTO');
				$session->setColumns($coluns);
				
				$result = $session->select();
				//$result = new ArrayObject($result);
				
				foreach ($result as $str) {
					 $bigStr .= $str->DES_TEXTO.'<br />';
				}		
				
				echo $bigStr;
				
				$connection->closeConnection();
				getStatus(false);
				echo 'teste de select <br/><br/>';
			}
			
			if ($action == "delete") {
				getStatus(true);
				$connection = new ConnectionFactory();
				$connection->openConnection('UtilTron', 'TAB_BENCHMARK');
				$session = $connection->getSession();
				
				$c = 1;
				//while ($c > 0) {
					//$array['ID_TAB_BENCHMARK'] = $c;
					
					//$session->setWhere($array);	
					$session->delete();				
				//	$c--;
				//}
				
				$connection->closeConnection();
				getStatus(false);
				echo 'teste de delete <br/><br/>';
			}
		}
		
		showLog();
	?>
	</body>
</html>

