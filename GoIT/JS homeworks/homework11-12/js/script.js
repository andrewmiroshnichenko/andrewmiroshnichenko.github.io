$(function(){
	// Slider or carousel
	$('.arrows').myslider();

	var activePicture;
	var descriptions = [
		{
			title: 'Sweet pandas',
			description: 'Two pandas, small and big',
			date: '30.12.14'
		}, 
		{	
			title: 'Cycling race',
			description: 'International Berlin marathon 2013',
			date: '24.05.14'
		}, 
		{
			title: 'Louis with heater',
			description: 'Louis de Funès, who smiles and heat himself by rubber heater',
			date: '28.11.14'
		}, 
		{
			title: 'Soup',
			description: 'Hot tasty transkarpathian soup with cheese and garlic',
			date: '21.01.14'
		}, 
		{
			title: 'Moose',
			description: 'Moose crossed the river, everybody should run',
			date: '23.07.14'
		}, 
		{
			title: 'Flying dog',
			description: 'Strange creature, sometimes acting like usual dog',
			date: '28.11.14'
		}
	];
	function showDescription() {
		$( 'img' ).on('click', function() {
			$('.template').remove();
			activePicture = $( 'img' ).index( this );
			var html = $('#picture_description').html();
			var content = tmpl(html, {
					data: descriptions[activePicture]
			});
			$('body').append(content);
			console.log(activePicture);
		});
		return false
	};
	showDescription();


});