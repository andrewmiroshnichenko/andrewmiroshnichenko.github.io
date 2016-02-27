(function($){

	$('body').on('load', generateNewAdvantage(0) );
	$('body').on('click', 'li', function() {
		generateNewAdvantage( $(this).index() );
	});

	function generateNewAdvantage(advantageNumber) {
		var templateHtml = $('#advantages').html();

		$('#advantage-item').remove();
		$('body>header').after( tmpl(templateHtml, advantages[advantageNumber]) );

		$('#advantage-item li').eq(advantageNumber).addClass('active');
	};

})(jQuery);