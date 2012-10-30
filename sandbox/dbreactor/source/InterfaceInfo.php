<?php
interface InterfaceInfo {
	public function setTable($_dbTable);
	
	public function setWhere($dbWhere);
	
	public function setKeysValues($dbKeysValues);
	
	public function setColumns($dbColumns);
	
	public function setOrder($column, $mode);
	
	public function setupParamsInsert();
	
	public function setupParamsUpdate();
	
	public function setupWhere();
	
	public function sqlNative($sql);
		
	public function select();
	
	public function update();
	
	public function insert();
	
	public function delete();
	
	public function commit();
	
	public function clean();
	
	public function numRows($query);
	
	public function fetch($query);
	
	public function openConnection($dbUrl, $dbDataBasePort, $dbUser, $dbPasswd, $dbDataBase);
	
	public function closeConnection();
}
?>