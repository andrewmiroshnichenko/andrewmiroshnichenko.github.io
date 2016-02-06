var human = {
	form_id: 'human_form',
	class_name: 'Human',
	fields: [
		{
			field_id: 'weight',
			field_name: 'Weight'
		}, 
		{
			field_id: 'height',
			field_name: 'Height'
		}, 
		{
			field_id: 'sex',
			field_name: 'Sex'
		},
		{
			field_id: 'last_name',
			field_name: 'Last Name'
		}, 
		{
			field_id: 'first_name',
			field_name: 'First Name'
		}
	]
}


var worker = {
	form_id: 'worker_form',
	class_name: 'Worker',
	fields: [
		{
			field_id: 'company_name',
			field_name: 'Company name'
		}, 
		{
			field_id: 'salary',
			field_name: 'Salary'
		}
	]
}

var student = {
	form_id: 'student_form',
	class_name: 'Student',
	fields: [
		{
			field_id: 'university_name',
			field_name: 'University name'
		}, 
		{
			field_id: 'stipend',
			field_name: 'Stipend'
		}
	]
}

$(function() {
	
	// Choosing part of the homework

	$('#search').on('click', function() {
		$('.search_wrapper').show();
		$('.proto_wrapper').hide();
	});

	$('#prototyping').on('click', function() {
		$('.proto_wrapper').show();
		$('.search_wrapper').hide();
		createForm(human);
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

	// $('.proto_wrapper').on('mouseover', '#human_form', function(e) {
	// 	alert('btn_group_main');
	// });

	$('.proto_wrapper').on('submit', '#human_form', function(e) {
		e.preventDefault();
		var humanFields = $( this ).serializeArray();

		$.each(humanFields, function(i, field) {
			humanObject[field.name] = field.value;
		});

		$( this ).hide();
		$('.btn_group_proto').show();

	});

	// Choosing subclass

	$('#worker_class').on('click', function() {
		$('.btn_group_proto').remove();
		createForm(worker);
	});

	$('#student_class').on('click', function() {
		$('.btn_group_proto').remove();
		createForm(student);
	});

	// Subclass filling

	// $('.subtype').on('submit', , function(e) {
	$('.subtype').on('submit', function(e) {

		var obj = {};

		if ( $( this ).attr('id') === 'worker_form' ) {
			obj = workerObject;
			obj.method = function makeCode() {
				alert('Go to work');
			}

		} else if ($( this ).prop('id') === 'student_form' ) {
			obj = studentObject;
			obj.method = function makeCode() {
				alert('Lets code!');
			}
		}
			
		var formFields = $( this ).serializeArray();

		e.preventDefault();
		$.each( formFields, function( i, field ) {
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

	function createForm(object) {

	//Creation of header and submit 
		var data = object;
		var headerContent = tmpl( $('#form_header').html(), data);
		$('.proto_wrapper').append(headerContent);

	//Creation of form body
		$.each(data.fields, function(i) {
			var fieldContent = tmpl( $('#form_field').html(), data.fields[i] );
			$('#' + data.form_id + ' div:first').after(fieldContent);
		});

	}
});

function GoogleCallback (somejQueryObject, data) {
	var $ul = $('<ul class="col-md-10 col-md-offset-1"></ul>');

	$ul.appendTo('.search_wrapper');
	
	for (var i = 0; i < data.results.length; i++) {

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
