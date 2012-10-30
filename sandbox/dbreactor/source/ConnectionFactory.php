<?php
include 'Connection.php';

class ConnectionFactory {
	private $session;
	private $connection;
	
	public function __construct() {}
	
	public function __destruct() {}
	
	public function openConnection($_dataBase, $_table) {
		$this->connection = new Connection($_dataBase);
		$this->session = $this->connection->callQueryDb();
		
		$this->connection->openConnection();
		$this->session->setTable($_table);
	}
	
	public function closeConnection() {		
		$this->connection->closeConnection();
		
		$this->connection = NULL;
		$session = NULL;			
	}
	
	public function getConnection() {
		return $this->connection;
	}
	
	public function getSession() {
		return $this->session;
	}
}
?>