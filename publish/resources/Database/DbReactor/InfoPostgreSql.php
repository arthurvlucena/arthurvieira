<?php
class InfoPostgreSql extends OpsConnection{
	private $dbTable;
	private $dbWhere;
	private $dbParameters;
	private $dbArrays;
	
	public function __construct(){}
	
	public function __destruct(){} 
	
	public function setTable($dbTable){
		$this->dbTable = $dbTable;
	}
	
	public function setWhere($dbWhere){
		if (empty($dbWhere))
			$this->dbWhere = $dbWhere;
		else
			$this->dbWhere = 'WHERE '.$dbWhere;
	}
	
	public function setParameters($dbParameters){
		$this->dbParameters = $dbParameters;
	}
	
	public function setupArrayInsert(){
		$i = 1;
		$this->dbArrays .= "(";
		foreach($this->dbParameters as $name => $value){
			$this->dbArrays .= $name;
			$i++;
			if ($i <= count($this->dbParameters))
				$this->dbArrays .= ',';
		}
		$this->dbArrays .= ") values(";
		
		$i = 1;
		foreach($this->dbParameters as $name => $value){
			$this->dbArrays .= "'".$value."'";
			$i++;
			if ($i <= count($this->dbParameters))
				$this->dbArrays .= ',';
		}
		$this->dbArrays .= ")";
		return $this->dbArrays;
	}
	
	public function setupArrayUpdate(){
		$i = 1;
		foreach( $this->dbParameters as $name => $value){
			$this->dbArrays .= $name.'='.'\''.$value.'\'';
			$i++;
			if ($i <= count($this->dbParameters))
				$this->dbArrays .= ',';
		}
		return $this->dbArrays;
	}
			
	public function selectDb(){
		return pg_query("SELECT * FROM ".$this->dbTable." ".$this->dbWhere." ".$this->dbParameters);
	}
	
	public function updateDb(){
		pg_query("UPDATE ".$this->dbTable." SET ".$this->setupArrayUpdate()." ".$this->dbWhere);
	}
	
	public function insertDb(){
		pg_query("INSERT INTO ".$this->dbTable.$this->setupArrayInsert()."");
	}	
	
	public function deleteDb(){
		return pg_query("DELETE FROM ".$this->dbTable." ".$this->dbWhere); 
	}
	
	public function numRows($query){
		if($num_rows = mysql_num_rows($query))
			return $num_rows;
	}
	
	public function fetch($query){
		while($value = pg_fetch_object($query)){
			$array[] = $value;
		}
		return $array;
	}
	
	public function openConnection($dbUrl, $dbDataBasePort, $dbUser, $dbPasswd, $dbDataBase){
		$this->connectionLink = pg_connect("host='$this->$dbUrl' port='$dbDataBasePort' dbname='$dbDataBase' user='$dbUser' password='$dbPasswd' ");
		if($this->connectionLink)
			return true;
		else
			return false;
	}
	
	public function closeConnection(){
		if(pg_close($this->connectionLink))
			return true;
		else
			return false;
	}
}
/*
CREATE TABLE "TAB_TESTE"
(
   "COD_TESTE" serial NOT NULL, 
   "TESTE_TITULO" character varying(255), 
   "TESTE_TEXTO" character varying(255), 
   CONSTRAINT "PK_TAB_TESTE" PRIMARY KEY ("COD_TESTE")
) 
WITH (
  OIDS = FALSE
)
;
ALTER TABLE "TAB_TESTE" OWNER TO postgres;

*=====================================================*

CREATE SEQUENCE "TAB_TESTE__COD_TESTE"
   INCREMENT 1
   START 1;
ALTER TABLE "TAB_TESTE__COD_TESTE" OWNER TO postgres;

CREATE TABLE "TAB_TESTE"
(
   "COD_TESTE" bigint DEFAULT nextval(TAB_TESTE__COD_TESTE) NOT NULL, 
   "TESTE_TITULO" character varying(255) NOT NULL, 
   "TESTE_TEXTO" character varying(255) NOT NULL, 
   CONSTRAINT "PK_COD_TESTE" PRIMARY KEY ("COD_TESTE")
) 
WITH (
  OIDS = FALSE
)
;
ALTER TABLE "TAB_TESTE" OWNER TO postgres;

*=====================================================*

CREATE TABLE "TAB_TESTE"
(
   "COD_TESTE" bigint NOT NULL, 
   "TESTE_TITULO" character varying(255) NOT NULL, 
   "TESTE_TEXTO" character varying(255) NOT NULL, 
   CONSTRAINT "PK_COD_TESTE" PRIMARY KEY ("COD_TESTE")
) 
WITH (
  OIDS = FALSE
)
;
ALTER TABLE "TAB_TESTE" OWNER TO postgres;
*/

?>