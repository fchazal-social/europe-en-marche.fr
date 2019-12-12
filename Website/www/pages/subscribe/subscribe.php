<?php
function subscribe() {
	$username = "eem";
	$password = "f6326d350e2a8ff546f6925f06a2be2a-us15";
	$json_url = "https://us15.api.mailchimp.com/3.0/lists/1e556dc514/members/";
	$payload  = '{
		"email_address": "'.$_POST["email"].'",
		"status": "subscribed",
		"merge_fields": {
			"FNAME": "'.$_POST["firstname"].'",
			"LNAME": "'.$_POST["surname"].'",
			"MMERGE5": "'.$_POST["membership"].'",
			"MMERGE6": "'.$_POST["charter"].'"
		}
	}';

	$ch      = curl_init( $json_url );
	$options = array(
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_USERPWD        => "{$username}:{$password}",
		CURLOPT_HTTPHEADER     => array( "Accept: application/json" ),
		CURLOPT_POST					=> true,
		CURLOPT_POSTFIELDS		=> $payload
	);
	curl_setopt_array( $ch, $options );

	$result = curl_exec( $ch );
	
	header('Location: /#subscribe/finish.html'); 
}

subscribe();
?>