<?php
	/**
	 * 
	 */
	class Codeuino_GIT
	{
		public $orgName;
		public function __construct($orgName)
		{
			$this->orgName = $orgName;
		}
		public function getOrgInJson()
		{
			$orgName = $this->orgName;
			// curl
			$ch = curl_init();
		    curl_setopt($ch, CURLOPT_USERAGENT,$orgName);
		    curl_setopt($ch, CURLOPT_HEADER, 0);
		    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		    curl_setopt($ch, CURLOPT_URL, "https://api.github.com/orgs/Codeuino/repos");
		    $response = curl_exec($ch);
		    curl_close($ch);
		    return $response;
		}
		public function getContributorsInJson($url)
		{
			$orgName = $this->orgName;
			// curl
			$ch = curl_init();
		    curl_setopt($ch, CURLOPT_USERAGENT,$orgName);
		    curl_setopt($ch, CURLOPT_HEADER, 0);
		    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		    curl_setopt($ch, CURLOPT_URL, $url);
		    $response = curl_exec($ch);
		    curl_close($ch);
		    return $response;
		}
	}