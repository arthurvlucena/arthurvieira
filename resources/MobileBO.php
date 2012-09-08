<?php
require_once "../resources/Util/Util.php";

ini_set('display_errors', '0');    
error_reporting(E_ALL | E_STRICT);

class MobileBO {
	
	private $json;
	private $method;
	private $dataBase;
	
	public function __construct(){
		$this->json = $_POST["json"];
		$this->method = $_POST["method"];
		
		//if (is_null($dataBase)) {
		//	$dataBase = "localMySQL1";
		// 	on net
		$this->dataBase = "UtilTron";
		//}
		
		$this->invokeMethod();
	}
	
	public function invokeMethod(){
		call_user_func(array($this, $this->method));
	}
	
	public function save(){
		include '../resources/Database/DAO/GenericDAO.php';
		$dao = new GenericDAO($this->json, $this->dataBase);
		echo $dao->save();
		//$dao->__destruct();
	}
	
	public function edit(){
		include '../resources/Database/DAO/GenericDAO.php';
		$dao = new GenericDAO($this->json, $this->dataBase);
		echo $dao->edit();
		//$dao->__destruct();
	}
	
	public function search(){
		include '../resources/Database/DAO/GenericDAO.php';
		$dao = new GenericDAO($this->json, $this->dataBase);
		echo $dao->search();
		//$dao->__destruct();
	}
	
	public function delete(){
		include '../resources/Database/DAO/GenericDAO.php';
		$dao = new GenericDAO($this->json, $this->dataBase);
		echo $dao->delete();
		//$dao->__destruct();
	}
}

function main() {
	//new MobileBO();
	echo var_dump($_POST);
}

main();
?>