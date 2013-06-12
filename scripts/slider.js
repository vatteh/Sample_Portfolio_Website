function Slider(imgContainer, imageInfoContainer, tmbContainer, options) {
	this.imgContainer = imgContainer;
	this.tmbContainer = tmbContainer;
	this.sliderNavButtons = imageInfoContainer.find('div.slider-nav').show();
	this.sliderOptions = options;
	this.imageInfo = imageInfoContainer.find('div.imageInfo');

	// thumbnail info
	this.thumbnailContainer = this.tmbContainer.children('div.sideGallery');
	this.ulThumbImages = this.thumbnailContainer.children('ul');
	this.thumbnailBracketArray = this.ulThumbImages.find('div.thumbnailBracket');
	this.thumbImgCount = this.thumbnailBracketArray.length;
	this.thumbnailContainerWidth = parseInt(this.thumbnailContainer.css('width'));
	this.currentThumbnailBracket = 0;

	// image info
	this.ulImages = this.imgContainer.children('ul');
	this.imgArray = this.imgContainer.find('li');
	this.imgCount = this.imgArray.length;
	this.maxWidth = parseInt(this.imgContainer.css('width'));
	this.maxHeight = parseInt(this.imgContainer.css('height'));
	this.currentImage = 0;
	
	// start up the event listiners
	this.events.buttons.call(this);
	this.events.keys.call(this);
	this.events.thumbnails.call(this);
	this.events.imageArrows.call(this);
	this.events.thumbnailArrows.call(this);

	//initalize mode
	this.selectThumbnail();
	this.imagePlacement();
	this.thumbnailPlacement();
	ImageInfo(this.sliderOptions.addImageInfo, this.currentImage, this.imageInfo);
	this.InitalizeMode = true;
	this.toggleArrow(this.currentImage, this.imgCount-1, this.imgContainer);
	this.toggleArrow(this.currentImage, this.imgCount-1, this.sliderNavButtons);
	this.toggleArrow(this.currentThumbnailBracket, this.thumbImgCount-1, this.tmbContainer);
	this.InitalizeMode = false;

	return this;
}

/*
imagePlacement() is called on initialization and will set images to absolute
and only set the current image to visible, if transitionEffect to slide. Then call
to addpadding()
 */
Slider.prototype.imagePlacement = function() {
	var self = this;

	if (this.sliderOptions.transitionEffect === 'slide') {
		this.addPadding();
	} else {
		for(var i = 0, len = this.imgArray.length; i < len; i++) {
			$(this.imgArray[i]).css('position','absolute');

			if(i === self.currentImage) {
				$(this.imgArray[i]).show();
			} else {
				$(this.imgArray[i]).hide();
			}
		}
		this.addPadding();
	}
};

/*
thumbnailPlacement(), same as imagePlacement() will set the thumbnailBrackets to 
absolute and sets the current thumbnailBrackets to visible.
 */
Slider.prototype.thumbnailPlacement = function() {
	var self = this;

	if (this.sliderOptions.thumbnailTransitionEffect !== 'slide') {

		for(var i = 0, len = this.thumbnailBracketArray.length; i < len; i++) {
			$(this.thumbnailBracketArray[i]).css('position','absolute');

			if(i === self.currentThumbnailBracket) {
				$(this.thumbnailBracketArray[i]).show();
			} else {
				$(this.thumbnailBracketArray[i]).hide();
			}
		}
	}
};

/*
addPadding() will add a level of padding to the width and height of 
each image to have the images fit perfectly in
the imgContainer. This so that one image is seen 
at a time and transition() only has to animate left
the size of this.maxWidth which is will be a constant. 	
if slide is true: we add also add width to the images
We add margins to the top of images that have height less that half
the size of the  image container
 */
