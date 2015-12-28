// DOM creation
function createNewElement(elementName, searchName, classList, elementType) {
	var elementNameHTML = '<' + elementName + '>' + '</' + elementName + '>';
	$( searchName ).append( elementNameHTML );
	for (var i = 0; i < classList.length; i++) {
		var addClassVar = searchName + ' > ' +  elementName;
		$( addClassVar ).addClass( classList[i] );
	};
	$ ( elementName ).attr( 'type', elementType);
	}

	createNewElement('form', 'body', ['form-horizontal']);
	createNewElement('div', 'form', ['form-group']);
	createNewElement('div', 'form', ['form-group']);
	createNewElement('div', 'form', ['form-group']);
	createNewElement('div', 'form', ['form-group']);
	createNewElement('label', '.form-group:not(:last-child)', ['col-sm-3', 'control-label']);
	createNewElement('div', '.form-group:not(:last-child)', ['col-sm-4']);
	createNewElement('input', '.col-sm-4', ['form-control'], 'text');
	createNewElement('span', '.form-group:not(:last-child)', [ 'col-sm-3']);
	createNewElement('div', '.form-group:last-child', ['col-sm-offset-2', 'col-sm-1']);
	createNewElement('button', '.col-sm-offset-2', ['btn', 'btn-default'], 'submit');

// DOM Tuning , 'invisible'
	$( 'label' ).eq( 0 ).attr( 'for', 'first_name' ).text( 'First name' );
	$( 'label' ).eq( 1 ).attr( 'for', 'last_name' ).text( 'Last name' );
	$( 'label' ).eq( 2 ).attr( 'for', 'address' ).text( 'Address' );
	$( 'input' ).eq( 0 ).attr( 'id', 'first_name' );
	$( 'input' ).eq( 1 ).attr( 'id', 'last_name' );
	$( 'input' ).eq( 2 ).attr( 'id', 'address' );
	$( 'span' ).eq( 0 ).attr( 'style', 'opacity: 0;' ).text( 'Please provide your firstname' );
	$( 'span' ).eq( 1 ).attr( 'style', 'opacity: 0;' ).text( 'Please provide also your lastname' );
	$( 'span' ).eq( 2 ).attr( 'style', 'opacity: 0;' ).text( 'Your home or work address' );
	$( 'button' ).text( 'Show help' );

// hover handler
var inputNum = $( 'input' );
inputNum.hover(function(){
	var elNum = inputNum.index(this);
    $( 'span' ).eq( elNum ).animate({opacity: 1}, 1000);
}, function(){
	var elNum = inputNum.index(this);
    $( 'span' ).eq( elNum ).animate({opacity: 0}, 1000);
});