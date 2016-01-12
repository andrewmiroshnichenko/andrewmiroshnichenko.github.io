$(document).ready(function(){
	// Nav click handler
	$( 'nav' ).on( 'click', function() {
		$( 'nav' ).toggleClass('nav_active');
		$( 'ul' ).toggleClass('ul_active');
		$( '.key_solutions' ).toggleClass('key_solutions_hidden');
	});
	// Expertise_name click handler
	$( '.expertise_name' ).hover( function() {
		$( this ).next().animate({
			opacity: 1
		}, 1000);
	}, function() {
		$( this ).next().animate({
			opacity: 0
		}, 1000);
	});
	// Slider
	$('.my-slider').unslider({
		// arrows: false,
		nav: false
	});
});
