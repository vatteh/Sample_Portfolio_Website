<?php

require 'functions.php';
connect();

if ( isset($_POST['imageIndex']) === true ) {

	$info = get_picture_info( $_POST['imageIndex'] );

	if($info) {
		echo "<h3>{$info->title}</h3></br>";
		echo "<p>Date Submitted - {$info->date_submitted}</p></br>";
		echo "<p>{$info->comments}</p>";
	} else {
		echo "<p>No info available on the server!</p>";
	}
} else {
	echo "<p>No info available: could not connect</p>";
}