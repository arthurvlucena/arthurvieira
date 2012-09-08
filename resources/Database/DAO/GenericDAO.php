<?php
include '../resources/Database/DbReactor/ConnectionFactory.php';
include '../resources/EncoderDomain/EncoderDomain.php';

class GenericDAO extends ConnectionFactory {

	private $json;
	private $dataBase;
	
	private $pathCache = '../resources/Database/Cache/';
	private $domainMD5;
	
	private $nameDomain;
	private $table;
	private $attrs;
	
	private $arrayDomain;
	
	private $ed;
	
	public function __construct($json, $dataBase) {
		//instancia do Encoder
		$this->ed = new EncoderDomain();
		
		//domain e nome do banco a ser usado
		$this->json = $json;
		$this->dataBase = $dataBase;
		
		//nome, tabela e atributos do domain
		$this->nameDomain = $json["domain"];
		$this->table = $this->ed->decodeDomainTable($this->nameDomain);
		$this->attrs = $json["attrs"];
		
		//caminho do cache e nome do arquivo de cache
		$this->domainMD5 = md5($this->nameDomain);
		$this->pathCache = $this->pathCache."".$this->domainMD5.".chf";
	}
	
	public function __destruct() {
		parent::__destruct();
	}
	
	public function save(){
		$this->startConnection();
		
		$this->attrs["id"] = $this->getLastID();
		
		$returnArray = $this->attrs;
		
		$this->attrs = $this->ed->encodeDomainIgnoreTimeStamp($this->nameDomain, $this->attrs);
		
		parent::getSession()->setParameters($this->attrs);
		
		if (!parent::getSession()->insertDb()) {
			return "-1";
		}
		
		$this->deleteCache();
		
		return json_encode($returnArray);
	}
	
	public function search(){
		$this->attrs = $this->ed->encodeDomainIgnoreNull($this->nameDomain, $this->attrs);
		
		if (sizeof($this->attrs) > 0) {
			$this->startConnection();
			
			parent::getSession()->setWhere($this->attrs);
			parent::getSession()->setOrder("ORDER BY ID_".$this->table." ASC");

			$selectReturn = parent::getSession()->selectDb();
			
			if (!$selectReturn) {
				return "-1";
			}
			
			$sqlresultarray = parent::getSession()->fetch($selectReturn);
			$this->arrayDomain = $this->ed->decodeDomains($this->nameDomain, $sqlresultarray);
			$this->arrayDomain = json_encode($this->arrayDomain);
			
			return $this->arrayDomain;
		} else {
			$this->loadCache();
			
			if ($this->arrayDomain == false) {
				$this->startConnection();
				
				parent::getSession()->setOrder("ORDER BY ID_".$this->table." ASC");
					
				$selectReturn = parent::getSession()->selectDb();
					
				if (isEmpty($selectReturn)) {
					return "-1";
				}
				
				$sqlresultarray = parent::getSession()->fetch($selectReturn);
				//return var_dump($sqlresultarray);
				$this->arrayDomain = $this->ed->decodeDomains($this->nameDomain, $sqlresultarray);
				$this->arrayDomain = json_encode($this->arrayDomain);
				
				$this->createCacheFile();
				
				return $this->arrayDomain;
			}
			
			return $this->arrayDomain;
		}	
	}
	
	public function edit(){
		$returnArray = $this->attrs;
		
		$this->startConnection();
		$id["id"] = $this->attrs["id"];
		
		$where = $this->ed->encodeDomainIgnoreNull($this->nameDomain, $id);
		$parameters = $this->ed->encodeDomainIgnoreTimeStamp($this->nameDomain, $this->attrs);
		
		parent::getSession()->setParameters($parameters);
		parent::getSession()->setWhere($where);
		
		if (parent::getSession()->updateDb() < 1) {
			return "-1";
		}
		
		$this->deleteCache();
		
		return json_encode($returnArray);
	}
	
	public function delete(){
		$parameters = $this->ed->encodeDomainIgnoreNull($this->nameDomain, $this->attrs);
		
		$this->startConnection();
		parent::getSession()->setWhere($parameters);
		
		if (parent::getSession()->deleteDb() < 1) {
			echo "-1";
		}
		
		$this->deleteCache();
		
		echo "0";
	}
	
	private function startConnection(){
		parent::openConnection($this->dataBase, $this->table);
	}
	
	private function getLastID() {
		$idLista = parent::getSession()->fetch(parent::getSession()->sqlNative("SELECT MAX(ID_".$this->table.") as ID FROM ".$this->table));
		$id = $idLista[0]->ID;
		
		if ($id == null || $id == "") {
			$id = 0;
		}
		
		return $id+1;
	}
	
	private function loadCache() {
		$this->arrayDomain = @file_get_contents($this->pathCache);
	}
	
	private function createCacheFile() {
		$handle = fopen($this->pathCache,"w+");
		fwrite($handle, $this->arrayDomain);
		fclose($handle);
	}
	
	private function deleteCache() {
		if(is_file($this->pathCache)){
			unlink($this->pathCache);
		}
	}
}
?>