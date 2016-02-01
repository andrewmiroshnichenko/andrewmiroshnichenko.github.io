
function GoogleCallback (somejQueryObject, data) {
	var wrapper = $('<div class="wrapper"></div>');
	wrapper.appendTo('body');
	var ul = $('<ul></ul>');
	ul.appendTo(wrapper);
	for (var i = 0; i < 8; i++) {

		var url = data.results[i].unescapedUrl;
		var title = data.results[i].title;
		var content = data.results[i].content;

		var result = $('<li></li>');
		var headerLink = $('<a href=' + url + '></a>');
		var headerTitle = $('<h4></h4>');
		var linkToCash = $('<p></p>');
		var resultContent = $('<p></p>');

		result.appendTo(ul);
		headerLink.appendTo(result);
		headerTitle.appendTo(headerLink).html(title);
		linkToCash.appendTo(result).html(url);
		resultContent.appendTo(result).html(content);

	};
	
	console.log(data.results[1]);
};

$(function() {
	$('#submitQuery').on('click', function (e) {
		e.preventDefault();
		var myTestArray = $('form').serialize();
		console.log(myTestArray);
		$.ajax({
			url: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&rsz=large&' + myTestArray + '&callback=GoogleCallback&context=?',
			dataType: 'jsonp'
		});
	});
});