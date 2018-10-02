<?php  

	$git = new Codeuino_GIT('Codeuino');
	$response = $git->getOrgInJson();
	$res = json_decode($response, true);
	
	foreach($res as $i) {
    	$contURL[] = $git->getContributorsInJson($i['contributors_url']);
	}
	
	// var_dump($contURL);