Slider.prototype.addPadding = function() {

	for(var i = 0, len = this.imgArray.length; i < len; i++) {
		var width = parseInt($(this.imgArray[i]).css('width'));
		var height = parseInt($(this.imgArray[i]).css('height'));
  		
  		if(width < this.maxWidth) {
			var padding = this.maxWidth - width;
			$(this.imgArray[i]).css('margin-right',padding/2);
			$(this.imgArray[i]).css('margin-left',padding/2);
		}

		if(height < this.maxHeight) {
			var padding = this.maxHeight - height;
			$(this.imgArray[i]).css('margin-top',(padding/2));
		}
	}
};

/*
transition() will do the actual slide or fade animation(or none) from image to image or thumbnailBracket to
thumbnailBracket, given the: 
container - array of items 
ulToAnimate - container of li items that will animante if 'slide' is the effect chosen
current - the index of the container that will be the current
effect - effect chosen in sliderOptions
width - width of the ulToAnimate
 */
Slider.prototype.transition = function(container, ulToAnimate, current, effect, width) {
	var self = this;
	if (effect === 'slide') {
		ulToAnimate.animate({
			'margin-left': -(current * width)
		});
	} else if (effect === 'fade') {
		for(var i = 0, len = container.length; i < len; i++) {
			if(i === current) {
				$(container[i]).fadeIn();
			} else {
				$(container[i]).fadeOut();
			}
		}
	} else {
		for(var i = 0, len = container.length; i < len; i++) {
			if(i === current) {
				$(container[i]).show();
			} else {
				$(container[i]).hide();
			}
		}
	}
};

/*
toggleArrow() will toggle the function of the arrows when the index at the 
beginning and the end of the array. This function is also used at initalizion.  
 */
Slider.prototype.toggleArrow = function(currIndex, endIndex, divContainer) {
	
	var prevButton,nextButton;
	if(this.sliderOptions.continuousLoop === true) {
		if(this.InitalizeMode) {
			prevButton = divContainer.find('[data-dir=prev]');
			nextButton = divContainer.find('[data-dir=next]');
			$(prevButton).removeClass('disable');
			$(nextButton).removeClass('disable');
			$(prevButton).addClass('hoverButton');
			$(nextButton).addClass('hoverButton');
		}
		return;
	}

	prevButton = divContainer.find('[data-dir=prev]');
	nextButton = divContainer.find('[data-dir=next]');
	if(currIndex === 0) {
		$(prevButton).addClass('disable');
		$(prevButton).removeClass('hoverButton');
		$(nextButton).removeClass('disable');
		$(nextButton).addClass('hoverButton');
	} else if (currIndex === endIndex) {
		$(prevButton).removeClass('disable');
		$(prevButton).addClass('hoverButton');
		$(nextButton).addClass('disable');
		$(nextButton).removeClass('hoverButton');
	} else {
		$(prevButton).removeClass('disable');
		$(nextButton).removeClass('disable');
		$(prevButton).addClass('hoverButton');
		$(nextButton).addClass('hoverButton');
	}
}

/*
 selectThumbnail() will go through each li in the thumbnail container and obtain the imageId
 in the img tag, which is the child of the li tag. If the imageId === currentImage,
 highlight the border a shade of blue and set the currentThumbnailBracket by looking at the parent. 
*/ 
Slider.prototype.selectThumbnail = function() {
	var self = this;
	var thumbnails = this.thumbnailContainer.find("li");

	for(var i = 0, len = thumbnails.length; i < len; i++) {
		// img is the actual image, which is the child of li.
		var img = $(thumbnails[i]).children()[0];
	
		// if the id of img is equal to the current image, we highlight it, else we 
		// paint it back it to white.
 		if(parseInt(img.id.slice(4)) === this.currentImage) {
 			$(thumbnails[i]).css({"border-color":"#5aa8d0"});
 			// update the current thumbnail bracket
 			self.currentThumbnailBracket = parseInt($(thumbnails[i]).parent()[0].id.slice(4));
 		} else {
 			$(thumbnails[i]).css({"border-color":"#ecf0f1"});
 		}
	}
};

/*
setCurrentTmage() is called when a bi-direct event is called for flipping through images(button,keys, imagearrows). 
 */
