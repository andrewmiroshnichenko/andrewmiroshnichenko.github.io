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
		$('.switcher__container').css('top', '220px');
		$('.section_violet .section__text').css('color', '#fff');
		$('.section_violet .article__count-number_inline').css('background', 'url(img/opportunities/underline-white.png) left bottom no-repeat');

		if ((templateId === '#advantages768') && (advantageNumber === 1)) {
			$('.article__image').css('right', '0');
			$('.article__image').css('padding-top', '12px');
			$('.article__header').css('padding', '56px 100px 22px 33px');
			$('.article__header').css('float', 'left');
			$('.section').css('float', 'left');
			$('.section').css('width', '100%');
			$('.section_white').css('padding', '18px 355px 0 33px');
			$('.section_gray').css('padding', '58px 355px 0 33px');
			$('.section_violet').css('padding', '48px 355px 0 33px');
		}
	};

})(jQuery);