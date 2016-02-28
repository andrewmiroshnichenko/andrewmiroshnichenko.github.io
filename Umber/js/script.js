(function($){

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

	$(document).ready(function() {
		$("#owl").owlCarousel({
			items: 2
		});
	});

})(jQuery);