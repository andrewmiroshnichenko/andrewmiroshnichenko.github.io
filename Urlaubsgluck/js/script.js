var fish = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur architecto beatae non perspiciatis, nostrum voluptates repellat aspernatur impedit ullam reprehenderit cum maiores qui, cumque illo error ipsum culpa ducimus? Libero.'.split(' ');
console.log(fish);


$(document).ready( function() {

	$('.grid').isotope({
		itemSelector: '.grid__item',
		layoutMode: 'vertical',
	});

	$.ajax({
		url: 'http://api.pixplorer.co.uk/image?word=cat&amount=7&size=s',
		dataType: 'json',
		success: loadImages
	});

	$('.partners-search__submit').on('click', function(e) {
		e.preventDefault();
		getNewImages();
	});


	function getNewImages() {
		var query = $('.partners-search__input').val();
		console.log('data');
		$.ajax({
			url: 'http://api.pixplorer.co.uk/image?word=' + query + '&amount=7&size=s',
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
		console.log(data);
		i = 0;
	};

});