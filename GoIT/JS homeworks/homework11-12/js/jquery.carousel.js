(function($){
	$.fn.myslider = function(options) {

		var defaults = {
		startPosition: 0,
		displayNumber: 2,
		animationTime: 300,
		pictureWidth: 400,
		picturePadding: 50,
		defaultScrollTime: 3000,
		imageCount: $('.slider_element').length,
		}

		var settings = $.extend(defaults, options);
		var shiftStep = settings.pictureWidth + settings.picturePadding;
		var shiftMaximum = -(settings.imageCount - settings.displayNumber)*shiftStep;
		var scrollTrigger = setInterval(scrollForward, settings.defaultScrollTime);
		
		// Additional DOM creation
		var $anchor = $('.slider');
		$anchor.wrap('<div class="slider_hider"></div>');
		$('body').append($('<div class="row"></div>'));
		$('.row').append('<button class="btn btn-primary arrow_prev col-sm-1 col-md-offset-3"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></button>');
		$('.row').append('<div class="col-md-2 col-md-offset-1"><h4>Click picture to vote</h4></div>');
		$('.row').append('<button class="btn btn-primary arrow_next col-md-1 col-md-offset-1"><span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></button>');

		// Handlers
		function scrollForward() {
			settings.startPosition -= shiftStep;
		
			if (settings.startPosition < shiftMaximum) {
				settings.startPosition = 0;
				$anchor.animate({
					left: 0
				}, settings.animationTime);			
			};

			$anchor.animate({
				left: settings.startPosition
			}, settings.animationTime);

			clearInterval(scrollTrigger);
			scrollTrigger = setInterval(scrollForward, 2000);
		};

		function scrollBackward() {
			settings.startPosition += shiftStep;
			
			if (settings.startPosition > 0) {
				settings.startPosition = shiftMaximum;
				$anchor.animate({
					left: settings.shiftMaximum
				}, settings.animationTime);	
			};
			
			$anchor.animate({
				left: settings.startPosition
			}, settings.animationTime);

			clearInterval(scrollTrigger);
			scrollTrigger = setInterval(scrollForward, 2000);
		};

		$('.arrow_next').on('click', scrollForward );
		$('.arrow_prev').on('click', scrollBackward );

		return this;
	}

})(jQuery);