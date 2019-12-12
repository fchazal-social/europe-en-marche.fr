<?php
include('common.php');


$log = new Logging();
$log->lfile('update.log');

$log->lwrite('NEW '.$_SERVER['REQUEST_METHOD'].' CONNECTION');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$data = file_get_contents('php://input');
	$log->lwrite($data);
	
	$request = json_decode($data);

	foreach ($request->push->changes as $change) {
		if ($change->new->type == "branch" && $change->new->name == "master") {
			$log->lwrite('UPDATING MASTER');
			
			my_shell_exec('cd /home/francoisbq/www/git && git fetch origin && git reset --hard origin/master', $stdout, $stderr);
			
			$log->lwrite('OUTPUT is: '.$stdout);
			$log->lwrite('ERROR is: '.$stderr);
		}
	}
}

$log->lclose();
?>