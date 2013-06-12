<?php

/*
addImageToGallery() will count image files in the images/ directory and 
make img tags with ids = #100 and class = mainimage. addImageToGalery will add
images to htmlfile in order of # (image-#.jpg). 
 */
// images - #100_
function addImageToGallery() {
	$index = 0;
	$filecount = count(glob("images/*.{jpg,jpeg,png,gif}", GLOB_BRACE));
	while ($index < $filecount) {
		$filename = glob("images/*-{$index}.{jpg,jpeg,png,gif}", GLOB_BRACE)[0];
		echo "<li><img id=\"100-{$index}\" class=\"mainImage\" src=\"{$filename}\" alt=\"image {$index}\" /></li>\n";
		++$index;
	}
}

/*
addThumbnailsToGallery() will add thumbnail images to the html file in order
of #(thumb-image-#). img tags are added with id-#200 and class - thumbnail. Every 10 thumbnails added
are seperated by divs with id-#300 and class-thumbnailbracket.
 */
// thumbnails #200_
// thumbnailBrackets #300_
function addThumbnailsToGalery() { 
	$index = 0;
	$divcount = 0;
	$filecount = count(glob("thumbnails/*.{jpg,jpeg,png,gif}", GLOB_BRACE));

    while ($index < $filecount) {
    	if ($index % 10 === 0) { // make a new thumbnailbracket every 10 thumbnails.
    		if($divcount === 0) { // if first, don't write closing div bracket
    			echo "<div class=\"thumbnailBracket\" id=\"300-{$divcount}\">\n";
    		} else {
    			echo "</div>\n<div class=\"thumbnailBracket\" id=\"300-{$divcount}\">\n";
    		}
    		$divcount++;
		}

		$filename = glob("thumbnails/*-{$index}.{jpg,jpeg,png,gif}", GLOB_BRACE)[0]; // find thumbnails in order 
		
    	echo "<li><img id=\"200-{$index}\" class=\"thumbnail\" src=\"{$filename}\" alt=\"thumbnail {$index}\" /></li>\n";
    	$index++;
	}

	if($index > 0) {
		echo "</div>\n";
	}
}

/*
createImage() will create a new image and store it in the desired destination folder.
 */
function createImage($src, $dest, $fileExt, $target_width, $target_height, $org_width, $org_height, $x, $y) {

	$original_image;
	$new_image;
	switch($fileExt) {
		case 'jpg': case 'jpeg':
			$original_image = imagecreatefromjpeg($src);
			$new_image = imagecreatetruecolor( $target_width, $target_height );
			break;
		case 'gif':
			$original_image = imagecreatefromgif($src);
			$new_image = imagecreatetruecolor( $target_width, $target_height );
			break;
		case 'png':
			$original_image = imagecreatefrompng($src);
			$new_image = imagecreatetruecolor( $target_width, $target_height );
			break;
	}

	if($x === 0 && $y === 0) {
		imagecopyresized($new_image, $original_image,
				0, 0, 0, 0,
				$target_width, $target_height,
				$org_width, $org_height);
	} else {
		imagecopyresampled($new_image, $original_image,
				0,0,$x,$y,
				$target_width, $target_width,
				$org_width, $org_height);
	}

	switch($fileExt) {
		case 'jpg': case 'jpeg':
			imagejpeg($new_image, $dest); 
			break;
		case 'gif':
			imagegif($new_image, $dest); 
			break;
		case 'png':
			imagepng($new_image, $dest); 
			break;
	}

	if($new_image) {
		return true;
	} else {
		return false;
	}
}

/*
connect() will connect to the sample_portfolio using name and password
 */
function connect() {
	global $pdo;
	$pdo = new PDO("mysql:host=localhost; dbname=sample_portfolio; charset=utf8", "vatteh", "v4042180");
	$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}

/*
get_picture_info() preoares a statement, executes it and returns the object of results.
called after connect().
 */
function get_picture_info( $id ) {
	global $pdo;

	$stmt = $pdo->prepare('
		SELECT title, date_submitted, comments 
		FROM picture_info
		WHERE imageIndex = :id
		LIMIT 1');

	$stmt->execute(array( ':id' => $id ));
	return $stmt->fetch( PDO::FETCH_OBJ );
}

?>