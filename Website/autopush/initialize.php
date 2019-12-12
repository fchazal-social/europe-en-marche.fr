<?php
include('common.php');

$dir = '/home/europeenmi/new/git';
$git = 'git@bitbucket.org:europeenmarche/site-association.git';

my_shell_exec("ssh-keygen -f /home/europeenmi/.ssh/id_rsa", $stdout, $stderr);
//my_shell_exec("cd $dir && git init", $stdout, $stderr);
//my_shell_exec("cd $dir && git remote add origin $git", $stdout, $stderr);
//my_shell_exec("cd $dir && ssh -T git@bitbucket.org -oStrictHostKeyChecking=no -oUserKnownHostsFile=/dev/null", $stdout, $stderr);
//my_shell_exec("cd $dir && ssh -T git@bitbucket.org -oStrictHostKeyChecking=no", $stdout, $stderr);

//my_shell_exec("cd $dir && git fetch origin && git reset --hard origin/production", $stdout, $stderr);

echo $stdout;
echo $stderr;
?>	