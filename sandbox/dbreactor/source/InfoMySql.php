<?php
include_once 'InterfaceInfo.php';

class InfoMySql implements InterfaceInfo {
	private $dbTable;
	private $dbWhere;
	private $dbKeysValues;
	private $dbColumns;
	private $dbOrder;
	
	/*Link de conex�o com o banco */
	private $connectionLink;
	
	public function __construct(){}
	
	public function __destruct(){} 
	
	public function setTable($_dbTable){
		$this->dbTable = $_dbTable;
	}
	
	public function setWhere($dbWhere){
		$this->dbWhere = $dbWhere;
	}
	
	public function setColumns($dbColumns) {
		$this->dbColumns = $dbColumns;
	}
	
	public function setKeysValues($dbKeysValues){
		$this->dbKeysValues = $dbKeysValues;
	}
	
	public function setOrder($column, $mode){
		$dbOrder = 'ORDER BY '.$column;
		$modeTmp = strtoupper($mode);
		
		if ($modeTmp != 'ASC' || $modeTmp != 'DESC' || empty($mode)) {
			$mode = 'ASC';
		}
		
		$dbOrder = $dbOrder.' '.$mode;
		
		$this->dbOrder = $dbOrder;
	}
	
	public function setupParamsInsert(){
		$values = array_map('mysql_real_escape_string', array_values($this->dbKeysValues));
		$keys = array_keys($this->dbKeysValues);

		return '(`'.implode('`, `', $keys).'`) VALUES (\''.implode('\', \'', $values).'\')';		
	}
	
	public function setupParamsUpdate(){
		$return = "";
		
// 		TODO
// 		for ($i = 0; $i < sizeof($this->dbKeysValues); $i++) {
			
// 		}
		
		foreach((array)$this->dbKeysValues as $name => $value){
			if ($return != "") {
				$return .= ', ';
			}
			
			$return .= '`'.$name.'` = '.'\''.$value.'\'';
		}
		
		return $return;
	}
	
	public function setupWhere(){
		if ($this->dbWhere == null) {
			return "";
		}
		
		$return = "";
		
		foreach((array)$this->dbWhere as $name => $value){
			$return .= ' AND ';
			$return .= '`'.$name.'` = '.'\''.$value.'\'';
		}
		
		return 'WHERE 1 = 1 '.$return;
	}
	
	public function sqlNative($sql){
		return mysql_query($sql);
	}
		
	public function select(){
		$sql = 'SELECT ';
		
		if (empty($this->dbColumns)) {
			$sql .= '* ';
		} else {
			$length = sizeof($this->dbColumns);
			$strColumns;
			
			foreach ($this->dbColumns as $column) {
				if (!empty($strColumns)) {
					$strColumns .= ', ';
				}
				
				$strColumns .= $column;
			}
			
			$sql .= $strColumns;
		}
		
		$sql = $sql.' FROM `'.$this->dbTable.'` '.$this->setupWhere().' '.$this->dbOrder;

		$result = mysql_query($sql);
		
		if ($result) {
			return $this->fetch($result);
		} else {
			return NULL;
		}
	}
	
	public function update(){
		mysql_query("UPDATE `".$this->dbTable."` SET ".$this->setupParamsUpdate()." ".$this->setupWhere());
		return mysql_affected_rows();
	}
	
	
	public function insert(){		
		return mysql_query("INSERT INTO `".$this->dbTable."` ".$this->setupParamsInsert());
	}	
	
	public function delete(){
		mysql_query("DELETE FROM `".$this->dbTable."` ".$this->setupWhere());
		return mysql_affected_rows(); 
	}
	
	public function commit() {
		mysql("COMMIT");
	}
	
	public function clean() {
		$this->dbWhere = NULL;
		$this->dbKeysValues = NULL;
		$this->dbColumns = NULL;
		$this->dbOrder = NULL;
	}
	
	public function numRows($query){
		if($num_rows = mysql_num_rows($query)) {
			return $num_rows;
		}
	}
	
	public function fetch($query){
		$array = array();
		
		while($row = mysql_fetch_object($query)) {
			$array[] = $row;
		}
		
		return $array;
	}
	
	public function openConnection($dbUrl, $dbDataBasePort, $dbUser, $dbPasswd, $dbDataBase) {
		$this->connectionLink = mysql_connect($dbUrl, $dbUser, $dbPasswd);
		
		if(!$this->connectionLink){
			die('Falha na conex�o: ' . mysql_error());
		}
		
		if (!mysql_select_db($dbDataBase, $this->connectionLink)) {
			die('Base n�o encontrada: ' . mysql_error());
		}
	}
	
	public function closeConnection() {
		$this->connectionLink = NULL;
		
		/*
		http://www.php.net/manual/pt_BR/function.mysql-connect.php
		Informa que todas as conex�es s�o fechadas ao fim de uma execu��o de script.
		
		TODO ao resolver problema mysql_close(): 4 is not a valid MySQL-Link resource.
		
		if(!empty($this->connectionLink)) {
			mysql_close($this->connectionLink);
		} 
		*/
	}
}
?>