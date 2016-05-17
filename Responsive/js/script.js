(function($){


	// If display < 320 - do nothing
	// If 320 < display < 768 - look for $(this).index() (even or odd)

	document.addEventListener('DOMContentLoaded',  function() {
		if (document.documentElement.clientWidth < 768) {
			generateNewAdvantage(advantages320, 0, '#advantages320');
		} else if (document.documentElement.clientWidth >= 768) {
			generateNewAdvantage(advantages768, 0, '#advantages768');
		}
	});
	$('body').on('click', 'li', function() {
		if (document.documentElement.clientWidth < 768) {
			generateNewAdvantage(advantages320, $(this).index(),'#advantages320');
		} else if (document.documentElement.clientWidth >= 768) {
			generateNewAdvantage(advantages768, $(this).index(),'#advantages768');
		}
	});

	function generateNewAdvantage(advantageSet, advantageNumber, templateId) {
		var templateHtml = $(templateId).html();

		$('.article_advantage').remove();
		$('.ending_header').after( tmpl(templateHtml, advantageSet[advantageNumber]) );

		$('.article_advantage .switcher__item').eq(advantageNumber).addClass('switcher__item_active');
	};

})(jQuery);