Slider.prototype.setCurrentImage = function( dir ) {

	if (dir === 'prev') {
		// if sliderOptions.continuousLoop is false, at this.currentImage === 0, any call to 'prev' will keep the index at 0
		var beginning = (this.sliderOptions.continuousLoop === true) ? this.imgCount-1 : 0;
		this.currentImage = (this.currentImage === 0) ? beginning : this.currentImage - 1;

	} else if(dir === 'next') {
		// if sliderOptions.continuousLoop is false, at this.currentImage === this.imgCount-1, any call to 'next' will keep the index at this.imgCount-1
		var end = (this.sliderOptions.continuousLoop === true) ? 0 : this.imgCount-1;
		this.currentImage = (this.currentImage === this.imgCount-1) ? end : this.currentImage + 1;
	} 

	this.transition(this.imgArray, this.ulImages, this.currentImage, this.sliderOptions.transitionEffect, this.maxWidth);
	this.selectThumbnail();
	this.transition(this.thumbnailBracketArray, this.ulThumbImages, this.currentThumbnailBracket, this.sliderOptions.thumbnailTransitionEffect, this.thumbnailContainerWidth);
	ImageInfo(this.sliderOptions.addImageInfo, this.currentImage, this.imageInfo);
	this.toggleArrow(this.currentImage, this.imgCount-1, this.imgContainer);
	this.toggleArrow(this.currentImage, this.imgCount-1, this.sliderNavButtons);
	this.toggleArrow(this.currentThumbnailBracket, this.thumbImgCount-1, this.tmbContainer);
};


/*
If the thumbnail arrows are used, setCurrentThumbnailBracket() is called to change the index of the current ThumbnailBracket. This method
is also called every time we transition to another image in case we need to transition to another ThumbnailBracket. 
 */
Slider.prototype.setCurrentThumbnailBracket = function( dir ) {
	
	if (dir === 'prev') {
		var beginning = (this.sliderOptions.continuousLoop === true) ? this.thumbImgCount-1 : 0;
		this.currentThumbnailBracket = (this.currentThumbnailBracket === 0) ? beginning : this.currentThumbnailBracket - 1;
	} else if(dir === 'next') {
		var end = (this.sliderOptions.continuousLoop === true) ? 0 : this.thumbImgCount-1;
		this.currentThumbnailBracket = (this.currentThumbnailBracket === this.thumbImgCount-1) ? end : this.currentThumbnailBracket + 1;
	}

	this.transition(this.thumbnailBracketArray, this.ulThumbImages, this.currentThumbnailBracket, this.sliderOptions.thumbnailTransitionEffect, this.thumbnailContainerWidth);
	this.toggleArrow(this.currentThumbnailBracket, this.thumbImgCount-1, this.tmbContainer);
};


/*
Initalize by binding all events we use to flip through images.
 */
Slider.prototype.events = {
	buttons: function() {
		var self = this;

		self.sliderNavButtons.children('a').on('click', function(e) {
			self.setCurrentImage($(this).data('dir'));
			e.preventDefault();
		});	
	},

	keys: function() {
		var self = this;

		$(document).on('keydown', function(event) {
			if(event.keyCode === 37) {
				self.setCurrentImage('prev');
			} else if(event.keyCode === 39) {
				self.setCurrentImage('next');
			}
			event.preventDefault();
		});	
	},

	thumbnails: function() {
		var self = this;

		self.thumbnailContainer.find("img").on('click', function(e) {
			self.currentImage = parseInt(this.id.slice(4));
			self.setCurrentImage();
			e.preventDefault();
		});
	},

	imageArrows: function() {
		var self = this;

		self.imgContainer.find('div[data-dir="prev"]').on('click', function(e) {
			self.setCurrentImage('prev');
			e.preventDefault();
		});

		self.imgContainer.find('div[data-dir="next"]').on('click', function(e) {
			self.setCurrentImage('next');
			e.preventDefault();
		});
	},

	thumbnailArrows: function() {
		var self = this;

		this.tmbContainer.children("div.arrowNav").children("a").on('click', function(e) {
			self.setCurrentThumbnailBracket($(this).data('dir'));
			e.preventDefault();
		});
	}
};