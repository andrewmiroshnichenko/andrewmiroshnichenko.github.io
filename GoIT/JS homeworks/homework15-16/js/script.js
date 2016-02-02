$(function() {
	
	// Choosing part of the homework

	$('#search').on('click', function() {
		$('.search_wrapper').show();
		$('.proto_wrapper').hide();
	});

	$('#prototyping').on('click', function() {
		$('.proto_wrapper').show();
		$('.search_wrapper').hide();
	});
	
	// AJAX data requesting

	$('#request').on('submit', function(e) {
		var myQueryArray = $( this ).serialize();
		
		e.preventDefault();
		$('.search_wrapper ul').remove();

		if (myQueryArray.length - 2) {
			$.ajax({
				url: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&rsz=large&' + myQueryArray + '&callback=GoogleCallback&context=?',
				dataType: 'jsonp'
			});
		}

		return false;
	});

	// Classes creation

	var humanObject = {};
	var workerObject = Object.create(humanObject)
	var studentObject = Object.create(humanObject)

	// Human class filling

	$('#human_form').on('submit', function(e) {
		var humanFields = $( this ).serializeArray();

		e.preventDefault();
		$.each(humanFields, function(i, field) {
			humanObject[field.name] = field.value;
		});

		$( this ).remove();
		$('.btn_group_proto').show();

	});

	// Choosing subclass

	$('#worker_class').on('click', function() {
		$('.btn_group_proto').remove();
		$('#worker_form').show();
	});

	$('#student_class').on('click', function() {
		$('.btn_group_proto').remove();
		$('#student_form').show();
	});

	// Subclass filling

	$('.subtype').on('submit', function(e) {
		
		if ( $( this ).attr('id') === 'worker_form' ) {
			var obj = workerObject;
			obj.method = function makeCode() {
				alert('Go to work');
			}

		} else if ($( this ).prop('id') === 'student_form' ) {
			var obj = studentObject;
			obj.method = function makeCode() {
				alert('Lets code!');
			}
		}
			
		var fields = $( this ).serializeArray();

		e.preventDefault();
		$.each( fields, function( i, field ) {
			obj[field.name] = field.value;
		});

		creatingTotalSheet(obj);
	});

	// Total sheet creation

	function creatingTotalSheet(class_item) {
		
		// Creating DOM elements
		var $total = $('#total_sheet');
		var $tr = $('<tr></tr>');

		// Showing total table
		$total.show();
		$('#student_form').remove();
		$('#worker_form').remove();
		
		// Creating staticelements
		$tr.prependTo($total);
		$('<th></th>').appendTo($tr).html('Key');
		$('<th></th>').appendTo($tr).html('Value');
		$('<h4>Total class</h4>').prependTo($total);
		
		// creating table body
		$.each(class_item, function(key, value) {
			if (key != 'method') {
				var $tr = $('<tr></tr>').appendTo($total);;
				$('<td>' + key + '</td>').appendTo($tr);
				$('<td>' + value + '</td>').appendTo($tr);
			} else {
				$('<button class="btn btn-warning">Call method</button>').appendTo($total).on('click', value);
			}
		});
	}
});

function GoogleCallback (somejQueryObject, data) {
	var $ul = $('<ul class="col-md-10 col-md-offset-1"></ul>');

	$ul.appendTo('.search_wrapper');
	
	for (var i = 0; i < 8; i++) {

		// Retrieving data from AJAX
		var url = data.results[i].unescapedUrl;
		var title = data.results[i].title;
		var content = data.results[i].content;

		// Creating DOM elemnts
		var $result = $('<li></li>');
		var $headerLink = $('<a href=' + url + '></a>');
		var $headerTitle = $('<h4></h4>');
		var $linkToCash = $('<p class="text-success"></p>');
		var $resultContent = $('<p></p>');

		// Creating DOM
		$result.appendTo($ul);
		$headerLink.appendTo($result);
		$headerTitle.appendTo($headerLink).html(title);
		$linkToCash.appendTo($result).html(url);
		$resultContent.appendTo($result).html(content);

	};
};