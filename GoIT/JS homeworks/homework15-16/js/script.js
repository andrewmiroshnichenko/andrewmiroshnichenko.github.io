// Objects for form templates

var humanFormFields = {
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


var workerFormFields = {
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

var studentFormFields = {
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
		createForm(humanFormFields);
		$('#human_form').removeClass('subtype');
	});
	
	// AJAX data requesting

	$('#request').on('submit', function(e) {
		var myQueryArray = $('#request input').val();
		
		e.preventDefault();
		$('.search_wrapper dl').remove();

		if (myQueryArray.length) {
			$.ajax({
				url: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&rsz=large&q=' + myQueryArray + '&callback=GoogleCallback&context=?',
				dataType: 'jsonp'
			});
		}

		return false;
	});

	// Classes creation

	var humanObject = {};
	var workerObject = Object.create(humanObject);
	var studentObject = Object.create(humanObject);

	// Human class filling

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
		$('.btn_group_proto').hide();
		createForm(workerFormFields);
	});

	$('#student_class').on('click', function() {
		$('.btn_group_proto').hide();
		createForm(studentFormFields);
	});

	// Subclass filling

	$('.proto_wrapper').on('submit', '.subtype', function(e) {

		var obj = {};
		var formFields = $( this ).serializeArray();

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

		e.preventDefault();
		$.each( formFields, function( i, field ) {
			obj[field.name] = field.value;
		});
		creatingTotalSheet(obj);

		return false;
	});

	// Total sheet creation

	function creatingTotalSheet(class_item) {
		
		var $total = $('#total_sheet');

		// Showing total table
		$total.show();
		$('#student_form').hide();
		$('#worker_form').hide();
		
		// Creating table body
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

		return false;
	}
});

function GoogleCallback (somejQueryObject, data) {

	var resultInstance = {};
	var templateHtml = $('#google_result_instance').html();

	for (var i = 0; i < data.results.length; i++) {
		resultInstance.url = data.results[i].unescapedUrl;
		resultInstance.title = data.results[i].title;
		resultInstance.content = data.results[i].content;
		$('.search_wrapper form').after( tmpl(templateHtml, resultInstance) );

	};
};
