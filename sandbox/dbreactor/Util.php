<?php 
function getStatus($new) {
	static $tempo;
	
	if ($new) {
		$tempo = NULL;
	}
	
	if ($tempo == NULL) {
		$tempo = microtime(true);
	} else {
		echo 'Tempo (segundos): ',(microtime(true) -$tempo), '<br /> Memory peak usage (bytes): ', memory_get_peak_usage(true), '<br /> Memory usage (bytes): ',memory_get_usage(true), '<br />';
	}
}

function logger($str) {
	if (empty($GLOBALS['log'])) {	
		$GLOBALS['log'] = $str.'<br>';
	} else {
		$GLOBALS['log'] .= $str.'<br>';
	}
}

function showLog() {
	echo $GLOBALS['log'],'<br>';
}
?>