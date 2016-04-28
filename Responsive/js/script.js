(function($){


	// If display < 320 - do nothing
	// If 320 < display < 768 - look for $(this).index() (even or odd)

	$('body').on('load', generateNewAdvantage(0) );
	$('body').on('click', 'li', function() {
		generateNewAdvantage( $(this).index() );
	});

	function generateNewAdvantage(advantageNumber) {
		var templateHtml = $('#advantages').html();

		$('.article_advantage').remove();
		$('.ending_header').after( tmpl(templateHtml, advantages[advantageNumber]) );

		$('.article_advantage .switcher__item').eq(advantageNumber).addClass('switcher__item_active');
	};

})(jQuery);