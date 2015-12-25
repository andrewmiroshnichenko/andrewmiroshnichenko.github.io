// DOM creation
function createNewElement(elementName, searchName, classList, elementType, elementId, elementFor, elementText) {
	var elementNameHTML = '<' + elementName + '>' + '</' + elementName + '>';
	$( searchName ).append( elementNameHTML );
	for (var i = 0; i < classList.length; i++) {
		var addClassVar = searchName + ' > ' +  elementName;
		// alert(addClassVar);
		$( addClassVar ).addClass( classList[i] );
	};
	$ ( elementName ).attr( 'type', elementType);
	$ ( elementName ).attr( 'for', elementFor );
	$ ( elementName ).attr( 'id', elementId );
	$ ( elementName ).text( elementText );
	}

	createNewElement('form', 'body', ['form-horizontal']);
	createNewElement('div', 'form', ['form-group']);
	createNewElement('div', 'form', ['form-group']);
	createNewElement('div', 'form', ['form-group']);
	createNewElement('div', 'form', ['form-group']);
	createNewElement('label', '.form-group', ['col-sm-3', 'control-label']);
	createNewElement('div', '.form-group', ['col-sm-4']);
	$( '.form-group:last-child label' ).remove();
	$( '.form-group:last-child div' ).remove();
	createNewElement('input', '.col-sm-4', ['form-control'], 'text');
	createNewElement('div', '.form-group:last-child', ['col-sm-offset-2', 'col-sm-1']);
	createNewElement('button', '.col-sm-offset-2', ['btn', 'btn-default'], 'submit');


// DOM Tuning
	$( 'label' ).eq( 0 ).attr( 'for', 'first_name' ).text( 'First name' );
	$( 'label' ).eq( 1 ).attr( 'for', 'last_name' ).text( 'Last name' );
	$( 'label' ).eq( 2 ).attr( 'for', 'address' ).text( 'Address' );
	$( 'input' ).eq( 0 ).attr( 'id', 'first_name' );
	$( 'input' ).eq( 1 ).attr( 'id', 'last_name' );
	$( 'input' ).eq( 2 ).attr( 'id', 'address' );
	$( 'button' ).text( 'Show help' );