$( document ).ready(function() {

// DOM creation
	function createNewElement(searchName, classList, elementName, elementText) {
	var elementNameHTML = '<' + elementName + '>' + '</' + elementName + '>';
	$( searchName ).append( elementNameHTML );
		for (var i = 0; i < classList.length; i++) {
			$( elementName ).addClass( classList[i] );
		};
	$ ( elementName ).text( elementText );
	}

	createNewElement( 'body', ['container'], 'div' );
	createNewElement( '.container', ['row'], 'header' );
	createNewElement( 'header', ['nav', 'nav-tabs'], 'ul' );
	(function(){
			for (var i = 0; i < 4; i++) {
				createNewElement( 'ul', [], 'li' );
			};
	})();
	createNewElement( 'li', [], 'a' );

// DOM Element tuning
	$( 'li' ).attr( 'role', 'presentation' );
	$( 'li a' ).attr( 'href', ' ' );
	$( 'li a' ).eq( 0 ).text( 'Nunc tincidunt' );
	$( 'li a' ).eq( 1 ).text( 'Proin dolor' );
	$( 'li a' ).eq( 2 ).text( 'Проверяем кириллицу' );

// Tabs enabling
	var liElementNumber = 0;
	$( 'article' ).eq( liElementNumber ).clone().appendTo( $( '.container' ) ).show();
	$( 'li' ).eq( liElementNumber ).addClass( 'active' );
	$( 'a' ).click(function(event){
		event.stopPropagation();
		event.preventDefault();
		$( 'li' ).eq( liElementNumber ).removeClass( 'active' );
		$( '.container article' ).remove();
		liElementNumber = $( this ).parent().index();
		$( 'article' ).eq( liElementNumber ).clone().appendTo( $( '.container' ) ).show();
		$( this ).parent().addClass( 'active' );
	});

});