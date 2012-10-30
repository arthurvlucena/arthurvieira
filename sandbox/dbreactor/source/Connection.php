<?php
class Connection {
	public $instanceToUseHere;
	
	private $configXml;
	
	private $dbSqlType;
	
	private $dbName;
	private $dbUrl;
	private $dbUser;
	private $dbPasswd;
	private $dbDataBase;
	private $dbDataBasePort;
	private $connectionLink;
	
	public function __construct($_dbName) {
		$this->configXml = new SimpleXMLElement(dirname(__FILE__).'/config.xml', null, true);
		$this->selectDb($_dbName);
  	}
  	
	public function __destruct() {}
  
	public function selectDb($dbName){
		$length = count($this->configXml->DbConfig->DataBase);
		$c = 0;
		
		while ($c < $length) {
			$domain = $this->configXml->DbConfig->DataBase[$c];
			
			if ($domain->nameDatabase == $dbName) {
				$this->dbSqlType		= $domain->sqlLang;
				$this->dbUrl			= $domain->url;
				$this->dbDataBasePort	= $domain->port;
				$this->dbDataBase		= $domain->dataBase;
				$this->dbUser			= $domain->user;
				$this->dbPasswd			= $domain->passwd;
				break;				
			}
			++$c;
		}
	}
	
	public function callQueryDb() {
		if ($this->instanceToUseHere == null) {
			if ($this->dbSqlType=="mysql") {
				include_once 'InfoMySql.php';
				$this->instanceToUseHere = new InfoMySql();
			} elseif ($this->dbSqlType=="postgres") {
				include_once 'InfoPostgreSql.php';
				$this->instanceToUseHere = new InfoPostgreSql();
			}
		}
		return $this->instanceToUseHere;
	}
	
	public function openConnection(){
		$this->instanceToUseHere->openConnection($this->dbUrl, $this->dbDataBasePort, $this->dbUser, $this->dbPasswd, $this->dbDataBase);
	}
	
	public function closeConnection(){
		$this->instanceToUseHere->closeConnection();
		$this->instanceToUseHere = NULL;
		$this->__destruct();
	}
}
?>