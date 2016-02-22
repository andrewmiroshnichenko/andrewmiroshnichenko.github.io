(function($){
	$(document).ready(function() {
		$("#owl").owlCarousel({
			items: 1
		});
	});

	function templating(arr, parentElement, template){
		for (var i = 0; i < arr.length; i++) {
			$(parentElement).append( tmpl( $(template).html(), arr[i] ) );
		}
	};

	var index;
	function bannerClickHandler() {
		if ( $('.banner__item').index(this) !== index) {
			console.log(index);
			$('.banner__text').hide();
			$('.banner__desc').removeClass( 'banner__active' );
			$('.banner__plus').removeClass( 'banner__active' );
		}
		index = $('.banner__item').index(this);
			console.log(index);
		
		$('.banner__text').eq(index).toggle();
		$('.banner__plus').eq(index).addClass( 'banner__active' );
		$('.banner__desc').eq(index).addClass( 'banner__active' );

	};

	templating(advantage, 'article.wrapper', '#advantage')
	templating(news, 'section.news', '#news-item');
	templating(banners, 'section.banner', '#banner-item');
	templating(partners, 'div.partners', '#partner-item');
	templating(links, '.useful-links div.wrapper', '#useful-links-block');

	$('.banner__item').on('click',  bannerClickHandler)


})(jQuery);