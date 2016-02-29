(function($){

	$(document).ready(function() {
		$("#owl").owlCarousel({
			items: 3,
			itemsDesktop: [1000,2],
			itemsDesktopSmall: [800,2],
			itemsTablet: [600,1],
			itemsMobile: true
		});
	});

	var user;
	$('.subscribe__form').on('submit', function(e) {
	user = $('.subscribe__input').val();

		e.preventDefault();
		user = JSON.stringify(user);
		$('.popup').show();
		$('.popup__text').html(user);
		console.log(user);
		return false;
	});

	$('.popup').on('click', function() {
		$('.popup').hide();
	});

})(jQuery);