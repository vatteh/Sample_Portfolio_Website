/*
ImageInfo() will retrieve the index for the current image and ajax it to the the 
detebase.php file. When received, the info is appended to the imageInfo container.
retriveInfo(string) - based off of sliderOptions.addImageInfo. Either 'true' or 'false'
imageIndex - the index of the image that we will use to lookup the imageIndex column in the database
imageInfo -  the imageInfo div in the DOM where we append our data.
 */
function ImageInfo(retriveInfo, imageIndex, imageInfo) {

	if (retriveInfo === true) {
		$.post("./database.php", {imageIndex: imageIndex}, function(data) {
			$(imageInfo).text("");
			$(imageInfo).append(data);
		});
	} else {
		$(imageInfo).text("");
		$(imageInfo).append("<p>No info availble for this image.</p>");
	}
}
