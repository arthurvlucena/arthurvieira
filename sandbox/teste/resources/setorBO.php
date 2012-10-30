<?php
class SetorBO {
	private $method;
	private $json;
	
	private $connectionLink;

	public function salvar(){
		$sql = "INSERT INTO setor (descricao, sigla, ativo) values
		('".$this->json['descricao']."',
		'".$this->json['sigla']."',
		'1')";
		$this->openConnection();
		$sqlExec = mysql_query($sql);
		
		$retorno = array();
		if ($sqlExec) {
			$retorno['status'] = 'sucess';
			$this->json['idsetor'] = mysql_insert_id();
			$retorno['obj'] = json_encode($this->json);
		} else {
			$retorno['status'] = 'fail';
			$retorno['error'] = mysql_error();
		}
		
		echo json_encode($retorno);
		
		$this->closeConnection();
	}

	public function editar(){
		$sql = "UPDATE setor SET ".$this->loadKeyValue()." WHERE idsetor = ".$this->json['idsetor'];
		$this->openConnection();
		
		$sqlExec = mysql_query($sql);
		
		$retorno = array();
		if ($sqlExec) {
			$retorno['status'] = 'sucess';
			$retorno['obj'] = json_encode($this->json);
		} else {
			$retorno['status'] = 'fail';
			$retorno['error'] = mysql_error();
		}
		
		echo json_encode($retorno);
		
		$this->closeConnection();
	}

	public function pesquisar(){
		$sql = "SELECT * FROM setor ".$this->loadWhere();
		
		$this->openConnection();
		$sqlExec = mysql_query($sql);
		
		$retorno = array();
		if ($sqlExec != null) {
			$array = $this->fetch($sqlExec);
			$retorno['status'] = 'sucess'.$sql;
			$retorno['obj'] = json_encode($array);
		} else {
			$retorno['status'] = 'fail';
			$retorno['error'] = mysql_error();
		}
		
		echo json_encode($retorno);
		
		$this->closeConnection();
	}
	
	public function loadWhere(){
		$where = "WHERE 1 = 1 ";
		
		foreach ($this->json as $key => $value) {
			if ($value != null && $value != '') {
				$where .= "AND ".$key." like '".$value."%'";
			}
		}
		
		return $where;
	}
	
	public function loadKeyValue() {
		$params = '';
		
		$temp = $this->json;
		unset($temp['idsetor']);
		
		foreach ($temp as $key => $value) {
			if ($value != null && $value != '' ) {
				if ($params != '') {
					$params .= ', ';
				}
			
				$params .= $key." = '".$value."'";
			}
		}
		
		return $params;
	}
	
	public function __construct(){
		$this->json = $_POST;
		$this->method = $this->json['method'];
		unset($this->json[method]);
		
		$this->invokeMethod();
	}

	public function invokeMethod(){
		call_user_func(array($this, $this->method));
	}
	
	public function openConnection() {
		$this->connectionLink = mysql_connect('localhost', 'arthur', 'xm556');
		
		if(!$this->connectionLink){
			die('Falha na conexao: ' . mysql_error());
		}
		
		if (!mysql_select_db('arthur_util', $this->connectionLink)) {
			die('Base nao encontrada: ' . mysql_error());
		}
	}
	
	public function closeConnection() {
		mysql_close($this->connectionLink);
	}
	
	public function fetch($query){
		$array = array();
		
		while($row = mysql_fetch_object($query)) {
			$array[] = $row;
		}
		
		return $array;
	}
}

function main() {
	new SetorBO();
}

main();
?>