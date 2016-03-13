$(function(){
	// Slider or carousel
	$('.arrows').myslider();

	var activePicture;
	var descriptions = [
		{
			checked: false,
			title: 'Sweet pandas',
			description: 'Two pandas, small and big',
			date: '30.12.14'
		}, 
		{	
			checked: false,
			title: 'Cycling race',
			description: 'International Berlin marathon 2013',
			date: '24.05.14'
		}, 
		{
			checked: false,
			title: 'Louis with heater',
			description: 'Louis de Funès, who smiles and heat himself by rubber heater',
			date: '28.11.14'
		}, 
		{
			checked: false,
			title: 'Soup',
			description: 'Hot tasty transkarpathian soup with cheese and garlic',
			date: '21.01.14'
		}, 
		{
			checked: false,
			title: 'Moose',
			description: 'Moose crossed the river, everybody should run',
			date: '23.07.14'
		}, 
		{
			checked: false,
			title: 'Flying dog',
			description: 'Strange creature, sometimes acting like usual dog',
			date: '28.11.14'
		}
	];

	function showDescription() {
		console.log(descriptions[activePicture]);

			$( 'img' ).on('click', function() {
				$('.template').remove();

				activePicture = $( 'img' ).index( this );
				
				if (!descriptions[activePicture].checked) {
					var html = $('#picture_description').html();
					var content = tmpl(html, {
							data: descriptions[activePicture]
					});
					$('body').append(content);

					$('body').on('click', '.btn-success', function() {
						$('.slider_element:eq(' + activePicture + ') > img').css('opacity', '.5');
						$('.slider_element:eq(' + activePicture + ')').css('background-color', 'green');
						$('.template').hide();
						descriptions[activePicture].checked = true;
					});
					$('body').on('click', '.btn-danger', function() {
						$('.slider_element:eq(' + activePicture + ') > img').css('opacity', '.5');
						$('.slider_element:eq(' + activePicture + ')').css('background-color', 'red');
						$(this).hide();
						descriptions[activePicture].checked = true;
					});

				};

			});

		return false;
	};
	showDescription();

});