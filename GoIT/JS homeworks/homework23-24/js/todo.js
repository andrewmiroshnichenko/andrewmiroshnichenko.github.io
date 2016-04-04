require.config({
	baseUrl: 'js/src',
	paths: {'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min'},
});

	require (
		[
		'Model',
		'View',
		'Controller',
		'jquery',
		'tmpl'
		],
		function(Model, View, Controller) {
			var base = ['Lorem ipsum', 'Dolor sit', 'Amet, consectetur!'];
			var model = new Model(base);
			var view = new View(model);
			var controller = new Controller(model, view);
		}

	);