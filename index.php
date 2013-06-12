<?php
require 'functions.php';
connect();
?>

<!doctype html>
<html lang="en">
<head>

	<meta charset="UTF-8">
	<title>Sample Portfolio Website</title>
	<link rel="stylesheet" type="text/css" href="fonts/style.css">
	<link rel="stylesheet" type="text/css" href="style.css">

</head>
	
<body>
<div class="container">
	<div class="navigationContainer">
		<h2 class="header">Sample Portfolio Website</h2>

		<p class="email">email - example@example.com</p>
		<p class="phoneNumber">phone number - (123)456-7890</p>

		<div class="networks">
			<br><p>find me on: </p></br>
			<a href="https://facebook.com" aria-hidden="true" class="icon-facebook" alt="my facebook page"></a>
			<a href="https://twitter.com" aria-hidden="true" class="icon-twitter" alt="my twitter page"></a>
			<a href="https://tumblr.com" aria-hidden="true" class="icon-tumblr" alt="my tumblr page"></a>
			<a href="https://deviantart.com" aria-hidden="true" class="icon-deviantart" alt="my deviantArt page"></a>
			<a href="https://blogger.com" aria-hidden="true" class="icon-blogger" alt="my blog page"></a>
			<a href="https://google.com" aria-hidden="true" class="icon-googleplus" alt="my google+ page"></a>
		</div>

		<nav>
			<ul>
				<li>
					<a href="#" alt="home page">- Home</a>
				</li>
				<li>
					<a href="#" alt="sketches page">Sketches</a>
				</li>
				<li>
					<a href="about/" alt="about page">About</a>
				</li>
				<li>
					<a href="contact/" alt="contact page">Contact</a>
				</li>
			</ul>
		</nav>
	</div>

	<div class="imageAndThumbnailContainer">
		
		<div class='imgContainer'>
			<div class='prevDiv' data-dir="prev">
				<a aria-hidden="true" class="icon-arrow-left" alt="previous image"></a>
			</div>

			<ul>
				<?php addImageToGallery(); ?>
			</ul>
			
			<div class='nextDiv' data-dir="next">
				<a aria-hidden="true" class="icon-arrow-right" alt="next image"></a>
			</div>
		</div>
		
	 	<div class="sideGalleryContainer">
			<div class="sideGallery">
				<ul>
					<?php addThumbnailsToGalery(); ?>	          				
				</ul>
			</div>

			<div class="arrowNav">
				<a data-dir="prev" aria-hidden="true" class="icon-arrow-left-alt1" alt="previous image"></a>
				<a data-dir="next" aria-hidden="true" class="icon-arrow-right-alt1" alt="next image"></a>
			</div>
		</div>

		<div class='imageInfoContainer'>
			<div class="slider-nav">
				<a data-dir="prev" aria-hidden="true" class="icon-arrow-left-alt1" alt="previous image"></a>
				<a data-dir="next" aria-hidden="true" class="icon-arrow-right-alt1" alt="next image"></a>
				
			</div>
			
			<div class='imageInfo'>
			
			
			</div>
		</div>
	</div>
	<footer> 

	</footer> 
</div>


<!-- <div class="toolbarWrapp">
	<div class="imageUpload">
		<a href="Jcrop/?new=true" aria-hidden="true" class="icon-upload" alt="upload image"></a>
	</div>
</div> -->

<script src="scripts/jquery.2.0.1.min.js"></script>
<script src="scripts/slider.js"></script>
<script src="scripts/imageinfo.js"></script>
<script>

$(window).load(function() {
	var imgContainer = document.getElementsByClassName("imgContainer");
	var imageInfoContainer = document.getElementsByClassName("imageInfoContainer");
	var sideGalleryContainer = document.getElementsByClassName("sideGalleryContainer");
	new Slider($(imgContainer).css('overflow','hidden'), $(imageInfoContainer), $(sideGalleryContainer), 
	{
		transitionEffect: 'slide',
		thumbnailTransitionEffect: 'slide',
		continuousLoop: false,
		addImageInfo: false
	});
		// transitionEffect: animations vary between 'slide', 'fade' and 'none'
		// thumbnailTransitionEffect: animations also vary between 'slide', 'fade' and 'none'
		// continuousLoop: if true, images will loop infinitley.
		// addImageInfo: if true, additional image info will load for each image using ajax 

	// Fade the site into view after the entire site and all images have loaded 
	$('.imageAndThumbnailContainer').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0},1000);
});

</script>
		
</body>
</html>