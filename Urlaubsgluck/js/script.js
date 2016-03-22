// var fish = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur architecto beatae non perspiciatis, nostrum voluptates repellat aspernatur impedit ullam reprehenderit cum maiores qui, cumque illo error ipsum culpa ducimus? Libero.'.split(' ');
// console.log(fish);


$(document).ready( function() {

	$('.grid').isotope({
		itemSelector: '.grid__item',
		layoutMode: 'masonry',
		masonry: {
			// gutter: 20
			columnWidth: 50
		}
	});

	$.ajax({
		url: 'http://api.pixplorer.co.uk/image?word=wall&amount=7&size=s',
		dataType: 'json',
		success: loadImages
	});

	$('.partners-search__submit').on('click', function(e) {
		e.preventDefault();
		getNewImages();
	});


	function getNewImages() {
		var queryPhrase = $('.partners-search__input').val();
		var queryLength = $('.grid__item').length;
		$.ajax({
			url: 'http://api.pixplorer.co.uk/image?word=' + queryPhrase + '&amount=' + queryLength + '&size=s',
			dataType: 'json',
			success: loadImages
		});
	};

	function loadImages(data) {
		var i = 0;
		$('.grid__image').each(function () {
			var src = data.images[i].imageurl;
			$(this).attr('src', src);
			i++;
		});
		i = 0;
	};

});